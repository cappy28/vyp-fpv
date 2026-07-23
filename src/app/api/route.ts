import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";
import type { CartItem } from "@/lib/types";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vyp-fpv.vercel.app";

export async function POST(req: NextRequest) {
  try {
    const { items } = (await req.json()) as { items: CartItem[] };

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Panier vide" }, { status: 400 });
    }

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Pour un volume plus important, prefere creer une commande "pending"
    // en base ici et ne passer que son id en metadata (limite Stripe:
    // 500 caracteres par valeur de metadata). Pour une boutique de cette
    // taille, on passe directement le panier compresse.
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: items.map((item) => ({
        quantity: item.quantity,
        price_data: {
          currency: "eur",
          unit_amount: Math.round(item.price * 100),
          product_data: {
            name: item.name,
            metadata: { product_id: item.productId },
          },
        },
      })),
      success_url: `${siteUrl}/compte?tab=commandes&success=1`,
      cancel_url: `${siteUrl}/panier`,
      customer_email: user?.email,
      shipping_address_collection: { allowed_countries: ["FR", "BE", "CH", "LU"] },
      metadata: {
        user_id: user?.id || "guest",
        cart: JSON.stringify(
          items.map((i) => ({ id: i.productId, q: i.quantity, p: i.price, n: i.name }))
        ).slice(0, 490),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Erreur creation session Stripe:", err);
    return NextResponse.json(
      { error: "Erreur lors de la creation du paiement" },
      { status: 500 }
    );
  }
}
