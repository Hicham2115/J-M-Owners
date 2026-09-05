import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import type { SVGProps } from "react";

import logo from "@/app/assets/logo.png";

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" {...props}>
      <rect height="18" rx="5" width="18" x="3" y="3" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" fill="currentColor" r="0.75" stroke="none" />
    </svg>
  );
}

function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" {...props}>
      <path d="M15 4h-2a4 4 0 0 0-4 4v3H7v4h2v6h4v-6h2.5l.5-4h-3V8a1 1 0 0 1 1-1h2z" />
    </svg>
  );
}

const exploreLinks = [
  { href: "/#home", label: "Home" },
  { href: "/#services", label: "Our Services" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/#testimonials", label: "Testimonials" },
];

const companyLinks = [
  { href: "/#about", label: "About Us" },
  { href: "/estimation", label: "Free Estimate" },
  { href: "/#estimate", label: "Contact" },
];

const socials = [
  { href: "https://instagram.com", icon: InstagramIcon, label: "Instagram" },
  { href: "https://facebook.com", icon: FacebookIcon, label: "Facebook" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy text-white">
      <div className="motif-zellige absolute inset-0 opacity-[0.05]" />

      <div className="relative border-white/10 border-b px-5 py-12 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <h3 className="font-serif font-medium text-2xl leading-snug tracking-tight sm:text-3xl">
            Own a property in Marrakech?{" "}
            <span className="italic text-gold">Let&rsquo;s put it to work.</span>
          </h3>
          <a
            className="inline-flex shrink-0 items-center gap-2 bg-linear-to-br from-gold to-gold-dark px-8 py-3.5 font-bold text-navy text-xs uppercase tracking-wide transition-opacity hover:opacity-90"
            href="/estimation"
          >
            Get Your Free Estimate
          </a>
        </div>
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr] lg:px-12">
        <div>
          <a aria-label="J&M Housing home" className="inline-flex items-center" href="/">
            <Image alt="J&M Housing" className="h-11 w-auto" src={logo} />
          </a>
          <p className="mt-5 max-w-xs text-[15px] text-white/55 leading-relaxed">
            Boutique short-term rental management for riad and villa owners across Marrakech.
          </p>
          <div className="mt-6 flex items-center gap-3">
            {socials.map(({ href, icon: Icon, label }) => (
              <a
                aria-label={label}
                className="flex size-9 items-center justify-center border border-white/15 text-white/70 transition-colors duration-300 hover:border-gold/60 hover:text-gold"
                href={href}
                key={label}
                rel="noreferrer"
                target="_blank"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="Explore">
          <p className="mb-5 font-semibold text-gold/70 text-xs uppercase tracking-[0.2em]">Explore</p>
          <ul className="space-y-3">
            {exploreLinks.map((link) => (
              <li key={link.label}>
                <a
                  className="group relative inline-block text-[15px] text-white/65 transition-colors duration-300 hover:text-gold"
                  href={link.href}
                >
                  {link.label}
                  <span className="absolute inset-x-0 -bottom-0.5 h-px origin-center scale-x-0 bg-gold transition-transform duration-300 ease-out group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Company">
          <p className="mb-5 font-semibold text-gold/70 text-xs uppercase tracking-[0.2em]">Company</p>
          <ul className="space-y-3">
            {companyLinks.map((link) => (
              <li key={link.label}>
                <a
                  className="group relative inline-block text-[15px] text-white/65 transition-colors duration-300 hover:text-gold"
                  href={link.href}
                >
                  {link.label}
                  <span className="absolute inset-x-0 -bottom-0.5 h-px origin-center scale-x-0 bg-gold transition-transform duration-300 ease-out group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="mb-5 font-semibold text-gold/70 text-xs uppercase tracking-[0.2em]">Get in touch</p>
          <ul className="space-y-4">
            <li>
              <a
                className="group flex items-start gap-3 text-[15px] text-white/65 transition-colors duration-300 hover:text-gold"
                href="tel:+212600000000"
              >
                <Phone className="mt-0.5 shrink-0 text-gold" size={16} strokeWidth={1.5} />
                <span className="relative">
                  +212 6 00 00 00 00
                  <span className="absolute inset-x-0 -bottom-0.5 h-px origin-center scale-x-0 bg-gold transition-transform duration-300 ease-out group-hover:scale-x-100" />
                </span>
              </a>
            </li>
            <li>
              <a
                className="group flex items-start gap-3 text-[15px] text-white/65 transition-colors duration-300 hover:text-gold"
                href="mailto:owners@jmhousing.ma"
              >
                <Mail className="mt-0.5 shrink-0 text-gold" size={16} strokeWidth={1.5} />
                <span className="relative">
                  owners@jmhousing.ma
                  <span className="absolute inset-x-0 -bottom-0.5 h-px origin-center scale-x-0 bg-gold transition-transform duration-300 ease-out group-hover:scale-x-100" />
                </span>
              </a>
            </li>
            <li className="flex items-start gap-3 text-[15px] text-white/65">
              <MapPin className="mt-0.5 shrink-0 text-gold" size={16} strokeWidth={1.5} />
              Gueliz, Marrakech, Morocco
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-white/10 border-t px-5 py-6 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-6xl flex-col-reverse items-center justify-between gap-3 text-white/40 text-xs sm:flex-row">
          <p>© {new Date().getFullYear()} J&amp;M Housing. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a className="group relative py-1 transition-colors duration-300 hover:text-gold" href="#">
              Privacy Policy
              <span className="absolute inset-x-0 -bottom-0.5 h-px origin-center scale-x-0 bg-gold transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </a>
            <a className="group relative py-1 transition-colors duration-300 hover:text-gold" href="#">
              Terms of Service
              <span className="absolute inset-x-0 -bottom-0.5 h-px origin-center scale-x-0 bg-gold transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </a>
          </div>
        </div>
      </div>

      <p className="relative m-0 border-white/10 border-t px-5 py-4 text-center text-[11px] text-white/35">
        Designed and developed by{" "}
        <a
          className="group relative inline-block py-0.5 text-white/50 transition-colors duration-300 hover:text-gold"
          href="https://www.stallionadvertising.ma/"
          rel="noopener noreferrer"
          target="_blank"
        >
          Stallion Advertising
          <span className="absolute inset-x-0 -bottom-0.5 h-px origin-center scale-x-0 bg-gold transition-transform duration-300 ease-out group-hover:scale-x-100" />
        </a>
        .
      </p>
    </footer>
  );
}
