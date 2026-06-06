// VraiDeal mock data — all in-memory, no backend.
export type Category =
  | "Vêtements" | "Accessoires" | "Téléphones" | "Ordinateurs"
  | "Électroménager" | "Meubles" | "Véhicules" | "Autres";

export const CATEGORIES: Category[] = [
  "Téléphones", "Ordinateurs", "Électroménager", "Meubles",
  "Véhicules", "Vêtements", "Accessoires", "Autres",
];

export type Condition = "Neuf" | "Très bon" | "Bon" | "Passable";

const placeholder = (seed: string, w = 800, h = 600) =>
  `https://picsum.photos/seed/${encodeURIComponent(seed)}/${w}/${h}`;

export type Submission = {
  id: string;            // SUB-2026-0089
  ref: string;
  category: Category;
  title: string;         // seller's free description headline
  description: string;
  declaredCondition: Condition;
  minPrice: number;
  photos: string[];
  proofPhoto?: string;
  vendorId: string;
  submittedAt: string;
  status: "En attente" | "Accepté" | "Refusé";
  urgency: boolean;
  immediatePurchase: boolean;
};

export type Vendor = {
  id: string;
  firstName: string;
  whatsapp: string;
  joinedAt: string;
  submissions: number;
  sold: number;
  revenue: number;
  trust: number; // 0-100
  reports: number;
  status: "Actif" | "Surveillance" | "Bloqué";
  note?: string;
};

export type Product = {
  id: string;
  submissionId: string;
  title: string;
  category: Category;
  condition: Condition;
  publicPrice: number;
  description: string;
  vendorId: string;
  photos: string[];
  publishedAt: string;
  status: "Publié" | "Masqué" | "Vendu";
  urgent: boolean;
  urgentUntil?: string;
  certified: boolean;
  lastPingAt?: string;
  pingResponse?: "OUI" | "NON" | "En attente";
  daysWithoutResponse: number;
};

export type Order = {
  id: string;            // VD-2026-0031
  productId: string;
  buyerFirstName: string;
  buyerWhatsapp: string;
  delivery: "Livraison" | "Retrait";
  address?: string;
  amount: number;
  payment: { method: "Mobile Money" | "Cash"; operator?: string; txn?: string };
  status: "Nouvelle" | "En préparation" | "En livraison" | "En attente confirmation" | "Terminée" | "Annulée";
  createdAt: string;
  autoValidateAt?: string; // ISO countdown
  receivedConfirmedAt?: string;
  paymentReleasedAt?: string;
  history: { ts: string; actor: string; label: string }[];
};

export type Refund = {
  id: string;            // REF-2026-0007
  orderId: string;
  reason: string;
  description: string;
  photos: string[];
  amount: number;
  buyerFirstName: string;
  buyerWhatsapp: string;
  reportedAt: string;
  status: "En attente" | "En cours" | "Remboursée";
  triggeredAt?: string;
  paidAt?: string;
  confirmedAt?: string;
};

export type Alert = {
  id: string;
  level: "critical" | "warning" | "info";
  message: string;
  action: { to: string; label: string };
  deadline?: string;
};

// ── Vendors ──
export const vendors: Vendor[] = [
  { id: "V001", firstName: "Aïcha", whatsapp: "+237 6 99 12 34 56", joinedAt: "2025-08-12", submissions: 14, sold: 11, revenue: 1_245_000, trust: 92, reports: 0, status: "Actif" },
  { id: "V002", firstName: "Bertrand", whatsapp: "+237 6 77 22 33 44", joinedAt: "2025-09-04", submissions: 6, sold: 4, revenue: 420_000, trust: 78, reports: 1, status: "Actif" },
  { id: "V003", firstName: "Clarisse", whatsapp: "+237 6 55 78 12 90", joinedAt: "2025-10-21", submissions: 3, sold: 2, revenue: 185_000, trust: 64, reports: 0, status: "Surveillance", note: "Photos parfois floues" },
  { id: "V004", firstName: "Didier", whatsapp: "+237 6 90 45 67 88", joinedAt: "2025-11-15", submissions: 9, sold: 7, revenue: 980_000, trust: 88, reports: 0, status: "Actif" },
  { id: "V005", firstName: "Esther", whatsapp: "+237 6 70 11 22 33", joinedAt: "2026-01-08", submissions: 2, sold: 1, revenue: 95_000, trust: 71, reports: 0, status: "Actif" },
  { id: "V006", firstName: "Franck", whatsapp: "+237 6 91 44 55 66", joinedAt: "2026-02-19", submissions: 5, sold: 0, revenue: 0, trust: 41, reports: 2, status: "Surveillance", note: "Plusieurs annonces masquées auto" },
];

