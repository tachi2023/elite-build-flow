// Élite Placo & Déco | PRIMA BTP — données simulées (côté pro/entreprise)

export type Currency = number; // FCFA

export type ServiceItem = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  bullets: string[];
  from: Currency; // prix indicatif au m²
  icon: string;
};

export const SERVICES: ServiceItem[] = [
  {
    id: "placo",
    title: "Cloisons & Placoplâtre",
    tagline: "Structures sèches sur mesure",
    description:
      "Cloisons séparatives, doublages thermiques et acoustiques, gaines techniques. Pose BA13 standard, hydrofuge et coupe-feu selon l'usage de la pièce.",
    bullets: ["Cloison 72/48 & 98/48", "Doublage isolant", "Plaques hydro (cuisine, SDB)", "Coupe-feu 1h & 2h"],
    from: 9500,
    icon: "layout-panel-left",
  },
  {
    id: "faux-plafond",
    title: "Faux plafonds décoratifs",
    tagline: "Volumes, lumière et relief",
    description:
      "Plafonds suspendus, retombées, corniches lumineuses et intégration complète de l'éclairage LED indirect.",
    bullets: ["Plafond suspendu BA13", "Retombées & gorges LED", "Dalles démontables 60×60", "Acoustique bureaux"],
    from: 12000,
    icon: "panel-top",
  },
  {
    id: "staff",
    title: "Staff & moulures",
    tagline: "L'élégance du plâtre traditionnel",
    description:
      "Rosaces, corniches, colonnes et éléments décoratifs en staff, réalisés et posés par nos plâtriers d'art.",
    bullets: ["Corniches sur mesure", "Rosaces & médaillons", "Colonnes et pilastres", "Restauration"],
    from: 15000,
    icon: "crown",
  },
  {
    id: "peinture",
    title: "Peinture & enduits décoratifs",
    tagline: "Finitions haut de gamme",
    description:
      "Enduits lissés, béton ciré, stuc vénitien et peintures premium avec préparation soignée des supports.",
    bullets: ["Enduit lissé qualité A", "Béton ciré", "Stuc & effets matières", "Peinture lessivable"],
    from: 4500,
    icon: "paint-roller",
  },
  {
    id: "revetement",
    title: "Revêtements muraux & sols",
    tagline: "Matières nobles",
    description: "Papiers peints panoramiques, lambris, parquets stratifiés et plinthes décoratives.",
    bullets: ["Papier peint panoramique", "Lambris bois & PVC", "Parquet & stratifié", "Plinthes déco"],
    from: 7000,
    icon: "layers",
  },
  {
    id: "design",
    title: "Design d'intérieur",
    tagline: "Du plan 3D à la livraison",
    description:
      "Conception d'espace, planches d'ambiance, rendu 3D et suivi complet du chantier par un chef de projet dédié.",
    bullets: ["Relevé de métrés", "Plans & 3D", "Planches matières", "Suivi de chantier"],
    from: 0,
    icon: "ruler",
  },
];

export type Realisation = {
  id: string;
  title: string;
  category: "Résidentiel" | "Commercial" | "Bureaux" | "Hôtellerie";
  location: string;
  surface: number;
  year: number;
  duration: string;
  budget: Currency;
  cover: string;
  before: string;
  after: string;
  description: string;
  tags: string[];
};

const img = (seed: string, w = 1200, h = 800) =>
  `https://picsum.photos/seed/${encodeURIComponent(seed)}/${w}/${h}`;

