import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import ProductForm from "@/components/admin/ProductForm";
import type { Category, Product } from "@/lib/types";

export const metadata = { title: "Modifier produit — Admin" };
export const dynamic = "force-dynamic";

export default async function EditProduitPage({ params }: { params: { id: string } }) {
  const supabase = createAdminClient();
  const [{ data: categories }, { data: product }] = await Promise.all([
    supabase.from("categories").select("*").order("name"),
    supabase.from("products").select("*").eq("id", params.id).single(),
  ]);

  if (!product) notFound();

  return (
    <div>
      <h1 className="font-display text-3xl font-700 text-ink">Modifier le produit</h1>
      <div className="mt-6">
        <ProductForm categories={(categories || []) as Category[]} product={product as Product} />
      </div>
    </div>
  );
}
