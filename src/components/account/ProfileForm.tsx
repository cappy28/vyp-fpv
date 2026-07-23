"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import type { Profile } from "@/lib/types";

export default function ProfileForm({
  profile,
  email,
}: {
  profile: Profile | null;
  email: string;
}) {
  const supabase = createClient();
  const router = useRouter();
  const [fullName, setFullName] = useState(profile?.full_name || "");
  const [phone, setPhone] = useState(profile?.phone || "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await supabase.from("profiles").upsert({
      id: (await supabase.auth.getUser()).data.user?.id,
      full_name: fullName,
      phone,
    });
    setSaving(false);
    setSaved(true);
    router.refresh();
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md space-y-4">
      <div>
        <label className="text-mono-label mb-2 block">Email</label>
        <input
          value={email}
          disabled
          className="w-full border border-hairline bg-carbon2 px-3 py-2.5 text-sm text-ink-muted"
        />
      </div>
      <div>
        <label className="text-mono-label mb-2 block">Nom complet</label>
        <input
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full border border-hairline bg-carbon px-3 py-2.5 text-sm text-ink focus:border-signal/50"
        />
      </div>
      <div>
        <label className="text-mono-label mb-2 block">Telephone</label>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border border-hairline bg-carbon px-3 py-2.5 text-sm text-ink focus:border-signal/50"
        />
      </div>
      <Button type="submit" variant="secondary" disabled={saving}>
        {saving ? "Enregistrement..." : saved ? "Enregistre" : "Enregistrer"}
      </Button>
    </form>
  );
}
