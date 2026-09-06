"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

import logo from "@/app/assets/logo.png";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const navigationLinks = [
  { href: "/#home", label: "Home" },
  // { href: "/collection", label: "Collection" },
  { href: "/#services", label: "Our Services" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/#testimonials", label: "Testimonials" },
  { href: "/#about", label: "About" },
  { href: "/#estimate", label: "Contact" },
];

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full text-white transition-all duration-300 ${
        scrolled
          ? "border-white/10 border-b bg-navy/80 shadow-lg backdrop-blur-md"
          : "border-transparent border-b bg-gradient-to-r from-navy/95 to-navy/90"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 md:px-8">
        {/* Brand */}
        <a
          className="flex items-center"
          href="/"
          aria-label="J&M Housing accueil"
        >
          <Image
            alt="J&M Housing"
            className="h-12 w-auto"
            priority
            src={logo}
          />
        </a>

        {/* Desktop nav */}
        <NavigationMenu className="max-lg:hidden">
          <NavigationMenuList className="gap-6">
            {navigationLinks.map((link) => (
              <NavigationMenuItem key={link.label}>
                <NavigationMenuLink
                  className="group relative flex-none rounded-none bg-transparent p-0 py-2 font-medium text-sm text-white/90 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-center after:scale-x-0 after:bg-gold after:transition-transform after:duration-300 after:ease-out hover:bg-transparent hover:text-gold hover:after:scale-x-100 focus:bg-transparent focus:text-gold"
                  href={link.href}
                >
                  {link.label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <Button
            className="hidden h-auto bg-linear-to-br from-gold to-gold-dark py-3 font-bold text-white text-xs uppercase tracking-wide hover:opacity-90 px-6  lg:inline-flex"
            render={<a href="/estimation" />}
            nativeButton={false}
          >
            Estimation Gratuite
          </Button>

          {/* Mobile menu trigger */}
          <Popover onOpenChange={setMobileOpen} open={mobileOpen}>
            <PopoverTrigger asChild>
              <Button
                className="relative size-11 text-white hover:bg-white/10 hover:text-white lg:hidden"
                size="icon"
                variant="ghost"
                aria-label={
                  mobileOpen ? "Fermer la navigation" : "Ouvrir la navigation"
                }
              >
                <Menu
                  className={`absolute transition-all duration-200 ${mobileOpen ? "scale-50 opacity-0" : "scale-100 opacity-100"}`}
                  size={20}
                />
                <X
                  className={`absolute transition-all duration-200 ${mobileOpen ? "scale-100 opacity-100" : "scale-50 opacity-0"}`}
                  size={20}
                />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              align="end"
              className="w-64 rounded-xl border-white/10 bg-navy/95 p-2 shadow-2xl backdrop-blur-md lg:hidden"
              sideOffset={12}
            >
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0.5">
                  {navigationLinks.map((link, i) => (
                    <NavigationMenuItem className="w-full" key={link.label}>
                      <NavigationMenuLink
                        className="group flex items-center gap-3 rounded-lg bg-transparent px-3 py-2.5 text-sm text-white! transition-colors hover:bg-white/5 hover:text-gold! focus:bg-white/5 focus:text-gold!"
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                      >
                        <span className="font-mono text-[10px] text-gold/50! tabular-nums">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {link.label}
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>

              <div className="mt-2 border-white/10 border-t p-2">
                <a
                  className="flex h-auto items-center justify-center rounded-md bg-linear-to-br from-gold to-gold-dark px-6 py-3 font-bold text-white text-xs uppercase tracking-wide transition-opacity hover:opacity-90"
                  href="/estimation"
                  onClick={() => setMobileOpen(false)}
                >
                  Estimation Gratuite
                </a>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  );
}
