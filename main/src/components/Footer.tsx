import {
    GitHubIcon,
    InstagramIcon,
    LinkedInIcon,
    SocialLink,
    XIcon,
  } from "@/components/social-icons";
import { Container } from "./Container";  
import logoImage from "@/public/images/DF24-Logo.png";

export default function Footer(){
    return(
        <>
        <footer className="flex-none py-16">
        <Container className="flex flex-col items-center justify-between md:flex-row">
          <img src={logoImage} height={51} alt="" width={176} />
          <div>
            <div className="mt-6 flex items-center justify-center md:justify-end gap-6">
              <SocialLink
                href="https://twitter.com/"
                aria-label="Follow on X"
                icon={XIcon}
              />
              <SocialLink
                href="https://www.instagram.com/"
                aria-label="Follow on Instagram"
                icon={InstagramIcon}
              />
              <SocialLink
                href="https://github.com/"
                aria-label="Follow on GitHub"
                icon={GitHubIcon}
              />
              <SocialLink
                href="https://www.linkedin.com/in/"
                aria-label="Follow on LinkedIn"
                icon={LinkedInIcon}
              />
            </div>
            <p className="mt-4 text-base text-slate-500">
              Copyright &copy; {new Date().getFullYear()} Devfest Abakaliki. All
              rights reserved.
            </p>
          </div>
        </Container>
      </footer>
        </>
    )
}