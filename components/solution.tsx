import { Heart, House, ImageIcon, TrendingUp } from "lucide-react";

const outcomes = [
  { icon: TrendingUp, title: "More bookings", description: "Higher occupancy optimized by our pricing and visibility strategies." },
  { icon: Heart, title: "Happier guests", description: "5-star experiences that generate better reviews and repeat bookings." },
  { icon: House, title: "Well-maintained properties", description: "Preserved value and long-term peace of mind." },
];

export function Solution() {
  return (
    <section className="bg-white px-5 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        <div>
          <p className="mb-5 flex items-center gap-3 font-semibold text-gold-dark text-xs uppercase tracking-[0.28em]"><span className="h-px w-8 bg-gold-dark" />The J&amp;M Housing solution</p>
          <h2 className="max-w-lg font-serif font-medium text-4xl leading-[1.12] tracking-tight sm:text-5xl">One partner. <span className="italic text-gold-dark">Everything managed.</span></h2>
          <p className="mt-6 max-w-md text-[15px] text-ink/70 leading-relaxed sm:text-base">We manage your property from A to Z with professionalism, transparency and absolute care.</p>
          <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-3">
            {outcomes.map(({ icon: Icon, title, description }) => (
              <div key={title}>
                <Icon className="text-gold-dark" size={24} strokeWidth={1.5} />
                <h3 className="mt-3 font-serif font-semibold text-base tracking-tight">{title}</h3>
                <p className="mt-2 text-[13px] text-ink/65 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1.4fr_1fr] lg:h-full lg:max-h-100">
          <div className="relative flex aspect-4/5 flex-col items-center justify-center gap-2 overflow-hidden border border-ink/15 border-dashed bg-sand/40 text-ink/30 sm:aspect-auto">
            <ImageIcon size={40} strokeWidth={1.25} />
            <span className="text-[10px] uppercase tracking-[0.18em]">Photo to come</span>
          </div>
          <div className="flex flex-col justify-center gap-4 bg-sand/50 p-8">
            <span className="font-serif font-semibold text-5xl text-gold-dark/40 leading-none">&ldquo;</span>
            <p className="font-serif font-medium text-xl italic leading-snug text-ink">You own the property. We handle everything else.</p>
            <div className="h-px w-8 bg-gold-dark" />
            <p className="text-[13px] text-ink/70">
              <span className="block font-serif font-semibold text-ink not-italic">J&amp;M Housing</span>
              Property Management
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
