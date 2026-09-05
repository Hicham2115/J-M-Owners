import { ClipboardList, House, LineChart, Users } from "lucide-react";

const steps = [
  {
    icon: House,
    title: "Property Assessment",
    description: "We analyze your property, its potential and your goals.",
  },
  {
    icon: ClipboardList,
    title: "Preparation and Onboarding",
    description:
      "We prepare your property, create listings and set the right pricing strategy.",
  },
  {
    icon: Users,
    title: "Professional Management",
    description:
      "We handle bookings, guests, maintenance and everything in between.",
  },
  {
    icon: LineChart,
    title: "Revenue and Reporting",
    description:
      "You receive reports, payouts and full transparency on your performance.",
  },
];

export function HowItWorks() {
  return (
    <section
      className="relative overflow-hidden bg-navy px-5 py-14 text-white sm:px-8 sm:py-20 lg:px-12 lg:py-24"
      id="how-it-works"
    >
      <div className="motif-zellige absolute inset-0 opacity-[0.06]" />
      <div className="relative mx-auto grid max-w-6xl gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <p className="mb-5 flex items-center gap-3 font-semibold text-gold text-xs uppercase tracking-[0.28em]">
            <span className="h-px w-8 bg-gold" />
            How it works
          </p>
          <h2 className="font-serif font-medium text-4xl tracking-tight sm:text-5xl">
            A simple process.
            <br />
            <span className="text-gold italic">Outstanding results.</span>
          </h2>
          <p className="mt-6 max-w-sm text-[15px] text-white/60 leading-relaxed">
            From first contact to your first payout, here&rsquo;s exactly what
            to expect when you work with us.
          </p>
        </div>

        <div className="relative">
          <div className="absolute top-2 bottom-2 left-7 w-px bg-linear-to-b from-gold/40 via-gold/15 to-transparent" />
          <div className="flex flex-col gap-12">
            {steps.map(({ icon: Icon, title, description }, index) => (
              <div className="group relative flex gap-6" key={title}>
                <span className="relative z-10 flex size-14 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-navy text-gold transition-all duration-300 group-hover:border-gold group-hover:bg-gold group-hover:text-navy group-hover:shadow-lg group-hover:shadow-gold/20">
                  <Icon size={22} strokeWidth={1.5} />
                </span>
                <div className="pt-1">
                  <span className="font-serif font-semibold text-gold text-xs uppercase tracking-[0.2em] transition-colors duration-300 group-hover:text-gold">
                    Step {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-1.5 font-serif font-semibold text-xl tracking-tight transition-colors duration-300 group-hover:text-gold">
                    {title}
                  </h3>
                  <p className="mt-2 max-w-md text-sm text-white/60 leading-relaxed">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
