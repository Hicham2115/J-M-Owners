"use client";

import {
  Bed,
  Heart,
  MapPin,
  SlidersHorizontal,
  Star,
  Waves,
} from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { properties, type PropertyType } from "./properties-data";

const typeFilters: Array<PropertyType | "All"> = [
  "All",
  "Villa",
  "Apartment",
  "Riad",
];

function initialsOf(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("");
}

export function PropertyBrowser() {
  const [activeType, setActiveType] =
    useState<(typeof typeFilters)[number]>("All");
  const [poolOnly, setPoolOnly] = useState(false);
  const [minBeds, setMinBeds] = useState(false);

  const filtered = useMemo(() => {
    return properties.filter((property) => {
      if (activeType !== "All" && property.type !== activeType) return false;
      if (poolOnly && !property.pool) return false;
      if (minBeds && property.beds < 3) return false;
      return true;
    });
  }, [activeType, poolOnly, minBeds]);

  return (
    <section className="bg-white px-5 pt-24 pb-20 sm:px-8 sm:pb-28 lg:px-12 lg:pb-32">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-ink/10 border-b">
          <div className="flex flex-wrap gap-x-7">
            {typeFilters.map((type) => {
              const active = activeType === type;
              return (
                <button
                  className={`group relative pb-4 font-medium text-sm transition-colors ${
                    active ? "text-ink" : "text-ink/45 hover:text-ink"
                  }`}
                  key={type}
                  onClick={() => setActiveType(type)}
                  type="button"
                >
                  {type}
                  <span
                    className={`absolute inset-x-0 bottom-0 h-px origin-center bg-gold-dark transition-transform duration-300 ease-out ${
                      active
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-5 pb-4 text-[13px]">
            <button
              className={`flex items-center gap-1.5 transition-colors ${
                poolOnly ? "text-gold-dark" : "text-ink/45 hover:text-ink"
              }`}
              onClick={() => setPoolOnly((v) => !v)}
              type="button"
            >
              <Waves size={14} strokeWidth={1.5} />
              Pool
            </button>
            <button
              className={`flex items-center gap-1.5 transition-colors ${
                minBeds ? "text-gold-dark" : "text-ink/45 hover:text-ink"
              }`}
              onClick={() => setMinBeds((v) => !v)}
              type="button"
            >
              <Bed size={14} strokeWidth={1.5} />
              3+ beds
            </button>
            <button
              className="hidden items-center gap-1.5 text-ink/45 transition-colors hover:text-ink sm:flex"
              type="button"
            >
              <SlidersHorizontal size={14} strokeWidth={1.5} />
              Filters
            </button>
          </div>
        </div>

        <div className="mt-7 flex items-center justify-between">
          <p className="text-ink/60 text-sm">
            <span className="font-serif text-ink">{filtered.length}</span>{" "}
            {filtered.length === 1 ? "property" : "properties"} in the
            collection
          </p>
          <p className="hidden items-center gap-1.5 text-ink/45 text-xs sm:flex">
            <Star className="text-gold-dark" fill="currentColor" size={13} />
            Sorted by relevance
          </p>
        </div>

        {filtered.length === 0 ? (
          <p className="mt-16 text-center text-ink/50 text-sm">
            No properties match these filters yet.
          </p>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((property) => (
              <div className="group" key={property.name}>
                <div className="relative aspect-4/3 overflow-hidden bg-navy">
                  {property.image ? (
                    <Image
                      alt={property.name}
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      src={property.image}
                    />
                  ) : (
                    <>
                      <div className="motif-zellige absolute inset-0 opacity-[0.18]" />
                      <div className="relative flex h-full items-center justify-center">
                        <span className="font-serif text-3xl text-gold italic">
                          {initialsOf(property.name)}
                        </span>
                      </div>
                    </>
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-navy/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  {property.top && (
                    <span className="absolute top-3 left-3 bg-gold-dark px-3 py-1 font-semibold text-[10px] text-white uppercase tracking-wide">
                      Top rated
                    </span>
                  )}
                  <span className="absolute top-3 right-3 grid size-8 place-items-center rounded-full bg-white/90 text-ink/60 transition-colors hover:text-gold-dark">
                    <Heart size={15} strokeWidth={1.5} />
                  </span>
                </div>
                <div className="mt-4 flex items-start justify-between gap-3">
                  <h3 className="font-serif font-semibold text-ink text-lg tracking-tight">
                    {property.name}
                  </h3>
                  <span className="flex shrink-0 items-center gap-1 text-ink text-sm">
                    <Star
                      className="text-gold-dark"
                      fill="currentColor"
                      size={14}
                    />
                    {property.rating.toFixed(1)}
                  </span>
                </div>
                <p className="mt-1 flex items-center gap-1.5 text-[13px] text-ink/50">
                  <MapPin size={13} strokeWidth={1.5} />
                  {property.location}
                </p>
                <p className="mt-2 text-[13px] text-ink/60 leading-relaxed">
                  {property.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
