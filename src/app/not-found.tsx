import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <div className="reticle border border-hairline bg-carbon px-8 py-10">
        <p className="text-mono-label text-copper animate-blink">SIGNAL PERDU</p>
        <h1 className="mt-3 font-display text-6xl font-700 text-ink">404</h1>
        <p className="mt-4 max-w-sm text-ink-muted">
          Cette page a quitte le champ de vision. Le lien est peut-etre
          casse ou la page a ete deplacee.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block border border-signal/40 bg-signal/10 px-6 py-3 text-mono-label text-signal transition hover:bg-signal/20"
        >
          Retour a la base
        </Link>
      </div>
    </div>
  );
}
