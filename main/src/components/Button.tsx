import clsx from "clsx";

type ButtonProps =
  | React.ComponentPropsWithoutRef<"a">
  | (React.ComponentPropsWithoutRef<"button"> & { href?: undefined });

export function Button({ className, ...props }: ButtonProps) {
  className = clsx(
    "inline-flex  justify-center rounded-full border-2 border-gray-900 p-4 text-base font-semibold text-gray-900 hover:bg-gray-900 hover:text-white focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:text-white/70",
    className
  );

  return typeof props.href === "undefined" ? (
    <button
      className={className}
      {...(props as React.ComponentPropsWithoutRef<"button">)}
    />
  ) : (
    <a className={className} {...props} />
  );
}