const ago = (h: number) => new Date(Date.now() - h * 3600_000).toISOString();
const fwd = (h: number) => new Date(Date.now() + h * 3600_000).toISOString();

// ── Submissions (pending review) ──
export const submissions: Submission[] = [
  {
    id: "SUB-2026-0089", ref: "SUB-2026-0089", category: "Téléphones",
    title: "iPhone 13 Pro 256Go bleu",
    description: "iPhone 13 Pro 256Go, batterie 89%, débloqué tout opérateur. Pas de rayures. Boîte d'origine + chargeur.",
    declaredCondition: "Très bon", minPrice: 320_000,
    photos: [placeholder("iphone13a"), placeholder("iphone13b"), placeholder("iphone13c"), placeholder("iphone13d")],
    proofPhoto: placeholder("proof89"), vendorId: "V001",
    submittedAt: ago(26), status: "En attente", urgency: true, immediatePurchase: false,
  },
  {
    id: "SUB-2026-0090", ref: "SUB-2026-0090", category: "Ordinateurs",
    title: "MacBook Air M1 2020",
    description: "MacBook Air M1 8Go/256Go gris sidéral. État excellent, peu servi. Très bonne autonomie.",
    declaredCondition: "Très bon", minPrice: 420_000,
    photos: [placeholder("macbook1"), placeholder("macbook2"), placeholder("macbook3")],
    proofPhoto: placeholder("proof90"), vendorId: "V004",
    submittedAt: ago(14), status: "En attente", urgency: false, immediatePurchase: true,
  },
  {
    id: "SUB-2026-0091", ref: "SUB-2026-0091", category: "Vêtements",
    title: "Veste cuir taille L",
    description: "Veste en cuir véritable, taille L, portée 3 fois. Achetée à Paris.",
    declaredCondition: "Très bon", minPrice: 45_000,
    photos: [placeholder("veste1"), placeholder("veste2")],
    vendorId: "V002",
    submittedAt: ago(9), status: "En attente", urgency: false, immediatePurchase: false,
  },
  {
    id: "SUB-2026-0092", ref: "SUB-2026-0092", category: "Électroménager",
    title: "Réfrigérateur Samsung 2 portes",
    description: "Frigo Samsung 350L, 2 portes, classe A++. 18 mois d'utilisation.",
    declaredCondition: "Bon", minPrice: 210_000,
    photos: [placeholder("frigo1"), placeholder("frigo2"), placeholder("frigo3")],
    proofPhoto: placeholder("proof92"), vendorId: "V003",
    submittedAt: ago(4), status: "En attente", urgency: false, immediatePurchase: false,
  },
  {
    id: "SUB-2026-0093", ref: "SUB-2026-0093", category: "Accessoires",
    title: "Sac à main cuir",
    description: "Sac à main cuir noir, marque locale, état neuf.",
    declaredCondition: "Neuf", minPrice: 28_000,
    photos: [placeholder("sac1"), placeholder("sac2")],
    vendorId: "V005",
    submittedAt: ago(2), status: "En attente", urgency: false, immediatePurchase: false,
  },
  {
    id: "SUB-2026-0094", ref: "SUB-2026-0094", category: "Meubles",
    title: "Canapé d'angle 5 places",
    description: "Canapé d'angle convertible, tissu gris foncé. 2 ans d'utilisation.",
    declaredCondition: "Bon", minPrice: 180_000,
    photos: [placeholder("canape1"), placeholder("canape2")],
    vendorId: "V001",
    submittedAt: ago(1), status: "En attente", urgency: false, immediatePurchase: true,
  },
];

