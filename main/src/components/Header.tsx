import { Container } from "./Container"
import { Button } from "./Button"
import logoImage from "@/public/images/DF24-Logo.png";
export default function Header(){
    return(
        <>
         <header className="relative z-50 flex-none lg:pt-11">
        <Container className="flex flex-wrap items-center justify-center sm:justify-between lg:flex-nowrap">
          <div className="mt-10 lg:mt-0 lg:grow lg:basis-0">
            <img
              src={logoImage}
              height={51}
              alt=""
              width={176}
            />
          </div>

          <div className="hidden sm:mt-10 sm:flex lg:mt-0 lg:grow lg:basis-0 lg:justify-end">
            <Button href="/register">Get your tickets</Button>
          </div>
        </Container>
      </header>
        </>
    )
}