"use client";

export default function ErrorBoundary({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6 text-neutral-950">
      <section className="max-w-md text-center" role="alert">
        <p className="text-sm font-semibold uppercase tracking-widest text-orange-600">Terjadi kendala</p>
        <h1 className="mt-3 text-3xl font-semibold">Halaman belum dapat ditampilkan</h1>
        <p className="mt-4 text-neutral-600">Silakan coba kembali. Jika masalah berlanjut, hubungi tim Dzaroza Property.</p>
        <button className="mt-8 rounded-lg bg-neutral-950 px-5 py-3 text-sm font-semibold text-white" onClick={() => reset()}>
          Coba lagi
        </button>
      </section>
    </main>
  );
}
