const clauses = [
  {
    question: "Can I still use my own property?",
    answer:
      "Yes. Tell us the dates you want to block and we close the calendar around them — no fees, no questions asked.",
  },
  {
    question: "What happens if a guest damages something?",
    answer:
      "Every booking carries a security deposit and damage coverage. We handle the claim — you don't chase a guest over a broken lamp.",
  },
  {
    question: "How and when do I get paid?",
    answer:
      "Net revenue is transferred to you monthly, with a full breakdown of bookings, expenses and occupancy attached.",
  },
  {
    question: "What's your commission, exactly?",
    answer:
      "A single percentage of booking revenue, agreed before you sign. No setup fees, no hidden charges.",
  },
  {
    question: "Can I end the contract if it's not working?",
    answer:
      "Yes, with 30 days' notice at any time. We'd rather earn your trust every month than lock you into it.",
  },
  {
    question: "Who actually has access to my property?",
    answer:
      "Only verified staff, cleared for that specific job. Every entry is logged and available to you on request.",
  },
  {
    question: "Which areas of Marrakech do you cover?",
    answer:
      "Gueliz, Hivernage, the Medina, Palmeraie and the surrounding Marrakech region — our team is based locally and on-site within the hour.",
  },
  {
    question: "Is my property insured while it's listed?",
    answer:
      "Yes. Every stay is covered against damage and liability for the full duration of the booking, at no extra cost to you.",
  },
];

export function Faq() {
  return (
    <section
      className="bg-white px-5 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-24"
      id="faq"
    >
      <div className="mx-auto max-w-5xl">
        <p className="mb-5 flex items-center gap-3 font-semibold text-gold-dark text-xs uppercase tracking-[0.28em]">
          <span className="h-px w-8 bg-gold-dark" />
          Questions owners ask
        </p>
        <h2 className="max-w-xl font-serif font-medium text-4xl leading-[1.12] tracking-tight sm:text-5xl">
          The fine print, in{" "}
          <span className=" text-gold-dark">plain English</span>.
        </h2>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2">
          {clauses.map(({ question, answer }, index) => {
            const lastRowStart = (Math.ceil(clauses.length / 2) - 1) * 2;
            return (
              <div
                className={`border-ink/10 py-7 sm:odd:pr-10 sm:even:pl-10 ${
                  index < lastRowStart ? "border-b" : "border-b sm:border-b-0"
                } ${index % 2 === 0 ? "sm:border-r" : ""}`}
                key={question}
              >
                <span className="font-sans font-semibold text-[13px] text-gold-dark/70 tabular-nums tracking-wide">
                  Clause N&deg;{String(index + 1).padStart(2, "0")}
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
