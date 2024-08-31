import clsx from 'clsx';

export function FacebookIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      viewBox="0 0 512 512"
      width="24"
      height="24"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M512,256C512,114.6,397.4,0,256,0S0,114.6,0,256c0,127.8,93.6,233.7,216,252.9V330.1h-64.9V256
		H216v-56.4c0-64.1,38.2-99.6,96.6-99.6c28.1,0,57.4,5,57.4,5v63h-32.3c-31.8,0-41.7,19.8-41.7,40v48h71l-11.4,74.1h-59.6v178.8
		C418.4,489.7,512,383.8,512,256z"
      />
      <path
        fillOpacity="0"
        d="M355.6,330.1L367,256h-71v-48c0-20.2,10-40,41.7-40h32.3v-63c0,0-29.3-5-57.4-5
		c-58.5,0-96.6,35.5-96.6,99.6V256h-64.9v74.1h64.9v178.8c13,2.1,26.4,3.1,40,3.1c13.6,0,26.9-1.1,40-3.1V330.1H355.6z"
      />
    </svg>
  );
}

export function XIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M13.3174 10.7749L19.1457 4H17.7646L12.7039 9.88256L8.66193 4H4L10.1122 12.8955L4 20H5.38119L10.7254 13.7878L14.994 20H19.656L13.3171 10.7749H13.3174ZM11.4257 12.9738L10.8064 12.0881L5.87886 5.03974H8.00029L11.9769 10.728L12.5962 11.6137L17.7652 19.0075H15.6438L11.4257 12.9742V12.9738Z" />
    </svg>
  );
}

export function GlobeIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 -960 960 960" aria-hidden="true" {...props}>
      <path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-155.5t86-127Q252-817 325-848.5T480-880q83 0 155.5 31.5t127 86q54.5 54.5 86 127T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480-80Zm0-82q26-36 45-75t31-83H404q12 44 31 83t45 75Zm-104-16q-18-33-31.5-68.5T322-320H204q29 50 72.5 87t99.5 55Zm208 0q56-18 99.5-55t72.5-87H638q-9 38-22.5 73.5T584-178ZM170-400h136q-3-20-4.5-39.5T300-480q0-21 1.5-40.5T306-560H170q-5 20-7.5 39.5T160-480q0 21 2.5 40.5T170-400Zm216 0h188q3-20 4.5-39.5T580-480q0-21-1.5-40.5T574-560H386q-3 20-4.5 39.5T380-480q0 21 1.5 40.5T386-400Zm268 0h136q5-20 7.5-39.5T800-480q0-21-2.5-40.5T790-560H654q3 20 4.5 39.5T660-480q0 21-1.5 40.5T654-400Zm-16-240h118q-29-50-72.5-87T584-782q18 33 31.5 68.5T638-640Zm-234 0h152q-12-44-31-83t-45-75q-26 36-45 75t-31 83Zm-200 0h118q9-38 22.5-73.5T376-782q-56 18-99.5 55T204-640Z" />
    </svg>
  );
}

export function SocialLinkWithLabel({
  className,
  href,
  children,
  icon: Icon
}: {
  className?: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <li className={clsx(className, 'flex')}>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={href}
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
        <span className="ml-4">{children}</span>
      </a>
    </li>
  );
}

export function SocialLink({
  icon: Icon,
  ...props
}: React.ComponentPropsWithoutRef<'a'> & {
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className="group -m-1 p-1"
      {...props}
    >
      <Icon className="h-6 w-6 fill-gray-700 transition group-hover:fill-gray-900 " />
    </a>
  );
}
