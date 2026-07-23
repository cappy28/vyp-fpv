import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// ATTENTION: client "service_role" -> contourne toute la RLS.
// A utiliser UNIQUEMENT dans du code serveur (routes /api, Server
// Actions protegees par un controle de role admin). Ne jamais
// importer ce fichier dans un composant client.
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: { autoRefreshToken: false, persistSession: false },
    }
  );
}
