import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireAdmin } from "@/lib/require-admin";

export async function PATCH(req: NextRequest) {
  const check = await requireAdmin();
  if (!check.ok) return NextResponse.json({ error: "Non autorise" }, { status: check.status });

  const { id, role } = await req.json();
  if (!id || !role) return NextResponse.json({ error: "Parametres manquants" }, { status: 400 });

  const supabase = createAdminClient();
  const { error } = await supabase.from("profiles").update({ role }).eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
