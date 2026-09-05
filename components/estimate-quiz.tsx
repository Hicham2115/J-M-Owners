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
  { label: "Coordonnées", icon: User },
  { label: "Type de bien", icon: HomeIcon },
  { label: "Localisation", icon: MapPin },
  { label: "Chambres", icon: Bed },
  { label: "Équipements", icon: Sparkles },
  { label: "Statut", icon: ClipboardList },
  { label: "Objectif", icon: Target },
  { label: "Récapitulatif", icon: Send },
];

const propertyTypes = [
  { value: "Villa", icon: HomeIcon },
  { value: "Appartement", icon: Building2 },
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
  "Médina",
  "Autre",
];

const bedroomOptions = ["1", "2", "3", "4", "5+"];

const amenitiesList = [
  "Piscine",
  "Wifi haut débit",
  "Climatisation",
  "Parking privé",
  "Jardin",
  "Vue dégagée",
];

const statusOptions = [
  "Actuellement vide",
  "Déjà loué (courte ou longue durée)",
  "Usage personnel occasionnel",
];

const goalOptions = [
  "Maximiser le revenu locatif",
  "Un complément de revenu, sans y penser",
  "La tranquillité d'esprit avant tout",
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
    `Type de bien : ${form.propertyType}`,
    `Localisation : ${form.location}`,
    `Chambres : ${form.bedrooms}`,
    `Équipements : ${form.amenities.length ? form.amenities.join(", ") : "Aucun renseigné"}`,
    `Statut actuel : ${form.status}`,
    `Objectif principal : ${form.goal}`,
  ];
  if (form.message.trim()) lines.push(`Détails : ${form.message.trim()}`);
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
    <div className="grid h-152 max-h-[calc(100dvh-7rem)] w-full max-w-5xl overflow-hidden border border-ink/10 bg-white shadow-2xl lg:grid-cols-[280px_1fr]">
      {/* Brand / stepper panel */}
      <div className="relative hidden flex-col justify-between overflow-hidden bg-navy p-8 text-white lg:flex">
        <div className="motif-zellige absolute inset-0 opacity-[0.06]" />

        <div className="relative">
          <Image alt="J&M Housing" className="h-8 w-auto" src={logo} />
          <p className="mt-1 text-[10px] text-white/40 uppercase tracking-[0.18em]">
            Estimation gratuite
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
          Réponse personnalisée sous 24h, sans engagement.
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
              Merci{form.firstName ? `, ${form.firstName}` : ""} !
            </h1>
            <p className="mt-4 max-w-sm text-[15px] text-ink/65 leading-relaxed">
              Votre demande d&rsquo;estimation a bien été reçue. Notre équipe
              l&rsquo;étudie et revient vers vous sous 24h, sans engagement.
            </p>
            <a
              className="mt-8 inline-flex bg-linear-to-br from-gold to-gold-dark px-8 py-3.5 font-bold text-navy text-xs uppercase tracking-wide transition-opacity hover:opacity-90"
              href="/"
            >
              Retour à l&rsquo;accueil
            </a>
          </div>
        ) : (
          <>
            <div className="mb-6 shrink-0 lg:hidden">
              <div className="flex items-center justify-between text-[11px] text-ink/45 uppercase tracking-[0.16em]">
                <span>
                  Étape {step} / {TOTAL_STEPS}
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
                    Vos coordonnées
                  </p>
                  <h1 className={titleClass}>Pour que l&rsquo;on puisse vous recontacter.</h1>
                  <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className={labelClass}>Prénom</label>
                      <input
                        className={inputClass}
                        onChange={(e) => update("firstName", e.target.value)}
                        placeholder="Sophie"
                        value={form.firstName}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Nom</label>
                      <input
                        className={inputClass}
                        onChange={(e) => update("lastName", e.target.value)}
                        placeholder="Laurent"
                        value={form.lastName}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Téléphone / WhatsApp</label>
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
                        placeholder="vous@email.com"
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
                    Votre bien
                  </p>
                  <h1 className={titleClass}>Quel type de propriété possédez-vous ?</h1>
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
                    Localisation
                  </p>
                  <h1 className={titleClass}>Où se trouve votre bien à Marrakech ?</h1>
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
                    Capacité
                  </p>
                  <h1 className={titleClass}>Combien de chambres compte-t-il ?</h1>
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
                    Équipements
                  </p>
                  <h1 className={titleClass}>Quels équipements propose-t-il ?</h1>
                  <p className="mt-1.5 text-[13px] text-ink/50">Plusieurs choix possibles.</p>
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
                    Situation actuelle
                  </p>
                  <h1 className={titleClass}>Quel est le statut actuel du bien ?</h1>
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
                    Votre objectif
                  </p>
                  <h1 className={titleClass}>Qu&rsquo;attendez-vous avant tout de nous ?</h1>
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
                    Dernière étape
                  </p>
                  <h1 className={titleClass}>Un détail à ajouter ?</h1>
                  <textarea
                    className={`${inputClass} mt-5 min-h-20 resize-none`}
                    onChange={(e) => update("message", e.target.value)}
                    placeholder="Facultatif — tout ce qui pourrait nous aider à préparer votre estimation."
                    value={form.message}
                  />

                  <div className="mt-5 space-y-1.5 border border-ink/10 bg-sand/25 p-4 text-[13px]">
                    <p className="mb-1.5 font-semibold text-[11px] text-ink/45 uppercase tracking-[0.16em]">
                      Récapitulatif
                    </p>
                    <p className="text-ink/70">
                      {form.propertyType} · {form.bedrooms} ch. · {form.location}
                    </p>
                    <p className="text-ink/70">{form.status}</p>
                    <p className="text-ink/70">{form.goal}</p>
                  </div>

                  {submitEstimate.isError && (
                    <p className="mt-3 text-[13px] text-red-600">
                      Une erreur est survenue. Vérifiez vos coordonnées et réessayez.
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
                Retour
              </button>

              {step < TOTAL_STEPS ? (
                <button
                  className="flex items-center gap-2 bg-linear-to-br from-gold to-gold-dark px-8 py-3.5 font-bold text-navy text-xs uppercase tracking-wide transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                  disabled={!canProceed(step, form)}
                  onClick={() => setStep((s) => Math.min(TOTAL_STEPS, s + 1))}
                  type="button"
                >
                  Continuer
                  <ArrowRight size={16} strokeWidth={1.5} />
                </button>
              ) : (
                <button
                  className="flex items-center gap-2 bg-linear-to-br from-gold to-gold-dark px-8 py-3.5 font-bold text-navy text-xs uppercase tracking-wide transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={submitEstimate.isPending}
                  onClick={handleSubmit}
                  type="button"
                >
                  {submitEstimate.isPending ? "Envoi..." : "Envoyer ma demande"}
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
