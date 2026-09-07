"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { api } from "@/lib/axios";
import { useLocale } from "@/lib/i18n/context";
import type { ContactInput } from "@/lib/schemas/contact";

const messages = {
  en: {
    success: "Request sent — we'll get back to you within 24 hours.",
    error: "Something went wrong. Please try again or email us directly.",
  },
  fr: {
    success: "Demande envoyée — nous revenons vers vous sous 24 heures.",
    error: "Une erreur est survenue. Réessayez ou écrivez-nous directement.",
  },
} as const;

export function useSubmitEstimateRequest() {
  const { locale } = useLocale();
  return useMutation({
    mutationFn: async (data: ContactInput) => (await api.post("/api/contact", data)).data,
    onSuccess: () => {
      toast.success(messages[locale].success);
    },
    onError: () => {
      toast.error(messages[locale].error);
    },
  });
}
