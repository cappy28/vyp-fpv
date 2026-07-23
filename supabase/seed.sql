-- ==========================================================
-- VYP FPV — Donnees de demo
-- A executer APRES schema.sql, dans le SQL Editor de Supabase.
-- Remplace les URLs d'images par tes propres visuels uploades
-- dans Storage > product-images une fois prets.
-- ==========================================================

insert into public.categories (name, slug, description, icon) values
  ('Sangles LiPo', 'sangles-lipo', 'Sangles de maintien pour batteries LiPo', 'strap'),
  ('Pads batterie', 'pads-batterie', 'Pads antiderapants pour fixation batterie', 'square'),
  ('Protections drone', 'protections-drone', 'Protections d''helices et de chassis', 'shield'),
  ('Etuis lunettes FPV', 'etuis-lunettes-fpv', 'Etuis de transport pour goggles FPV', 'glasses'),
  ('Accessoires radiocommande', 'accessoires-radio', 'Supports, dragonnes et protections radio', 'radio'),
  ('Outils reparation', 'outils-reparation', 'Outils pour montage et reparation', 'wrench'),
  ('Antennes', 'antennes', 'Antennes video et liaison radio', 'antenna'),
  ('Cables', 'cables', 'Cables de charge, video et connectique', 'cable'),
  ('Organisation sac FPV', 'organisation-sac', 'Rangement et sacoches de transport', 'bag')
on conflict (slug) do nothing;

insert into public.products
  (category_id, name, slug, short_description, description, price, compare_at_price, stock, weight_g, sku, images, featured)
values
  (
    (select id from public.categories where slug = 'sangles-lipo'),
    'Sangle LiPo Premium',
    'sangle-lipo-premium',
    'Sangle en silicone renforce, grip maximal',
    'Sangle de maintien LiPo en silicone haute resistance. Le grip texture empeche tout glissement de la batterie en vol, meme en freestyle intensif. Boucle metal renforcee, resiste jusqu''a 40kg de traction. Disponible en 200mm, compatible chassis 5 pouces.',
    9.90, 12.90, 42, 18, 'VYP-STR-001',
    array['https://images.unsplash.com/photo-1508614999368-9260051292e5?w=800'],
    true
  ),
  (
    (select id from public.categories where slug = 'pads-batterie'),
    'Pad antiderapant batterie',
    'pad-antiderapant-batterie',
    'Mousse haute densite, double face adhesive',
    'Pad en mousse EVA haute densite qui absorbe les vibrations et empeche le glissement de la batterie sur le chassis. Adhesif double face professionnel, tenue longue duree meme par temps chaud. Decoupe facile aux dimensions du chassis.',
    6.50, null, 78, 12, 'VYP-PAD-002',
    array['https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?w=800'],
    true
  ),
  (
    (select id from public.categories where slug = 'protections-drone'),
    'Protection helice FPV',
    'protection-helice-fpv',
    'Set de 4 protections en polycarbonate flexible',
    'Set de 4 protections d''helices en polycarbonate flexible, absorbe les chocs sans casser. Ideales pour l''apprentissage et le vol en interieur. Montage rapide sans outil sur la plupart des chassis 3 et 5 pouces.',
    14.90, null, 35, 45, 'VYP-PRO-003',
    array['https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800'],
    false
  ),
  (
    (select id from public.categories where slug = 'etuis-lunettes-fpv'),
    'Etui DJI Goggles',
    'etui-dji-goggles',
    'Coque rigide EVA, mousse decoupee sur mesure',
    'Etui de protection rigide en EVA moule pour lunettes DJI Goggles 2 / Integra. Interieur en mousse decoupee sur mesure, compartiment pour antennes et cable. Fermeture eclair renforcee, poignee de transport.',
    24.90, 29.90, 21, 340, 'VYP-CAS-004',
    array['https://images.unsplash.com/photo-1592478411213-6153e4ebc696?w=800'],
    true
  ),
  (
    (select id from public.categories where slug = 'accessoires-radio'),
    'Support radiocommande',
    'support-radiocommande',
    'Support de cou ergonomique, repartition du poids',
    'Support de radiocommande a porter autour du cou, repartit le poids sur les epaules pour des sessions longues sans fatigue des poignets. Compatible avec la plupart des radios FPV (TBS, RadioMaster, FrSky).',
    17.90, null, 29, 210, 'VYP-RAD-005',
    array['https://images.unsplash.com/photo-1591370874773-6702e8f12fd8?w=800'],
    false
  ),
  (
    (select id from public.categories where slug = 'outils-reparation'),
    'Kit tournevis FPV',
    'kit-tournevis-fpv',
    '10 embouts precision, etui aimante inclus',
    'Kit de 10 tournevis de precision specialement selectionnes pour le montage et la reparation de drones FPV (Torx, Phillips, hex). Embouts en acier trempe, manche ergonomique antiderapant. Etui aimante pour ranger chaque embout.',
    19.90, null, 53, 280, 'VYP-OUT-006',
    array['https://images.unsplash.com/photo-1580901368919-7738efb0f87e?w=800'],
    false
  ),
  (
    (select id from public.categories where slug = 'organisation-sac'),
    'Pochette outils FPV',
    'pochette-outils-fpv',
    'Organisation modulaire, tissu balistique',
    'Pochette de rangement en tissu balistique resistant a l''abrasion. Compartiments modulaires pour outils, connecteurs, straps et petites pieces. Se glisse dans n''importe quel sac a dos ou valise de transport.',
    16.90, null, 40, 190, 'VYP-POC-007',
    array['https://images.unsplash.com/photo-1516382799247-87df95d790b7?w=800'],
    false
  ),
  (
    (select id from public.categories where slug = 'antennes'),
    'Antenne FPV Lollipop',
    'antenne-fpv-lollipop',
    'Antenne circulaire 5.8GHz, gain 2.5dBi',
    'Antenne video circulaire 5.8GHz format Lollipop, gain 2.5dBi. Reduction significative des interferences par rapport a une antenne lineaire, image plus stable en conditions de vol difficiles. Connecteur MMCX ou SMA au choix.',
    13.90, null, 61, 8, 'VYP-ANT-008',
    array['https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800'],
    true
  )
on conflict (slug) do nothing;
