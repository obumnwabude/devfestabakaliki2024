import { Ripple } from 'primereact/ripple';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="px-6 sm:px-10 py-4 md:py-6 fixed xs:px-8 top-0 left-0 right-0 z-10 h-18 md:h-24 bg-opacity-10 backdrop-blur-lg bg-white/[0.1] flex justify-between">
      <h1>
        <Link to="/">
          <img
            src="/assets/dfai24-logo-header.png"
            alt="DevFest Abakaliki"
            className="h-10 md:h-16"
          />
        </Link>
      </h1>

      <Link
        to="/register"
        className="max-[360px]:scale-75 max-[360px]:-mr-4 pt-1 pb-2 px-4 font-semibold rounded-full bg-blue-700 text-white h-fit p-ripple"
      >
        Get your Ticket
        <Ripple />
      </Link>
    </header>
  );
};
