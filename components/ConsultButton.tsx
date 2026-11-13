import WhatsAppIcon from "./WhatsAppIcon";
import { primaryWhatsApp } from "@/lib/data";

type Props = {
  serviceTitle: string;
  className?: string;
};

export default function ConsultButton({ serviceTitle, className = "" }: Props) {
  return (
    <a
      href={`https://wa.me/${primaryWhatsApp}?text=${encodeURIComponent(
        `Halo Customer Service Dzaroza Property, saya ingin konsultasi tentang layanan "${serviceTitle}".`
      )}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-3 text-sm font-bold text-charcoal-950 shadow-card transition-all hover:-translate-y-0.5 hover:bg-orange-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-950 ${className}`}
    >
      <WhatsAppIcon size={16} />
      Konsultasi Layanan Ini
    </a>
  );
}