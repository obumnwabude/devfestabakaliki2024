import {
  FacebookIcon,
  GlobeIcon,
  SocialLink,
  XIcon
} from '@/components/SocialIcons';
import { Container } from './Container';

export const Footer = () => {
  return (
    <>
      <footer className="flex-none py-16">
        <Container className="flex flex-col items-center justify-between md:flex-row">
          <img
            src="/assets/dfai24-logo-footer.png"
            height={51}
            alt=""
            width={176}
          />
          <div>
            <div className="mt-6 flex items-center justify-center md:justify-end gap-6">
              <SocialLink
                href="https://x.com/gdgabakaliki"
                aria-label="Follow Us on X"
                icon={XIcon}
              />
              <SocialLink
                href="https://facebook.com/GDGAbakaliki"
                aria-label="Follow Us on Facebook"
                icon={FacebookIcon}
              />
              <SocialLink
                href="https://gdg.community.dev/gdg-abakaliki/"
                aria-label="About GDG Abakaliki"
                icon={GlobeIcon}
              />
            </div>
            <p className="mt-4 text-base text-slate-500 max-sm:text-center">
              Copyright &copy; {new Date().getFullYear()} GDG Abakaliki. All
              Rights Reserved.
            </p>
          </div>
        </Container>
      </footer>
    </>
  );
};
