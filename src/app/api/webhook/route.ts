import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Signature Stripe invalide:", err);
    return NextResponse.json({ error: "Signature invalide" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const supabase = createAdminClient();

    const userId = session.metadata?.user_id;
    const cart = session.metadata?.cart ? JSON.parse(session.metadata.cart) : [];

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id: userId && userId !== "guest" ? userId : null,
        status: "paid",
        total: (session.amount_total || 0) / 100,
        stripe_session_id: session.id,
        shipping_address: session.customer_details?.address || null,
      })
      .select()
      .single();

    if (orderError) {
      console.error("Erreur creation commande:", orderError);
      return NextResponse.json({ error: "Erreur commande" }, { status: 500 });
    }

    for (const item of cart as { id: string; q: number; p: number; n: string }[]) {
      await supabase.from("order_items").insert({
        order_id: order.id,
        product_id: item.id,
        product_name: item.n,
        quantity: item.q,
        unit_price: item.p,
      });

      // Decremente le stock sans jamais passer sous zero.
      const { data: product } = await supabase
        .from("products")
        .select("stock")
        .eq("id", item.id)
        .single();

      if (product) {
        await supabase
          .from("products")
          .update({ stock: Math.max(0, product.stock - item.q) })
          .eq("id", item.id);
      }
    }
  }

  return NextResponse.json({ received: true });
}
