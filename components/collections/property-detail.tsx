import {
  ArrowLeft,
  Bed,
  Car,
  ChefHat,
  Heart,
  MapPin,
  Snowflake,
  Star,
  Tv,
  Waves,
  Wifi,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BookingCard } from "./booking-card";
import type { Property } from "./properties-data";

const amenityIcons = {
  wifi: Wifi,
  ac: Snowflake,
  pool: Waves,
  parking: Car,
  kitchen: ChefHat,
  tv: Tv,
  laundry: Waves,
} as const;

export function PropertyDetail({ property }: { property: Property }) {
  return (
    <div className="bg-sand/20">
      <div className="px-5 pt-28 pb-4 sm:px-8 sm:pt-32 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Link
            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-medium text-ink/70 text-sm shadow-sm transition-colors hover:text-gold-dark"
            href="/collection"
          >
            <ArrowLeft size={16} strokeWidth={1.5} />
            Back
          </Link>
        </div>
      </div>

      <div className="px-5 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-2 sm:grid-cols-4 sm:grid-rows-2">
          {property.images.map((image, index) => (
            <div
              className={`relative aspect-square overflow-hidden ${
                index === 0 ? "col-span-2 row-span-2 aspect-square sm:aspect-auto" : ""
              }`}
              key={index}
            >
              <Image
                alt={`${property.name} — photo ${index + 1}`}
                className="object-cover"
                fill
                sizes="(min-width: 1024px) 45vw, 50vw"
                src={image}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="px-5 py-10 sm:px-8 sm:py-14 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-start justify-between gap-4 border-ink/10 border-b pb-6">
            <div>
              <h1 className="font-serif font-medium text-3xl tracking-tight sm:text-4xl">
                {property.name}
              </h1>
              <p className="mt-2 flex items-center gap-1.5 text-[14px] text-ink/55">
                <MapPin size={14} strokeWidth={1.5} />
                {property.location}, Marrakech
                <span className="mx-1 text-ink/25">·</span>
                <Bed size={14} strokeWidth={1.5} />
                {property.beds} bedrooms
              </p>
            </div>
            <span className="flex items-center gap-1.5 text-ink text-sm">
              <Star className="text-gold-dark" fill="currentColor" size={16} />
              {property.rating.toFixed(1)}
            </span>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-14 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <section>
                <h2 className="flex items-center gap-3 font-serif font-semibold text-xl tracking-tight">
                  <span className="h-5 w-1 bg-gold-dark" />
                  Description
                </h2>
                <div className="mt-4 space-y-4 text-[15px] text-ink/70 leading-relaxed">
                  {property.descriptionLong.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </section>

              <section className="mt-12">
                <h2 className="flex items-center gap-3 font-serif font-semibold text-xl tracking-tight">
                  <span className="h-5 w-1 bg-gold-dark" />
                  Amenities
                </h2>
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {property.amenities.map(({ key, label }) => {
                    const Icon = amenityIcons[key];
                    return (
                      <div
                        className="flex items-center gap-3 border border-ink/10 bg-white px-4 py-3.5"
                        key={key}
                      >
                        <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-sand/60 text-gold-dark">
                          <Icon size={17} strokeWidth={1.5} />
                        </span>
                        <span className="font-medium text-ink text-sm">{label}</span>
                      </div>
                    );
                  })}
                </div>
              </section>

              <section className="mt-12">
                <h2 className="flex items-center gap-3 font-serif font-semibold text-xl tracking-tight">
                  <span className="h-5 w-1 bg-gold-dark" />
                  Included services
                </h2>
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {property.includedServices.map((service) => (
                    <div
                      className="flex items-center gap-3 rounded-lg bg-gold-dark/8 px-4 py-3"
                      key={service}
                    >
                      <span className="grid size-7 shrink-0 place-items-center rounded-full bg-white text-gold-dark">
                        <Heart size={14} strokeWidth={1.5} />
                      </span>
                      <span className="text-ink/80 text-sm">{service}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <div className="lg:sticky lg:top-28 lg:self-start">
              <BookingCard name={property.name} pricing={property.pricing} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
