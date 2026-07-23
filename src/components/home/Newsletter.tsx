"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import Button from "@/components/ui/Button";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  // Branchement possible: creer une table "newsletter_subscribers" dans
  // Supabase, ou appeler l'API d'un service (Brevo, Resend, Mailchimp...)
  // depuis une route /api/newsletter. Ici, UI prete a etre cablee.
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("sent");
    setEmail("");
  }

  return (
    <section className="border-y border-hairline bg-carbon-weave">
      <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-16 text-center md:py-20">
        <p className="text-mono-label text-signal">Reste connecte</p>
        <h2 className="mt-2 font-display text-3xl font-700 text-ink md:text-4xl">
          Nouveautes et bons plans FPV
        </h2>
        <p className="mt-3 max-w-sm text-sm text-ink-muted">
          Un email par mois, zero spam. Nouveaux produits, ventes flash et
          conseils de montage.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 flex w-full max-w-sm flex-col gap-3 sm:flex-row"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ton@email.com"
            className="flex-1 border border-hairline bg-carbon px-4 py-3 text-sm text-ink placeholder:text-ink-faint focus:border-signal/50"
          />
          <Button type="submit" variant="primary">
            <Send className="h-3.5 w-3.5" />
            S'inscrire
          </Button>
        </form>

        {status === "sent" && (
          <p className="mt-3 font-mono text-xs text-signal">
            Inscription confirmee. A bientot dans ta boite mail.
          </p>
        )}
      </div>
    </section>
  );
}
