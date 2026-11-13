import { ArrowRight, ShieldCheck } from "lucide-react";
import WhatsAppIcon from "./WhatsAppIcon";
import { primaryWhatsApp } from "@/lib/data";

const message = "Assalamu’alaikum, saya ingin konsultasi awal mengenai layanan Dzaroza Property. Mohon informasi proses dan langkah selanjutnya.";

export default function ConversionCTA() {
  return (
    <section aria-labelledby="conversion-cta-title" className="relative isolate overflow-hidden bg-orange-500 py-14 text-charcoal-950 sm:py-16">
      <div className="pointer-events-none absolute inset-0 opacity-[0.08]" aria-hidden="true">
        <div className="absolute -right-20 -top-32 h-80 w-80 rounded-full border-[36px] border-charcoal-950" />
        <div className="absolute -bottom-44 -left-20 h-96 w-96 rounded-full border-[42px] border-charcoal-950" />
      </div>
      <div className="relative container-content grid items-center gap-8 px-5 sm:px-8 lg:grid-cols-[1fr_auto] lg:px-12">
        <div className="max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-charcoal-950/15 bg-white/20 px-3 py-1.5 text-xs font-bold">
            <ShieldCheck size={15} aria-hidden="true" />
            Konsultasi awal tanpa komitmen proyek
          </div>
          <h2 id="conversion-cta-title" className="text-2xl font-bold leading-tight tracking-tight sm:text-3xl lg:text-4xl">
            Punya Rencana Bangun, Renovasi, atau Menjual Properti?
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-charcoal-950/75 sm:text-base">
            Ceritakan kebutuhan Anda kepada tim Dzaroza Property. Kami bantu menjelaskan pilihan layanan, ruang lingkup pekerjaan, dan proses kesepakatan sebelum Anda memutuskan langkah berikutnya.
          </p>
          <p className="mt-3 text-xs font-medium text-charcoal-950/65">
            Akad dan ruang lingkup dibahas terlebih dahulu; keputusan tetap di tangan Anda.
          </p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto lg:flex-col">
          <a
            href="#layanan"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-charcoal-950 px-6 py-3 text-sm font-bold text-white shadow-card transition-colors hover:bg-charcoal-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-orange-500"
          >
            Isi Form Konsultasi <ArrowRight size={17} aria-hidden="true" />
          </a>
          <a
            href={`https://wa.me/${primaryWhatsApp}?text=${encodeURIComponent(message)}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Mulai konsultasi umum melalui WhatsApp (membuka tab baru)"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-charcoal-950/25 bg-white/25 px-6 py-3 text-sm font-bold text-charcoal-950 transition-colors hover:bg-white/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-orange-500"
          >
            <WhatsAppIcon size={17} /> Chat WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
