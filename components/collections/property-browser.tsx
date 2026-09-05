"use client";

import { Bed, Heart, MapPin, SlidersHorizontal, Star, Waves } from "lucide-react";
import { useMemo, useState } from "react";
import { properties, type PropertyType } from "./properties-data";

const typeFilters: Array<PropertyType | "All"> = ["All", "Villa", "Apartment", "Riad"];

export function PropertyBrowser() {
  const [activeType, setActiveType] = useState<(typeof typeFilters)[number]>("All");
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
        <div className="flex flex-wrap items-center gap-3 border-ink/10 border-b pb-6">
          {typeFilters.map((type) => (
            <button
              className={`px-4 py-2 font-medium text-sm transition-colors ${
                activeType === type ? "bg-navy text-white" : "border border-ink/15 text-ink/70 hover:border-ink/30"
              }`}
              key={type}
              onClick={() => setActiveType(type)}
              type="button"
            >
              {type}
            </button>
          ))}

          <span className="hidden h-6 w-px bg-ink/15 sm:block" />

          <button
            className={`flex items-center gap-2 border px-4 py-2 font-medium text-sm transition-colors ${
              poolOnly ? "border-gold-dark bg-gold-dark/10 text-gold-dark" : "border-ink/15 text-ink/70 hover:border-ink/30"
            }`}
            onClick={() => setPoolOnly((v) => !v)}
            type="button"
          >
            <Waves size={16} strokeWidth={1.5} />
            Pool
          </button>
          <button
            className={`flex items-center gap-2 border px-4 py-2 font-medium text-sm transition-colors ${
              minBeds ? "border-gold-dark bg-gold-dark/10 text-gold-dark" : "border-ink/15 text-ink/70 hover:border-ink/30"
            }`}
            onClick={() => setMinBeds((v) => !v)}
            type="button"
          >
            <Bed size={16} strokeWidth={1.5} />
            3+ beds
          </button>

          <button
            className="ml-auto flex items-center gap-2 border border-ink/15 px-4 py-2 font-medium text-ink/70 text-sm transition-colors hover:border-ink/30"
            type="button"
          >
            <SlidersHorizontal size={15} strokeWidth={1.5} />
            Filters
          </button>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <p className="text-ink/70 text-sm">
            <span className="font-semibold text-ink">{filtered.length}</span> {filtered.length === 1 ? "property" : "properties"}
          </p>
          <p className="flex items-center gap-1.5 text-ink/50 text-xs">
            <Star className="text-gold-dark" fill="currentColor" size={13} />
            Sorted by relevance
          </p>
        </div>

        {filtered.length === 0 ? (
          <p className="mt-16 text-center text-ink/50 text-sm">No properties match these filters yet.</p>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((property) => (
              <div key={property.name}>
                <div className="relative aspect-4/3 overflow-hidden border border-ink/10 border-dashed bg-sand/40">
                  <div className="flex h-full items-center justify-center text-[10px] text-ink/30 uppercase tracking-[0.18em]">
                    Photo to come
                  </div>
                  {property.top && (
                    <span className="absolute top-3 left-3 bg-gold-dark px-3 py-1 font-semibold text-[10px] text-white uppercase tracking-wide">
                      Top
                    </span>
                  )}
                  <span className="absolute top-3 right-3 grid size-8 place-items-center rounded-full bg-white/90 text-ink/60">
                    <Heart size={15} strokeWidth={1.5} />
                  </span>
                </div>
                <div className="mt-4 flex items-start justify-between gap-3">
                  <h3 className="font-serif font-semibold text-ink text-lg tracking-tight">{property.name}</h3>
                  <span className="flex shrink-0 items-center gap-1 text-ink text-sm">
                    <Star className="text-gold-dark" fill="currentColor" size={14} />
                    {property.rating.toFixed(1)}
                  </span>
                </div>
                <p className="mt-1 flex items-center gap-1.5 text-[13px] text-ink/50">
                  <MapPin size={13} strokeWidth={1.5} />
                  {property.location}
                </p>
                <p className="mt-2 text-[13px] text-ink/60 leading-relaxed">{property.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
