import { Search } from "lucide-react";

const searchFields = [
  { label: "Location", value: "Where are you going?" },
  { label: "Dates", value: "Check-in — Check-out" },
  { label: "Guests", value: "2 adults" },
];

export function CollectionsHero() {
  return (
    <section className="relative overflow-hidden bg-navy px-5 pt-16 pb-24 text-white sm:px-8 lg:px-12">
      <div className="motif-zellige absolute inset-0 opacity-[0.06]" />
      <div className="relative mx-auto max-w-3xl text-center">
        <p className="mb-4 flex items-center justify-center gap-3 font-semibold text-gold text-xs uppercase tracking-[0.28em]">
          <span className="h-px w-8 bg-gold" />
          Our collection
          <span className="h-px w-8 bg-gold" />
        </p>
        <h1 className="font-serif font-medium text-4xl leading-[1.15] tracking-tight sm:text-5xl">
          Exceptional villas, apartments and <span className="text-gold italic">riads</span> in Marrakech.
        </h1>
      </div>

      <div className="-bottom-14 -translate-x-1/2 absolute left-1/2 w-[calc(100%-2.5rem)] max-w-4xl sm:w-[calc(100%-4rem)]">
        <div className="grid grid-cols-1 divide-y divide-ink/10 border border-ink/10 bg-white text-ink shadow-xl sm:grid-cols-[1fr_1fr_1fr_auto] sm:divide-x sm:divide-y-0">
          {searchFields.map(({ label, value }) => (
            <div className="px-6 py-4" key={label}>
              <span className="block font-semibold text-[11px] text-ink/45 uppercase tracking-[0.14em]">{label}</span>
              <span className="mt-1 block text-[15px] text-ink/40">{value}</span>
            </div>
          ))}
          <button
            aria-label="Search"
            className="flex items-center justify-center bg-linear-to-br from-gold to-gold-dark px-8 py-4 text-navy transition-opacity hover:opacity-90 sm:px-10"
            type="button"
          >
            <Search size={20} strokeWidth={2} />
          </button>
        </div>
      </div>
    </section>
  );
}
