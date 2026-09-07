"use client";

import { CalendarX, MapPinOff, TrendingDown } from "lucide-react";
import { useDict } from "@/lib/i18n/context";
import { trackRecord } from "@/lib/i18n/dictionaries/trackRecord";

const lineItemIcons = [CalendarX, MapPinOff, TrendingDown];

export function TrackRecord() {
  const t = useDict(trackRecord);
  return (
    <section
      className="relative overflow-hidden bg-navy px-5 py-14 text-white sm:px-8 sm:py-20 lg:px-12 lg:py-24"
      id="about"
    >
      <div className="motif-zellige absolute inset-0 opacity-[0.06]" />
      <div className="relative mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-20">
        <div>
          <p className="mb-5 flex items-center gap-3 font-semibold text-gold text-xs uppercase tracking-[0.28em]">
            <span className="h-px w-8 bg-gold" />
            {t.eyebrow}
          </p>
          <h2 className="font-serif font-medium text-4xl leading-[1.12] tracking-tight sm:text-5xl">
            {t.titlePrefix}{" "}
            <span className=" text-gold">{t.titleHighlight}</span>.
          </h2>

          <div className="relative mt-12 inline-flex -rotate-2 flex-col items-center gap-1 border border-gold/50 px-8 py-6">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-navy px-3 font-semibold text-gold text-[10px] uppercase tracking-[0.2em]">
              {t.badgeLabel}
            </span>
            <strong className="font-serif text-6xl text-gold leading-none sm:text-7xl">
              {t.statValue}
            </strong>
            <span className="text-[11px] text-white/60 uppercase tracking-[0.18em]">
              {t.statCaption}
            </span>
          </div>
        </div>

        {/* Right: ledger of what that actually costs */}
        <div className="border border-white/15">
          <div className="flex items-center justify-between border-white/15 border-b px-6 py-4">
            <span className="font-serif text-sm italic text-white/50">
              {t.ledgerTitle}
            </span>
            <span className="font-semibold text-[11px] text-gold uppercase tracking-[0.2em]">
              {t.ledgerBadge}
            </span>
          </div>

          {t.items.map(({ title, description, cost }, index) => {
            const Icon = lineItemIcons[index];
            return (
              <div
                className={`flex items-start gap-4 px-6 py-6 ${
                  index !== t.items.length - 1
                    ? "border-white/10 border-b border-dashed"
                    : ""
                }`}
                key={title}
              >
                <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full border border-gold/40 text-gold">
                  <Icon size={16} strokeWidth={1.5} />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className=" font-semibold text-base ">{title}</h3>
                  <p className="mt-1 text-[13px] text-white/80 leading-relaxed">
                    {description}
                  </p>
                </div>
                <span className="shrink-0 whitespace-nowrap pt-1 font-mono text-[12px] text-gold">
                  {cost}
                </span>
              </div>
            );
          })}

          {/* <div className="flex items-center justify-between bg-gold/10 px-6 py-5">
            <span className="font-serif font-semibold text-sm text-white">
              None of this is inevitable.
            </span>
            <span className="font-semibold text-[11px] text-gold uppercase tracking-[0.2em]">
              See how ↓
            </span>
          </div> */}
        </div>
      </div>
    </section>
  );
}
