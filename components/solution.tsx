"use client";

import Image from "next/image";
import livingRoom from "@/app/assets/1.jpeg";
import diningArea from "@/app/assets/3.jpeg";
import loungeArea from "@/app/assets/4.jpeg";
import mediaWall from "@/app/assets/5.jpeg";
import { useDict } from "@/lib/i18n/context";
import { solution } from "@/lib/i18n/dictionaries/solution";

const galleryImageSrcs = [livingRoom, diningArea, loungeArea, mediaWall];

export function Solution() {
  const t = useDict(solution);
  return (
    <section className="bg-white px-5 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        <div>
          <p className="mb-5 flex items-center gap-3 font-semibold text-gold-dark text-xs uppercase tracking-[0.28em]">
            <span className="h-px w-8 bg-gold-dark" />
            {t.eyebrow}
          </p>
          <h2 className="max-w-lg font-serif font-medium text-4xl leading-[1.12] tracking-tight sm:text-5xl">
            {t.titlePrefix}{" "}
            <span className=" text-gold-dark">{t.titleHighlight}</span>
          </h2>
          <p className="mt-6 max-w-md text-[15px] text-ink/70 leading-relaxed sm:text-base">
            {t.description}
          </p>
          <div className="mt-10 space-y-6">
            {t.items.map(({ title, description }, index) => (
              <div
                className="group flex gap-5 border-ink/10 border-t pt-6 first:border-t-0 first:pt-0"
                key={title}
              >
                <span className="flex items-baseline gap-3">
                  <span className="font-serif text-gold text-sm italic">
                    0{index + 1}
                  </span>
                  {/* <Icon
                    className="shrink-0 text-gold-dark transition-transform duration-300 group-hover:scale-110"
                    size={20}
                    strokeWidth={1.5}
                  /> */}
                </span>
                <div>
                  <h3 className="font-serif font-semibold text-base tracking-tight">
                    {title}
                  </h3>
                  <p className="mt-1.5 max-w-sm text-[13px] text-ink/65 leading-relaxed">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {t.gallery.map(({ alt }, index) => (
            <div className="relative aspect-square overflow-hidden" key={alt}>
              <Image
                alt={alt}
                className="object-cover"
                fill
                sizes="(min-width: 1024px) 25vw, 45vw"
                src={galleryImageSrcs[index]}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
