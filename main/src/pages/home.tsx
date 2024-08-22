'use client'
import "../App.css";


import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import logoTransistor from "@/public/images/logos/transistor.svg";
import logoMirage from "@/public/images/logos/mirage.svg";
import logoStatamic from "@/public/images/logos/statamic.svg";
import logoStaticKit from "@/public/images/logos/statickit.svg";
import logoTuple from "@/public/images/logos/tuple.svg";
import logoLaravel from "@/public/images/logos/laravel.svg";
import profileImage from "@/public/images/profile-image.jpg";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const sponsors = [
  { name: "Transistor", logo: logoTransistor },
  { name: "Tuple", logo: logoTuple },
  { name: "StaticKit", logo: logoStaticKit },
  { name: "Mirage", logo: logoMirage },
  { name: "Laravel", logo: logoLaravel },
  { name: "Statamic", logo: logoStatamic },
];


export default function HomePage() {
  return (
    <>
      <Header />

      <div className="relative py-20 sm:pb-24 sm:pt-36">
        <Container className="relative">
          <div className="mx-auto max-w-2xl lg:max-w-4xl lg:px-12">
            <h1 className="font-display text-5xl font-bold tracking-tighter text-gray-900 sm:text-7xl">
              DevFest Abakaliki 2024
            </h1>
            <div className="mt-6 space-y-6 font-display text-2xl tracking-tight text-gray-600">
              <p>
                Join us at DevFest Abakaliki 2024, the biggest tech event in
                Abakaliki! Connect with developers, designers, and tech
                enthusiasts, and explore the latest trends through exciting
                speakers, workshops, and sessions.
              </p>
            </div>
            <Button href="/register" className="mt-10 w-full sm:hidden">
              Get your tickets
            </Button>
            <dl className="mt-10 grid grid-cols-2 gap-x-10 gap-y-6 sm:mt-16 sm:gap-x-16 sm:gap-y-10 sm:text-center lg:auto-cols-auto lg:grid-flow-col lg:grid-cols-none lg:justify-start lg:text-left">
              {[
                ["Speakers", "5"],
                ["People Attending", "500"],
                ["Venue", "Unavailable"],
                ["Location", "Abakaliki"],
              ].map(([name, value]) => (
                <div key={name}>
                  <dt className="font-mono text-sm text-gray-600">{name}</dt>
                  <dd className="mt-0.5 text-2xl font-semibold tracking-tight text-gray-900">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </div>

      <section
        id="speakers"
        aria-labelledby="speakers-title"
        className="py-20 sm:py-32"
      >
        <Container>
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2
              id="speakers-title"
              className="font-display text-4xl font-medium tracking-tighter text-gray-900 sm:text-5xl"
            >
              Speakers
            </h2>
          </div>

          <div className="mt-14 grid grid-cols-1 items-start gap-x-8 gap-y-8 sm:mt-16 sm:gap-y-16 lg:mt-24 lg:grid-cols-4">
            {[1, 2, 3, 4].map((value) => {
              return (
                <>
                  <div key={value} className="flex flex-col p-2 hover:border-2 border-[#ceb332] rounded-md transition-colors mx-auto">
                    <div>
                      <img
                        src={profileImage}
                        className="object-cover rounded-md"
                        alt=""
                        width={350}
                        height={350}
                      />
                    </div>
                    <div className="pt-2 pb-1 space-y-2">
                      <div>
                        <h3 className="text-xl font-display font-semibold text-gray-900 tracking-tight">
                          Chukwuma Ebube
                        </h3>
                        <p className="text-sm text-gray-600">@ebubedev</p>
                      </div>

                      <p className="text-sm">Software Engineer, Enertel ltd</p>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </Container>
      </section>

      <section
        id="speakers"
        aria-labelledby="speakers-title"
        className="py-20 sm:py-32"
      >
        <Container>
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2
              id="speakers-title"
              className="font-display text-4xl font-medium tracking-tighter text-gray-900 sm:text-5xl"
            >
              Sponsors
            </h2>
          </div>

          <div className="mt-14 grid grid-cols-1 items-start gap-x-8 gap-y-8 sm:mt-16 sm:gap-y-16 lg:mt-24 lg:grid-cols-4">
            {sponsors.map((sponsor) => (
              <img
                key={sponsor.name}
                src={sponsor.logo}
                alt={sponsor.name}
              />
            ))}
          </div>
        </Container>
      </section>

      <Footer />
    </>
  );
}
