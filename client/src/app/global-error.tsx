"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex items-center justify-center bg-slate-950 text-white px-6">
        <div className="max-w-lg text-center space-y-6">
          <p className="text-xs uppercase tracking-[0.35em] text-blue-300 font-black">
            ClinicFlow
          </p>
          <h1 className="text-3xl font-black">Something went wrong</h1>
          <p className="text-slate-300 leading-relaxed">
            The app hit an unexpected error while rendering. You can retry the page or return to the home screen.
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={reset}
              className="px-5 py-3 rounded-xl bg-blue-600 font-bold hover:bg-blue-500 transition-colors"
            >
              Retry
            </button>
            <a
              href="/"
              className="px-5 py-3 rounded-xl bg-white/10 font-bold hover:bg-white/15 transition-colors"
            >
              Home
            </a>
          </div>
          {error?.digest ? (
            <p className="text-xs text-slate-500 font-mono">Error ID: {error.digest}</p>
          ) : null}
        </div>
      </body>
    </html>
  );
}
