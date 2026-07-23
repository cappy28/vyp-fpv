import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AccountTabs from "@/components/account/AccountTabs";
import type { Profile, Order, Product } from "@/lib/types";

export const metadata = { title: "Mon compte" };

export default async function ComptePage({
  searchParams,
}: {
  searchParams: { tab?: string };
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/connexion?next=/compte");

  const [{ data: profile }, { data: orders }, { data: wishlist }] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", user.id).maybeSingle(),
    supabase
      .from("orders")
      .select("*, order_items(*)")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false }),
    supabase
      .from("wishlist")
      .select("products(*, categories(*))")
      .eq("user_id", user.id),
  ]);

  const wishlistProducts = (wishlist || [])
    .map((w: { products: Product | null }) => w.products)
    .filter(Boolean) as Product[];

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 md:px-8 md:py-14">
      <p className="text-mono-label">Espace pilote</p>
      <h1 className="mt-2 font-display text-4xl font-700 text-ink">
        Mon compte
      </h1>

      <div className="mt-8">
        <AccountTabs
          initialTab={searchParams.tab || "infos"}
          profile={profile as Profile | null}
          email={user.email || ""}
          orders={(orders || []) as Order[]}
          wishlistProducts={wishlistProducts}
        />
      </div>
    </div>
  );
}
