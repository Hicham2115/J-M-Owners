import { Camera, CalendarClock, ConciergeBell, ImageIcon, ShieldCheck, Sparkles, Wrench } from "lucide-react";

const services = [
  { icon: Camera, title: "Pro photo & video", description: "HDR photography, drone footage and virtual tours that maximize your listing's visibility and attract more bookings." },
  { icon: CalendarClock, title: "Multi-platform management", description: "Airbnb, Booking.com and direct reservations, with synchronized calendars and dynamic pricing to prevent double bookings." },
  { icon: ConciergeBell, title: "24/7 personalized welcome", description: "In-person check-in and check-out, guest assistance, and a welcome basket of local products for every stay." },
  { icon: Sparkles, title: "Hotel-grade cleaning", description: "Professional cleaning before and after every stay, with hotel-quality linens and exacting standards throughout." },
  { icon: Wrench, title: "Maintenance & upkeep", description: "Routine maintenance and emergency interventions, plus pool and garden care to keep your property in perfect condition." },
  { icon: ShieldCheck, title: "Insurance & protection", description: "Tenant identity verification, signed contracts, a security deposit and damage coverage for total peace of mind." },
];

export function Services() {
  return (
    <section className="bg-white px-5 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-24" id="services">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-xl text-center">
          <p className="mb-5 flex items-center justify-center gap-3 font-semibold text-gold-dark text-xs uppercase tracking-[0.28em]"><span className="h-px w-8 bg-gold-dark" />Our complete solution<span className="h-px w-8 bg-gold-dark" /></p>
          <h2 className="font-serif font-medium text-4xl tracking-tight sm:text-5xl">Full-service property management</h2>
          <p className="mx-auto mt-5 max-w-md text-[15px] text-ink/70 leading-relaxed sm:text-base">From marketing to maintenance, we handle every detail so you can enjoy worry-free ownership and consistent income.</p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon: Icon, title, description }, index) => <div className="group transition-transform duration-300 hover:-translate-y-1.5" key={title}>
            <div className="relative flex aspect-square flex-col items-center justify-center gap-2 overflow-hidden border border-ink/15 border-dashed bg-sand/40 text-ink/30 transition-colors duration-300 group-hover:border-gold-dark/50 group-hover:text-gold-dark/50 group-hover:shadow-xl"><span className="absolute top-3 left-3 font-serif font-semibold text-3xl text-ink/10 transition-colors duration-300 group-hover:text-gold-dark/20">{String(index + 1).padStart(2, "0")}</span><ImageIcon className="transition-transform duration-300 group-hover:scale-110" size={40} strokeWidth={1.25} /><span className="text-[10px] uppercase tracking-[0.18em]">Photo to come</span></div>
            <div className="mt-6 flex size-12 items-center justify-center rounded-full bg-gold-dark/10 text-gold-dark transition-colors duration-300 group-hover:bg-gold-dark group-hover:text-white"><Icon size={22} strokeWidth={1.4} /></div><h3 className="mt-4 font-serif font-semibold text-xl tracking-tight transition-colors duration-300 group-hover:text-gold-dark">{title}</h3><p className="mt-3 max-w-xs text-[14px] text-ink/65 leading-relaxed">{description}</p><span className="mt-4 block h-px w-8 origin-left scale-x-100 bg-ink/15 transition-all duration-300 group-hover:w-12 group-hover:bg-gold-dark" />
          </div>)}
        </div>
      </div>
    </section>
  );
}
