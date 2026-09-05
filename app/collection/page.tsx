import SiteHeader from "@/components/navbar";
import { CollectionsHero } from "@/components/collections/hero";
import { PropertyBrowser } from "@/components/collections/property-browser";
import { Footer } from "@/components/footer";

export default function CollectionsPage() {
  return (
    <main>
      <SiteHeader />
      <CollectionsHero />
      <PropertyBrowser />

      <section className="mb-20 relative overflow-hidden bg-navy px-5 py-20 text-center text-white sm:px-8">
        <div className="motif-zellige absolute inset-0 opacity-[0.06]" />
        <div className="relative mx-auto max-w-xl">
          <p className="mb-4 flex items-center justify-center gap-3 font-semibold text-gold text-xs uppercase tracking-[0.28em]">
            <span className="h-px w-8 bg-gold" />
            By appointment
            <span className="h-px w-8 bg-gold" />
          </p>
          <h2 className="font-serif font-medium text-3xl leading-tight tracking-tight sm:text-4xl">
            Considering us for your own property?
          </h2>
          <p className="mt-3 text-[15px] text-white/70">
            This is the standard of care every owner in our portfolio receives.
          </p>
          <a
            className="mt-8 inline-flex bg-linear-to-br from-gold to-gold-dark px-8 py-3.5 font-bold text-navy text-xs uppercase tracking-wide transition-opacity hover:opacity-90"
            href="/#estimate"
          >
            Request a free estimate
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