export const REALISATIONS: Realisation[] = [
  {
    id: "R-01", title: "Villa Bonapriso — Salon cathédrale", category: "Résidentiel",
    location: "Bonapriso, Douala", surface: 240, year: 2025, duration: "7 semaines", budget: 18_500_000,
    cover: img("elite-villa-1"), before: img("elite-villa-1-b"), after: img("elite-villa-1-a"),
    description: "Faux plafond à double retombée avec gorge lumineuse, staff décoratif et enduit lissé qualité A sur l'ensemble du séjour.",
    tags: ["Faux plafond", "Staff", "LED", "Enduit lissé"],
  },
  {
    id: "R-02", title: "Siège PRIMA — Open space 40 postes", category: "Bureaux",
    location: "Akwa, Douala", surface: 620, year: 2025, duration: "10 semaines", budget: 42_000_000,
    cover: img("elite-office-1"), before: img("elite-office-1-b"), after: img("elite-office-1-a"),
    description: "Cloisonnement acoustique, plafond dalles 60×60 et salles de réunion vitrées avec doublage phonique.",
    tags: ["Cloisons", "Acoustique", "Bureaux"],
  },
  {
    id: "R-03", title: "Boutique Élégance — Bonanjo", category: "Commercial",
    location: "Bonanjo, Douala", surface: 95, year: 2024, duration: "3 semaines", budget: 7_800_000,
    cover: img("elite-shop-1"), before: img("elite-shop-1-b"), after: img("elite-shop-1-a"),
    description: "Habillage mural en niches rétroéclairées, béton ciré au sol et plafond noir mat technique.",
    tags: ["Niches LED", "Béton ciré", "Retail"],
  },
  {
    id: "R-04", title: "Résidence Kotto — 6 appartements", category: "Résidentiel",
    location: "Kotto, Douala", surface: 480, year: 2024, duration: "12 semaines", budget: 29_400_000,
    cover: img("elite-appart-1"), before: img("elite-appart-1-b"), after: img("elite-appart-1-a"),
    description: "Doublage thermique complet, faux plafonds périphériques et peinture premium sur six logements livrés clé en main.",
    tags: ["Doublage", "Peinture", "Clé en main"],
  },
  {
    id: "R-05", title: "Hôtel Sawa — 18 chambres rénovées", category: "Hôtellerie",
    location: "Bonanjo, Douala", surface: 760, year: 2023, duration: "16 semaines", budget: 55_000_000,
    cover: img("elite-hotel-1"), before: img("elite-hotel-1-b"), after: img("elite-hotel-1-a"),
    description: "Rénovation intégrale : têtes de lit en staff, corniches lumineuses, lambris et finitions haut de gamme.",
    tags: ["Hôtellerie", "Staff", "Lambris"],
  },
  {
    id: "R-06", title: "Duplex Bonamoussadi", category: "Résidentiel",
    location: "Bonamoussadi, Douala", surface: 310, year: 2023, duration: "9 semaines", budget: 21_200_000,
    cover: img("elite-duplex-1"), before: img("elite-duplex-1-b"), after: img("elite-duplex-1-a"),
    description: "Escalier habillé, plafond en caissons et stuc vénitien dans les pièces de réception.",
    tags: ["Caissons", "Stuc vénitien"],
  },
];

// ── Chantiers (pro) ──
export type ChantierStatus = "Prospection" | "Devis" | "En cours" | "Finitions" | "Livré";

export type Chantier = {
  id: string;
  ref: string;
  name: string;
  client: string;
  clientPhone: string;
  address: string;
  status: ChantierStatus;
  progress: number;
  budget: Currency;
  spent: Currency;
  invoiced: Currency;
  paid: Currency;
  startAt: string;
  endAt: string;
  chef: string;
  team: string[];
  surface: number;
  photos: string[];
};

const day = (n: number) => new Date(Date.now() + n * 86400_000).toISOString();