// ── Catalogue (published / managed products) ──
export const products: Product[] = [
  {
    id: "P-1001", submissionId: "SUB-2026-0080", title: "Samsung Galaxy S22 Ultra 256Go",
    category: "Téléphones", condition: "Très bon", publicPrice: 285_000,
    description: "Samsung Galaxy S22 Ultra 256Go noir, débloqué. Très bon état, pas de rayures.",
    vendorId: "V001", photos: [placeholder("s22a"), placeholder("s22b")],
    publishedAt: ago(72), status: "Publié", urgent: false, certified: true,
    lastPingAt: ago(40), pingResponse: "OUI", daysWithoutResponse: 0,
  },
  {
    id: "P-1002", submissionId: "SUB-2026-0081", title: "MacBook Pro 14\" M2 Pro 16/512",
    category: "Ordinateurs", condition: "Très bon", publicPrice: 1_350_000,
    description: "MacBook Pro 14 pouces M2 Pro, 16Go RAM, 512Go SSD. Acheté en 2023.",
    vendorId: "V004", photos: [placeholder("mbpa"), placeholder("mbpb"), placeholder("mbpc")],
    publishedAt: ago(120), status: "Publié", urgent: true, urgentUntil: fwd(48),
    certified: false, lastPingAt: ago(15), pingResponse: "OUI", daysWithoutResponse: 0,
  },
  {
    id: "P-1003", submissionId: "SUB-2026-0082", title: "Téléviseur LG OLED 55\"",
    category: "Électroménager", condition: "Très bon", publicPrice: 520_000,
    description: "TV LG OLED 55 pouces 4K HDR. Achat 2024, garantie valide.",
    vendorId: "V002", photos: [placeholder("tv1"), placeholder("tv2")],
    publishedAt: ago(240), status: "Publié", urgent: false, certified: true,
    lastPingAt: ago(80), pingResponse: "OUI", daysWithoutResponse: 3,
  },
  {
    id: "P-1004", submissionId: "SUB-2026-0083", title: "Vélo VTT électrique",
    category: "Véhicules", condition: "Bon", publicPrice: 380_000,
    description: "Vélo VTT électrique 27.5\", batterie 500Wh, autonomie 60km.",
    vendorId: "V001", photos: [placeholder("vtt1"), placeholder("vtt2")],
    publishedAt: ago(300), status: "Publié", urgent: false, certified: false,
    lastPingAt: ago(180), pingResponse: "En attente", daysWithoutResponse: 8,
  },
  {
    id: "P-1005", submissionId: "SUB-2026-0084", title: "Robe de soirée taille M",
    category: "Vêtements", condition: "Neuf", publicPrice: 35_000,
    description: "Robe de soirée neuve, étiquette présente, taille M.",
    vendorId: "V005", photos: [placeholder("robe1")],
    publishedAt: ago(48), status: "Publié", urgent: false, certified: false,
    lastPingAt: ago(30), pingResponse: "OUI", daysWithoutResponse: 1,
  },
  {
    id: "P-1006", submissionId: "SUB-2026-0085", title: "Tablette iPad Air 5e gen",
    category: "Téléphones", condition: "Très bon", publicPrice: 295_000,
    description: "iPad Air 5e génération 64Go Wi-Fi. Acheté en 2024.",
    vendorId: "V004", photos: [placeholder("ipad1"), placeholder("ipad2")],
    publishedAt: ago(96), status: "Vendu", urgent: false, certified: false,
    lastPingAt: ago(96), pingResponse: "OUI", daysWithoutResponse: 0,
  },
  {
    id: "P-1007", submissionId: "SUB-2026-0086", title: "Casque Sony WH-1000XM4",
    category: "Accessoires", condition: "Très bon", publicPrice: 95_000,
    description: "Casque sans fil à réduction de bruit Sony WH-1000XM4 noir.",
    vendorId: "V002", photos: [placeholder("casque1")],
    publishedAt: ago(60), status: "Publié", urgent: true, urgentUntil: fwd(24),
    certified: false, lastPingAt: ago(20), pingResponse: "OUI", daysWithoutResponse: 0,
  },
  {
    id: "P-1008", submissionId: "SUB-2026-0087", title: "Lit double + matelas",
    category: "Meubles", condition: "Bon", publicPrice: 145_000,
    description: "Lit 160x200 en bois + matelas mousse à mémoire de forme.",
    vendorId: "V003", photos: [placeholder("lit1"), placeholder("lit2")],
    publishedAt: ago(400), status: "Masqué", urgent: false, certified: false,
    lastPingAt: ago(200), pingResponse: "NON", daysWithoutResponse: 9,
  },
  {
    id: "P-1009", submissionId: "SUB-2026-0088", title: "Console PS5 Standard + 2 manettes",
    category: "Accessoires", condition: "Très bon", publicPrice: 320_000,
    description: "PS5 standard, 825Go, avec 2 manettes DualSense et 3 jeux.",
    vendorId: "V001", photos: [placeholder("ps5a"), placeholder("ps5b")],
    publishedAt: ago(8), status: "Publié", urgent: false, certified: true,
    lastPingAt: ago(8), pingResponse: "OUI", daysWithoutResponse: 0,
  },
  {
    id: "P-1010", submissionId: "SUB-2026-0089a", title: "Machine à laver Bosch 8kg",
    category: "Électroménager", condition: "Bon", publicPrice: 240_000,
    description: "Machine à laver Bosch 8kg, classe A+++. 3 ans d'âge.",
    vendorId: "V004", photos: [placeholder("ml1")],
    publishedAt: ago(150), status: "Publié", urgent: false, certified: false,
    lastPingAt: ago(60), pingResponse: "OUI", daysWithoutResponse: 2,
  },
  {
    id: "P-1011", submissionId: "SUB-2026-0090a", title: "Sneakers Nike Air Max 90",
    category: "Vêtements", condition: "Très bon", publicPrice: 42_000,
    description: "Nike Air Max 90 taille 42, peu portées.",
    vendorId: "V002", photos: [placeholder("nike1")],
    publishedAt: ago(20), status: "Publié", urgent: false, certified: false,
    lastPingAt: ago(10), pingResponse: "OUI", daysWithoutResponse: 0,
  },
  {
    id: "P-1012", submissionId: "SUB-2026-0091a", title: "Aspirateur Dyson V11",
    category: "Électroménager", condition: "Très bon", publicPrice: 175_000,
    description: "Aspirateur balai Dyson V11 sans fil. Accessoires complets.",
    vendorId: "V005", photos: [placeholder("dyson1")],
    publishedAt: ago(35), status: "Publié", urgent: false, certified: false,
    lastPingAt: ago(15), pingResponse: "OUI", daysWithoutResponse: 0,
  },
  {
    id: "P-1013", submissionId: "SUB-2026-0092a", title: "Table à manger bois massif",
    category: "Meubles", condition: "Bon", publicPrice: 220_000,
    description: "Table à manger 6 places en bois massif. Patine d'usage.",
    vendorId: "V003", photos: [placeholder("table1")],
    publishedAt: ago(500), status: "Masqué", urgent: false, certified: false,
    lastPingAt: ago(220), pingResponse: "NON", daysWithoutResponse: 10,
  },
  {
    id: "P-1014", submissionId: "SUB-2026-0093a", title: "Apple Watch Series 8 45mm",
    category: "Téléphones", condition: "Très bon", publicPrice: 195_000,
    description: "Apple Watch Series 8 GPS 45mm, bracelet sport.",
    vendorId: "V001", photos: [placeholder("aw1")],
    publishedAt: ago(12), status: "Publié", urgent: false, certified: false,
    lastPingAt: ago(12), pingResponse: "OUI", daysWithoutResponse: 0,
  },
  {
    id: "P-1015", submissionId: "SUB-2026-0094a", title: "Cafetière Nespresso Vertuo",
    category: "Électroménager", condition: "Neuf", publicPrice: 78_000,
    description: "Cafetière Nespresso Vertuo neuve, sous garantie.",
    vendorId: "V004", photos: [placeholder("nespresso1")],
    publishedAt: ago(5), status: "Publié", urgent: false, certified: true,
    lastPingAt: ago(5), pingResponse: "En attente", daysWithoutResponse: 1,
  },
];

