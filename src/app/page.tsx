import CartView from "@/components/cart/CartView";

export default function PanierPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-8 md:py-14">
      <p className="text-mono-label">Etape 1/3</p>
      <h1 className="mt-2 font-display text-4xl font-700 text-ink">
        Ton panier
      </h1>
      <div className="mt-8">
        <CartView />
      </div>
    </div>
  );
}