export const CHANTIERS: Chantier[] = [
  {
    id: "CH-2026-014", ref: "CH-2026-014", name: "Villa Mbappe — Bonapriso", client: "Marie Tchoungui",
    clientPhone: "+237 6 99 41 22 08", address: "Rue Njo-Njo, Bonapriso, Douala",
    status: "En cours", progress: 62, budget: 24_800_000, spent: 13_900_000, invoiced: 16_000_000, paid: 12_400_000,
    startAt: day(-48), endAt: day(22), chef: "Alain Ngassa", team: ["Serge M.", "Blaise K.", "Yannick T.", "Idriss B."],
    surface: 280, photos: [img("ch14a"), img("ch14b"), img("ch14c")],
  },
  {
    id: "CH-2026-011", ref: "CH-2026-011", name: "Bureaux Wouri Trading", client: "Wouri Trading SARL",
    clientPhone: "+237 6 77 12 88 40", address: "Boulevard de la Liberté, Akwa",
    status: "Finitions", progress: 88, budget: 38_500_000, spent: 30_100_000, invoiced: 34_000_000, paid: 27_000_000,
    startAt: day(-92), endAt: day(9), chef: "Patrick Etoa", team: ["Junior N.", "Roland S.", "Ali M."],
    surface: 540, photos: [img("ch11a"), img("ch11b")],
  },
  {
    id: "CH-2026-018", ref: "CH-2026-018", name: "Appartement Kotto B3", client: "Éric Fotso",
    clientPhone: "+237 6 90 33 71 15", address: "Kotto, Douala V",
    status: "Devis", progress: 5, budget: 9_600_000, spent: 0, invoiced: 0, paid: 0,
    startAt: day(12), endAt: day(54), chef: "Alain Ngassa", team: [],
    surface: 120, photos: [img("ch18a")],
  },
  {
    id: "CH-2026-009", ref: "CH-2026-009", name: "Restaurant Le Fumoir", client: "Le Fumoir SARL",
    clientPhone: "+237 6 55 90 12 47", address: "Bonanjo, Douala",
    status: "Livré", progress: 100, budget: 15_200_000, spent: 11_800_000, invoiced: 15_200_000, paid: 15_200_000,
    startAt: day(-140), endAt: day(-26), chef: "Patrick Etoa", team: ["Serge M.", "Blaise K."],
    surface: 180, photos: [img("ch09a"), img("ch09b")],
  },
  {
    id: "CH-2026-020", ref: "CH-2026-020", name: "Résidence Logpom — Lot A", client: "Immo Sawa",
    clientPhone: "+237 6 71 45 66 21", address: "Logpom, Douala",
    status: "Prospection", progress: 0, budget: 61_000_000, spent: 0, invoiced: 0, paid: 0,
    startAt: day(30), endAt: day(150), chef: "—", team: [], surface: 900, photos: [img("ch20a")],
  },
];

// ── Ouvriers ──
export type Ouvrier = {
  id: string;
  name: string;
  role: "Chef de chantier" | "Plaquiste" | "Peintre" | "Plâtrier staff" | "Manœuvre" | "Électricien";
  phone: string;
  dailyRate: Currency;
  chantierId?: string;
  present: boolean;
  rating: number;
  since: string;
  daysThisMonth: number;
};

export const OUVRIERS: Ouvrier[] = [
  { id: "O-01", name: "Alain Ngassa", role: "Chef de chantier", phone: "+237 6 99 00 11 22", dailyRate: 25_000, chantierId: "CH-2026-014", present: true, rating: 4.9, since: "2019-03-01", daysThisMonth: 21 },
  { id: "O-02", name: "Patrick Etoa", role: "Chef de chantier", phone: "+237 6 77 88 99 00", dailyRate: 24_000, chantierId: "CH-2026-011", present: true, rating: 4.7, since: "2020-06-15", daysThisMonth: 20 },
  { id: "O-03", name: "Serge Mbarga", role: "Plaquiste", phone: "+237 6 90 12 34 56", dailyRate: 15_000, chantierId: "CH-2026-014", present: true, rating: 4.6, since: "2021-01-20", daysThisMonth: 22 },
  { id: "O-04", name: "Blaise Kamdem", role: "Plaquiste", phone: "+237 6 55 44 33 22", dailyRate: 15_000, chantierId: "CH-2026-014", present: false, rating: 4.3, since: "2022-04-11", daysThisMonth: 17 },
  { id: "O-05", name: "Yannick Tchana", role: "Peintre", phone: "+237 6 70 65 43 21", dailyRate: 13_000, chantierId: "CH-2026-014", present: true, rating: 4.8, since: "2021-09-02", daysThisMonth: 19 },
  { id: "O-06", name: "Idriss Bello", role: "Plâtrier staff", phone: "+237 6 91 22 33 44", dailyRate: 18_000, chantierId: "CH-2026-014", present: true, rating: 5, since: "2018-11-05", daysThisMonth: 23 },
  { id: "O-07", name: "Junior Nkoulou", role: "Plaquiste", phone: "+237 6 78 10 20 30", dailyRate: 14_000, chantierId: "CH-2026-011", present: true, rating: 4.2, since: "2023-02-14", daysThisMonth: 18 },
  { id: "O-08", name: "Roland Sone", role: "Peintre", phone: "+237 6 99 55 66 77", dailyRate: 13_000, chantierId: "CH-2026-011", present: false, rating: 4.0, since: "2023-07-30", daysThisMonth: 12 },
  { id: "O-09", name: "Ali Moussa", role: "Manœuvre", phone: "+237 6 60 11 22 33", dailyRate: 8_000, chantierId: "CH-2026-011", present: true, rating: 4.1, since: "2024-05-06", daysThisMonth: 20 },
  { id: "O-10", name: "Cédric Owona", role: "Électricien", phone: "+237 6 94 77 88 99", dailyRate: 17_000, present: true, rating: 4.5, since: "2022-10-18", daysThisMonth: 15 },
];

