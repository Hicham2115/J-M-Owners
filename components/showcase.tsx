"use client";

import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { properties } from "@/components/collections/properties-data";
import { useDict } from "@/lib/i18n/context";
import { showcase } from "@/lib/i18n/dictionaries/showcase";

export function Showcase() {
  const t = useDict(showcase);
  const trackRef = useRef<HTMLDivElement>(null);

  function scrollBy(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector("a");
    const step = card ? card.clientWidth + 24 : 360;
    track.scrollBy({ left: direction * step, behavior: "smooth" });
  }

  return (
    <section className="mb-20 relative overflow-hidden bg-navy py-14 text-white sm:py-20 lg:py-24">
      <div className="motif-zellige absolute inset-0 opacity-[0.05]" />

      <div className="relative mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-6 px-5 sm:px-8 lg:px-12">
        <div>
          <p className="mb-5 flex items-center gap-3 font-semibold text-gold text-xs uppercase tracking-[0.28em]">
            <span className="h-px w-8 bg-gold" />
            {t.eyebrow}
          </p>
          <h2 className="max-w-lg font-serif font-medium text-4xl leading-[1.12] tracking-tight sm:text-5xl">
            {t.headingBefore}{" "}
            <span className=" text-gold">{t.headingHighlight}</span>.
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <button
            aria-label={t.prevAriaLabel}
            className="grid size-11 place-items-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-gold hover:text-gold"
            onClick={() => scrollBy(-1)}
            type="button"
          >
            <ArrowLeft size={18} strokeWidth={1.5} />
          </button>
          <button
            aria-label={t.nextAriaLabel}
            className="grid size-11 place-items-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-gold hover:text-gold"
            onClick={() => scrollBy(1)}
            type="button"
          >
            <ArrowRight size={18} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <div
        className="relative mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-4 sm:px-8 lg:px-12 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        ref={trackRef}
      >
        <div className="shrink-0 sm:w-[calc((100vw-max(2.5rem,calc((100vw-72rem)/2))-72rem)/2)]" />
        {properties.map((property) => (
          <Link
            className="group relative aspect-[3/4] w-72 shrink-0 snap-start overflow-hidden sm:w-84"
            href={`/collection/${property.slug}`}
            key={property.slug}
          >
            <Image
              alt={property.name}
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
              fill
              sizes="(min-width: 640px) 336px, 288px"
              src={property.image ?? property.images[0]}
            />
            <div className="absolute inset-0 bg-linear-to-t from-navy via-navy/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <p className="flex items-center gap-1.5 text-[11px] text-gold uppercase tracking-[0.16em]">
                <MapPin size={12} strokeWidth={1.5} />
                {property.location}
              </p>
              <h3 className="mt-2 font-serif font-medium text-xl tracking-tight">
                {property.name}
              </h3>
            </div>
            <span className="absolute top-4 right-4 h-px w-8 origin-right scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100" />
          </Link>
        ))}
        <div className="shrink-0 sm:w-[calc((100vw-max(2.5rem,calc((100vw-72rem)/2))-72rem)/2)]" />
      </div>

      {/* <div className="relative mt-10 text-center">
        <Link
          className="inline-flex items-center gap-2 border border-gold/40 px-8 py-3.5 font-bold text-gold text-xs uppercase tracking-wide transition-colors hover:border-gold hover:bg-gold hover:text-navy"
          href="/collection"
        >
          View the full collection
        </Link>
      </div> */}
    </section>
  );
}
