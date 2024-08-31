import clsx from 'clsx';
import { Ripple } from 'primereact/ripple';

type ButtonProps =
  | React.ComponentPropsWithoutRef<'a'>
  | (React.ComponentPropsWithoutRef<'button'> & { href?: undefined });

export function Button({ className, children, ...props }: ButtonProps) {
  className = clsx(
    'inline-flex  justify-center rounded-full border border-blue-700 py-1.5 px-5 text-base font-semibold text-blue-700 hover:bg-blue-700 hover:text-white focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:text-white/70 p-ripple',
    className
  );

  return typeof props.href === 'undefined' ? (
    <button
      className={className}
      {...(props as React.ComponentPropsWithoutRef<'button'>)}
    >
      {children}
      <Ripple />
    </button>
  ) : (
    <a className={className} {...props}>
      {children}
      <Ripple />
    </a>
  );
}
