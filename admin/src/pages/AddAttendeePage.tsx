import { useFirebase } from '@/contexts/FirebaseContext';
import { useToast } from '@/contexts/ToastContext';
import { onAuthStateChanged } from 'firebase/auth';
import { httpsCallable } from 'firebase/functions';
import { Dropdown } from 'primereact/dropdown';
import { Ripple } from 'primereact/ripple';
import { SelectItemOptionsType } from 'primereact/selectitem';
import { useEffect, useState } from 'react';
import {
  Control,
  Controller,
  FieldErrors,
  Path,
  RegisterOptions,
  SubmitHandler,
  useForm,
  UseFormRegister
} from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import BounceLoader from 'react-spinners/BounceLoader';
import { isEmail } from 'validator';

enum School {
  ebsu = 'ebsu',
  aefunai = 'aefunai',
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

interface InputProps {
  errors: FieldErrors<AttendeeInputInfo>;
  label: Path<AttendeeInputInfo>;
  placeholder?: string | undefined;
  register: UseFormRegister<AttendeeInputInfo>;
  rules: RegisterOptions<AttendeeInputInfo>;
}

interface SelectProps {
  control: Control<AttendeeInputInfo>;
  label: Path<AttendeeInputInfo>;
  options: SelectItemOptionsType;
}

const capitalize = (s: string) => s[0].toUpperCase() + s.substring(1);

const Input = ({ errors, label, placeholder, register, rules }: InputProps) => (
  <label
    className={
      'flex flex-col gap-y-2 mb-6 focus-within:text-blue-500 ' +
      (errors[label]?.message ? 'focus-within:text-red-700 ' : '')
    }
  >
    <span>{capitalize(label)}</span>
    <input
      className={
        'border-b focus:border-blue-500  outline-none border-neutral-600 pb-1 bg-transparent text-neutral-100 ' +
        (errors[label]?.message ? 'border-red-700 focus:border-red-700 ' : '')
      }
      {...register(label, { ...rules, required: 'Required' })}
      {...(placeholder ? { placeholder } : {})}
    />
    {errors[label]?.message && (
      <span className="text-red-700">{errors[label]?.message}</span>
    )}
  </label>
);

const Select = ({ control, label, options }: SelectProps) => (
  <>
    <span className="mb-2 block">{capitalize(label)}</span>
    <Controller
      name={label}
      control={control}
      render={({ field }) => (
        <Dropdown
          options={options}
          optionLabel="display"
          optionValue="name"
          placeholder={`Select ${capitalize(label)}`}
          className="mb-6 w-full"
          {...field}
        />
      )}
    />
  </>
);

export const AddAttendeePage = () => {
  const { auth, functions, recordEvent } = useFirebase();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<AttendeeInputInfo>({
    defaultValues: { school: School.none, category: Category.premium }
  });
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const categories = [
    { name: 'premium', display: 'Premium ₦3,000' },
    { name: 'luxury', display: 'Luxury ₦10,000' }
  ];
  const schools = [
    { name: 'none', display: 'Not Applicable' },
    { name: 'ebsu', display: 'EBSU' },
    { name: 'aefunai', display: 'AE-FUNAI' }
  ];

  const onSubmit: SubmitHandler<AttendeeInputInfo> = async (
    info: AttendeeInputInfo
  ) => {
    try {
      setLoading(true);
      const ticket = await httpsCallable(functions, 'adminAddAttendee')(info);
      recordEvent('admin_added_attendee', { ticket });
      toast({ detail: 'Attendee added successfully', success: true });
      setLoading(false);
      navigate('/');
    } catch (e: any) {
      toast({
        detail: e['message'] ?? e ?? 'An error occurred',
        success: false
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const result = await user.getIdTokenResult();
        if (!result.claims.admin) navigate('/auth');
      } else {
        navigate('/auth');
      }
    });
  }, []);

  return (
    <>
      <div className="flex justify-between mb-8 w-full max-md:max-w-sm  md:max-w-screen-md mx-auto">
        <h2 className="text-xl">Add Attendee</h2>
        <button
          className="p-ripple px-3 pb-1 rounded-md border border-neutral-600"
          onClick={() => navigate('/')}
        >
          Attendees <Ripple />
        </button>
      </div>

      {loading ? (
        <div className="self-center flex flex-col grow justify-center">
          <BounceLoader color="white" />
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-md:max-w-sm mx-auto md:max-w-screen-md"
        >
          <div className="md:flex md:gap-x-12 mb-8">
            <div className="md:grow">
              <Input
                {...{
                  errors,
                  register,
                  label: 'name',
                  rules: {
                    minLength: { message: 'At least 3 characters', value: 3 }
                  }
                }}
              />
              <Input
                {...{
                  errors,
                  register,
                  label: 'email',
                  rules: {
                    validate: (v) => (isEmail(v ?? '') ? true : 'Invalid Email')
                  }
                }}
              />
              <Input
                {...{
                  errors,
                  register,
                  label: 'phone',
                  placeholder: '+234xxxxxxxxxxx',
                  rules: {
                    pattern: {
                      message: 'Invalid Nigerian Number',
                      value: /^\+234[789][01]\d{8}$/
                    }
                  }
                }}
              />
            </div>
            <div className="md:grow">
              <Select {...{ control, label: 'school', options: schools }} />
              <Select
                {...{ control, label: 'category', options: categories }}
              />
            </div>
          </div>
          <p className="text-center mb-32">
            <button className="p-ripple px-8 py-2 text-xl rounded-lg bg-blue-500">
              Add <Ripple />
            </button>
          </p>
        </form>
      )}
    </>
  );
};