// ── Orders ──
export const orders: Order[] = [
  {
    id: "VD-2026-0031", productId: "P-1001",
    buyerFirstName: "Marc", buyerWhatsapp: "+237 6 98 33 44 55",
    delivery: "Livraison", address: "Bonapriso, rue Joffre n°14, Douala",
    amount: 285_000, payment: { method: "Mobile Money", operator: "MTN MoMo", txn: "MP260603.1442.A04567" },
    status: "En attente confirmation", createdAt: ago(48), autoValidateAt: fwd(0.78),
    receivedConfirmedAt: undefined,
    history: [
      { ts: ago(48), actor: "Système", label: "Commande créée" },
      { ts: ago(46), actor: "Admin", label: "Passée en préparation" },
      { ts: ago(20), actor: "Admin", label: "Passée en livraison" },
      { ts: ago(2), actor: "Coursier", label: "Marquée livrée" },
    ],
  },
  {
    id: "VD-2026-0032", productId: "P-1002",
    buyerFirstName: "Yolande", buyerWhatsapp: "+237 6 70 22 11 88",
    delivery: "Retrait", amount: 1_350_000,
    payment: { method: "Mobile Money", operator: "Orange Money", txn: "OM260603.0921.778801" },
    status: "Nouvelle", createdAt: ago(3),
    history: [{ ts: ago(3), actor: "Système", label: "Commande créée" }],
  },
  {
    id: "VD-2026-0033", productId: "P-1003",
    buyerFirstName: "Junior", buyerWhatsapp: "+237 6 55 99 12 22",
    delivery: "Livraison", address: "Akwa, av. de Gaulle 12, Douala",
    amount: 520_000, payment: { method: "Cash" },
    status: "En préparation", createdAt: ago(14),
    history: [
      { ts: ago(14), actor: "Système", label: "Commande créée" },
      { ts: ago(12), actor: "Admin", label: "Passée en préparation" },
    ],
  },
  {
    id: "VD-2026-0034", productId: "P-1007",
    buyerFirstName: "Linda", buyerWhatsapp: "+237 6 70 44 55 66",
    delivery: "Livraison", address: "Bonanjo, rue Pasteur 4, Douala",
    amount: 95_000, payment: { method: "Mobile Money", operator: "MTN MoMo", txn: "MP260602.1804.B11220" },
    status: "En livraison", createdAt: ago(28),
    history: [
      { ts: ago(28), actor: "Système", label: "Commande créée" },
      { ts: ago(25), actor: "Admin", label: "Passée en préparation" },
      { ts: ago(10), actor: "Admin", label: "Passée en livraison" },
    ],
  },
  {
    id: "VD-2026-0035", productId: "P-1009",
    buyerFirstName: "Patrick", buyerWhatsapp: "+237 6 99 12 88 33",
    delivery: "Retrait", amount: 320_000,
    payment: { method: "Mobile Money", operator: "Orange Money", txn: "OM260601.1011.221199" },
    status: "Terminée", createdAt: ago(120),
    receivedConfirmedAt: ago(96), paymentReleasedAt: ago(94),
    history: [
      { ts: ago(120), actor: "Système", label: "Commande créée" },
      { ts: ago(110), actor: "Admin", label: "Passée en préparation" },
      { ts: ago(100), actor: "Admin", label: "Prêt pour retrait" },
      { ts: ago(96), actor: "Acheteur", label: "Réception confirmée" },
      { ts: ago(94), actor: "Admin", label: "Paiement libéré · MP260603.0844" },
    ],
  },
  {
    id: "VD-2026-0036", productId: "P-1011",
    buyerFirstName: "Stéphanie", buyerWhatsapp: "+237 6 70 88 22 11",
    delivery: "Livraison", address: "Bali, rue 1.234, Douala",
    amount: 42_000, payment: { method: "Cash" },
    status: "Nouvelle", createdAt: ago(1),
    history: [{ ts: ago(1), actor: "Système", label: "Commande créée" }],
  },
  {
    id: "VD-2026-0037", productId: "P-1014",
    buyerFirstName: "Olivier", buyerWhatsapp: "+237 6 99 55 77 88",
    delivery: "Livraison", address: "Logbessou, Douala",
    amount: 195_000, payment: { method: "Mobile Money", operator: "MTN MoMo", txn: "MP260603.0712.C33402" },
    status: "En préparation", createdAt: ago(6),
    history: [
      { ts: ago(6), actor: "Système", label: "Commande créée" },
      { ts: ago(4), actor: "Admin", label: "Passée en préparation" },
    ],
  },
  {
    id: "VD-2026-0038", productId: "P-1012",
    buyerFirstName: "Eric", buyerWhatsapp: "+237 6 91 22 33 44",
    delivery: "Livraison", address: "Makepe, Douala",
    amount: 175_000, payment: { method: "Mobile Money", operator: "Orange Money", txn: "OM260603.1100.998877" },
    status: "Annulée", createdAt: ago(72),
    history: [
      { ts: ago(72), actor: "Système", label: "Commande créée" },
      { ts: ago(70), actor: "Acheteur", label: "Annulation demandée" },
      { ts: ago(69), actor: "Admin", label: "Commande annulée" },
    ],
  },
];

