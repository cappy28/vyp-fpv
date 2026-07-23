import Link from "next/link";
import { Radio } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-hairline bg-carbon">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <Radio className="h-5 w-5 text-signal" strokeWidth={1.75} />
              <span className="font-display text-lg font-700 text-ink">
                VYP<span className="text-signal">FPV</span>
              </span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-ink-muted">
              Accessoires FPV selectionnes pour pilotes exigeants. Sangles,
              protections, antennes et outils testes en vol.
            </p>
          </div>

          <div>
            <p className="text-mono-label mb-4">Boutique</p>
            <ul className="space-y-2 text-sm text-ink-muted">
              <li><Link href="/boutique" className="hover:text-signal">Tous les produits</Link></li>
              <li><Link href="/boutique?categorie=antennes" className="hover:text-signal">Antennes</Link></li>
              <li><Link href="/boutique?categorie=sangles-lipo" className="hover:text-signal">Sangles LiPo</Link></li>
              <li><Link href="/boutique?categorie=outils-reparation" className="hover:text-signal">Outils</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-mono-label mb-4">Compte</p>
            <ul className="space-y-2 text-sm text-ink-muted">
              <li><Link href="/connexion" className="hover:text-signal">Connexion</Link></li>
              <li><Link href="/compte?tab=commandes" className="hover:text-signal">Suivi de commande</Link></li>
              <li><Link href="/compte?tab=favoris" className="hover:text-signal">Favoris</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-mono-label mb-4">Infos</p>
            <ul className="space-y-2 text-sm text-ink-muted">
              <li>Livraison sous 48-72h en France</li>
              <li>Paiement securise par Stripe</li>
              <li>contact@vyp-fpv.com</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-hairline pt-6 font-mono text-[11px] text-ink-faint md:flex-row">
          <span>&copy; {new Date().getFullYear()} VYP FPV — Tous droits reserves</span>
          <span>SYS.STATUS: ONLINE</span>
        </div>
      </div>
    </footer>
  );
}
