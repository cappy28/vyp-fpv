import { createAdminClient } from "@/lib/supabase/admin";
import ProductForm from "@/components/admin/ProductForm";
import type { Category } from "@/lib/types";

export const metadata = { title: "Nouveau produit — Admin" };
export const dynamic = "force-dynamic";

export default async function NouveauProduitPage() {
  const supabase = createAdminClient();
  const { data: categories } = await supabase.from("categories").select("*").order("name");

  return (
    <div>
      <h1 className="font-display text-3xl font-700 text-ink">Nouveau produit</h1>
      <div className="mt-6">
        <ProductForm categories={(categories || []) as Category[]} />
      </div>
    </div>
  );
}
