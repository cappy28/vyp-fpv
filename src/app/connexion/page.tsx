"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Button from "@/components/ui/Button";

export default function ConnexionPage() {
  const supabase = createClient();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (signInError) {
      setError("Email ou mot de passe incorrect.");
      return;
    }

    router.push(searchParams.get("next") || "/compte");
    router.refresh();
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-14">
      <p className="text-mono-label text-signal">Connexion</p>
      <h1 className="mt-2 font-display text-3xl font-700 text-ink">
        Content de te revoir
      </h1>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-hairline bg-carbon px-3 py-2.5 text-sm text-ink focus:border-signal/50"
          />
        </div>

        {error && <p className="text-xs text-red-400">{error}</p>}

        <Button type="submit" variant="primary" disabled={loading} className="w-full">
          {loading ? "Connexion..." : "Se connecter"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-ink-muted">
        Pas encore de compte ?{" "}
        <Link href="/inscription" className="text-signal hover:underline">
          Creer un compte
        </Link>
      </p>
    </div>
  );
}
