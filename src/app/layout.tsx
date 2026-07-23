import Link from "next/link";
import { LayoutDashboard, Package, ShoppingBag, Users } from "lucide-react";

const LINKS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/produits", label: "Produits", icon: Package },
  { href: "/admin/commandes", label: "Commandes", icon: ShoppingBag },
  { href: "/admin/utilisateurs", label: "Utilisateurs", icon: Users },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-10 md:flex-row md:px-8 md:py-14">
      <aside className="shrink-0 md:w-56">
        <p className="text-mono-label text-copper">Zone admin</p>
        <nav className="mt-4 flex gap-1 overflow-x-auto md:flex-col md:overflow-visible">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex shrink-0 items-center gap-2.5 border border-hairline px-4 py-2.5 text-sm text-ink-muted transition hover:border-signal/40 hover:text-signal md:border-0 md:px-2 md:py-2"
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
