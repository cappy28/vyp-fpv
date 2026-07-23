import { createClient } from "@/lib/supabase/server";
import Hero from "@/components/home/Hero";
import CategoriesGrid from "@/components/home/CategoriesGrid";
import PopularProducts from "@/components/home/PopularProducts";
import Testimonials from "@/components/home/Testimonials";
import Newsletter from "@/components/home/Newsletter";
import FAQ from "@/components/home/FAQ";
import type { Category, Product } from "@/lib/types";

export const revalidate = 60;

async function getHomeData() {
  const supabase = createClient();

  const [{ data: categories }, { data: products }] = await Promise.all([
    supabase.from("categories").select("*").order("name"),
    supabase
      .from("products")
      .select("*, categories(*)")
      .eq("featured", true)
      .limit(8),
  ]);

  return {
    categories: (categories || []) as Category[],
    products: (products || []) as Product[],
  };
}

export default async function HomePage() {
  const { categories, products } = await getHomeData();

  return (
    <>
      <Hero />
      <CategoriesGrid categories={categories} />
      <PopularProducts products={products} />
      <Testimonials />
      <Newsletter />
      <FAQ />
    </>
  );
}
