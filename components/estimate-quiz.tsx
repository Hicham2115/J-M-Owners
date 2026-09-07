"use client";

import {
  ArrowLeft,
  ArrowRight,
  Bed,
  Building2,
  Check,
  CheckCircle2,
  ClipboardList,
  Home as HomeIcon,
  MapPin,
  Send,
  Sparkles,
  Target,
  User,
} from "lucide-react";
import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import logo from "@/app/assets/logo.png";
import { useSubmitEstimateRequest } from "@/hooks/use-contact-form";
import { useDict } from "@/lib/i18n/context";
import { estimateQuiz } from "@/lib/i18n/dictionaries/estimateQuiz";

const TOTAL_STEPS = 8;

const stepIcons: LucideIcon[] = [
  User,
  HomeIcon,
  MapPin,
  Bed,
  Sparkles,
  ClipboardList,
  Target,
  Send,
];

const propertyTypeIcons: Record<string, LucideIcon> = {
  Villa: HomeIcon,
  Apartment: Building2,
  Riad: HomeIcon,
  Duplex: Building2,
};

const bedroomOptions = ["1", "2", "3", "4", "5+"];

interface FormState {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  propertyType: string;
  location: string;
  bedrooms: string;
  amenities: string[];
  status: string;
  goal: string;
  message: string;
}

const initialState: FormState = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  propertyType: "",
  location: "",
  bedrooms: "",
  amenities: [],
  status: "",
  goal: "",
  message: "",
};

function canProceed(step: number, form: FormState) {
  switch (step) {
    case 1:
      return form.firstName.trim() && form.lastName.trim() && form.phone.trim() && form.email.trim();
    case 2:
      return Boolean(form.propertyType);
    case 3:
      return Boolean(form.location);
    case 4:
      return Boolean(form.bedrooms);
    case 5:
      return true;
    case 6:
      return Boolean(form.status);
    case 7:
      return Boolean(form.goal);
    default:
      return true;
  }
}

function buildMessage(form: FormState) {
  const lines = [
    `Property type: ${form.propertyType}`,
    `Location: ${form.location}`,
    `Bedrooms: ${form.bedrooms}`,
    `Amenities: ${form.amenities.length ? form.amenities.join(", ") : "None given"}`,
    `Current status: ${form.status}`,
    `Main goal: ${form.goal}`,
  ];
  if (form.message.trim()) lines.push(`Details: ${form.message.trim()}`);
  return lines.join("\n");
}

function labelFor(list: readonly { value: string; label: string }[], value: string) {
  return list.find((item) => item.value === value)?.label ?? value;
}

function fieldButtonClass(active: boolean) {
  return `flex items-center gap-3 border px-4 py-3.5 text-left transition-colors duration-200 ${
    active
      ? "border-gold-dark bg-gold-dark/8 text-ink"
      : "border-ink/12 text-ink/70 hover:border-gold-dark/40 hover:text-ink"
  }`;
}

const inputClass =
  "w-full border-0 border-ink/15 border-b bg-transparent py-2 text-ink outline-none focus:border-gold-dark";
const labelClass = "mb-1.5 block font-semibold text-[11px] text-ink/45 uppercase tracking-[0.14em]";
const eyebrowClass = "mb-2 flex items-center gap-3 font-semibold text-gold-dark text-xs uppercase tracking-[0.24em]";
const titleClass = "font-serif font-semibold text-2xl tracking-tight sm:text-3xl";

