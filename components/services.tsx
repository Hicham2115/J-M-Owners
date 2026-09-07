"use client";

import {
  Camera,
  CalendarClock,
  ConciergeBell,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";
import Image from "next/image";
import shootingPhoto from "@/app/assets/services/shooting.jpg";
import airbnbPhoto from "@/app/assets/services/airbnb.jpg";
import hospitalityPhoto from "@/app/assets/services/hospitality.jpg";
import hotelCleanPhoto from "@/app/assets/services/hotel clean.jpg";
import maintenancePhoto from "@/app/assets/services/maitenance hotel.jpg";
import insurancePhoto from "@/app/assets/services/insurance.jpg";
import { useDict } from "@/lib/i18n/context";
import { services } from "@/lib/i18n/dictionaries/services";

const serviceMeta = [
  { icon: Camera, image: shootingPhoto },
  { icon: CalendarClock, image: airbnbPhoto },
  { icon: ConciergeBell, image: hospitalityPhoto },
  { icon: Sparkles, image: hotelCleanPhoto },
  { icon: Wrench, image: maintenancePhoto },
  { icon: ShieldCheck, image: insurancePhoto },
];

export function Services() {
  const t = useDict(services);
  return (
    <section
      className="bg-white px-5 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-24"
      id="services"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-xl text-center">
          <p className="mb-5 flex items-center justify-center gap-3 font-semibold text-gold-dark text-xs uppercase tracking-[0.28em]">
            <span className="h-px w-8 bg-gold-dark" />
            {t.eyebrow}
            <span className="h-px w-8 bg-gold-dark" />
          </p>
          <h2 className="font-serif font-medium text-4xl tracking-tight sm:text-5xl">
            {t.title}
          </h2>
          <p className="mx-auto mt-5 max-w-md text-[15px] text-ink/70 leading-relaxed sm:text-base">
            {t.description}
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {t.items.map(({ title, description }, index) => {
            const { image } = serviceMeta[index];
            return (
            <div
              className="group transition-transform duration-300 hover:-translate-y-1.5"
              key={title}
            >
              <div className="relative aspect-4/3 overflow-hidden transition-shadow duration-300 group-hover:shadow-xl">
                <Image
                  alt={title}
                  className="object-cover"
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                  src={image}
                />
                <div className="absolute inset-0 bg-linear-to-t from-navy/60 via-navy/0 to-transparent" />
                <span className="absolute top-3 left-3 font-serif font-semibold text-sm text-white/80">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {/* <span className="absolute bottom-3 left-3 grid size-9 place-items-center rounded-full bg-white/90 text-gold-dark">
                    <Icon size={17} strokeWidth={1.5} />
                  </span> */}
              </div>
              <h3 className="mt-4 font-serif font-semibold text-xl tracking-tight transition-colors duration-300 group-hover:text-gold-dark">
                {title}
              </h3>
              <p className="mt-3 max-w-xs text-[14px] text-ink/65 leading-relaxed">
                {description}
              </p>
              <span className="mt-4 block h-px w-8 origin-left scale-x-100 bg-ink/15 transition-all duration-300 group-hover:w-12 group-hover:bg-gold-dark" />
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
