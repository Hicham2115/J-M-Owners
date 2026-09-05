import { CalendarDays, CirclePlay, House, MapPin, Star } from "lucide-react";

const proof = [
  { icon: House, value: "120+", label: "Properties managed" },
  { icon: CalendarDays, value: "90%+", label: "Average occupancy" },
  { icon: Star, value: "4.9/5", label: "Average guest rating" },
  { icon: MapPin, value: "Marrakech", label: "And surrounding areas" },
];

export function Hero() {
  return (
    <section
      className="relative isolate flex min-h-160 flex-col overflow-hidden bg-navy px-5 pt-36 pb-16 text-white sm:px-8 sm:pt-40 md:pt-44 lg:min-h-200 lg:px-12 lg:pb-20"
      id="home"
    >
      <div
        className="-z-10 absolute inset-0 bg-[url(/images/hero.png)] bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(2,11,22,.94) 0%, rgba(3,12,22,.68) 37%, rgba(3,12,22,.16) 75%), linear-gradient(0deg, rgba(2,12,24,.37), rgba(2,12,24,.12)), url(/images/hero.png)",
        }}
      />
      <div className="max-w-2xl">
        <p className="mb-4 font-bold text-gold text-xs uppercase tracking-[0.2em] sm:text-sm">
          Property management in Morocco
        </p>
        <h1 className="font-serif font-semibold text-5xl leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
          Your Property.
          <br />
          Our Expertise<span className="text-gold">.</span>
        </h1>
        <p className="mt-7 mb-8 max-w-xl text-base leading-relaxed sm:text-lg lg:text-lg">
          We take care of everything: bookings, guests, cleaning, maintenance
          and protection — while maximizing your rental income.
        </p>
        <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
          <a
            className="inline-flex min-h-14 items-center justify-center gap-3 rounded-sm bg-linear-to-br from-gold to-gold-dark px-6 font-bold text-sm uppercase tracking-wide transition-transform hover:-translate-y-0.5"
            href="#estimate"
          >
            <CalendarDays size={20} />
            Estimation Gratuite de Revenus
          </a>
          <a
            className="inline-flex min-h-14 items-center justify-center gap-3 rounded-sm border border-white/60 bg-black/25 px-6 font-bold text-sm uppercase tracking-wide transition-transform hover:-translate-y-0.5"
            href="#how-it-works"
          >
            <CirclePlay size={21} />
            Comment Ça Marche
          </a>
        </div>
      </div>

      {/* <div
        className="relative z-10 mt-16 border border-white/15 bg-navy/70 px-5 py-6 backdrop-blur-md sm:px-7 lg:mt-auto lg:px-8"
        id="results"
      >
        <p className="mb-5 flex items-center justify-center gap-4 text-white/70 text-xs uppercase tracking-[0.32em] sm:gap-6 sm:text-xs">
          <span className="hidden h-px w-10 bg-gold/60 sm:block" />
          Trusted by property owners
          <span className="hidden h-px w-10 bg-gold/60 sm:block" />
        </p>
        <div className="grid grid-cols-1 gap-y-5 sm:grid-cols-2 sm:gap-y-6 lg:grid-cols-4 lg:gap-y-0">
          {proof.map(({ icon: Icon, value, label }, index) => (
            <div
              className="flex items-center gap-3 border-white/15 px-0 lg:border-l lg:px-6 lg:first:border-l-0 lg:first:pl-0 lg:last:pr-0"
              key={value}
              style={index === 0 ? { borderLeftWidth: 0 } : undefined}
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-full border border-gold/40 text-gold">
                <Icon size={15} strokeWidth={1.5} />
              </span>
              <span>
                <strong className="block whitespace-nowrap font-serif text-xl text-white lg:text-2xl">
                  {value}
                </strong>
                <small className="mt-0.5 block whitespace-nowrap text-[9px] text-white/55 uppercase tracking-wider">
                  {label}
                </small>
              </span>
            </div>
          ))}
        </div>
      </div> */}
    </section>
  );
}