export function EstimateQuiz() {
  const t = useDict(estimateQuiz);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(initialState);
  const [done, setDone] = useState(false);
  const submitEstimate = useSubmitEstimateRequest();

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function toggleAmenity(value: string) {
    setForm((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(value)
        ? prev.amenities.filter((a) => a !== value)
        : [...prev.amenities, value],
    }));
  }

  async function handleSubmit() {
    await submitEstimate.mutateAsync({
      name: `${form.firstName.trim()} ${form.lastName.trim()}`.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      message: buildMessage(form),
    });
    setDone(true);
  }

  const activeStep = done ? TOTAL_STEPS + 1 : step;

  return (
    <div className="grid h-152 max-h-[calc(100dvh-6rem)] w-full max-w-5xl overflow-hidden border border-ink/10 bg-white shadow-2xl sm:max-h-[calc(100dvh-7.5rem)] lg:grid-cols-[280px_1fr]">
      {/* Brand / stepper panel */}
      <div className="relative hidden flex-col justify-between overflow-hidden bg-navy p-8 text-white lg:flex">
        <div className="motif-zellige absolute inset-0 opacity-[0.06]" />

        <div className="relative">
          <Image alt="J&M Housing" className="h-8 w-auto" src={logo} />
          <p className="mt-1 text-[10px] text-white/40 uppercase tracking-[0.18em]">
            {t.panelTag}
          </p>
        </div>

        <div className="relative space-y-0.5">
          {t.steps.map((label, index) => {
            const n = index + 1;
            const state = n < activeStep ? "done" : n === activeStep ? "active" : "upcoming";
            const Icon = stepIcons[index];
            return (
              <div className="flex items-center gap-3 py-1.5" key={label}>
                <span
                  className={`grid size-8 shrink-0 place-items-center rounded-full border transition-colors duration-300 ${
                    state === "done"
                      ? "border-gold bg-gold text-navy"
                      : state === "active"
                        ? "border-gold text-gold"
                        : "border-white/15 text-white/25"
                  }`}
                >
                  {state === "done" ? (
                    <Check size={13} strokeWidth={2.5} />
                  ) : (
                    <Icon size={13} strokeWidth={1.5} />
                  )}
                </span>
                <span
                  className={`text-[13px] transition-colors duration-300 ${
                    state === "upcoming" ? "text-white/30" : "text-white/85"
                  }`}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>

        <p className="relative text-[12px] text-white/40 leading-relaxed">
          {t.replyNote}
        </p>
      </div>

      {/* Form panel */}
      <div className="flex h-full min-h-0 flex-col p-6 sm:p-10">
        {done ? (
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <span className="grid size-16 place-items-center rounded-full bg-gold/15 text-gold-dark">
              <CheckCircle2 size={30} strokeWidth={1.5} />
            </span>
            <h1 className="mt-6 font-serif font-medium text-3xl tracking-tight">
              {t.thankYou}{form.firstName ? `, ${form.firstName}` : ""}!
            </h1>
            <p className="mt-4 max-w-sm text-[15px] text-ink/65 leading-relaxed">
              {t.receivedMessage}
            </p>
            <a
              className="mt-8 inline-flex bg-linear-to-br from-gold to-gold-dark px-8 py-3.5 font-bold text-navy text-xs uppercase tracking-wide transition-opacity hover:opacity-90"
              href="/"
            >
              {t.backToHome}
            </a>
          </div>
        ) : (
          <>
            <div className="mb-6 shrink-0 lg:hidden">
              <div className="flex items-center justify-between text-[11px] text-ink/45 uppercase tracking-[0.16em]">
                <span>
                  {t.stepWord} {step} / {TOTAL_STEPS}
                </span>
                <span>{Math.round((step / TOTAL_STEPS) * 100)}%</span>
              </div>
              <div className="mt-2 h-0.75 w-full bg-ink/10">
                <div
                  className="h-full bg-linear-to-r from-gold to-gold-dark transition-all duration-500 ease-out"
                  style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
                />
              </div>
            </div>

            <div className="flex flex-1 flex-col justify-center overflow-y-auto">
              {step === 1 && (
                <div>
                  <p className={eyebrowClass}>
                    <span className="h-px w-6 bg-gold-dark" />
                    {t.step1.eyebrow}
                  </p>
                  <h1 className={titleClass}>{t.step1.title}</h1>
                  <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className={labelClass}>{t.step1.firstName}</label>
                      <input
                        className={inputClass}
                        onChange={(e) => update("firstName", e.target.value)}
                        placeholder="Sophie"
                        value={form.firstName}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>{t.step1.lastName}</label>
                      <input
                        className={inputClass}
                        onChange={(e) => update("lastName", e.target.value)}
                        placeholder="Laurent"
                        value={form.lastName}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>{t.step1.phone}</label>
                      <input
                        className={inputClass}
                        onChange={(e) => update("phone", e.target.value)}
                        placeholder="+212 7 06 08 94 88"
                        type="tel"
                        value={form.phone}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>{t.step1.email}</label>
                      <input
                        className={inputClass}
                        onChange={(e) => update("email", e.target.value)}
                        placeholder="you@email.com"
                        type="email"
                        value={form.email}
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <p className={eyebrowClass}>
                    <span className="h-px w-6 bg-gold-dark" />
                    {t.step2.eyebrow}
                  </p>
                  <h1 className={titleClass}>{t.step2.title}</h1>
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    {t.propertyTypes.map(({ value, label }) => {
                      const Icon = propertyTypeIcons[value];
                      return (
                        <button
                          className={`flex flex-col items-center gap-2.5 border px-6 py-6 transition-colors duration-200 ${
                            form.propertyType === value
                              ? "border-gold-dark bg-gold-dark/8"
                              : "border-ink/12 hover:border-gold-dark/40"
                          }`}
                          key={value}
                          onClick={() => update("propertyType", value)}
                          type="button"
                        >
                          <Icon
                            className={form.propertyType === value ? "text-gold-dark" : "text-ink/50"}
                            size={22}
                            strokeWidth={1.5}
                          />
                          <span className="font-medium text-ink text-sm">{label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <p className={eyebrowClass}>
                    <span className="h-px w-6 bg-gold-dark" />
                    {t.step3.eyebrow}
                  </p>
                  <h1 className={titleClass}>{t.step3.title}</h1>
                  <div className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                    {t.locations.map(({ value, label }) => (
                      <button
                        className={fieldButtonClass(form.location === value)}
                        key={value}
                        onClick={() => update("location", value)}
                        type="button"
                      >
                        <MapPin
                          className={form.location === value ? "text-gold-dark" : "text-ink/40"}
                          size={14}
                          strokeWidth={1.5}
                        />
                        <span className="text-sm">{label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 4 && (
                <div>
                  <p className={eyebrowClass}>
                    <span className="h-px w-6 bg-gold-dark" />
                    {t.step4.eyebrow}
                  </p>
                  <h1 className={titleClass}>{t.step4.title}</h1>
                  <div className="mt-6 flex flex-wrap gap-2.5">
                    {bedroomOptions.map((n) => (
                      <button
                        className={`grid size-14 place-items-center border font-sans font-semibold text-xl transition-colors duration-200 ${
                          form.bedrooms === n
                            ? "border-gold-dark bg-gold-dark/8 text-ink"
                            : "border-ink/12 text-ink/60 hover:border-gold-dark/40"
                        }`}
                        key={n}
                        onClick={() => update("bedrooms", n)}
                        type="button"
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 5 && (
                <div>
                  <p className={eyebrowClass}>
                    <span className="h-px w-6 bg-gold-dark" />
                    {t.step5.eyebrow}
                  </p>
                  <h1 className={titleClass}>{t.step5.title}</h1>
                  <p className="mt-1.5 text-[13px] text-ink/50">{t.step5.subtitle}</p>
                  <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {t.amenitiesList.map(({ value, label }) => {
                      const active = form.amenities.includes(value);
                      return (
                        <button
                          className={fieldButtonClass(active)}
                          key={value}
                          onClick={() => toggleAmenity(value)}
                          type="button"
                        >
                          <span
                            className={`grid size-5 shrink-0 place-items-center border ${
                              active ? "border-gold-dark bg-gold-dark text-white" : "border-ink/25"
                            }`}
                          >
                            {active && <Check size={12} strokeWidth={2.5} />}
                          </span>
                          <span className="text-sm">{label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {step === 6 && (
                <div>
                  <p className={eyebrowClass}>
                    <span className="h-px w-6 bg-gold-dark" />
                    {t.step6.eyebrow}
                  </p>
                  <h1 className={titleClass}>{t.step6.title}</h1>
                  <div className="mt-6 flex flex-col gap-2.5">
                    {t.statusOptions.map(({ value, label }) => (
                      <button
                        className={fieldButtonClass(form.status === value)}
                        key={value}
                        onClick={() => update("status", value)}
                        type="button"
                      >
                        <span
                          className={`size-2 shrink-0 rounded-full ${
                            form.status === value ? "bg-gold-dark" : "bg-ink/20"
                          }`}
                        />
                        <span className="text-sm">{label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 7 && (
                <div>
                  <p className={eyebrowClass}>
                    <span className="h-px w-6 bg-gold-dark" />
                    {t.step7.eyebrow}
                  </p>
                  <h1 className={titleClass}>{t.step7.title}</h1>
                  <div className="mt-6 flex flex-col gap-2.5">
                    {t.goalOptions.map(({ value, label }) => (
                      <button
                        className={fieldButtonClass(form.goal === value)}
                        key={value}
                        onClick={() => update("goal", value)}
                        type="button"
                      >
                        <span
                          className={`size-2 shrink-0 rounded-full ${
                            form.goal === value ? "bg-gold-dark" : "bg-ink/20"
                          }`}
                        />
                        <span className="text-sm">{label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 8 && (
                <div>
                  <p className={eyebrowClass}>
                    <span className="h-px w-6 bg-gold-dark" />
                    {t.step8.eyebrow}
                  </p>
                  <h1 className={titleClass}>{t.step8.title}</h1>
                  <textarea
                    className={`${inputClass} mt-5 min-h-20 resize-none`}
                    onChange={(e) => update("message", e.target.value)}
                    placeholder={t.step8.placeholder}
                    value={form.message}
                  />

                  <div className="mt-5 space-y-1.5 border border-ink/10 bg-sand/25 p-4 text-[13px]">
                    <p className="mb-1.5 font-semibold text-[11px] text-ink/45 uppercase tracking-[0.16em]">
                      {t.step8.summary}
                    </p>
                    <p className="text-ink/70">
                      {labelFor(t.propertyTypes, form.propertyType)} · {form.bedrooms}{" "}
                      {t.step8.bedSuffix} · {labelFor(t.locations, form.location)}
                    </p>
                    <p className="text-ink/70">{labelFor(t.statusOptions, form.status)}</p>
                    <p className="text-ink/70">{labelFor(t.goalOptions, form.goal)}</p>
                  </div>

                  {submitEstimate.isError && (
                    <p className="mt-3 text-[13px] text-red-600">
                      {t.step8.errorMessage}
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="mt-6 flex shrink-0 items-center justify-between border-ink/10 border-t pt-5">
              <button
                className={`flex items-center gap-2 font-semibold text-sm transition-colors ${
                  step === 1 ? "invisible" : "text-ink/60 hover:text-ink"
                }`}
                onClick={() => setStep((s) => Math.max(1, s - 1))}
                type="button"
              >
                <ArrowLeft size={16} strokeWidth={1.5} />
                {t.back}
              </button>

              {step < TOTAL_STEPS ? (
                <button
                  className="flex items-center gap-2 bg-linear-to-br from-gold to-gold-dark px-8 py-3.5 font-bold text-navy text-xs uppercase tracking-wide transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                  disabled={!canProceed(step, form)}
                  onClick={() => setStep((s) => Math.min(TOTAL_STEPS, s + 1))}
                  type="button"
                >
                  {t.continue}
                  <ArrowRight size={16} strokeWidth={1.5} />
                </button>
              ) : (
                <button
                  className="flex items-center gap-2 bg-linear-to-br from-gold to-gold-dark px-8 py-3.5 font-bold text-navy text-xs uppercase tracking-wide transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={submitEstimate.isPending}
                  onClick={handleSubmit}
                  type="button"
                >
                  {submitEstimate.isPending ? t.sending : t.send}
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
