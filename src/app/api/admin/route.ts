import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireAdmin } from "@/lib/require-admin";

export async function POST(req: NextRequest) {
  const check = await requireAdmin();
  if (!check.ok) return NextResponse.json({ error: "Non autorise" }, { status: check.status });

  const body = await req.json();
  const supabase = createAdminClient();

  const { data, error } = await supabase.from("products").insert(body).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ product: data });
}

export async function PUT(req: NextRequest) {
  const check = await requireAdmin();
  if (!check.ok) return NextResponse.json({ error: "Non autorise" }, { status: check.status });

  const { id, ...updates } = await req.json();
  if (!id) return NextResponse.json({ error: "id manquant" }, { status: 400 });

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("products")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ product: data });
}

export async function DELETE(req: NextRequest) {
  const check = await requireAdmin();
  if (!check.ok) return NextResponse.json({ error: "Non autorise" }, { status: check.status });

  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "id manquant" }, { status: 400 });

  const supabase = createAdminClient();
  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
