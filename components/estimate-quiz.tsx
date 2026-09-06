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

const TOTAL_STEPS = 8;

const stepMeta: { label: string; icon: LucideIcon }[] = [
  { label: "Your details", icon: User },
  { label: "Property type", icon: HomeIcon },
  { label: "Location", icon: MapPin },
  { label: "Bedrooms", icon: Bed },
  { label: "Amenities", icon: Sparkles },
  { label: "Status", icon: ClipboardList },
  { label: "Goal", icon: Target },
  { label: "Summary", icon: Send },
];

const propertyTypes = [
  { value: "Villa", icon: HomeIcon },
  { value: "Apartment", icon: Building2 },
  { value: "Riad", icon: HomeIcon },
  { value: "Duplex", icon: Building2 },
];

const locations = [
  "Palmeraie",
  "Guéliz",
  "Hivernage",
  "Amelkis",
  "Targa",
  "Prestigia",
  "Medina",
  "Other",
];

const bedroomOptions = ["1", "2", "3", "4", "5+"];

const amenitiesList = [
  "Pool",
  "High-speed wifi",
  "Air conditioning",
  "Private parking",
  "Garden",
  "Clear view",
];

const statusOptions = [
  "Currently vacant",
  "Already rented (short or long term)",
  "Occasional personal use",
];

