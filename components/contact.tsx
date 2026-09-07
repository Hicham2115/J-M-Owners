"use client";

import { useForm } from "@tanstack/react-form";
import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSubmitEstimateRequest } from "@/hooks/use-contact-form";
import { useDict } from "@/lib/i18n/context";
import { contact as contactDict } from "@/lib/i18n/dictionaries/contact";
import { contactSchema, type ContactInput } from "@/lib/schemas/contact";

const fieldClass =
  "block w-full border-0 border-white/25 border-b bg-transparent px-0 py-2.5 text-white outline-none placeholder:text-white/35 focus:border-gold";
const labelClass =
  "mb-2 block font-semibold text-[11px] text-gold/70 uppercase tracking-[0.16em]";

function fieldError(errors: unknown[], fallback: string) {
  const first = errors[0];
  if (!first) return null;
  return typeof first === "string"
    ? first
    : ((first as { message?: string })?.message ?? fallback);
}

export function Contact() {
  const t = useDict(contactDict);
  const submitEstimate = useSubmitEstimateRequest();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    } as ContactInput,
    onSubmit: async ({ value }) => {
      await submitEstimate.mutateAsync(value);
      form.reset();
    },
  });

  return (
    <section
      className="relative overflow-hidden bg-navy px-5 py-20 text-white sm:px-8 sm:py-28 lg:px-12 lg:py-32"
      id="estimate"
    >
      <div className="motif-zellige absolute inset-0 opacity-[0.06]" />
      <div className="relative mx-auto grid max-w-6xl gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div>
          <p className="mb-5 flex items-center gap-3 font-semibold text-gold text-xs uppercase tracking-[0.28em]">
            <span className="h-px w-8 bg-gold" />
            {t.eyebrow}
          </p>
          <h2 className="font-serif font-medium text-4xl leading-[1.12] tracking-tight sm:text-5xl">
            {t.headingBefore}{" "}
            <span className=" text-gold">{t.headingHighlight}</span>.
          </h2>
          <p className="mt-6 max-w-sm text-[15px] text-white/60 leading-relaxed">
            {t.intro}
          </p>
          <div className="mt-10 space-y-4 border-white/15 border-t pt-8">
            <a
              className="flex items-center gap-3 text-sm text-white/80 transition-colors hover:text-gold"
              href="tel:+212706089488"
            >
              <Phone className="text-gold" size={16} strokeWidth={1.5} />
              {t.phone}
            </a>
            <a
              className="flex items-center gap-3 text-sm text-white/80 transition-colors hover:text-gold"
              href="mailto:contact@conciergerie-marrakech.com"
            >
              <Mail className="text-gold" size={16} strokeWidth={1.5} />
              {t.email}
            </a>
            <p className="flex items-center gap-3 text-sm text-white/80">
              <MapPin className="text-gold" size={16} strokeWidth={1.5} />
              {t.address}
            </p>
          </div>
        </div>

        <form
          className="space-y-7"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
            <form.Field
              name="name"
              validators={{ onChange: contactSchema.shape.name }}
            >
              {(field) => (
                <div>
                  <label className={labelClass} htmlFor={field.name}>
                    {t.fullNameLabel}
                  </label>
                  <input
                    className={fieldClass}
                    id={field.name}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder={t.fullNamePlaceholder}
                    value={field.state.value}
                  />
                  {fieldError(field.state.meta.errors, t.invalidValue) && (
                    <p className="mt-1.5 text-[12px] text-red-300">
                      {fieldError(field.state.meta.errors, t.invalidValue)}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            <form.Field
              name="email"
              validators={{ onChange: contactSchema.shape.email }}
            >
              {(field) => (
                <div>
                  <label className={labelClass} htmlFor={field.name}>
                    {t.emailLabel}
                  </label>
                  <input
                    className={fieldClass}
                    id={field.name}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder={t.emailPlaceholder}
                    type="email"
                    value={field.state.value}
                  />
                  {fieldError(field.state.meta.errors, t.invalidValue) && (
                    <p className="mt-1.5 text-[12px] text-red-300">
                      {fieldError(field.state.meta.errors, t.invalidValue)}
                    </p>
                  )}
                </div>
              )}
            </form.Field>
          </div>

          <form.Field name="phone">
            {(field) => (
              <div>
                <label className={labelClass} htmlFor={field.name}>
                  {t.phoneLabel}
                </label>
                <input
                  className={fieldClass}
                  id={field.name}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder={t.phonePlaceholder}
                  type="tel"
                  value={field.state.value}
                />
              </div>
            )}
          </form.Field>

          <form.Field
            name="message"
            validators={{ onChange: contactSchema.shape.message }}
          >
            {(field) => (
              <div>
                <label className={labelClass} htmlFor={field.name}>
                  {t.messageLabel}
                </label>
                <textarea
                  className={`${fieldClass} min-h-24 resize-none`}
                  id={field.name}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder={t.messagePlaceholder}
                  value={field.state.value}
                />
                {fieldError(field.state.meta.errors, t.invalidValue) && (
                  <p className="mt-1.5 text-[12px] text-red-300">
                    {fieldError(field.state.meta.errors, t.invalidValue)}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          <form.Subscribe selector={(state) => state.isSubmitting}>
            {(isSubmitting) => (
              <Button
                className="h-auto w-full bg-linear-to-br from-gold to-gold-dark py-3.5 font-bold text-navy text-xs uppercase tracking-wide hover:opacity-90 sm:w-auto sm:px-10"
                disabled={isSubmitting}
                type="submit"
              >
                {isSubmitting ? t.sending : t.sendRequest}
              </Button>
            )}
          </form.Subscribe>
        </form>
      </div>
    </section>
  );
}