// ── Finances ──
export type Depense = {
  id: string; label: string; category: "Matériaux" | "Main d'œuvre" | "Transport" | "Sous-traitance" | "Divers";
  amount: Currency; chantierId: string; date: string;
};

export const DEPENSES: Depense[] = [
  { id: "D-101", label: "150 plaques BA13 hydro", category: "Matériaux", amount: 1_275_000, chantierId: "CH-2026-014", date: day(-12) },
  { id: "D-102", label: "Salaires semaine 07", category: "Main d'œuvre", amount: 890_000, chantierId: "CH-2026-014", date: day(-6) },
  { id: "D-103", label: "Rails & montants 48mm", category: "Matériaux", amount: 640_000, chantierId: "CH-2026-011", date: day(-9) },
  { id: "D-104", label: "Location nacelle 3j", category: "Divers", amount: 210_000, chantierId: "CH-2026-011", date: day(-4) },
  { id: "D-105", label: "Transport camion Bonabéri", category: "Transport", amount: 95_000, chantierId: "CH-2026-014", date: day(-3) },
  { id: "D-106", label: "Peinture premium 20 seaux", category: "Matériaux", amount: 1_120_000, chantierId: "CH-2026-011", date: day(-2) },
  { id: "D-107", label: "Sous-traitance électricité", category: "Sous-traitance", amount: 750_000, chantierId: "CH-2026-014", date: day(-1) },
];

export type Facture = {
  id: string; chantierId: string; client: string; amount: Currency;
  status: "Brouillon" | "Envoyée" | "Partiellement payée" | "Payée" | "En retard";
  issuedAt: string; dueAt: string; paid: Currency;
};

export const FACTURES: Facture[] = [
  { id: "F-2026-041", chantierId: "CH-2026-014", client: "Marie Tchoungui", amount: 8_000_000, status: "Payée", issuedAt: day(-40), dueAt: day(-25), paid: 8_000_000 },
  { id: "F-2026-052", chantierId: "CH-2026-014", client: "Marie Tchoungui", amount: 8_000_000, status: "Partiellement payée", issuedAt: day(-14), dueAt: day(6), paid: 4_400_000 },
  { id: "F-2026-046", chantierId: "CH-2026-011", client: "Wouri Trading SARL", amount: 17_000_000, status: "Payée", issuedAt: day(-60), dueAt: day(-45), paid: 17_000_000 },
  { id: "F-2026-055", chantierId: "CH-2026-011", client: "Wouri Trading SARL", amount: 17_000_000, status: "En retard", issuedAt: day(-33), dueAt: day(-4), paid: 10_000_000 },
  { id: "F-2026-038", chantierId: "CH-2026-009", client: "Le Fumoir SARL", amount: 15_200_000, status: "Payée", issuedAt: day(-120), dueAt: day(-100), paid: 15_200_000 },
];

