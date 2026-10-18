import { MessageCircle } from "lucide-react";
import { whatsappHref } from "@/content/site";

export function WhatsAppButton() {
  return (
    <a
      href={whatsappHref()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp, opens in a new tab"
      className="no-print fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-4 z-40 inline-flex items-center gap-2 border border-charcoal bg-ivory p-3 text-sm text-charcoal transition-colors duration-200 ease-out hover:border-terracotta md:px-3 md:py-2"
    >
      <MessageCircle className="h-4 w-4" aria-hidden="true" />
      <span className="sr-only md:not-sr-only">WhatsApp</span>
    </a>
  );
}
