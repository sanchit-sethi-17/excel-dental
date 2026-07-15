"use client";

import { MessageCircle } from "lucide-react";
import { site, whatsappLink } from "@/lib/site";

/**
 * Quiet WhatsApp shortcut (a direct line to the clinic — deliberately NOT a
 * chatbot; the client declined any AI chat on the site).
 */
export function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink(
        `Hi ${site.name}, I'd like to enquire about an appointment.`
      )}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with the clinic on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-13 w-13 items-center justify-center rounded-full bg-ink text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
