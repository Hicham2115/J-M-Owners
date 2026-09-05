import { Search } from "lucide-react";
import Image from "next/image";

const stats = [
  { value: "06", label: "Homes we look after" },
  { value: "4.9", label: "How owners rate us" },
  { value: "5", label: "Neighbourhoods we know well" },
];

const searchFields = [
  { label: "Location", value: "Where are you going?" },
  { label: "Dates", value: "Check-in — Check-out" },
  { label: "Guests", value: "2 adults" },
];

export function CollectionsHero() {
  return (
    <section className="relative bg-navy px-5 pt-36 pb-28 text-white sm:px-8 sm:pt-40 sm:pb-32 lg:px-12">
      <Image
        alt=""
        className="object-cover"
        fill
        priority
        sizes="100vw"
        src="/images/hero.png"
      />
      <div className="absolute inset-0 bg-linear-to-b from-navy/80 via-navy/75 to-navy" />
      <div className="motif-zellige absolute inset-0 opacity-[0.08]" />

      <div className="relative mx-auto max-w-2xl text-center">
        <p className="mb-5 flex items-center justify-center gap-3 font-semibold text-gold text-xs uppercase tracking-[0.28em]">
          <span className="h-px w-8 bg-gold" />
          The collection
          <span className="h-px w-8 bg-gold" />
        </p>
        <h1 className="font-serif font-medium text-4xl leading-[1.12] tracking-tight sm:text-6xl">
          Addresses we would happily{" "}
          <span className="text-gold italic">stay in ourselves.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-md text-[15px] text-white/70 leading-relaxed">
          We choose these homes the way we'd choose our own — then look after
          them, and the people who trust us with them, every single day.
        </p>

        {/* <div className="mx-auto mt-12 flex max-w-xl flex-wrap items-start justify-center gap-x-10 gap-y-6 border-white/15 border-t pt-8">
          {stats.map((stat) => (
            <div className="text-center" key={stat.label}>
              <span className="font-serif text-2xl text-gold sm:text-3xl">{stat.value}</span>
              <span className="mt-1 block text-[11px] text-white/60 uppercase tracking-[0.14em]">
                {stat.label}
              </span>
            </div>
          ))}
        </div> */}
      </div>

      <div className="-bottom-14 -translate-x-1/2 absolute left-1/2 w-[calc(100%-2.5rem)] max-w-4xl sm:w-[calc(100%-4rem)]">
        <div className="grid grid-cols-1 divide-y divide-ink/10 border border-ink/10 bg-white text-ink shadow-2xl sm:grid-cols-[1fr_1fr_1fr_auto] sm:divide-x sm:divide-y-0">
          {searchFields.map(({ label, value }) => (
            <div className="px-6 py-3" key={label}>
              <span className="block font-semibold text-[11px] text-ink/45 uppercase tracking-[0.14em]">
                {label}
              </span>
              <span className="mt-1 block text-[15px] text-ink/40">
                {value}
              </span>
            </div>
          ))}
          <button
            aria-label="Search"
            className="flex items-center justify-center bg-linear-to-br from-gold to-gold-dark px-6 py-2.5 text-navy transition-opacity hover:opacity-90 sm:px-6 sm:py-3"
            type="button"
          >
            <Search size={16} strokeWidth={2} />
          </button>
        </div>
      </div>
    </section>
  );
}
