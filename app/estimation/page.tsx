import type { Metadata } from "next";
import SiteHeader from "@/components/navbar";
import { EstimateQuiz } from "@/components/estimate-quiz";

export const metadata: Metadata = {
  title: "Free Estimate | J&M Housing",
  description: "Get a free estimate for your property in Marrakech in just a few steps.",
};

export default function EstimationPage() {
  return (
    <main className="h-dvh overflow-hidden bg-sand/30">
      <SiteHeader />
      <div className="flex h-full items-center justify-center px-4 pt-20 pb-4 sm:px-6 sm:pt-24 sm:pb-6">
        <EstimateQuiz />
      </div>
    </main>
  );
}