export const CA_MENSUEL = [
  { mois: "Sep", ca: 18_400_000, depenses: 12_100_000 },
  { mois: "Oct", ca: 22_900_000, depenses: 15_300_000 },
  { mois: "Nov", ca: 27_600_000, depenses: 18_800_000 },
  { mois: "Déc", ca: 31_200_000, depenses: 20_400_000 },
  { mois: "Jan", ca: 25_800_000, depenses: 17_600_000 },
  { mois: "Fév", ca: 34_500_000, depenses: 22_900_000 },
];

// ── CRM ──
export type Lead = {
  id: string; name: string; phone: string; source: "Site web" | "WhatsApp" | "Recommandation" | "Terrain" | "Instagram";
  need: string; budget: Currency; stage: "Nouveau" | "Contacté" | "Visite planifiée" | "Devis envoyé" | "Gagné" | "Perdu";
  createdAt: string; nextAction?: string;
};

export const LEADS: Lead[] = [
  { id: "L-01", name: "Éric Fotso", phone: "+237 6 90 33 71 15", source: "Site web", need: "Faux plafond salon 120m²", budget: 9_600_000, stage: "Devis envoyé", createdAt: day(-8), nextAction: "Relance devis" },
  { id: "L-02", name: "Immo Sawa", phone: "+237 6 71 45 66 21", source: "Recommandation", need: "Résidence 12 logements", budget: 61_000_000, stage: "Visite planifiée", createdAt: day(-5), nextAction: "Visite jeudi 10h" },
  { id: "L-03", name: "Nadège Épée", phone: "+237 6 78 55 12 09", source: "Instagram", need: "Staff chambre parentale", budget: 2_400_000, stage: "Contacté", createdAt: day(-2) },
  { id: "L-04", name: "Clinique Bonamoussadi", phone: "+237 6 99 87 65 43", source: "Terrain", need: "Cloisons coupe-feu 300m²", budget: 24_000_000, stage: "Nouveau", createdAt: day(-1) },
  { id: "L-05", name: "Samuel Ndoumbe", phone: "+237 6 55 66 77 88", source: "WhatsApp", need: "Peinture duplex", budget: 3_800_000, stage: "Gagné", createdAt: day(-18) },
  { id: "L-06", name: "Boutique Zen", phone: "+237 6 70 90 80 70", source: "Site web", need: "Béton ciré 60m²", budget: 4_200_000, stage: "Perdu", createdAt: day(-22) },
];

// ── Matériaux (calculateur) ──
export const MATERIAUX_PRIX = {
  plaqueBA13: 8_500,      // 1,20 × 2,50 m
  plaqueHydro: 11_500,
  rail: 2_800,            // 3 m
  montant: 3_200,         // 3 m
  visPaquet: 4_500,       // 1000 vis
  enduitSac: 9_000,       // 25 kg
  bandeRouleau: 2_500,    // 150 m
  isolantM2: 3_400,
};

export const TEAM = [
  { name: "Ernest Priso", role: "Directeur général", initials: "EP" },
  { name: "Alain Ngassa", role: "Chef de chantier senior", initials: "AN" },
  { name: "Chantal Mbedé", role: "Architecte d'intérieur", initials: "CM" },
  { name: "Patrick Etoa", role: "Chef de chantier", initials: "PE" },
];

export const TESTIMONIALS = [
  { name: "Marie Tchoungui", role: "Villa Bonapriso", text: "Un travail de précision. Les délais ont été tenus au jour près et les finitions sont irréprochables.", rating: 5 },
  { name: "Wouri Trading", role: "Siège social Akwa", text: "620 m² de bureaux livrés en 10 semaines sans interrompre notre activité. Équipe très professionnelle.", rating: 5 },
  { name: "Le Fumoir", role: "Restaurant Bonanjo", text: "L'ambiance du restaurant a totalement changé. Le rendu du plafond noir et des LED est magnifique.", rating: 5 },
];

export const STATS = [
  { label: "Chantiers livrés", value: "180+" },
  { label: "Années d'expérience", value: "12" },
  { label: "m² réalisés", value: "42 000" },
  { label: "Clients satisfaits", value: "98 %" },
];
