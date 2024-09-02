import { Button } from '@/components/Button';
import { Container } from '@/components/Container';
import { TicketDisplay } from '@/components/TicketDisplay';
import { useFirebase } from '@/contexts/FirebaseContext';
import { useToast } from '@/contexts/ToastContext';
import { httpsCallable } from 'firebase/functions';
import { useEffect, useState } from 'react';
import ConfettiExplosion from 'react-confetti-explosion';
import { SubmitHandler, useForm } from 'react-hook-form';
import BounceLoader from 'react-spinners/BounceLoader';
import { isEmail } from 'validator';

enum Category {
  premium = 'premium',
  luxury = 'luxury',
}

interface AttendeeInputInfo {
  name: string;
  email: string;
  phone: string;
  category: Category;
}

interface InitPaymentRequest extends AttendeeInputInfo {
  school: string;
  callerHref: string;
}

interface InitPaymentResponse {
  url: string;
  reference: string;
}

interface CheckReferenceResponse {
  status: boolean;
  name?: string;
  ticket?: string;
}

export const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isShowingConfetti, setIsShowingConfetti] = useState(false);
  const [successName, setSuccessName] = useState('');
  const [successTicket, setSuccessTicket] = useState('');
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AttendeeInputInfo>();
  const { toast } = useToast();
  const { functions, recordEvent } = useFirebase();
  const formName = watch('name');

  const onSubmit: SubmitHandler<AttendeeInputInfo> = async (
    info: AttendeeInputInfo
  ) => {
    try {
      setIsLoading(true);
      const response = await httpsCallable<
        InitPaymentRequest,
        InitPaymentResponse
      >(
        functions,
        'initPayment'
      )({ ...info, school: 'none', callerHref: window.location.href });
      const { url, reference } = response.data;
      recordEvent('init_payment', { reference });
      window.location.assign(url);
    } catch (e: any) {
      toast({
        detail: e['message'] ?? e ?? 'An error occurred',
        success: false,
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    document.title = 'Register for DevFest Abakaliki 2024';

    (async () => {
      const reference = new URLSearchParams(window.location.search).get(
        'reference'
      );
      if (reference) {
        setIsLoading(true);
        try {
          const response = await httpsCallable<
            { reference: string },
            CheckReferenceResponse
          >(
            functions,
            'checkReference'
          )({ reference });
          const { status, name, ticket } = response.data;
          if (status) {
            recordEvent('payment_successful', { reference });
            setSuccessName(name ?? '');
            setSuccessTicket(ticket ?? '');
            setIsShowingConfetti(true);
            toast({
              detail: 'You have successfully registered',
              success: true,
            });
          } else {
            recordEvent('payment_failed', { reference });
            toast({ detail: 'Payment Unsuccessful', success: false });
          }
        } catch (e: any) {
          toast({
            detail: e['message'] ?? e ?? 'An error occurred',
            success: false,
          });
        }
        window.history.pushState(
          {},
          document.title,
          `${window.location.pathname}`
        );
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    })();

    return () => {
      document.title = 'DevFest Abakaliki 2024';
    };
  }, []);

  if (isLoading) {
    return (
      <div className="self-center flex flex-col grow justify-center">
        <BounceLoader color="var(--df-blue-core)" />
      </div>
    );
  }

  if (successName && successTicket) {
    return (
      <section className="py-24 md:py-32 px-8 grow flex flex-col items-center">
        {isShowingConfetti && (
          <div className="w-1 bg-red h-1 fixed left-1/2 top-48 z-20">
            <ConfettiExplosion
              force={0.8}
              duration={7500}
              particleCount={500}
              width={window.innerWidth}
              height={window.innerHeight}
              onComplete={() => setIsShowingConfetti(false)}
            />
          </div>
        )}

        <div className="w-full flex flex-col-reverse md:flex-row md:items-start gap-8">
          <div className="max-md:mx-auto w-full max-w-md">
            <h2 className="text-2xl font-medium tracking-tighter text-gray-900 max-md:mt-8 mb-2">
              Registration Successful
            </h2>
            <p className="mb-4">
              Thanks for registering for DevFest Abakaliki 2024. We are so happy
              that you joined us. We can't wait to see you at the event.
            </p>
            <p className="mb-8">
              Check your Inbox later on. You should receive a "Ticket
              Confirmation" email with your unique ticket.
            </p>
            <h2 className="text-2xl font-medium tracking-tighter text-gray-900 mb-2">
              Next Steps
            </h2>
            <p className="mb-3">
              While waiting for DevFest, please do the following:
            </p>
            <ol className="list-decimal pl-4 mb-8">
              <li className="mb-1">
                Complete your Registration by clicking "RSVP" at the{' '}
                <a
                  href="https://gdg.community.dev/e/m2yxn5/"
                  className="underline"
                  target="_blank"
                  rel="noopener noreferer"
                  onClick={() => recordEvent('rsvp_on_gdg_community')}
                >
                  GDG Abakaliki Website.
                </a>
              </li>
              <li className="mb-1">
                Join the{' '}
                <a
                  href="https://chat.whatsapp.com/J18aHOY9olQ63jYudso7LS"
                  className="underline"
                  target="_blank"
                  rel="noopener noreferer"
                  onClick={() => recordEvent('join_whatsapp_group')}
                >
                  GDG Abakaliki Whatsapp Group Here.
                </a>{' '}
                And
              </li>
              <li className="mb-1">
                Share{' '}
                <a
                  href="https://x.com/intent/tweet?text=I%27m%20attending%20DevFest%20Abakaliki%202024%20on%20Saturday%209th%20Nov.%20%0D%0A%0D%0AJoin%20me%20and%20register%20at%20https://devefestabakaliki.com"
                  className="underline"
                  target="_blank"
                  rel="noopener noreferer"
                  onClick={() => recordEvent('shared_on_twitter')}
                >
                  DevFest Abakaliki 2024 on X (Twitter).
                </a>
              </li>
            </ol>
            <div>
              <Button
                onClick={() => {
                  setSuccessName('');
                  setSuccessTicket('');
                  recordEvent('purchased_another_ticket');
                }}
                className="w-full bg-blue-700 rounded-lg text-white"
              >
                Purchase Another Ticket
              </Button>
            </div>
          </div>

          <div className="max-md:mx-auto w-full max-md:max-w-lg">
            <TicketDisplay name={successName} ticket={successTicket} />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 md:py-32">
      <Container>
        <div className="max-md:text-center">
          <h2 className="text-4xl font-medium tracking-tighter text-gray-900 sm:text-5xl">
            Get your Ticket
          </h2>
        </div>

        <div className="flex mt-10 flex-col-reverse items-center md:flex-row md:items-start gap-8">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 w-full max-w-lg"
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Full Name
              </label>

              <div className="mt-2">
                <input
                  id="name"
                  type="text"
                  required
                  placeholder="John Doe"
                  autoComplete="name"
                  className="block px-4 w-full rounded-lg !bg-none border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[#5d5d5d] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#5d5d5d] sm:text-sm sm:leading-6"
                  {...register('name', {
                    required: 'Required',
                    minLength: { message: 'At least 3 characters', value: 3 },
                  })}
                />
                {errors.name && (
                  <p className="text-red-700 text-sm mb-4">
                    {errors.name!.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex gap-3 flex-col md:flex-row w-full">
              <div className="md:basis-1/2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="example@email.com"
                    autoComplete="email"
                    className="block px-4 w-full rounded-lg !bg-none border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[#5d5d5d] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#5d5d5d] sm:text-sm sm:leading-6"
                    {...register('email', {
                      required: 'Required',
                      validate: (v) => (isEmail(v) ? true : 'Invalid Email'),
                    })}
                  />
                  {errors.email && (
                    <p className="text-red-700 text-sm mb-4">
                      {errors.email!.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="md:basis-1/2">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Phone No.
                </label>
                <div className="mt-2">
                  <input
                    id="phone"
                    type="tel"
                    required
                    placeholder="+2349012345678"
                    pattern="^\+234[789][01]\d{8}$"
                    autoComplete="tel"
                    className="block px-4 w-full rounded-lg !bg-none border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[#5d5d5d] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#5d5d5d] sm:text-sm sm:leading-6"
                    {...register('phone', {
                      required: 'Required',
                      pattern: {
                        message: 'Invalid Nigerian Number',
                        value: /^\+234[789][01]\d{8}$/,
                      },
                    })}
                  />
                  {errors.phone && (
                    <p className="text-red-700 text-sm mb-4">
                      {errors.phone!.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Ticket Type
              </label>
              {errors.category && (
                <p className="text-red-700 text-sm mb-4">
                  {errors.category!.message}
                </p>
              )}

              <div className="mt-2">
                <div className="grid gap-x-6 gap-y-6 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 outline-none">
                  <label
                    htmlFor="premium"
                    className="text-slate-700 relative border group border-[#5d5d5d] flex flex-col justify-between [&>div>span]:has-[:checked]:!text-[#a0a0a0] has-[:checked]:ring-[#5d5d5d] has-[:checked]:text-white has-[:checked]:bg-[#0a0a0a] items-center gap-6 rounded-lg p-4 ring-1 ring-transparent hover:bg-[#ededed]"
                  >
                    <input
                      id="premium"
                      value="premium"
                      type="radio"
                      className="peer absolute inset-0 invisible"
                      {...register('category', { required: 'Required' })}
                    />
                    <div className="flex w-full items-center justify-between gap-x-3">
                      <p className=" text-left text-lg font-semibold">
                        Premium
                      </p>
                      <span className="relative inline-flex items-center overflow-hidden rounded-sm px-2 font-mono text-sm font-medium uppercase">
                        ₦3,000
                      </span>
                    </div>
                    <p className="mt-3.5 w-full text-left text-sm font-medium text-[#4f4f4f] peer-checked:text-[#a0a0a0]">
                      Event Access + Refreshment.
                    </p>
                  </label>

                  <label
                    htmlFor="luxury"
                    className="text-slate-700 relative border group border-[#5d5d5d] flex flex-col justify-between [&>div>span]:has-[:checked]:!text-[#a0a0a0] has-[:checked]:ring-[#5d5d5d] has-[:checked]:text-white has-[:checked]:bg-[#0a0a0a] items-center gap-6 rounded-lg p-4 ring-1 ring-transparent hover:bg-[#ededed]"
                  >
                    <input
                      id="luxury"
                      value="luxury"
                      type="radio"
                      className="peer absolute inset-0 invisible"
                      {...register('category', { required: 'Required' })}
                    />
                    <div className="flex w-full items-center justify-between gap-x-3">
                      <p className=" text-left text-lg font-semibold">Luxury</p>
                      <span className="relative inline-flex items-center overflow-hidden rounded-sm px-2 font-mono text-sm font-medium uppercase">
                        ₦10,000
                      </span>
                    </div>
                    <p className="mt-3.5 w-full text-left text-sm font-medium text-[#4f4f4f] peer-checked:text-[#a0a0a0]">
                      Event Access + Refreshment + Swags + Merch.
                    </p>
                  </label>
                </div>
              </div>
            </div>
            <div>
              <Button
                type="submit"
                className="w-full bg-blue-700 rounded-lg text-white mt-6"
              >
                Purchase Ticket
              </Button>

              <p className="text-xs text-center text-gray-900 mt-3">
                By clicking "Purchase Ticket", you agree to our{' '}
                <a
                  href="https://gdg.community.dev/participation-terms/"
                  className="text-blue-700 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GDG Event Participation Terms.
                </a>
              </p>
            </div>
          </form>

          <TicketDisplay name={formName} ticket="DFAI24XXX" />
        </div>
      </Container>
    </section>
  );
};
