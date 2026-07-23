# VYP FPV — Boutique d'accessoires FPV

Boutique e-commerce complete : Next.js 14 (App Router) + TypeScript + Tailwind
+ Framer Motion + une scene 3D (react-three-fiber) + Supabase (DB, auth,
storage) + Stripe (paiement) + Vercel (hebergement).

## Structure du projet

```
vyp-fpv/
├── src/
│   ├── app/                  routes (App Router)
│   │   ├── page.tsx                accueil
│   │   ├── boutique/               liste produits + filtres
│   │   ├── produit/[slug]/         fiche produit
│   │   ├── panier/                 panier
│   │   ├── compte/                 espace client (infos, adresse, commandes, favoris)
│   │   ├── connexion/, inscription/
│   │   ├── admin/                  dashboard, produits, commandes, utilisateurs
│   │   └── api/                    routes serveur (checkout, webhook, admin/*)
│   ├── components/            composants React separes par domaine
│   ├── lib/                   clients Supabase/Stripe, types, utils, cart store
│   └── middleware.ts           protection des routes /compte et /admin
├── supabase/
│   ├── schema.sql              tables + relations + RLS (a executer en 1er)
│   └── seed.sql                 categories + 8 produits de demo (a executer ensuite)
└── .env.local.example           liste des variables d'environnement
```

## 1. Mettre en place Supabase

1. Cree un projet sur [supabase.com](https://supabase.com).
2. Va dans **SQL Editor > New query**, colle le contenu de `supabase/schema.sql`, execute.
3. Fais de meme avec `supabase/seed.sql` pour avoir les 9 categories et 8 produits de demo.
4. Va dans **Storage**, verifie que le bucket `product-images` existe (cree par le schema) et qu'il est public.
5. Va dans **Authentication > Providers**, active "Email".
6. Pour te donner les droits admin : dans **Table Editor > profiles**, une fois inscrit sur le site, change ta ligne `role` de `customer` a `admin`.
7. Recupere tes cles dans **Project Settings > API** :
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` (secrete !) → `SUPABASE_SERVICE_ROLE_KEY`

## 2. Mettre en place Stripe

1. Cree un compte sur [stripe.com](https://stripe.com) (mode test suffit pour commencer).
2. **Developers > API keys** → recupere `Secret key` (`STRIPE_SECRET_KEY`) et `Publishable key` (`NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`).
3. **Developers > Webhooks > Add endpoint** :
   - URL : `https://ton-domaine.vercel.app/api/webhook`
   - Evenement a ecouter : `checkout.session.completed`
   - Recupere le `Signing secret` → `STRIPE_WEBHOOK_SECRET`

## 3. Ou mettre les cles API (important)

**Jamais dans le code, jamais commit sur GitHub.** Deux endroits :

- **En local** (si un jour tu as un terminal) : copie `.env.local.example` en `.env.local`.
- **Sur Vercel** (ce que tu utiliseras au quotidien) : *Project > Settings >
  Environment Variables*, ajoute chaque variable de `.env.local.example` avec
  sa vraie valeur, pour les environnements Production + Preview.

## 4. Deployer (sans terminal, depuis GitHub + Vercel)

1. Cree un nouveau repo GitHub, upload tout le contenu de ce zip (glisser-deposer
   les fichiers/dossiers via l'interface web GitHub, "Add file > Upload files").
   Verifie que la structure de dossiers est preservee (`src/`, `supabase/`, etc.).
2. Va sur [vercel.com](https://vercel.com), "Add New Project", importe le repo GitHub.
3. Renseigne les variables d'environnement (etape 3 ci-dessus) avant le premier deploy.
4. Lance le deploiement. Vercel installe les dependances et build automatiquement
   — c'est lui qui te sert de "terminal": si le build echoue, l'onglet
   **Deployments > (ton deploy) > Build Logs** affiche l'erreur exacte a corriger.
5. Une fois en ligne, mets a jour `NEXT_PUBLIC_SITE_URL` avec l'URL Vercel finale
   et l'URL du webhook Stripe (etape 2), puis redeploie.

### Boucle de travail sans terminal
Chaque modification de fichier via l'interface web GitHub declenche
automatiquement un nouveau build Vercel. Les **Preview Deployments** (un par
pull request ou par commit sur une branche) te donnent une URL de test avant
de merger sur `main`. C'est ce qui remplace `npm run dev` en local.

## 5. Devenir admin

Inscris-toi sur le site (`/inscription`), puis dans Supabase **Table Editor >
profiles**, passe ton `role` a `admin`. Le dashboard est accessible sur `/admin`.

## Fonctionnalites incluses

- Accueil : hero avec scene 3D (drone procedural en react-three-fiber),
  produits populaires, categories, avis, newsletter, FAQ
- Boutique : recherche, filtres (categorie, prix, stock), tri
- Fiche produit : galerie, avis notes/commentaires, produits similaires, favoris
- Panier persistant (localStorage) avec paiement Stripe Checkout
- Compte client : infos, adresse, historique de commandes, favoris
- Admin : dashboard, CRUD produits (avec upload d'images vers Supabase
  Storage), gestion des commandes (changement de statut), gestion des roles
  utilisateurs
- SEO : metadonnees par page, Open Graph, sitemap.xml, robots.txt, page 404 custom
- RLS Supabase complete (lecture publique produits/categories, ecriture
  restreinte au propre compte ou aux routes admin via service_role)

## Pistes d'evolution

- Adresses de livraison multiples, codes promo, gestion de la TVA
- Emails transactionnels (confirmation de commande) via Resend/Brevo
- Vraie pagination boutique si le catalogue grossit (au dela de ~50 produits)
- Remplacer le drone procedural par un GLB reel (`useGLTF` de `@react-three/drei`)
  si tu veux reutiliser le modele de ton portfolio
