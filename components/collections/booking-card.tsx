"use client";

import { CalendarDays, MessageCircle, Minus, Plus } from "lucide-react";
import { useState } from "react";
import type { Pricing } from "./properties-data";

const WHATSAPP_NUMBER = "212600000000";

function formatEuro(value: number) {
  return `${value} €`;
}

export function BookingCard({
  name,
  pricing,
}: {
  name: string;
  pricing: Pricing;
}) {
  const [guests, setGuests] = useState(2);

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hi, I'm interested in ${name} on J&M Housing. Could you give me more information on availability?`,
  )}`;

  return (
    <div className="overflow-hidden border border-ink/10 shadow-xl">
      <div className="bg-navy px-6 py-6 text-center text-white">
        <span className="text-[13px] text-white/60">From</span>
        <p className="mt-1 font-serif text-4xl">
          {formatEuro(pricing.low)}
          <span className="text-base text-white/50"> / night</span>
        </p>
      </div>

      <div className="grid grid-cols-2 divide-x divide-ink/10 border-ink/10 border-b">
        <div className="px-4 py-3">
          <span className="block font-semibold text-[10px] text-ink/45 uppercase tracking-[0.14em]">
            Check-in
          </span>
          <span className="mt-1 block text-ink/40 text-sm">—</span>
        </div>
        <div className="px-4 py-3">
          <span className="block font-semibold text-[10px] text-ink/45 uppercase tracking-[0.14em]">
            Check-out
          </span>
          <span className="mt-1 block text-ink/40 text-sm">—</span>
        </div>
      </div>

      <div className="flex items-center justify-between border-ink/10 border-b px-4 py-3">
        <div>
          <span className="block font-semibold text-[10px] text-ink/45 uppercase tracking-[0.14em]">
            Guests
          </span>
          <span className="mt-1 block text-ink text-sm">
            {guests} {guests > 1 ? "guests" : "guest"}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            aria-label="Remove a guest"
            className="grid size-9 place-items-center rounded-full border border-ink/20 text-ink/60 transition-colors hover:border-gold-dark hover:text-gold-dark disabled:opacity-30"
            disabled={guests <= 1}
            onClick={() => setGuests((g) => Math.max(1, g - 1))}
            type="button"
          >
            <Minus size={14} />
          </button>
          <span className="w-4 text-center text-sm">{guests}</span>
          <button
            aria-label="Add a guest"
            className="grid size-9 place-items-center rounded-full border border-ink/20 text-ink/60 transition-colors hover:border-gold-dark hover:text-gold-dark"
            onClick={() => setGuests((g) => Math.min(12, g + 1))}
            type="button"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>

      <div className="space-y-2.5 px-6 py-5 text-sm">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-ink/60">
            <span className="size-1.5 rounded-full bg-emerald-500/70" />
            Low season
          </span>
          <span className="text-ink">{formatEuro(pricing.low)}/night</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-ink/60">
            <span className="size-1.5 rounded-full bg-gold-dark/70" />
            High season
          </span>
          <span className="text-ink">{formatEuro(pricing.high)}/night</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-ink/60">
            <span className="size-1.5 rounded-full bg-orange-700/70" />
            Peak season
          </span>
          <span className="text-ink">{formatEuro(pricing.peak)}/night</span>
        </div>
      </div>

      <div className="border-gold-dark/30 border-t border-dashed px-6 pt-5 pb-6">
        <a
          className="flex h-auto w-full items-center justify-center gap-2 bg-linear-to-br from-gold to-gold-dark px-6 py-3.5 font-bold text-navy text-xs uppercase tracking-wide transition-opacity hover:opacity-90"
          href={whatsappHref}
          rel="noreferrer"
          target="_blank"
        >
          <MessageCircle size={16} strokeWidth={2} />
          Book via WhatsApp
        </a>
        <a
          className="mt-3 flex items-center justify-center gap-1.5 text-[13px] text-ink/60 transition-colors hover:text-gold-dark"
          href="#"
        >
          <CalendarDays size={14} strokeWidth={1.5} />
          Choose your dates
        </a>
        <a
          className="mt-4 flex h-auto w-full items-center justify-center border border-ink/20 px-6 py-3 font-semibold text-ink text-xs uppercase tracking-wide transition-colors hover:border-gold-dark hover:text-gold-dark"
          href="/#estimate"
        >
          Request information
        </a>
      </div>
    </div>
  );
}
