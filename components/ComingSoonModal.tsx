"use client";

import { useEffect, useRef } from "react";
import { X, Clock } from "lucide-react";
import CountdownTimer from "./CountdownTimer";

type Props = {
  productTitle: string;
  releaseDate?: string;
  onClose: () => void;
};

export default function ComingSoonModal({ productTitle, releaseDate, onClose }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])')
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-charcoal-950/90 p-4">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="coming-soon-title"
        tabIndex={-1}
        className="relative w-full max-w-sm rounded-xl2 bg-white p-7 text-center"
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Tutup"
          className="absolute right-4 top-4 rounded p-1 text-charcoal-400 transition-colors hover:text-orange-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
        >
          <X size={18} />
        </button>

        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-orange-500/10 text-orange-500">
          <Clock size={26} aria-hidden="true" />
        </span>

        <h3 id="coming-soon-title" className="mt-4 text-lg font-bold text-charcoal-950">Produk Belum Dirilis</h3>
        <p className="mt-2 text-sm text-charcoal-400 leading-relaxed">
          &ldquo;{productTitle}&rdquo; masih berstatus <span className="font-semibold text-charcoal-700">Coming Soon</span> dan
          belum bisa dibeli saat ini. Nantikan rilisnya dalam:
        </p>

        {releaseDate ? (
          <div className="mt-5">
            <CountdownTimer releaseDate={releaseDate} />
          </div>
        ) : (
          <p className="mt-4 text-sm font-semibold text-orange-700">
            Tanggal rilis akan diumumkan segera.
          </p>
        )}

        <button
          type="button"
          onClick={onClose}
          className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-charcoal-950 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-500 hover:text-charcoal-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
        >
          Oke, Mengerti
        </button>
      </div>
    </div>
  );
}