// ── Refunds ──
export const refunds: Refund[] = [
  {
    id: "REF-2026-0007", orderId: "VD-2026-0028", reason: "Produit non conforme",
    description: "Le téléphone reçu présente des rayures non mentionnées et la batterie tient mal.",
    photos: [placeholder("refund1"), placeholder("refund2")],
    amount: 180_000, buyerFirstName: "Carine", buyerWhatsapp: "+237 6 70 14 22 89",
    reportedAt: ago(36), status: "En attente",
  },
  {
    id: "REF-2026-0008", orderId: "VD-2026-0030", reason: "Article jamais reçu",
    description: "Commande passée il y a 6 jours, jamais livrée malgré relances.",
    photos: [],
    amount: 45_000, buyerFirstName: "Roland", buyerWhatsapp: "+237 6 99 02 03 04",
    reportedAt: ago(72), status: "En cours", triggeredAt: ago(24),
  },
  {
    id: "REF-2026-0009", orderId: "VD-2026-0025", reason: "Produit défectueux",
    description: "L'appareil ne s'allume pas à la réception.",
    photos: [placeholder("refund3")],
    amount: 95_000, buyerFirstName: "Diane", buyerWhatsapp: "+237 6 70 88 99 11",
    reportedAt: ago(240), status: "Remboursée",
    triggeredAt: ago(220), paidAt: ago(210), confirmedAt: ago(180),
  },
];

