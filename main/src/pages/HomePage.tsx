import { Countdown } from '@/components/Countdown';
import { Ripple } from 'primereact/ripple';
import { Link } from 'react-router-dom';

// const sponsors = [
//   'transistor',
//   'tuple',
//   'statickit',
//   'mirage',
//   'laravel',
//   'statamic'
// ];

export const HomePage = () => {
  return (
    <>
      <section className="relative px-8 lg:px-12 py-32 md:py-48">
        <div className="mx-auto max-w-2xl lg:max-w-4xl lg:px-12">
          <h1 className=" text-4xl font-bold tracking-tighter text-gray-900 sm:text-6xl text-center mb-2 sm:mb-6">
            DevFest Abakaliki 2024
          </h1>
          <p className="space-y-6  text-center text-sm tracking-tight text-gray-600 sm:text-base md:text-lg max-[400px]:mx-4 max-sm:mx-8">
            Join us at DevFest Abakaliki 2024! Connect with developers,
            designers, and tech enthusiasts, and explore the latest trends
            through exciting speakers, workshops, and sessions. This event is
            your gateway to latest updates in
            <span className="text-df-blue-core"> Cloud</span>,
            <span className="text-df-red-core"> AI</span>,
            <span className="text-df-green-core"> Web</span>, and
            <span className="text-df-yellow-core"> Mobile</span>.
          </p>
        </div>

        <Countdown />

        <p className="flex max-[400px]:flex-col gap-4 sm:gap-6 text-center justify-center max-w-lg lg:max-w-3xl mx-auto">
          <a
            href="https://bit.ly/CFSDevFestAi"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-blue-700 py-1.5 px-5 text-base font-semibold text-blue-700 hover:bg-blue-700 hover:text-white sm:grow lg:text-xl lg:py-2 p-ripple"
          >
            Be a Speaker
            <Ripple />
          </a>
          <Link
            to="/register"
            className="rounded-full border  py-1.5 px-5 text-base font-semibold bg-blue-700 text-white sm:grow lg:text-xl lg:py-2 p-ripple"
          >
            Get your Ticket
            <Ripple />
          </Link>
        </p>
      </section>

      <section className="px-8 lg:px-12 py-20 sm:py-32 bg-df-red-pastel">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2
            id="speakers-title"
            className=" text-4xl font-medium tracking-tighter text-gray-900 sm:text-5xl mb-4"
          >
            2023 Recap
          </h2>
          <p className="space-y-6  text-sm tracking-tight text-gray-600 sm:text-base md:text-lg">
            Photos from our Previous DevFest.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 items-start gap-x-8 gap-y-8 sm:grid-cols-2  sm:gap-y-16 lg:mt-24 md:grid-cols-3 lg:grid-cols-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => {
            return (
              <img
                src={`/assets/dfai23-${value}.jpg`}
                alt={`Photo ${value} from DevFest Abakaliki 2023`}
                className="w-full max-w-sm shadow-md mx-auto rounded-md"
                key={value}
                data-aos="fade-up"
              />
            );
          })}
          <div
            className="w-full max-w-sm mx-auto rounded-md relative p-[36%] bg-red-100"
            data-aos="fade-up"
          >
            <div className="absolute top-0 left-0 right-0 bottom-0 p-6 flex flex-col items-center">
              <img
                src="/assets/img-placeholder.jpg"
                className="rounded-xl h-1/2 mb-4"
                alt=""
                aria-hidden="true"
              />
              <div className="text-center static flex justify-center items-center grow">
                <a
                  className="rounded-full py-2 px-6 bg-df-red-core text-white text-lg p-ripple"
                  href="https://drive.google.com/drive/u/0/folders/1mbiAMxmLxuFHTb7wz5apHlMvJ9NhaPUD"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View All Pictures
                  <Ripple />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-8 lg:px-12 py-20 sm:py-32 bg-df-blue-pastel">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2
            id="speakers-title"
            className=" text-4xl font-medium tracking-tighter text-gray-900 sm:text-5xl mb-4"
          >
            Speakers
          </h2>
          <p className="space-y-6  text-sm tracking-tight text-gray-600 sm:text-base md:text-lg">
            Awesome Speakers from Various Sectors with Great Inspirations.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 items-start gap-x-8 gap-y-8 sm:grid-cols-2  sm:gap-y-16 lg:mt-24 md:grid-cols-3 lg:grid-cols-4">
          {['cloud', 'ai', 'web', 'mobile'].map((speaker) => (
            <img
              src={`/assets/${speaker}-speaker.jpg`}
              alt={`Template for ${speaker} speaker`}
              className="w-full max-w-sm shadow-md mx-auto"
              key={speaker}
              data-aos="fade-up"
            />
          ))}
          <div
            className="w-full max-w-sm mx-auto rounded-md relative p-[36%] bg-white"
            data-aos="fade-up"
          >
            <div className="absolute top-0 left-0 right-0 bottom-0 p-6 flex flex-col items-center">
              <img
                src="/assets/speaker-placeholder.jpg"
                className="rounded-xl h-1/2 mb-4"
                aria-hidden="true"
              />
              <div className="text-center static flex justify-center items-center grow">
                <a
                  className="rounded-full py-2 px-6 bg-blue-700 text-white text-lg p-ripple"
                  href="https://bit.ly/CFSDevFestAi"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Become a Speaker
                  <Ripple />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-8 lg:px-12 py-20 sm:py-32 bg-df-yellow-pastel">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2
            id="speakers-title"
            className=" text-4xl font-medium tracking-tighter text-gray-900 sm:text-5xl mb-4"
          >
            Sponsors
          </h2>
          <p className="space-y-6  text-sm tracking-tight text-gray-600 sm:text-base md:text-lg mb-12">
            Our Sponsors are the best in the industry, they make this event
            possible.
          </p>
          <a
            className="rounded-full py-2 px-6 shadow-md bg-df-yellow-core text-white text-lg p-ripple"
            href="mailto:gdgabakaliki@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Become a Sponsor
            <Ripple />
          </a>
        </div>

        {/* <div className="mt-14 grid grid-cols-1 items-start gap-x-8 gap-y-8 sm:mt-16 sm:gap-y-16 lg:mt-24 lg:grid-cols-4">
            {sponsors.map((sponsor) => (
              <img
                key={sponsor}
                src={`/assets/${sponsor}.svg`}
                alt={sponsor[0].toUpperCase() + sponsor.slice(1)}
              />
            ))}
          </div> */}
      </section>

      <section className="px-8 lg:px-12 py-20 sm:py-32 bg-df-green-pastel">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className=" text-4xl font-medium tracking-tighter text-gray-900 sm:text-5xl mb-4">
            Get your Ticket
          </h2>
          <p className="space-y-6  text-sm tracking-tight text-gray-600 sm:text-base md:text-lg mb-12">
            DevFest Abakaliki 2024 will be on the
            <span className="font-bold"> Sat., 9th November, 2024.</span>{' '}
            Register Now and Secure your Spot.
          </p>
          <Link
            className="rounded-full py-2 px-6 shadow-md bg-df-green-core text-white text-lg p-ripple"
            to="/register"
          >
            Register Now
            <Ripple />
          </Link>
        </div>
      </section>
    </>
  );
};