const goalOptions = [
  "Maximise rental income",
  "Extra income, without the hassle",
  "Peace of mind above all",
];

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
            Free estimate
          </p>
        </div>

        <div className="relative space-y-0.5">
          {stepMeta.map((meta, index) => {
            const n = index + 1;
            const state = n < activeStep ? "done" : n === activeStep ? "active" : "upcoming";
            const Icon = meta.icon;
            return (
              <div className="flex items-center gap-3 py-1.5" key={meta.label}>
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
                  {meta.label}
                </span>
              </div>
            );
          })}
        </div>

        <p className="relative text-[12px] text-white/40 leading-relaxed">
          A personal reply within 24h, no commitment.
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
              Thank you{form.firstName ? `, ${form.firstName}` : ""}!
            </h1>
            <p className="mt-4 max-w-sm text-[15px] text-ink/65 leading-relaxed">
              Your estimate request has been received. Our team is reviewing
              it and will get back to you within 24h, no commitment.
            </p>
            <a
              className="mt-8 inline-flex bg-linear-to-br from-gold to-gold-dark px-8 py-3.5 font-bold text-navy text-xs uppercase tracking-wide transition-opacity hover:opacity-90"
              href="/"
            >
              Back to home
            </a>
          </div>
        ) : (
          <>
            <div className="mb-6 shrink-0 lg:hidden">
              <div className="flex items-center justify-between text-[11px] text-ink/45 uppercase tracking-[0.16em]">
                <span>
                  Step {step} / {TOTAL_STEPS}
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
                    Your details
                  </p>
                  <h1 className={titleClass}>So we can get back to you.</h1>
                  <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className={labelClass}>First name</label>
                      <input
                        className={inputClass}
                        onChange={(e) => update("firstName", e.target.value)}
                        placeholder="Sophie"
                        value={form.firstName}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Last name</label>
                      <input
                        className={inputClass}
                        onChange={(e) => update("lastName", e.target.value)}
                        placeholder="Laurent"
                        value={form.lastName}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Phone / WhatsApp</label>
                      <input
                        className={inputClass}
                        onChange={(e) => update("phone", e.target.value)}
                        placeholder="+212 6 00 00 00 00"
                        type="tel"
                        value={form.phone}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Email</label>
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
                    Your property
                  </p>
                  <h1 className={titleClass}>What type of property do you own?</h1>
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    {propertyTypes.map(({ value, icon: Icon }) => (
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
                        <span className="font-medium text-ink text-sm">{value}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <p className={eyebrowClass}>
                    <span className="h-px w-6 bg-gold-dark" />
                    Location
                  </p>
                  <h1 className={titleClass}>Where is your property in Marrakech?</h1>
                  <div className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                    {locations.map((loc) => (
                      <button
                        className={fieldButtonClass(form.location === loc)}
                        key={loc}
                        onClick={() => update("location", loc)}
                        type="button"
                      >
                        <MapPin
                          className={form.location === loc ? "text-gold-dark" : "text-ink/40"}
                          size={14}
                          strokeWidth={1.5}
                        />
                        <span className="text-sm">{loc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 4 && (
                <div>
                  <p className={eyebrowClass}>
                    <span className="h-px w-6 bg-gold-dark" />
                    Capacity
                  </p>
                  <h1 className={titleClass}>How many bedrooms does it have?</h1>
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
                    Amenities
                  </p>
                  <h1 className={titleClass}>Which amenities does it offer?</h1>
                  <p className="mt-1.5 text-[13px] text-ink/50">Select all that apply.</p>
                  <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {amenitiesList.map((amenity) => {
                      const active = form.amenities.includes(amenity);
                      return (
                        <button
                          className={fieldButtonClass(active)}
                          key={amenity}
                          onClick={() => toggleAmenity(amenity)}
                          type="button"
                        >
                          <span
                            className={`grid size-5 shrink-0 place-items-center border ${
                              active ? "border-gold-dark bg-gold-dark text-white" : "border-ink/25"
                            }`}
                          >
                            {active && <Check size={12} strokeWidth={2.5} />}
                          </span>
                          <span className="text-sm">{amenity}</span>
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
                    Current situation
                  </p>
                  <h1 className={titleClass}>What's the property's current status?</h1>
                  <div className="mt-6 flex flex-col gap-2.5">
                    {statusOptions.map((option) => (
                      <button
                        className={fieldButtonClass(form.status === option)}
                        key={option}
                        onClick={() => update("status", option)}
                        type="button"
                      >
                        <span
                          className={`size-2 shrink-0 rounded-full ${
                            form.status === option ? "bg-gold-dark" : "bg-ink/20"
                          }`}
                        />
                        <span className="text-sm">{option}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 7 && (
                <div>
                  <p className={eyebrowClass}>
                    <span className="h-px w-6 bg-gold-dark" />
                    Your goal
                  </p>
                  <h1 className={titleClass}>What matters most to you?</h1>
                  <div className="mt-6 flex flex-col gap-2.5">
                    {goalOptions.map((option) => (
                      <button
                        className={fieldButtonClass(form.goal === option)}
                        key={option}
                        onClick={() => update("goal", option)}
                        type="button"
                      >
                        <span
                          className={`size-2 shrink-0 rounded-full ${
                            form.goal === option ? "bg-gold-dark" : "bg-ink/20"
                          }`}
                        />
                        <span className="text-sm">{option}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 8 && (
                <div>
                  <p className={eyebrowClass}>
                    <span className="h-px w-6 bg-gold-dark" />
                    Last step
                  </p>
                  <h1 className={titleClass}>Anything else to add?</h1>
                  <textarea
                    className={`${inputClass} mt-5 min-h-20 resize-none`}
                    onChange={(e) => update("message", e.target.value)}
                    placeholder="Optional — anything that could help us prepare your estimate."
                    value={form.message}
                  />

                  <div className="mt-5 space-y-1.5 border border-ink/10 bg-sand/25 p-4 text-[13px]">
                    <p className="mb-1.5 font-semibold text-[11px] text-ink/45 uppercase tracking-[0.16em]">
                      Summary
                    </p>
                    <p className="text-ink/70">
                      {form.propertyType} · {form.bedrooms} bed · {form.location}
                    </p>
                    <p className="text-ink/70">{form.status}</p>
                    <p className="text-ink/70">{form.goal}</p>
                  </div>

                  {submitEstimate.isError && (
                    <p className="mt-3 text-[13px] text-red-600">
                      Something went wrong. Check your details and try again.
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
                Back
              </button>

              {step < TOTAL_STEPS ? (
                <button
                  className="flex items-center gap-2 bg-linear-to-br from-gold to-gold-dark px-8 py-3.5 font-bold text-navy text-xs uppercase tracking-wide transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                  disabled={!canProceed(step, form)}
                  onClick={() => setStep((s) => Math.min(TOTAL_STEPS, s + 1))}
                  type="button"
                >
                  Continue
                  <ArrowRight size={16} strokeWidth={1.5} />
                </button>
              ) : (
                <button
                  className="flex items-center gap-2 bg-linear-to-br from-gold to-gold-dark px-8 py-3.5 font-bold text-navy text-xs uppercase tracking-wide transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={submitEstimate.isPending}
                  onClick={handleSubmit}
                  type="button"
                >
                  {submitEstimate.isPending ? "Sending..." : "Send my request"}
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
