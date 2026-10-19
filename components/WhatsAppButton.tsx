import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { whatsappHref } from "@/content/site";

export function WhatsAppButton() {
  return (
    <a
      href={whatsappHref()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp, opens in a new tab"
      className="no-print fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-4 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-charcoal text-ivory shadow-[0_10px_30px_rgba(20,20,20,0.18)] transition-transform duration-200 ease-out hover:-translate-y-0.5 md:h-12 md:w-auto md:gap-2 md:px-4"
    >
      <WhatsAppIcon className="h-6 w-6 md:h-5 md:w-5" />
      <span className="sr-only md:not-sr-only md:text-sm md:font-medium">WhatsApp</span>
    </a>
  );
}
