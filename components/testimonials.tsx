"use client";

import { Star } from "lucide-react";
import { useDict } from "@/lib/i18n/context";
import { testimonials as testimonialsDict } from "@/lib/i18n/dictionaries/testimonials";

const breakdown = [
  { score: "5.0", count: 82 },
  { score: "4.0", count: 14 },
];

const totalReviews = breakdown.reduce((sum, row) => sum + row.count, 0);
const maxCount = Math.max(...breakdown.map((row) => row.count));

function Stars({
  rating,
  size = 14,
  className = "",
}: {
  rating: number;
  size?: number;
  className?: string;
}) {
  const filled = Math.floor(rating);
  return (
    <div className={`flex items-center gap-0.5 text-gold-dark ${className}`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          fill={i < filled ? "currentColor" : "none"}
          size={size}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}

export function Testimonials() {
  const t = useDict(testimonialsDict);
  return (
    <section
      className="bg-white px-5 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-24"
      id="testimonials"
    >
      <div className="mx-auto max-w-4xl">
        <p className="mb-5 flex items-center gap-3 font-semibold text-gold-dark text-xs uppercase tracking-[0.28em]">
          <span className="h-px w-8 bg-gold-dark" />
          {t.eyebrow}
        </p>
        <h2 className="max-w-xl font-serif font-medium text-4xl leading-[1.12] tracking-tight sm:text-5xl">
          {t.headingBefore} <span className=" text-gold-dark">{t.headingHighlight}</span>
          .
        </h2>

        <div className="mt-14 border border-ink/10 bg-sand/25 p-6 sm:p-8">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:gap-10">
            <div className="shrink-0 pr-4">
              <p className="font-sans font-bold text-6xl text-ink leading-none">
                4.9
              </p>
              <Stars className="mt-2.5" rating={4.9} size={18} />
              <p className="mt-2.5 text-[13px] text-ink/55">
                {totalReviews} {t.reviewsLabel}
              </p>
            </div>
            <div className="hidden h-16 w-px bg-ink/10 sm:block" />
            <div className="flex-1 space-y-2.5 sm:pl-2">
              {breakdown.map(({ score, count }) => (
                <div className="flex items-center gap-4" key={score}>
                  <div className="h-1.5 flex-1 bg-ink/10">
                    <div
                      className="h-full bg-gold-dark"
                      style={{ width: `${(count / maxCount) * 100}%` }}
                    />
                  </div>
                  <span className="w-8 shrink-0 font-semibold text-ink text-sm">
                    {score}
                  </span>
                  <span className="w-16 shrink-0 text-[13px] text-ink/55">
                    {count} {t.reviewsLabel}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3 border-ink/10 border-t pt-6">
            {t.categories.map(({ score, label }) => (
              <div
                className="flex items-center gap-2 border border-ink/15 bg-white px-4 py-2 text-sm transition-colors duration-300 hover:border-gold-dark/40"
                key={label}
              >
                <span className="font-semibold text-gold-dark">{score}</span>
                <span className="text-ink/70">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 divide-y divide-ink/10 border-ink/10 border-t">
          {t.items.map(
            ({ name, initials, timeAgo, rating, text, photos, reply }) => (
              <div
                className="-mx-4 flex flex-col gap-4 px-4 py-8 transition-colors duration-300 hover:bg-sand/15 sm:flex-row sm:gap-6"
                key={name}
              >
                <div className="flex items-center gap-3 sm:w-48 sm:shrink-0 sm:flex-col sm:items-start">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-sand text-gold-dark font-serif font-semibold text-sm">
                    {initials}
                  </span>
                  <div className="sm:mt-1">
                    <p className="font-semibold text-ink text-sm">{name}</p>
                    <p className="mt-0.5 flex items-center gap-1.5 text-[12px] text-ink/45">
                      <span className="inline-block size-1 rotate-45 bg-gold-dark/60" />
                      {t.verifiedOwner} · {timeAgo}
                    </p>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="font-semibold text-ink text-sm">
                      {rating.toFixed(1)}
                    </span>
                    <Stars rating={rating} />
                  </div>
                  <p className="text-[15px] text-ink/75 leading-relaxed">
                    {text}
                  </p>
                  {photos ? (
                    <div className="mt-4 flex gap-2">
                      {Array.from({ length: photos }, (_, i) => (
                        <div
                          className="flex size-16 items-center justify-center border border-ink/15 border-dashed bg-sand/40 text-[9px] text-ink/35 uppercase tracking-wide"
                          key={i}
                        >
                          {t.photoLabel}
                        </div>
                      ))}
                    </div>
                  ) : null}
                  {reply ? (
                    <div className="mt-4 border-gold-dark/40 border-l-2 pl-4">
                      <p className="font-semibold text-[12px] text-gold-dark uppercase tracking-wide">
                        {t.repliedLabel}
                      </p>
                      <p className="mt-1 text-[13px] text-ink/60 leading-relaxed">
                        {reply}
                      </p>
                    </div>
                  ) : null}
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
