"use client";

import { useDict } from "@/lib/i18n/context";
import { faq as faqDict } from "@/lib/i18n/dictionaries/faq";

export function Faq() {
  const t = useDict(faqDict);
  return (
    <section
      className="bg-white px-5 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-24"
      id="faq"
    >
      <div className="mx-auto max-w-5xl">
        <p className="mb-5 flex items-center gap-3 font-semibold text-gold-dark text-xs uppercase tracking-[0.28em]">
          <span className="h-px w-8 bg-gold-dark" />
          {t.eyebrow}
        </p>
        <h2 className="max-w-xl font-serif font-medium text-4xl leading-[1.12] tracking-tight sm:text-5xl">
          {t.headingBefore}{" "}
          <span className=" text-gold-dark">{t.headingHighlight}</span>.
        </h2>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2">
          {t.items.map(({ question, answer }, index) => {
            const lastRowStart = (Math.ceil(t.items.length / 2) - 1) * 2;
            return (
              <div
                className={`border-ink/10 py-7 sm:odd:pr-10 sm:even:pl-10 ${
                  index < lastRowStart ? "border-b" : "border-b sm:border-b-0"
                } ${index % 2 === 0 ? "sm:border-r" : ""}`}
                key={question}
              >
                <span className="font-sans font-semibold text-[13px] text-gold-dark/70 tabular-nums tracking-wide">
                  {t.clauseLabel}
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-serif font-semibold text-ink text-lg tracking-tight">
                  {question}
                </h3>
                <p className="mt-2 text-[14px] text-ink/65 leading-relaxed">
                  {answer}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
