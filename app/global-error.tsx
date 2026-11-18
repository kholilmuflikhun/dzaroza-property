"use client";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="id">
      <body>
        <main className="flex min-h-screen items-center justify-center bg-white px-6 text-neutral-950">
          <section className="max-w-md text-center" role="alert">
            <h1 className="text-3xl font-semibold">Terjadi gangguan sistem</h1>
            <p className="mt-4 text-neutral-600">Silakan muat ulang halaman atau coba beberapa saat lagi.</p>
            <button className="mt-8 rounded-lg bg-neutral-950 px-5 py-3 text-sm font-semibold text-white" onClick={() => reset()}>
              Muat ulang
            </button>
          </section>
        </main>
      </body>
    </html>
  );
}
