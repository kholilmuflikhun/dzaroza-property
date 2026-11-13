"use client";

import WhatsAppIcon from "./WhatsAppIcon";
import { primaryWhatsApp } from "@/lib/data";

export default function FloatingWhatsApp() {
  return (
    <a
      href={`https://wa.me/${primaryWhatsApp}?text=${encodeURIComponent(
        "Halo Customer Service Dzaroza Property, saya ingin konsultasi."
      )}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Hubungi Customer Service via WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#167F3D] text-white shadow-card-hover hover:bg-[#126A33] transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#167F3D] focus-visible:ring-offset-2"
    >
      <WhatsAppIcon size={24} />
    </a>
  );
}