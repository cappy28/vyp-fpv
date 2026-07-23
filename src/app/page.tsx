"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Button from "@/components/ui/Button";

export default function InscriptionPage() {
  const supabase = createClient();
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });

    if (signUpError) {
      setLoading(false);
      setError(signUpError.message);
      return;
    }

    if (data.user) {
      await supabase.from("profiles").insert({
        id: data.user.id,
        full_name: fullName,
      });
    }

    setLoading(false);
    router.push("/compte");
    router.refresh();
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-14">
      <p className="text-mono-label text-signal">Inscription</p>
      <h1 className="mt-2 font-display text-3xl font-700 text-ink">
        Rejoins VYP FPV
      </h1>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <label className="text-mono-label mb-2 block">Nom complet</label>
          <input
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full border border-hairline bg-carbon px-3 py-2.5 text-sm text-ink focus:border-signal/50"
          />
        </div>
        <div>
          <label className="text-mono-label mb-2 block">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-hairline bg-carbon px-3 py-2.5 text-sm text-ink focus:border-signal/50"
          />
        </div>
        <div>
          <label className="text-mono-label mb-2 block">Mot de passe</label>
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-hairline bg-carbon px-3 py-2.5 text-sm text-ink focus:border-signal/50"
          />
        </div>

        {error && <p className="text-xs text-red-400">{error}</p>}

        <Button type="submit" variant="primary" disabled={loading} className="w-full">
          {loading ? "Creation..." : "Creer mon compte"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-ink-muted">
        Deja un compte ?{" "}
        <Link href="/connexion" className="text-signal hover:underline">
          Se connecter
        </Link>
      </p>
    </div>
  );
}
