import SiteHeader from "@/components/navbar";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { OwnerChallenge } from "@/components/owner-challenge";
import { Solution } from "@/components/solution";
import { Services } from "@/components/services";
import { Testimonials } from "@/components/testimonials";
import { Faq } from "@/components/faq";
import { Contact } from "@/components/contact";

export default function Home() {
  return (
    <main>
      <SiteHeader />
      <Hero />
      <OwnerChallenge />
      <Solution />
      <Services />
      <HowItWorks />
      <Testimonials />
      <Faq />
      <Contact />
    </main>
  );
}