// ── Alerts ──
export const alerts: Alert[] = [
  { id: "A1", level: "critical", message: "Commande VD-2026-0031 : validation automatique dans 00h47", action: { to: "/orders/VD-2026-0031", label: "Gérer" }, deadline: fwd(0.78) },
  { id: "A2", level: "warning", message: "Soumission SUB-2026-0089 en attente depuis 26h", action: { to: "/submissions/SUB-2026-0089", label: "Examiner" } },
  { id: "A3", level: "warning", message: "Produit \"Lit double + matelas\" masqué automatiquement — vendeur sans réponse 7 jours", action: { to: "/deliveries", label: "Voir pings" } },
  { id: "A4", level: "info", message: "3 pings de disponibilité sans réponse", action: { to: "/deliveries", label: "Vérifier" } },
];

// helpers
export const findVendor = (id: string) => vendors.find(v => v.id === id);
export const findProduct = (id: string) => products.find(p => p.id === id);
export const findSubmission = (id: string) => submissions.find(s => s.id === id);
export const findOrder = (id: string) => orders.find(o => o.id === id);
export const findRefund = (id: string) => refunds.find(r => r.id === id);

// Financial events (last 30 days, synthetic)
export type FinEvent = {
  date: string; type: "Commission" | "Achat direct" | "Remboursement";
  productTitle: string; vendorFirstName: string;
  gross: number; commission: number; net: number;
};

export const finEvents: FinEvent[] = (() => {
  const out: FinEvent[] = [];
  const titles = products.map(p => ({ t: p.title, c: p.category, price: p.publicPrice, v: vendors.find(v => v.id === p.vendorId)?.firstName ?? "—" }));
  for (let i = 0; i < 42; i++) {
    const day = new Date(Date.now() - Math.floor(Math.random() * 30) * 86400000);
    const t = titles[i % titles.length];
    const type: FinEvent["type"] = i % 11 === 0 ? "Remboursement" : i % 7 === 0 ? "Achat direct" : "Commission";
    const rate = type === "Achat direct" ? 0.25 : 0.1;
    const gross = type === "Remboursement" ? -t.price : t.price;
    const commission = Math.round(gross * rate);
    out.push({
      date: day.toISOString(), type,
      productTitle: t.t, vendorFirstName: t.v,
      gross, commission, net: type === "Remboursement" ? gross : commission,
    });
  }
  return out.sort((a, b) => b.date.localeCompare(a.date));
})();
