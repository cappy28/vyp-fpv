"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import type { Profile } from "@/lib/types";

export default function AddressForm({ profile }: { profile: Profile | null }) {
  const supabase = createClient();
  const router = useRouter();
  const [form, setForm] = useState({
    address_line1: profile?.address_line1 || "",
    address_line2: profile?.address_line2 || "",
    postal_code: profile?.postal_code || "",
    city: profile?.city || "",
    country: profile?.country || "France",
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  function update(key: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await supabase.from("profiles").upsert({
      id: (await supabase.auth.getUser()).data.user?.id,
      ...form,
    });
    setSaving(false);
    setSaved(true);
    router.refresh();
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md space-y-4">
      <div>
        <label className="text-mono-label mb-2 block">Adresse</label>
        <input
          value={form.address_line1}
          onChange={(e) => update("address_line1", e.target.value)}
          placeholder="Numero et rue"
          className="w-full border border-hairline bg-carbon px-3 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:border-signal/50"
        />
      </div>
      <div>
        <label className="text-mono-label mb-2 block">Complement</label>
        <input
          value={form.address_line2}
          onChange={(e) => update("address_line2", e.target.value)}
          placeholder="Batiment, appartement..."
          className="w-full border border-hairline bg-carbon px-3 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:border-signal/50"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-mono-label mb-2 block">Code postal</label>
          <input
            value={form.postal_code}
            onChange={(e) => update("postal_code", e.target.value)}
            className="w-full border border-hairline bg-carbon px-3 py-2.5 text-sm text-ink focus:border-signal/50"
          />
        </div>
        <div>
          <label className="text-mono-label mb-2 block">Ville</label>
          <input
            value={form.city}
            onChange={(e) => update("city", e.target.value)}
            className="w-full border border-hairline bg-carbon px-3 py-2.5 text-sm text-ink focus:border-signal/50"
          />
        </div>
      </div>
      <div>
        <label className="text-mono-label mb-2 block">Pays</label>
        <input
          value={form.country}
          onChange={(e) => update("country", e.target.value)}
          className="w-full border border-hairline bg-carbon px-3 py-2.5 text-sm text-ink focus:border-signal/50"
        />
      </div>
      <Button type="submit" variant="secondary" disabled={saving}>
        {saving ? "Enregistrement..." : saved ? "Enregistre" : "Enregistrer"}
      </Button>
    </form>
  );
}
