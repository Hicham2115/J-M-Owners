import type { Metadata } from "next";
import { Playfair_Display, Manrope } from "next/font/google";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display-serif",
  style: ["normal", "italic"],
  weight: ["500", "600", "700"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body-sans",
});

export const metadata: Metadata = {
  title: "J&M Housing | Gestion locative à Marrakech",
  description: "Gestion locative haut de gamme pour propriétaires à Marrakech et au Maroc.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`h-full antialiased ${playfairDisplay.variable} ${manrope.variable}`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          <SmoothScroll />
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
