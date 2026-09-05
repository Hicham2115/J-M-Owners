import SiteHeader from "@/components/navbar";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { OwnerChallenge } from "@/components/owner-challenge";
import { Solution } from "@/components/solution";
import { Services } from "@/components/services";
import { Testimonials } from "@/components/testimonials";
import { Faq } from "@/components/faq";
import { Footer } from "@/components/footer";
import { Contact } from "@/components/contact";
import { TrackRecord } from "@/components/track-record";
import { Showcase } from "@/components/showcase";
import { Reveal } from "@/components/reveal";

export default function Home() {
  return (
    <main>
      <SiteHeader />
      <Hero />
      <Reveal>
        <OwnerChallenge />
      </Reveal>
      <Reveal>
        <Services />
      </Reveal>
      <Reveal>
        <TrackRecord />
      </Reveal>
      <Reveal>
        <Solution />
      </Reveal>
      <Reveal>
        <HowItWorks />
      </Reveal>
      <Reveal>
        <Testimonials />
      </Reveal>
      <Reveal>
        <Showcase />
      </Reveal>
      <Reveal>
        <Contact />
      </Reveal>
      <Reveal>
        <Faq />
      </Reveal>

      <Footer />
    </main>
  );
}
