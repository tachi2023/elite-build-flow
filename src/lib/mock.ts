export type ProjectStatus = "active" | "upcoming" | "completed" | "paused";

export interface Project {
  id: string;
  client: string;
  phone: string;
  email: string;
  city: string;
  type: string;
  description: string;
  startDate: string;
  endDate: string;
  amount: number;
  expenses: number;
  status: ProjectStatus;
  cover?: string;
}

export const projects: Project[] = [
  {
    id: "P-2410",
    client: "Résidence Mbeng",
    phone: "+237 6 77 12 34 56",
    email: "contact@mbeng.cm",
    city: "Douala — Bonapriso",
    type: "Plafond décoratif + Spots LED",
    description: "Faux plafond BA13 avec corniches décoratives et bandeau LED dans salon principal.",
    startDate: "2026-04-12",
    endDate: "2026-06-30",
    amount: 8500000,
    expenses: 5100000,
    status: "active",
  },
  {
    id: "P-2411",
    client: "Hotel Akwa Palace",
    phone: "+237 6 99 02 45 12",
    email: "ops@akwapalace.cm",
    city: "Douala — Akwa",
    type: "Habillage mural + Décoration",
    description: "Habillage mural lobby + faux plafond hall réception.",
    startDate: "2026-05-02",
    endDate: "2026-08-15",
    amount: 22000000,
    expenses: 11800000,
    status: "active",
  },
  {
    id: "P-2412",
    client: "Villa Eyenga",
    phone: "+237 6 55 78 21 09",
    email: "ngono@eyenga.cm",
    city: "Yaoundé — Bastos",
    type: "Plâtrerie complète",
    description: "Plâtrerie complète villa R+1, 320 m² murs et plafonds.",
    startDate: "2026-07-01",
    endDate: "2026-10-20",
    amount: 14200000,
    expenses: 0,
    status: "upcoming",
  },
  {
    id: "P-2398",
    client: "Pharmacie Bonanjo",
    phone: "+237 6 78 14 22 88",
    email: "pharma@bonanjo.cm",
    city: "Douala — Bonanjo",
    type: "Faux plafond + Peinture",
    description: "Rénovation officine 95 m².",
    startDate: "2026-01-10",
    endDate: "2026-02-28",
    amount: 3800000,
    expenses: 2650000,
    status: "completed",
  },
  {
    id: "P-2402",
    client: "Immeuble Sawa",
    phone: "+237 6 90 11 22 33",
    email: "syndic@sawa.cm",
    city: "Douala — Bali",
    type: "Plafonds collectifs",
    description: "Plafonds parties communes — chantier suspendu en attente de paiement.",
    startDate: "2026-03-05",
    endDate: "2026-07-30",
    amount: 6900000,
    expenses: 1800000,
    status: "paused",
  },
];

export type WorkerRole = "Plâtrier" | "Peintre" | "Manœuvre" | "Décorateur" | "Superviseur";
export interface Worker {
  id: string;
  name: string;
  phone: string;
  role: WorkerRole;
  dailyRate: number;
  projectId?: string;
  daysThisMonth: number;
}
export const workers: Worker[] = [
  { id: "W-01", name: "Étienne Mboma", phone: "+237 6 78 12 33 44", role: "Plâtrier", dailyRate: 8000, projectId: "P-2410", daysThisMonth: 18 },
  { id: "W-02", name: "Serge Ndongo", phone: "+237 6 99 21 44 02", role: "Superviseur", dailyRate: 15000, projectId: "P-2411", daysThisMonth: 22 },
  { id: "W-03", name: "Patrick Owono", phone: "+237 6 55 88 71 19", role: "Peintre", dailyRate: 7000, projectId: "P-2410", daysThisMonth: 14 },
  { id: "W-04", name: "Aminou Bello", phone: "+237 6 70 21 65 32", role: "Manœuvre", dailyRate: 4500, projectId: "P-2411", daysThisMonth: 20 },
  { id: "W-05", name: "Yves Kamga", phone: "+237 6 91 03 77 18", role: "Décorateur", dailyRate: 12000, daysThisMonth: 9 },
];

