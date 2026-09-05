"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { api } from "@/lib/axios";
import type { ContactInput } from "@/lib/schemas/contact";

export function useSubmitEstimateRequest() {
  return useMutation({
    mutationFn: async (data: ContactInput) => (await api.post("/api/contact", data)).data,
    onSuccess: () => {
      toast.success("Request sent — we'll get back to you within 24 hours.");
    },
    onError: () => {
      toast.error("Something went wrong. Please try again or email us directly.");
    },
  });
}
