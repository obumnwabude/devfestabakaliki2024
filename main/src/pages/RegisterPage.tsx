import { Button } from '@/components/Button';
import { Container } from '@/components/Container';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { isEmail } from 'validator';

enum School {
  ebsu = 'ebsu',
  funai = 'funai',
  none = 'none'
}

enum Category {
  premium = 'premium',
  luxury = 'luxury'
}

interface AttendeeInputInfo {
  name: string;
  email: string;
  phone: string;
  school: School;
  category: Category;
}

export const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<AttendeeInputInfo>();
  const name = watch('name');
  const onSubmit: SubmitHandler<AttendeeInputInfo> = (data) =>
    console.log(data);

  useEffect(() => {
    document.title = 'Register for DevFest Abakaliki 2024';
    return () => {
      document.title = 'DevFest Abakaliki 2024';
    };
  }, []);

  return (
    <section
      id="speakers"
      aria-labelledby="speakers-title"
      className="py-24 md:py-32"
    >
      <Container>
        <div className="max-md:text-center">
          <h2
            id="speakers-title"
            className=" text-4xl font-medium tracking-tighter text-gray-900 sm:text-5xl"
          >
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
                Name
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
                    minLength: { message: 'At least 3 characters', value: 3 }
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
                      validate: (v) => (isEmail(v) ? true : 'Invalid Email')
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
                        value: /^\+234[789][01]\d{8}$/
                      }
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
                htmlFor="school"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Your School
              </label>

              <div className="mt-2">
                <select
                  className="block px-4 w-full rounded-lg !bg-none border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[#5d5d5d] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#5d5d5d] sm:text-sm sm:leading-6"
                  id="school"
                  required
                  {...register('school', { required: 'Required' })}
                >
                  <option value="">Select School</option>
                  <option value="none">Not Applicable</option>
                  <option value="ebsu">EBSU</option>
                  <option value="funai">AE-FUNAI</option>
                </select>
                {errors.school && (
                  <p className="text-red-700 text-sm mb-4">
                    {errors.school!.message}
                  </p>
                )}
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
                      Event Access Only.
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
                      Event Access + Merch.
                    </p>
                  </label>
                </div>
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="w-full bg-gray-900 rounded-lg text-white hover:bg-gray-800"
              >
                Purchase Ticket
              </Button>
            </div>
          </form>

          <aside
            aria-label="Your conference ticket"
            className="opacity-1 relative flex items-center w-full max-w-md"
          >
            <div className="absolute size-full">
              <svg
                aria-hidden="true"
                height="100%"
                version="1.1"
                viewBox="0 0 760 380"
                width="100%"
                fillRule="evenodd"
                clipRule={'evenodd'}
                strokeLinejoin="round"
                strokeMiterlimit={2}
                pointerEvents={'none'}
                xmlns="http://www.w3.org/2000/svg"
              >
                <clipPath
                  clipPathUnits="objectBoundingBox"
                  id="ticket-mask-normal"
                  transform="scale(0.001316, 0.002632)"
                >
                  <path d="M0,8C0,3.582 3.582,0 8,0L752,0C756.418,0 760,3.582 760,8L760,150C760,154.418 756.363,157.897 752.081,158.987C738.238,162.512 728,175.06 728,190C728,204.94 738.238,217.488 752.081,221.013C756.363,222.103 760,225.582 760,230L760,372C760,376.418 756.418,380 752,380L8,380C3.582,380 0,376.418 0,372L0,230C0,225.582 3.637,222.103 7.919,221.013C21.762,217.488 32,204.94 32,190C32,175.06 21.762,162.512 7.919,158.987C3.637,157.897 0,154.418 0,150L0,8Z"></path>
                </clipPath>
              </svg>
            </div>
            <div className="flex flex-col items-stretch justify-start gap-0 stack aspect-[2/1] text-white relative overflow-hidden bg-[#0a0a0a] [clip-path:url(#ticket-mask-normal)] [-webkit-clip-path:url(#ticket-mask-normal)] p-6 md:p-8 w-full">
              <svg
                aria-hidden="true"
                className="absolute top-0 left-0 size-full"
                fill="none"
                shapeRendering={'crispEdges'}
                viewBox="0 0 760 380"
                xmlns="http://www.w3.org/2000/svg"
              >
                <mask
                  height="100%"
                  id="mask0_9_1096"
                  maskUnits="userSpaceOnUse"
                  width="100%"
                  x="0"
                  y="0"
                  className="[mask-type:alpha]"
                >
                  <path
                    clipRule="evenodd"
                    d="M0 8.00001C0 3.58173 3.58172 0 8 0H752C756.418 0 760 3.58172 760 8V150C760 154.418 756.363 157.897 752.081 158.987C738.238 162.512 728 175.06 728 190C728 204.94 738.238 217.488 752.081 221.013C756.363 222.103 760 225.582 760 230V372C760 376.418 756.418 380 752 380H7.99999C3.58171 380 0 376.418 0 372V230C0 225.582 3.63734 222.103 7.91905 221.013C21.7619 217.488 32 204.94 32 190C32 175.06 21.7619 162.512 7.91905 158.987C3.63735 157.897 0 154.418 0 150V8.00001Z"
                    fill="#FF0000"
                    fillRule="evenodd"
                  ></path>
                </mask>
                <g mask="url(#mask0_9_1096)" className="*:stroke-[#292929]">
                  <path d="M0 18H458"></path>
                  <path d="M0 36L458 36"></path>
                  <path d="M0 53.9414H219.401L259.607 90.3126M458 53.9414H238.78L208.716 72.1949"></path>
                  <path d="M0 72.0586H209.078M458 72.0586H249.103L177.248 126.502"></path>
                  <path d="M0 90.1763H198.936L301.489 162.783M458 90.1763H259.245"></path>
                  <path d="M0 108.294H188.07L322.95 199.063M458 108.294H269.93L167.061 144.529"></path>
                  <path d="M0 126.412H177.565M458 126.412H280.435L124.931 217.113"></path>
                  <path d="M0 144.529H167.242M458 144.529H290.758"></path>
                  <path d="M0 162.647H156.738L353.965 253.235M458 162.647H301.081"></path>
                  <path d="M0 180.765H146.052L332.549 217M458 180.765H311.766L114.268 235.14"></path>
                  <path d="M0 198.882H135.91L385.432 307.679M458 198.882H322.452"></path>
                  <path d="M0 217H125.225M458 217H332.232"></path>
                  <path d="M0 235.118H114.54M458 235.118H342.917L73.2809 307.611"></path>
                  <path d="M0 253.235H104.216M458 253.235H353.784"></path>
                  <path d="M0 271.353H94.2555L291.03 144.484M458 271.353H363.745L83.6607 289.493"></path>
                  <path d="M0 289.471H83.7512M458 289.471H374.611L104.035 253.235"></path>
                  <path d="M0 307.588H73.4281M458 307.588H385.115"></path>
                  <path d="M0 325.706H458"></path>
                  <path d="M0 343.5H458"></path>
                  <path d="M0 361.941H458"></path>
                </g>
              </svg>
              <div className="text-white flex flex-row items-stretch justify-between flex-initial z-[1] h-full">
                <div className="text-white flex flex-col items-stretch justify-between h-full">
                  <div
                    className="flex flex-row items-stretch justify-between h-full"
                    aria-hidden="false"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      id="Layer_2"
                      viewBox="0 0 95 95"
                      className="size-3.5 md:size-7"
                    >
                      <g id="MISCELLANEOUS">
                        <circle
                          strokeLinejoin="round"
                          strokeWidth={5}
                          className="fill-[#ea4335] stroke-white"
                          cx="47.5"
                          cy="47.5"
                          r="45"
                        />
                      </g>
                    </svg>
                    <div className="flex ml-2 flex-col items-stretch justify-between">
                      <div className="flex flex-col items-stretch justify-start max-w-[10em] -mt-1.5">
                        <p
                          className={` text-xl ${
                            !!name ? 'text-gray-50' : 'text-[#a0a0a0]'
                          }  tracking-tighter  font-semibold !leading-none md:text-3xl`}
                        >
                          {name ?? 'Your Name'}
                        </p>
                      </div>
                      <span
                        className="relative text-left font-mono text-xl md:text-3xl text-[#a0a0a0]"
                        data-version="v1"
                        aria-label="Ticket number DFAI001"
                      >
                        <svg
                          fill="none"
                          viewBox="0 0 14 16"
                          className="absolute w-3 overflow-visible top-2.5 -left-3.5 h-3"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            clipRule="evenodd"
                            d="M3 0V3L0 3V5L3 5V11H0V13H3V16H5V13L9 13V16H11V13H14V11H11V5L14 5V3L11 3V0H9V3L5 3V0H3ZM9 11V5L5 5V11L9 11Z"
                            fill="currentColor"
                            fillRule="evenodd"
                          ></path>
                        </svg>
                        <span>DFAI24XXX</span>
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className="flex flex-col items-end justify-between"
                  aria-hidden="false"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    id="Layer_2"
                    viewBox="0 0 201.85 149.22"
                    className="h-auto w-14 md:w-24"
                  >
                    <g id="Layer_1-2" data-name="Layer_1">
                      <g>
                        <path
                          className="cls-12 fill-white"
                          d="M6.32,122.87h3.05c.01.08.02.16.04.24.01.08.02.17.02.27,0,.37-.06.74-.17,1.11-.12.37-.32.69-.59.98-.29.3-.62.53-1.01.69s-.82.25-1.32.25c-.45,0-.87-.08-1.27-.25s-.75-.39-1.04-.68c-.3-.29-.53-.64-.7-1.04s-.26-.83-.26-1.31.09-.91.26-1.31c.17-.4.41-.74.7-1.04.3-.29.65-.52,1.04-.68s.82-.25,1.27-.25c.48,0,.92.08,1.32.25s.74.41,1.02.71l-.69.69c-.2-.23-.45-.4-.72-.52-.28-.12-.59-.18-.94-.18-.3,0-.58.06-.86.17-.27.11-.52.27-.73.47s-.38.45-.5.73c-.12.29-.18.61-.18.96s.06.68.18.96c.12.29.29.53.5.73s.45.36.73.47c.27.11.56.17.87.17.4,0,.73-.06.97-.18.25-.12.46-.26.62-.43.12-.12.23-.27.32-.46.09-.19.15-.4.18-.62h-2.12v-.89Z"
                        />
                        <path
                          className="cls-12 fill-white"
                          d="M12.12,121.84c.33,0,.63.06.9.17.27.11.51.27.71.48s.35.45.46.73c.11.28.17.58.17.91s-.05.63-.17.91c-.11.28-.26.52-.46.73-.2.2-.43.36-.71.48-.27.11-.57.17-.9.17s-.63-.06-.9-.17c-.27-.11-.51-.27-.71-.48-.2-.2-.35-.45-.46-.73-.11-.28-.17-.58-.17-.91s.05-.63.17-.91c.11-.28.26-.52.46-.73s.43-.36.71-.48c.27-.11.57-.17.9-.17ZM12.12,125.5c.16,0,.32-.03.47-.1.15-.06.29-.15.41-.27.12-.12.21-.26.28-.43.07-.17.11-.37.11-.58s-.04-.41-.11-.58c-.07-.17-.16-.32-.28-.43-.12-.12-.25-.21-.41-.27-.15-.06-.31-.1-.47-.1s-.32.03-.47.1c-.15.06-.29.16-.41.27-.12.12-.21.26-.28.43-.07.17-.11.37-.11.58s.04.41.11.58c.07.17.16.32.28.43.12.12.25.21.41.27.15.06.31.1.47.1Z"
                        />
                        <path
                          className="cls-12 fill-white"
                          d="M17,121.84c.33,0,.63.06.9.17.27.11.51.27.71.48s.35.45.46.73c.11.28.17.58.17.91s-.05.63-.17.91c-.11.28-.26.52-.46.73-.2.2-.43.36-.71.48-.27.11-.57.17-.9.17s-.63-.06-.9-.17c-.27-.11-.51-.27-.71-.48-.2-.2-.35-.45-.46-.73-.11-.28-.17-.58-.17-.91s.05-.63.17-.91c.11-.28.26-.52.46-.73s.43-.36.71-.48c.27-.11.57-.17.9-.17ZM17,125.5c.16,0,.32-.03.47-.1.15-.06.29-.15.41-.27.12-.12.21-.26.28-.43.07-.17.11-.37.11-.58s-.04-.41-.11-.58c-.07-.17-.16-.32-.28-.43-.12-.12-.25-.21-.41-.27-.15-.06-.31-.1-.47-.1s-.32.03-.47.1c-.15.06-.29.16-.41.27-.12.12-.21.26-.28.43-.07.17-.11.37-.11.58s.04.41.11.58c.07.17.16.32.28.43.12.12.25.21.41.27.15.06.31.1.47.1Z"
                        />
                        <path
                          className="cls-12 fill-white"
                          d="M21.83,128.29c-.3,0-.56-.04-.79-.12-.23-.08-.43-.18-.6-.3s-.31-.26-.42-.41-.19-.3-.24-.44l.93-.38c.08.23.22.41.42.55.2.14.43.21.7.21.4,0,.71-.12.94-.35s.34-.56.34-.99v-.35h-.05c-.13.19-.32.35-.55.48-.24.13-.51.19-.83.19-.26,0-.52-.06-.76-.17-.25-.11-.46-.27-.65-.47s-.34-.44-.45-.72c-.11-.28-.17-.59-.17-.93s.05-.64.17-.92c.11-.28.26-.52.45-.72s.41-.36.65-.47c.24-.11.5-.17.76-.17.31,0,.59.06.83.19.24.13.42.29.55.48h.05v-.53h.94v4.04c0,.37-.06.69-.17.97-.11.28-.27.52-.46.71s-.43.34-.7.44c-.27.1-.56.15-.88.15ZM21.86,125.5c.16,0,.31-.03.46-.09s.28-.15.4-.27c.11-.12.21-.26.28-.44.07-.17.1-.37.1-.59s-.04-.42-.1-.59c-.07-.17-.16-.32-.28-.44-.11-.12-.25-.2-.4-.27-.15-.06-.31-.09-.46-.09s-.32.03-.47.09c-.15.06-.28.15-.4.27-.12.12-.21.26-.28.44-.07.17-.11.37-.11.59s.04.41.11.59c.07.17.16.32.28.44.12.12.25.21.4.27.15.06.3.09.47.09Z"
                        />
                        <path
                          className="cls-12 fill-white"
                          d="M24.82,126.26v-6.26h.97v6.26h-.97Z"
                        />
                        <path
                          className="cls-12 fill-white"
                          d="M30.61,125.24c-.18.33-.44.61-.77.83s-.74.33-1.22.33c-.32,0-.62-.06-.89-.17-.27-.11-.51-.27-.7-.48-.2-.2-.35-.44-.46-.72-.11-.28-.17-.58-.17-.91,0-.31.05-.6.16-.88.1-.28.25-.52.44-.73.19-.21.42-.37.69-.49.27-.12.57-.18.89-.18s.63.05.89.17c.26.11.48.26.66.46.18.2.32.44.42.72.1.28.14.59.14.92v.08s0,.06,0,.08c0,.02,0,.05,0,.07h-3.3c.02.2.07.38.15.53.08.15.18.28.3.38.12.1.25.17.4.22s.29.07.43.07c.28,0,.51-.07.69-.2s.33-.3.45-.5l.83.41ZM29.71,123.58c-.01-.09-.04-.18-.08-.29-.04-.11-.11-.21-.2-.3-.09-.09-.21-.17-.35-.23-.14-.06-.32-.1-.52-.1-.28,0-.52.08-.72.25s-.34.39-.41.67h2.28Z"
                        />
                        <path
                          className="cls-12 fill-white"
                          d="M10.7,130h2.01c.5,0,.94.08,1.33.23s.73.37,1.01.64c.28.27.49.6.64.99.15.38.22.81.22,1.27s-.07.88-.22,1.27-.36.71-.64.99c-.28.27-.61.49-1.01.64-.39.15-.84.23-1.33.23h-2.01v-6.26ZM12.69,135.32c.71,0,1.25-.19,1.63-.58s.58-.92.58-1.61-.19-1.22-.58-1.6-.93-.58-1.63-.58h-1.01v4.37h1.01Z"
                        />
                        <path
                          className="cls-12 fill-white"
                          d="M20.47,135.24c-.18.33-.44.61-.77.83s-.74.33-1.22.33c-.32,0-.62-.06-.89-.17-.27-.11-.51-.27-.7-.48-.2-.2-.35-.44-.46-.72-.11-.28-.17-.58-.17-.91,0-.31.05-.6.16-.88.1-.28.25-.52.44-.73.19-.21.42-.37.69-.49.27-.12.57-.18.89-.18s.63.05.89.17c.26.11.48.26.66.46.18.2.32.44.42.72.1.28.14.59.14.92v.08s0,.06,0,.08c0,.02,0,.05,0,.07h-3.3c.02.2.07.38.15.53.08.15.18.28.3.38.12.1.25.17.4.22s.29.07.43.07c.28,0,.51-.07.69-.2s.33-.3.45-.5l.83.41ZM19.57,133.58c-.01-.09-.04-.18-.08-.29-.04-.11-.11-.21-.2-.3-.09-.09-.21-.17-.35-.23-.14-.06-.32-.1-.52-.1-.28,0-.52.08-.72.25s-.34.39-.41.67h2.28Z"
                        />
                        <path
                          className="cls-12 fill-white"
                          d="M20.65,131.98h1.09l1.15,3.03h.04l1.18-3.03h1.07l-1.79,4.28h-.97l-1.77-4.28Z"
                        />
                        <path
                          className="cls-12 fill-white"
                          d="M29.46,135.24c-.18.33-.44.61-.77.83s-.74.33-1.22.33c-.32,0-.62-.06-.89-.17-.27-.11-.51-.27-.7-.48-.2-.2-.35-.44-.46-.72-.11-.28-.17-.58-.17-.91,0-.31.05-.6.16-.88.1-.28.25-.52.44-.73.19-.21.42-.37.69-.49.27-.12.57-.18.89-.18s.63.05.89.17c.26.11.48.26.66.46.18.2.32.44.42.72.1.28.14.59.14.92v.08s0,.06,0,.08c0,.02,0,.05,0,.07h-3.3c.02.2.07.38.15.53.08.15.18.28.3.38.12.1.25.17.4.22s.29.07.43.07c.28,0,.51-.07.69-.2s.33-.3.45-.5l.83.41ZM28.56,133.58c-.01-.09-.04-.18-.08-.29-.04-.11-.11-.21-.2-.3-.09-.09-.21-.17-.35-.23-.14-.06-.32-.1-.52-.1-.28,0-.52.08-.72.25s-.34.39-.41.67h2.28Z"
                        />
                        <path
                          className="cls-12 fill-white"
                          d="M30.18,136.26v-6.26h.97v6.26h-.97Z"
                        />
                        <path
                          className="cls-12 fill-white"
                          d="M33.99,131.84c.33,0,.63.06.9.17.27.11.51.27.71.48s.35.45.46.73c.11.28.17.58.17.91s-.05.63-.17.91c-.11.28-.26.52-.46.73-.2.2-.43.36-.71.48-.27.11-.57.17-.9.17s-.63-.06-.9-.17c-.27-.11-.51-.27-.71-.48-.2-.2-.35-.45-.46-.73-.11-.28-.17-.58-.17-.91s.05-.63.17-.91c.11-.28.26-.52.46-.73s.43-.36.71-.48c.27-.11.57-.17.9-.17ZM33.99,135.5c.16,0,.32-.03.47-.1.15-.06.29-.15.41-.27.12-.12.21-.26.28-.43.07-.17.11-.37.11-.58s-.04-.41-.11-.58c-.07-.17-.16-.32-.28-.43-.12-.12-.25-.21-.41-.27-.15-.06-.31-.1-.47-.1s-.32.03-.47.1c-.15.06-.29.16-.41.27-.12.12-.21.26-.28.43-.07.17-.11.37-.11.58s.04.41.11.58c.07.17.16.32.28.43.12.12.25.21.41.27.15.06.31.1.47.1Z"
                        />
                        <path
                          className="cls-12 fill-white"
                          d="M36.8,131.98h.92v.55h.05c.12-.19.29-.35.53-.49.24-.14.53-.21.86-.21.27,0,.53.06.78.17.25.11.46.27.65.48s.33.44.45.72c.11.28.17.58.17.91s-.06.64-.17.91c-.11.28-.26.52-.45.72-.19.2-.4.36-.65.48-.25.11-.51.17-.78.17-.33,0-.62-.07-.86-.21-.24-.14-.42-.3-.53-.49h-.05l.05.59v1.84h-.97v-6.17ZM38.97,135.5c.16,0,.32-.03.48-.1.15-.06.29-.16.4-.28.11-.12.21-.26.28-.43.07-.17.1-.36.1-.58s-.04-.41-.1-.58c-.07-.17-.16-.31-.28-.43-.11-.12-.25-.21-.4-.28-.16-.06-.31-.1-.48-.1s-.33.03-.48.1c-.15.06-.28.16-.4.27s-.21.26-.28.43-.1.37-.1.58.03.41.1.58.16.32.28.43.25.21.4.27c.15.06.31.1.48.1Z"
                        />
                        <path
                          className="cls-12 fill-white"
                          d="M45.82,135.24c-.18.33-.44.61-.77.83s-.74.33-1.22.33c-.32,0-.62-.06-.89-.17-.27-.11-.51-.27-.7-.48-.2-.2-.35-.44-.46-.72-.11-.28-.17-.58-.17-.91,0-.31.05-.6.16-.88.1-.28.25-.52.44-.73.19-.21.42-.37.69-.49.27-.12.57-.18.89-.18s.63.05.89.17c.26.11.48.26.66.46.18.2.32.44.42.72.1.28.14.59.14.92v.08s0,.06,0,.08c0,.02,0,.05,0,.07h-3.3c.02.2.07.38.15.53.08.15.18.28.3.38.12.1.25.17.4.22s.29.07.43.07c.28,0,.51-.07.69-.2s.33-.3.45-.5l.83.41ZM44.92,133.58c-.01-.09-.04-.18-.08-.29-.04-.11-.11-.21-.2-.3-.09-.09-.21-.17-.35-.23-.14-.06-.32-.1-.52-.1-.28,0-.52.08-.72.25s-.34.39-.41.67h2.28Z"
                        />
                        <path
                          className="cls-12 fill-white"
                          d="M46.54,131.98h.92v.65h.05c.05-.11.12-.21.21-.31.09-.1.19-.18.31-.25.11-.07.23-.12.36-.17.12-.04.25-.06.36-.06.14,0,.26.01.36.04.1.03.19.06.27.11l-.28.88c-.06-.03-.13-.05-.21-.07-.08-.01-.17-.02-.28-.02-.16,0-.3.03-.43.1s-.25.15-.35.26c-.1.11-.18.24-.23.4s-.08.31-.08.48v2.24h-.97v-4.28Z"
                        />
                        <path
                          className="cls-12 fill-white"
                          d="M33.68,142.87h3.05c.01.08.02.16.04.24.01.08.02.17.02.27,0,.37-.06.74-.17,1.11-.12.37-.32.69-.59.98-.29.3-.62.53-1.01.69s-.82.25-1.32.25c-.45,0-.87-.08-1.27-.25s-.75-.39-1.04-.68c-.3-.29-.53-.64-.7-1.04s-.26-.83-.26-1.31.09-.91.26-1.31c.17-.4.41-.74.7-1.04.3-.29.65-.52,1.04-.68s.82-.25,1.27-.25c.48,0,.92.08,1.32.25s.74.41,1.02.71l-.69.69c-.2-.23-.45-.4-.72-.52-.28-.12-.59-.18-.94-.18-.3,0-.58.06-.86.17-.27.11-.52.27-.73.47s-.38.45-.5.73c-.12.29-.18.61-.18.96s.06.68.18.96c.12.29.29.53.5.73s.45.36.73.47c.27.11.56.17.87.17.4,0,.73-.06.97-.18.25-.12.46-.26.62-.43.12-.12.23-.27.32-.46.09-.19.15-.4.18-.62h-2.12v-.89Z"
                        />
                        <path
                          className="cls-12 fill-white"
                          d="M37.36,141.98h.92v.65h.05c.05-.11.12-.21.21-.31.09-.1.19-.18.31-.25.11-.07.23-.12.36-.17.12-.04.25-.06.36-.06.14,0,.26.01.36.04.1.03.19.06.27.11l-.28.88c-.06-.03-.13-.05-.21-.07-.08-.01-.17-.02-.28-.02-.16,0-.3.03-.43.1s-.25.15-.35.26c-.1.11-.18.24-.23.4s-.08.31-.08.48v2.24h-.97v-4.28Z"
                        />
                        <path
                          className="cls-12 fill-white"
                          d="M42.37,141.84c.33,0,.63.06.9.17.27.11.51.27.71.48s.35.45.46.73c.11.28.17.58.17.91s-.05.63-.17.91c-.11.28-.26.52-.46.73-.2.2-.43.36-.71.48-.27.11-.57.17-.9.17s-.63-.06-.9-.17c-.27-.11-.51-.27-.71-.48-.2-.2-.35-.45-.46-.73-.11-.28-.17-.58-.17-.91s.05-.63.17-.91c.11-.28.26-.52.46-.73s.43-.36.71-.48c.27-.11.57-.17.9-.17ZM42.37,145.5c.16,0,.32-.03.47-.1.15-.06.29-.15.41-.27.12-.12.21-.26.28-.43.07-.17.11-.37.11-.58s-.04-.41-.11-.58c-.07-.17-.16-.32-.28-.43-.12-.12-.25-.21-.41-.27-.15-.06-.31-.1-.47-.1s-.32.03-.47.1c-.15.06-.29.16-.41.27-.12.12-.21.26-.28.43-.07.17-.11.37-.11.58s.04.41.11.58c.07.17.16.32.28.43.12.12.25.21.41.27.15.06.31.1.47.1Z"
                        />
                        <path
                          className="cls-12 fill-white"
                          d="M48.2,145.68h-.05c-.13.2-.31.37-.55.51-.24.14-.5.21-.8.21-.54,0-.95-.16-1.22-.49-.27-.32-.4-.75-.4-1.29v-2.65h.97v2.52c0,.37.09.63.26.78.17.15.4.22.68.22.16,0,.31-.04.44-.11.13-.07.24-.16.34-.28.09-.12.16-.26.21-.41s.07-.32.07-.49v-2.24h.97v4.28h-.92v-.58Z"
                        />
                        <path
                          className="cls-12 fill-white"
                          d="M49.97,141.98h.92v.55h.05c.12-.19.29-.35.53-.49.24-.14.53-.21.86-.21.27,0,.53.06.78.17.25.11.46.27.65.48s.33.44.45.72c.11.28.17.58.17.91s-.06.64-.17.91c-.11.28-.26.52-.45.72-.19.2-.4.36-.65.48-.25.11-.51.17-.78.17-.33,0-.62-.07-.86-.21-.24-.14-.42-.3-.53-.49h-.05l.05.59v1.84h-.97v-6.17ZM52.15,145.5c.16,0,.32-.03.48-.1.15-.06.29-.16.4-.28.11-.12.21-.26.28-.43.07-.17.1-.36.1-.58s-.04-.41-.1-.58c-.07-.17-.16-.31-.28-.43-.11-.12-.25-.21-.4-.28-.16-.06-.31-.1-.48-.1s-.33.03-.48.1c-.15.06-.28.16-.4.27s-.21.26-.28.43-.1.37-.1.58.03.41.1.58.16.32.28.43.25.21.4.27c.15.06.31.1.48.1Z"
                        />
                        <path
                          className="cls-12 fill-white"
                          d="M56.61,146.4c-.26,0-.5-.04-.71-.1-.21-.07-.39-.16-.55-.28-.16-.11-.29-.24-.4-.39s-.19-.3-.25-.45l.87-.37c.1.25.24.44.43.55s.39.18.6.18c.24,0,.44-.05.58-.15.14-.1.21-.21.21-.33s-.05-.23-.16-.32c-.1-.09-.3-.17-.59-.24l-.61-.15c-.13-.03-.27-.07-.41-.14-.14-.06-.26-.14-.38-.24-.12-.1-.21-.21-.28-.35-.07-.14-.11-.3-.11-.48,0-.21.04-.4.14-.56.09-.16.21-.3.37-.41s.34-.2.55-.25c.21-.06.43-.09.66-.09.19,0,.38.02.55.06.18.04.34.1.49.18.15.08.29.19.41.31.12.13.21.27.28.44l-.86.36c-.08-.19-.21-.32-.38-.41-.17-.08-.35-.13-.53-.13-.08,0-.17.01-.25.03-.08.02-.16.05-.23.09s-.12.09-.17.14-.07.12-.07.19c0,.12.05.21.15.28.1.07.26.13.47.18l.66.17c.44.11.77.28.97.5.21.22.31.49.31.79,0,.19-.04.36-.13.53-.08.16-.21.31-.36.44-.16.13-.35.23-.56.3-.22.07-.46.11-.72.11Z"
                        />
                      </g>
                      <g>
                        <rect
                          strokeMiterlimit={10}
                          className="cls-9 fill-[#ea4535] stroke-white"
                          x="68.82"
                          y="120.37"
                          width="30.51"
                          height="13.18"
                          rx="6.59"
                          ry="6.59"
                          transform="translate(-58.29 72.93) rotate(-35.7)"
                        />
                        <rect
                          strokeMiterlimit={10}
                          className="cls-4 fill-[#557dbf] stroke-white"
                          x="77.49"
                          y="121.82"
                          width="13.18"
                          height="30.51"
                          rx="6.59"
                          ry="6.59"
                          transform="translate(-76.3 125.36) rotate(-54.3)"
                        />
                        <rect
                          strokeMiterlimit={10}
                          className="cls-10 fill-[#f7ac1a] stroke-white"
                          x="102.84"
                          y="130.49"
                          width="30.51"
                          height="13.18"
                          rx="6.59"
                          ry="6.59"
                          transform="translate(-57.8 94.68) rotate(-35.7)"
                        />
                        <rect
                          strokeMiterlimit={10}
                          className="cls-8 fill-[#36a852] stroke-white"
                          x="111.5"
                          y="111.7"
                          width="13.18"
                          height="30.51"
                          rx="6.59"
                          ry="6.59"
                          transform="translate(-53.92 148.76) rotate(-54.3)"
                        />
                      </g>
                      <path
                        strokeMiterlimit={10}
                        className="cls-3 fill-[#c4e8f3] stroke-white"
                        d="M200.44,41.55h-3.56c-1.27,0-2.3,1.03-2.3,2.3v11.97c0,6.34-5.14,11.49-11.49,11.49h-7.2c-.51,0-.92-.41-.92-.92v-12.89c0-.51.41-.92.92-.92h5.06c1.27,0,2.3-1.03,2.3-2.3V17.52c0-1.27-1.03-2.3-2.3-2.3h-5.06c-.51,0-.92-.41-.92-.92V1.42c0-.51.41-.92.92-.92h7.2c6.34,0,11.49,5.14,11.49,11.49v11.97c0,1.27,1.03,2.3,2.3,2.3h3.56c.51,0,.92.41.92.92v13.46c0,.51-.41.92-.92.92Z"
                      />
                      <path
                        strokeMiterlimit={10}
                        className="cls-3 fill-[#c4e8f3] stroke-white"
                        d="M2.1,26.25h3.56c1.27,0,2.3-1.03,2.3-2.3v-11.97c0-6.34,5.14-11.49,11.49-11.49h7.2c.51,0,.92.41.92.92v12.89c0,.51-.41.92-.92.92h-5.06c-1.27,0-2.3,1.03-2.3,2.3v32.76c0,1.27,1.03,2.3,2.3,2.3h5.06c.51,0,.92.41.92.92v12.89c0,.51-.41.92-.92.92h-7.2c-6.34,0-11.49-5.14-11.49-11.49v-11.97c0-1.27-1.03-2.3-2.3-2.3h-3.56c-.51,0-.92-.41-.92-.92v-13.46c0-.51.41-.92.92-.92Z"
                      />
                      <g>
                        <ellipse
                          strokeLinejoin="round"
                          strokeWidth={1.13}
                          className="cls-5 fill-none stroke-white"
                          cx="171.97"
                          cy="131.4"
                          rx="15.82"
                          ry="14.51"
                        />
                        <ellipse
                          strokeLinejoin="round"
                          strokeWidth={1.13}
                          className="cls-5 fill-none stroke-white"
                          cx="171.97"
                          cy="131.4"
                          rx="6.83"
                          ry="14.51"
                        />
                        <line
                          strokeLinejoin="round"
                          strokeWidth={1.13}
                          className="cls-5 fill-none stroke-white"
                          x1="157.26"
                          y1="126.02"
                          x2="186.66"
                          y2="126.02"
                        />
                        <line
                          strokeLinejoin="round"
                          strokeWidth={1.13}
                          className="cls-5 fill-none stroke-white"
                          x1="157.26"
                          y1="136.75"
                          x2="186.66"
                          y2="136.75"
                        />
                      </g>
                      <g>
                        <path
                          className="cls-12 fill-white"
                          d="M38.09,39.6V14.73h8.41c2.64,0,4.92.53,6.83,1.58,1.91,1.05,3.38,2.51,4.41,4.38,1.03,1.86,1.55,4.02,1.55,6.48s-.52,4.62-1.55,6.5c-1.03,1.88-2.5,3.34-4.41,4.38s-4.19,1.56-6.83,1.56h-8.41ZM42.78,35.15h3.51c1.83,0,3.36-.33,4.59-.99,1.23-.66,2.15-1.59,2.76-2.8.61-1.2.92-2.61.92-4.2s-.31-3.03-.92-4.22c-.61-1.19-1.53-2.12-2.76-2.78-1.23-.66-2.76-.99-4.59-.99h-3.51v15.98Z"
                        />
                        <path
                          className="cls-12 fill-white"
                          d="M70.82,40.16c-1.78,0-3.38-.41-4.78-1.22-1.4-.81-2.5-1.92-3.3-3.34-.8-1.41-1.2-3.02-1.2-4.83,0-1.69.39-3.25,1.18-4.69.79-1.44,1.86-2.59,3.23-3.46,1.37-.87,2.93-1.3,4.69-1.3,1.9,0,3.5.41,4.79,1.22,1.3.81,2.28,1.89,2.95,3.25.67,1.36,1.01,2.86,1.01,4.5,0,.37-.01.69-.03.96-.02.27-.05.46-.07.57h-15.22v-3.23h10.94c-.02-.39-.14-.8-.35-1.22-.21-.42-.5-.8-.87-1.15-.37-.35-.82-.63-1.34-.85-.52-.22-1.12-.33-1.79-.33-.88,0-1.69.23-2.41.69-.73.46-1.3,1.11-1.72,1.93-.42.82-.63,1.8-.63,2.94s.22,2.18.66,3.01c.44.82,1.04,1.45,1.79,1.88.75.43,1.59.64,2.52.64,1.09,0,2-.24,2.74-.71.74-.47,1.32-1.07,1.74-1.79l3.68,1.81c-.83,1.46-1.92,2.61-3.27,3.46-1.34.85-3,1.27-4.97,1.27Z"
                        />
                        <path
                          className="cls-12 fill-white"
                          d="M87.03,39.6l-7.5-17.72h5.18l4.48,11.53h.28l4.55-11.53h5.11l-7.57,17.72h-4.52Z"
                        />
                        <path
                          className="cls-12 fill-white"
                          d="M101.36,39.6V14.73h15.77v4.45h-11.08v20.43h-4.69ZM103.96,29.67v-4.45h12.06v4.45h-12.06Z"
                        />
                        <path
                          className="cls-12 fill-white"
                          d="M127.78,40.16c-1.78,0-3.38-.41-4.78-1.22-1.4-.81-2.5-1.92-3.3-3.34-.8-1.41-1.2-3.02-1.2-4.83,0-1.69.39-3.25,1.18-4.69.79-1.44,1.86-2.59,3.23-3.46,1.37-.87,2.93-1.3,4.69-1.3,1.9,0,3.5.41,4.79,1.22,1.3.81,2.28,1.89,2.95,3.25.67,1.36,1.01,2.86,1.01,4.5,0,.37-.01.69-.03.96-.02.27-.05.46-.07.57h-15.22v-3.23h10.94c-.02-.39-.14-.8-.35-1.22-.21-.42-.5-.8-.87-1.15-.37-.35-.82-.63-1.34-.85-.52-.22-1.12-.33-1.79-.33-.88,0-1.69.23-2.41.69-.73.46-1.3,1.11-1.72,1.93-.42.82-.63,1.8-.63,2.94s.22,2.18.66,3.01c.44.82,1.04,1.45,1.79,1.88.75.43,1.59.64,2.52.64,1.09,0,2-.24,2.74-.71.74-.47,1.32-1.07,1.74-1.79l3.68,1.81c-.83,1.46-1.92,2.61-3.27,3.46-1.34.85-3,1.27-4.97,1.27Z"
                        />
                        <path
                          className="cls-12 fill-white"
                          d="M145.91,40.16c-1.53,0-2.83-.22-3.91-.66-1.08-.44-1.95-1.02-2.62-1.74-.67-.72-1.17-1.51-1.49-2.36l4.06-1.77c.39.83.93,1.47,1.6,1.89.67.43,1.46.64,2.36.64.74,0,1.41-.12,2.02-.36.6-.24.9-.69.9-1.34,0-.46-.16-.83-.47-1.09-.31-.27-.7-.47-1.16-.63-.46-.15-.94-.27-1.42-.36l-2.08-.45c-.86-.19-1.67-.52-2.43-.99-.76-.47-1.38-1.08-1.86-1.81-.48-.73-.71-1.57-.71-2.52,0-1.07.31-1.99.92-2.78.61-.79,1.45-1.4,2.5-1.84,1.05-.44,2.22-.66,3.49-.66,1.18,0,2.25.14,3.2.42.95.28,1.77.7,2.47,1.27.69.57,1.25,1.29,1.67,2.17l-3.89,1.7c-.37-.69-.85-1.18-1.44-1.46-.59-.28-1.22-.42-1.89-.42-.79,0-1.41.15-1.88.45-.46.3-.69.66-.69,1.08,0,.44.23.82.69,1.15.46.32,1.02.57,1.67.73l2.61.63c1.76.42,3.09,1.09,3.98,2.02.89.93,1.34,2.04,1.34,3.34,0,1.16-.34,2.17-1.01,3.04-.67.87-1.58,1.54-2.71,2.02-1.14.47-2.4.71-3.79.71Z"
                        />
                        <path
                          className="cls-12 fill-white"
                          d="M154.76,25.77v-3.89h3.27v3.89h-3.27ZM163.73,39.88c-1.83,0-3.27-.53-4.31-1.58-1.04-1.05-1.56-2.51-1.56-4.36v-17.06h4.55v16.23c0,.86.17,1.49.52,1.89.35.41.91.61,1.7.61.37,0,.72-.05,1.04-.16.32-.1.73-.31,1.22-.61v4.45c-.51.19-1.02.33-1.55.43-.52.1-1.06.16-1.62.16ZM162.23,25.77v-3.89h4.52v3.89h-4.52Z"
                        />
                      </g>
                      <rect
                        strokeMiterlimit={10}
                        className="cls-1 fill-white stroke-white"
                        x="35.95"
                        y="48.22"
                        width="130.27"
                        height="18.96"
                        rx="9.48"
                        ry="9.48"
                      />
                      <path
                        strokeMiterlimit={10}
                        className="cls-2 fill-[#fee7a5] stroke-white"
                        d="M69.26,77c-5.62-.14-10.57,2.82-13.23,7.27-.23.38-.78.39-1.01,0-2.6-4.36-7.39-7.29-12.86-7.29s-10.26,2.92-12.86,7.29c-.23.38-.78.37-1.01,0-2.66-4.45-7.6-7.41-13.23-7.27-7.81.19-14.45,6.86-14.56,14.62-.12,8.29,6.62,15.05,14.94,15.05,5.47,0,10.26-2.92,12.86-7.29.23-.38.78-.38,1.01,0,2.6,4.36,7.39,7.29,12.86,7.29s10.26-2.92,12.86-7.29c.23-.38.78-.38,1.01,0,2.6,4.36,7.39,7.29,12.86,7.29,8.32,0,15.05-6.76,14.94-15.05-.11-7.76-6.75-14.43-14.56-14.62Z"
                      />
                      <rect
                        strokeMiterlimit={10}
                        className="cls-6 fill-[#cee6c1] stroke-white"
                        x="123.22"
                        y="76.99"
                        width="78.13"
                        height="29.68"
                        rx="14.84"
                        ry="14.84"
                      />
                      <g>
                        <g>
                          <path
                            strokeLinejoin="round"
                            className="cls-7 fill-none stroke-white"
                            d="M106.54,91.6c3.99-.01,7.23,2.61,7.24,5.87s-3.21,5.91-7.2,5.92"
                          />
                          <path
                            strokeLinejoin="round"
                            className="cls-7 fill-none stroke-white"
                            d="M106.49,79.81c3.99-.01,7.23,2.61,7.24,5.87s-3.21,5.91-7.2,5.92"
                          />
                        </g>
                        <polyline
                          strokeLinejoin="round"
                          className="cls-7 fill-none stroke-white"
                          points="101.3 102.11 90.81 91.62 101.3 81.14"
                        />
                      </g>
                      <g>
                        <polyline
                          strokeMiterlimit={10}
                          strokeWidth={1.13}
                          className="cls-11 fill-none  stroke-white"
                          points="151.7 116.89 145.54 116.89 145.54 145.9 151.7 145.9"
                        />
                        <polyline
                          strokeMiterlimit={10}
                          strokeWidth={1.13}
                          className="cls-11 fill-none  stroke-white"
                          points="192.23 145.9 198.39 145.9 198.39 116.89 192.23 116.89"
                        />
                      </g>
                    </g>
                    <g id="Editable_Text">
                      <g>
                        <path
                          className="cls-12"
                          d="M84.66,60.83h-.97l2.56-6.79h.99l2.56,6.79h-.97l-.66-1.84h-2.86l-.66,1.84ZM86.73,55.11l-1.11,3.06h2.26l-1.11-3.06h-.04Z"
                        />
                        <path
                          className="cls-12"
                          d="M92.81,60.99c-.34,0-.65-.07-.93-.22-.28-.15-.5-.34-.65-.58h-.04v.65h-.83v-6.79h.87v2.14l-.04.65h.04c.15-.24.37-.43.65-.58.28-.15.59-.22.93-.22.61,0,1.13.24,1.56.72.44.49.65,1.07.65,1.76s-.22,1.27-.65,1.76c-.42.48-.94.72-1.56.72ZM92.67,60.19c.42,0,.77-.16,1.05-.47.29-.31.43-.71.43-1.21s-.14-.89-.43-1.2c-.28-.32-.64-.47-1.05-.47s-.78.16-1.06.47c-.28.32-.42.72-.42,1.2s.14.9.42,1.21c.28.31.64.46,1.06.46Z"
                        />
                        <path
                          className="cls-12"
                          d="M97.49,56.03c.65,0,1.15.17,1.53.52.37.34.56.82.56,1.42v2.87h-.83v-.65h-.04c-.36.53-.84.8-1.44.8-.51,0-.94-.15-1.29-.46-.35-.3-.52-.68-.52-1.14,0-.48.18-.86.55-1.15.36-.28.85-.43,1.46-.43.52,0,.95.09,1.28.28v-.2c0-.3-.12-.56-.36-.77-.24-.21-.52-.32-.84-.32-.49,0-.87.21-1.16.62l-.77-.48c.42-.61,1.05-.91,1.88-.91ZM96.36,59.41c0,.23.1.42.29.57.19.15.42.23.68.23.37,0,.69-.14.98-.41.29-.27.43-.59.43-.96-.27-.21-.65-.32-1.14-.32-.35,0-.65.09-.89.26-.24.17-.36.38-.36.64Z"
                        />
                        <path
                          className="cls-12"
                          d="M104.56,60.83h-1.05l-1.45-2.19-.71.7v1.49h-.87v-6.79h.87v4.18l2.01-2.04h1.12v.04l-1.81,1.8,1.9,2.77v.04Z"
                        />
                        <path
                          className="cls-12"
                          d="M106.63,56.03c.65,0,1.15.17,1.53.52.37.34.56.82.56,1.42v2.87h-.83v-.65h-.04c-.36.53-.84.8-1.44.8-.51,0-.94-.15-1.29-.46-.35-.3-.52-.68-.52-1.14,0-.48.18-.86.55-1.15.36-.28.85-.43,1.46-.43.52,0,.95.09,1.28.28v-.2c0-.3-.12-.56-.36-.77-.24-.21-.52-.32-.84-.32-.49,0-.87.21-1.16.62l-.77-.48c.42-.61,1.05-.91,1.88-.91ZM105.5,59.41c0,.23.1.42.29.57.19.15.42.23.68.23.37,0,.69-.14.98-.41.29-.27.43-.59.43-.96-.27-.21-.65-.32-1.14-.32-.35,0-.65.09-.89.26-.24.17-.36.38-.36.64Z"
                        />
                        <path
                          className="cls-12"
                          d="M110.48,54.04v6.79h-.87v-6.79h.87Z"
                        />
                        <path
                          className="cls-12"
                          d="M112.58,54.58c0,.17-.06.32-.18.44s-.27.18-.44.18-.32-.06-.44-.18-.18-.27-.18-.44.06-.32.18-.44.27-.18.44-.18.32.06.44.18.18.27.18.44ZM112.4,56.18v4.65h-.87v-4.65h.87Z"
                        />
                        <path
                          className="cls-12"
                          d="M117.53,60.83h-1.05l-1.45-2.19-.71.7v1.49h-.87v-6.79h.87v4.18l2.01-2.04h1.12v.04l-1.81,1.8,1.9,2.77v.04Z"
                        />
                        <path
                          className="cls-12"
                          d="M119.06,54.58c0,.17-.06.32-.18.44s-.27.18-.44.18-.32-.06-.44-.18-.18-.27-.18-.44.06-.32.18-.44.27-.18.44-.18.32.06.44.18.18.27.18.44ZM118.88,56.18v4.65h-.87v-4.65h.87Z"
                        />
                      </g>
                    </g>
                  </svg>
                  <div className="text-xs md:text-sm text-[#a0a0a0] text-right">
                    <p>Abakaliki,</p>
                    <p>Sat. 9th Nov., 9AM.</p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
};