export interface Material {
  id: string;
  name: string;
  unit: string;
  price: number;
  updated: string;
}
export const materials: Material[] = [
  { id: "M-01", name: "Plaque BA13 standard", unit: "plaque", price: 4500, updated: "2026-05-10" },
  { id: "M-02", name: "Plaque BA13 hydrofuge", unit: "plaque", price: 6200, updated: "2026-05-10" },
  { id: "M-03", name: "Rail R48", unit: "ml", price: 850, updated: "2026-04-22" },
  { id: "M-04", name: "Montant M48", unit: "ml", price: 950, updated: "2026-04-22" },
  { id: "M-05", name: "Fourrure F47", unit: "ml", price: 700, updated: "2026-03-30" },
  { id: "M-06", name: "Cornière 25x25", unit: "ml", price: 450, updated: "2026-03-30" },
  { id: "M-07", name: "Vis TTPC 25mm (boîte 500)", unit: "boîte", price: 3500, updated: "2026-05-01" },
  { id: "M-08", name: "Bande à joint", unit: "rouleau", price: 1800, updated: "2026-05-01" },
  { id: "M-09", name: "Enduit joint (sac 25kg)", unit: "sac", price: 6800, updated: "2026-05-01" },
];

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  source: "Site web" | "Recommandation" | "WhatsApp" | "Facebook";
  type: string;
  status: "new" | "contacted" | "visit" | "quoted" | "won" | "lost";
  createdAt: string;
}
export const leads: Lead[] = [
  { id: "L-01", name: "Marie Tchoungui", phone: "+237 6 78 22 11 09", email: "marie.t@gmail.com", city: "Douala", source: "Site web", type: "Plafond salon", status: "new", createdAt: "Il y a 2h" },
  { id: "L-02", name: "Jean-Paul Essomba", phone: "+237 6 99 12 04 88", email: "jp.essomba@cm.com", city: "Douala", source: "WhatsApp", type: "Plâtrerie villa", status: "contacted", createdAt: "Hier" },
  { id: "L-03", name: "Cabinet Notaire Tchatchoua", phone: "+237 6 55 03 21 18", email: "office@tchatchoua.cm", city: "Yaoundé", source: "Recommandation", type: "Habillage bureau", status: "visit", createdAt: "Il y a 3j" },
  { id: "L-04", name: "Famille Ndongo", phone: "+237 6 70 11 23 45", email: "ndongo@yahoo.fr", city: "Douala", source: "Site web", type: "Faux plafond duplex", status: "quoted", createdAt: "Il y a 5j" },
  { id: "L-05", name: "Restaurant La Source", phone: "+237 6 91 28 14 77", email: "lasource@cm.com", city: "Douala", source: "Facebook", type: "Décoration murale", status: "won", createdAt: "Il y a 8j" },
];

export const expenseCategories = [
  "Matériaux BA13", "Profilés", "Vis", "Peinture", "Transport",
  "Main d'œuvre", "Sous-traitance", "Location matériel", "Divers",
] as const;

export interface Expense {
  id: string;
  date: string;
  category: typeof expenseCategories[number];
  amount: number;
  projectId: string;
  notes: string;
}
export const expenses: Expense[] = [
  { id: "E-001", date: "2026-05-28", category: "Matériaux BA13", amount: 850000, projectId: "P-2410", notes: "Livraison 180 plaques" },
  { id: "E-002", date: "2026-05-27", category: "Main d'œuvre", amount: 320000, projectId: "P-2410", notes: "Semaine 21 — 4 ouvriers" },
  { id: "E-003", date: "2026-05-26", category: "Transport", amount: 45000, projectId: "P-2411", notes: "Camion matériaux Akwa" },
  { id: "E-004", date: "2026-05-25", category: "Profilés", amount: 215000, projectId: "P-2411", notes: "Rails + montants" },
  { id: "E-005", date: "2026-05-22", category: "Peinture", amount: 180000, projectId: "P-2410", notes: "Sous-couche + finition mat" },
];

export interface Income {
  id: string;
  date: string;
  projectId: string;
  type: "Acompte" | "Versement intermédiaire" | "Solde final";
  amount: number;
  notes: string;
}
export const incomes: Income[] = [
  { id: "I-001", date: "2026-04-12", projectId: "P-2410", type: "Acompte", amount: 3400000, notes: "40% à la signature" },
  { id: "I-002", date: "2026-05-15", projectId: "P-2410", type: "Versement intermédiaire", amount: 2550000, notes: "30% mi-chantier" },
  { id: "I-003", date: "2026-05-02", projectId: "P-2411", type: "Acompte", amount: 8800000, notes: "40% à la signature" },
  { id: "I-004", date: "2026-02-28", projectId: "P-2398", type: "Solde final", amount: 1140000, notes: "30% réception" },
];

export const totals = () => {
  const revenue = incomes.reduce((s, i) => s + i.amount, 0);
  const exp = expenses.reduce((s, e) => s + e.amount, 0);
  const profit = revenue - exp;
  const margin = revenue > 0 ? (profit / revenue) * 100 : 0;
  return { revenue, expenses: exp, profit, margin };
};
