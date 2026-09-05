import {
  Building2,
  CalendarX,
  House,
  MessageCircle,
  PhoneCall,
  ShieldCheck,
  Tag,
  WashingMachine,
  Wrench,
} from "lucide-react";
import { cn } from "@/lib/utils";
import img from "@/app/assets/6.jpg";

const challenges = [
  { icon: CalendarX, label: "Empty calendar" },
  { icon: MessageCircle, label: "Guest communication" },
  { icon: Building2, label: "Managing Airbnb & Booking.com" },
  { icon: WashingMachine, label: "Cleaning & laundry" },
  { icon: Wrench, label: "Maintenance & repairs" },
  { icon: PhoneCall, label: "Late-night emergencies" },
  { icon: Tag, label: "Pricing optimization" },
  { icon: ShieldCheck, label: "Guest screening & security" },
];

export function OwnerChallenge() {
  return (
    <section className="bg-white px-5 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        <div>
          <p className="mb-5 flex items-center gap-3 font-semibold text-gold-dark text-xs uppercase tracking-[0.28em]">
            <span className="h-px w-8 bg-gold-dark" />
            The owner&rsquo;s challenge
          </p>
          <h2 className="max-w-lg font-serif font-medium text-4xl leading-[1.12] tracking-tight sm:text-5xl">
            Owning a property shouldn&rsquo;t feel like a{" "}
            <span className="italic text-gold-dark">second job</span>.
          </h2>
          <p className="mt-6 max-w-md text-[15px] text-ink/70 leading-relaxed sm:text-base">
            Between guest communication, bookings, cleaning, maintenance,
            platforms and emergencies, managing a rental property can quickly
            become overwhelming.
          </p>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2">
            {challenges.map(({ icon: Icon, label }, index) => (
              <div
                className={cn(
                  "group flex items-center gap-4 border-ink/10 py-4 pr-4 transition-colors duration-300 odd:sm:border-r sm:odd:pr-6 sm:even:pl-6",
                  index !== challenges.length - 1 && "border-b",
                  index >= challenges.length - 2 && "sm:border-b-0",
                )}
                key={label}
              >
                <span className="relative flex size-9 shrink-0 items-center justify-center">
                  <span className="absolute inset-0 rotate-45 border border-gold-dark/45 transition-all duration-500 ease-out group-hover:rotate-0 group-hover:border-gold-dark" />
                  <Icon
                    className="relative text-gold-dark"
                    size={16}
                    strokeWidth={1.5}
                  />
                </span>
                <span className="text-ink/70 text-[13px] font-semibold leading-snug transition-colors duration-300 group-hover:text-ink">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="relative mx-auto aspect-4/5 w-full max-w-lg lg:aspect-auto lg:h-full lg:max-h-140 lg:max-w-none">
          <div className="absolute inset-0 overflow-hidden shadow-2xl shadow-ink/20">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${img.src})` }}
            />
            <div className="absolute inset-0 bg-linear-to-t from-navy/85 via-navy/15 to-transparent" />
            {/* <div className="absolute right-6 bottom-6 left-6 flex items-center gap-4 bg-navy/90 px-5 py-4 backdrop-blur-sm">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-gold-dark text-white">
                <House size={20} strokeWidth={1.5} />
              </span>
              <p className="text-white text-sm leading-snug">
                <span className="block font-serif font-medium text-gold italic">
                  Our mission
                </span>
                Take care of every detail so you can enjoy peace of mind and
                better returns.
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
