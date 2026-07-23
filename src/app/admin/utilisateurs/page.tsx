import { createAdminClient } from "@/lib/supabase/admin";
import UserRoleSelect from "@/components/admin/UserRoleSelect";

export const metadata = { title: "Utilisateurs — Admin" };
export const dynamic = "force-dynamic";

export default async function AdminUtilisateursPage() {
  const supabase = createAdminClient();
  const { data: profiles } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="font-display text-3xl font-700 text-ink">Utilisateurs</h1>

      <div className="mt-6 overflow-x-auto border border-hairline">
        <table className="w-full min-w-[520px] text-left text-sm">
          <thead className="border-b border-hairline text-mono-label">
            <tr>
              <th className="px-4 py-3">Nom</th>
              <th className="px-4 py-3">Ville</th>
              <th className="px-4 py-3">Inscrit le</th>
              <th className="px-4 py-3">Role</th>
            </tr>
          </thead>
          <tbody>
            {(profiles || []).map((p) => (
              <tr key={p.id} className="border-b border-hairline last:border-0">
                <td className="px-4 py-3 text-ink">{p.full_name || "—"}</td>
                <td className="px-4 py-3 text-ink-muted">{p.city || "—"}</td>
                <td className="px-4 py-3 font-mono text-xs text-ink-muted">
                  {new Date(p.created_at).toLocaleDateString("fr-FR")}
                </td>
                <td className="px-4 py-3">
                  <UserRoleSelect id={p.id} role={p.role} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
