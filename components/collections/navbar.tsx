"use client";

import { Globe, Menu } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/collections", label: "Properties" },
  { href: "/#estimate", label: "Owners" },
  { href: "/#services", label: "Services" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

const languages = ["FR", "EN", "AR"];

export function CollectionsNavbar() {
  return (
    <header className="sticky top-0 z-50 border-ink/10 border-b bg-white">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-5 sm:px-8 lg:px-12">
        <Link className="flex items-baseline gap-1.5 font-serif font-semibold text-xl tracking-tight" href="/">
          <span className="text-ink">J &amp; M</span>
          <span className="text-gold-dark italic">Housing</span>
        </Link>

        <NavigationMenu className="max-lg:hidden">
          <NavigationMenuList className="gap-7">
            {navLinks.map((link) => (
              <NavigationMenuItem key={link.label}>
                <NavigationMenuLink
                  className="rounded-none bg-transparent p-0 font-medium text-ink/70 text-sm hover:bg-transparent hover:text-gold-dark focus:bg-transparent focus:text-gold-dark"
                  href={link.href}
                >
                  {link.label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-1 text-ink/40 sm:flex">
            <Globe className="mr-1" size={15} strokeWidth={1.5} />
            {languages.map((lang) => (
              <span
                className={`px-1.5 py-1 font-semibold text-xs ${
                  lang === "EN" ? "bg-gold-dark/15 text-gold-dark" : "text-ink/40"
                }`}
                key={lang}
              >
                {lang}
              </span>
            ))}
          </div>
          <Button
            className="hidden bg-linear-to-br from-gold to-gold-dark font-bold text-navy text-xs uppercase tracking-wide hover:opacity-90 sm:inline-flex"
            nativeButton={false}
            render={<a href="/#estimate" />}
          >
            Owners
          </Button>

          <Popover>
            <PopoverTrigger asChild>
              <Button aria-label="Open navigation" className="lg:hidden" size="icon" variant="ghost">
                <Menu size={20} />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-56 p-1 lg:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0">
                  {navLinks.map((link) => (
                    <NavigationMenuItem className="w-full" key={link.label}>
                      <NavigationMenuLink className="py-1.5" href={link.href}>
                        {link.label}
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  );
}
