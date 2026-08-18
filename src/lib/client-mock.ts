import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";

export type ClientProjectStatus =
  | "lead" | "visit" | "quoted" | "approved" | "started" | "in_progress" | "qa" | "completed";

export interface TimelineStep {
  key: ClientProjectStatus;
  label: string;
  date?: string;
  done: boolean;
  current?: boolean;
}

export interface ClientProject {
  id: string;
  title: string;
  reference: string;
  type: string;
  address: string;
  cover: string;
  progress: number;
  status: ClientProjectStatus;
  estimatedEnd: string;
  lastActivity: string;
  amount: number;
  paid: number;
  timeline: TimelineStep[];
  gallery: { id: string; url: string; phase: "before" | "progress" | "after"; date: string; caption: string }[];
}

export const clientProfile = {
  name: "Marie Tchoungui",
  initials: "MT",
  email: "marie.tchoungui@gmail.com",
  phone: "+237 6 78 22 11 09",
  city: "Douala — Bonapriso",
  memberSince: "Avril 2026",
  referralCode: "MARIE-ELITE-2026",
};

export const clientProjects: ClientProject[] = [
  {
    id: "CP-2410",
    title: "Plafond décoratif salon principal",
    reference: "DEV-2410-MT",
    type: "Faux plafond BA13 + Spots LED + Corniches",
    address: "Villa Mbeng — Bonapriso, Douala",
    cover: project1,
    progress: 62,
    status: "in_progress",
    estimatedEnd: "30 juin 2026",
    lastActivity: "Il y a 2h — 4 photos ajoutées",
    amount: 8500000,
    paid: 5950000,
    timeline: [
      { key: "lead", label: "Demande reçue", date: "12 mars 2026", done: true },
      { key: "visit", label: "Visite technique", date: "18 mars 2026", done: true },
      { key: "quoted", label: "Devis envoyé", date: "22 mars 2026", done: true },
      { key: "approved", label: "Devis approuvé", date: "28 mars 2026", done: true },
      { key: "started", label: "Démarrage chantier", date: "12 avril 2026", done: true },
      { key: "in_progress", label: "Travaux en cours", date: "Aujourd'hui", done: true, current: true },
      { key: "qa", label: "Contrôle qualité", done: false },
      { key: "completed", label: "Réception finale", done: false },
    ],
    gallery: [
      { id: "g1", url: project1, phase: "before", date: "12 avril", caption: "État initial salon" },
      { id: "g2", url: project2, phase: "progress", date: "28 avril", caption: "Ossature métallique posée" },
      { id: "g3", url: project3, phase: "progress", date: "15 mai", caption: "Plaques BA13 en cours" },
      { id: "g4", url: project2, phase: "progress", date: "28 mai", caption: "Enduit et lissage" },
    ],
  },
  {
    id: "CP-2415",
    title: "Décoration murale chambre parentale",
    reference: "DEV-2415-MT",
    type: "Habillage mural + Peinture décorative",
    address: "Villa Mbeng — Bonapriso, Douala",
    cover: project2,
    progress: 18,
    status: "approved",
    estimatedEnd: "15 août 2026",
    lastActivity: "Hier — Devis approuvé",
    amount: 3200000,
    paid: 1280000,
    timeline: [
      { key: "lead", label: "Demande reçue", date: "20 mai 2026", done: true },
      { key: "visit", label: "Visite technique", date: "24 mai 2026", done: true },
      { key: "quoted", label: "Devis envoyé", date: "27 mai 2026", done: true },
      { key: "approved", label: "Devis approuvé", date: "Hier", done: true, current: true },
      { key: "started", label: "Démarrage chantier", date: "10 juin 2026", done: false },
      { key: "in_progress", label: "Travaux en cours", done: false },
      { key: "qa", label: "Contrôle qualité", done: false },
      { key: "completed", label: "Réception finale", done: false },
    ],
    gallery: [
      { id: "g1", url: project3, phase: "before", date: "24 mai", caption: "Chambre actuelle" },
    ],
  },
];

export const clientDocuments = [
  { id: "D-01", name: "Devis DEV-2410-MT.pdf", type: "Devis", projectId: "CP-2410", date: "22 mars 2026", size: "412 Ko", status: "approved" },
  { id: "D-02", name: "Contrat de prestation.pdf", type: "Contrat", projectId: "CP-2410", date: "28 mars 2026", size: "1.1 Mo", status: "signed" },
  { id: "D-03", name: "Facture acompte 40%.pdf", type: "Facture", projectId: "CP-2410", date: "12 avril 2026", size: "298 Ko", status: "paid" },
  { id: "D-04", name: "Reçu paiement intermédiaire.pdf", type: "Reçu", projectId: "CP-2410", date: "15 mai 2026", size: "204 Ko", status: "paid" },
  { id: "D-05", name: "Rapport de métrés.pdf", type: "Métrés", projectId: "CP-2410", date: "20 mars 2026", size: "680 Ko", status: "info" },
  { id: "D-06", name: "Devis DEV-2415-MT.pdf", type: "Devis", projectId: "CP-2415", date: "27 mai 2026", size: "356 Ko", status: "approved" },
];

export interface Approval {
  id: string;
  title: string;
  description: string;
  projectId: string;
  amount?: number;
  status: "pending" | "approved" | "rejected" | "modification";
  requestedAt: string;
}
export const approvals: Approval[] = [
  { id: "A-01", title: "Avenant — Spots LED supplémentaires", description: "Ajout de 6 spots LED dans le couloir (matériel + pose).", projectId: "CP-2410", amount: 280000, status: "pending", requestedAt: "Il y a 1 jour" },
  { id: "A-02", title: "Devis DEV-2415-MT", description: "Décoration murale chambre parentale — habillage + peinture.", projectId: "CP-2415", amount: 3200000, status: "approved", requestedAt: "27 mai 2026" },
  { id: "A-03", title: "Changement de teinte plafond", description: "Passage du blanc cassé au gris perle pour les corniches.", projectId: "CP-2410", status: "modification", requestedAt: "Il y a 3 jours" },
];

export interface Payment {
  id: string;
  projectId: string;
  type: "Acompte" | "Versement intermédiaire" | "Solde final";
  amount: number;
  date: string;
  method: "Mobile Money" | "Virement bancaire" | "Espèces" | "Orange Money" | "MTN MoMo";
  status: "paid" | "due" | "upcoming";
  dueDate?: string;
}
export const payments: Payment[] = [
  { id: "P-01", projectId: "CP-2410", type: "Acompte", amount: 3400000, date: "12 avril 2026", method: "Virement bancaire", status: "paid" },
  { id: "P-02", projectId: "CP-2410", type: "Versement intermédiaire", amount: 2550000, date: "15 mai 2026", method: "MTN MoMo", status: "paid" },
  { id: "P-03", projectId: "CP-2410", type: "Solde final", amount: 2550000, date: "—", method: "Mobile Money", status: "upcoming", dueDate: "30 juin 2026" },
  { id: "P-04", projectId: "CP-2415", type: "Acompte", amount: 1280000, date: "Hier", method: "Orange Money", status: "paid" },
  { id: "P-05", projectId: "CP-2415", type: "Versement intermédiaire", amount: 960000, date: "—", method: "Mobile Money", status: "upcoming", dueDate: "15 juillet 2026" },
];

export interface Appointment {
  id: string;
  title: string;
  type: "Visite technique" | "Inspection" | "Consultation déco" | "Réception finale";
  date: string;
  time: string;
  projectId?: string;
  location: string;
  status: "confirmed" | "pending" | "completed";
}
export const appointments: Appointment[] = [
  { id: "AP-01", title: "Inspection qualité plafond salon", type: "Inspection", date: "14 juin 2026", time: "10:00", projectId: "CP-2410", location: "Villa Mbeng — Bonapriso", status: "confirmed" },
  { id: "AP-02", title: "Visite préparatoire chambre", type: "Visite technique", date: "8 juin 2026", time: "15:30", projectId: "CP-2415", location: "Villa Mbeng — Bonapriso", status: "pending" },
  { id: "AP-03", title: "Consultation choix décoratif", type: "Consultation déco", date: "5 juin 2026", time: "11:00", location: "Showroom Akwa", status: "completed" },
];

export interface Message {
  id: string;
  from: "client" | "company";
  author: string;
  text: string;
  time: string;
  projectId: string;
  attachment?: { name: string; type: "image" | "doc" };
}
export const messages: Message[] = [
  { id: "M-01", from: "company", author: "Bruno (Directeur)", text: "Bonjour Marie, voici les photos de l'avancement de cette semaine. Les plaques BA13 sont toutes posées.", time: "Lundi 10:24", projectId: "CP-2410", attachment: { name: "avancement-s21.jpg", type: "image" } },
  { id: "M-02", from: "client", author: "Marie Tchoungui", text: "Merci Bruno ! C'est magnifique. Est-il possible d'ajouter quelques spots dans le couloir ?", time: "Lundi 14:08", projectId: "CP-2410" },
  { id: "M-03", from: "company", author: "Bruno (Directeur)", text: "Bien sûr. Je vous prépare un avenant chiffré avant ce soir.", time: "Lundi 14:32", projectId: "CP-2410" },
  { id: "M-04", from: "company", author: "Serge (Conducteur)", text: "Avenant envoyé dans votre espace Approbations. Coût estimé : 280 000 FCFA.", time: "Hier 17:45", projectId: "CP-2410", attachment: { name: "avenant-spots.pdf", type: "doc" } },
];

export interface ChangeRequest {
  id: string;
  projectId: string;
  title: string;
  category: "Design" | "Matériau" | "Couleur" | "Ajout";
  status: "submitted" | "reviewing" | "estimated" | "approved" | "executed";
  cost?: number;
  submittedAt: string;
  notes: string;
}
export const changeRequests: ChangeRequest[] = [
  { id: "CR-01", projectId: "CP-2410", title: "Ajout spots LED couloir", category: "Ajout", status: "estimated", cost: 280000, submittedAt: "Il y a 1 jour", notes: "6 spots encastrables dimmables." },
  { id: "CR-02", projectId: "CP-2410", title: "Corniches gris perle", category: "Couleur", status: "reviewing", submittedAt: "Il y a 3 jours", notes: "Préférence pour un ton plus moderne." },
  { id: "CR-03", projectId: "CP-2415", title: "Habillage en bois noble", category: "Matériau", status: "submitted", submittedAt: "Aujourd'hui", notes: "Remplacer panneaux par lambris chêne." },
];

export const inspirations = [
  { id: "I-01", style: "Luxury", title: "Plafond doré contemporain", img: project1, saved: true },
  { id: "I-02", style: "Modern", title: "Salon minimaliste blanc", img: project2, saved: true },
  { id: "I-03", style: "Hotel", title: "Hall hôtelier marbré", img: project3, saved: false },
  { id: "I-04", style: "Minimalist", title: "Chambre épurée", img: project2, saved: true },
  { id: "I-05", style: "Contemporary", title: "Bandeau LED salon", img: project1, saved: false },
  { id: "I-06", style: "Luxury", title: "Corniches travaillées", img: project3, saved: true },
];

export const notifications = [
  { id: "N-01", type: "photo", title: "4 nouvelles photos disponibles", description: "Projet plafond salon — avancement S22", time: "Il y a 2h", unread: true },
  { id: "N-02", type: "doc", title: "Avenant à approuver", description: "Spots LED couloir — 280 000 FCFA", time: "Il y a 1 jour", unread: true },
  { id: "N-03", type: "payment", title: "Rappel paiement à venir", description: "Solde final plafond salon — échéance 30 juin", time: "Il y a 2 jours", unread: false },
  { id: "N-04", type: "appointment", title: "Rendez-vous confirmé", description: "Inspection qualité — 14 juin à 10h00", time: "Il y a 3 jours", unread: false },
  { id: "N-05", type: "update", title: "Étape franchie", description: "Travaux en cours sur Plafond décoratif", time: "Il y a 5 jours", unread: false },
];

export const referralStats = {
  code: clientProfile.referralCode,
  sent: 4,
  converted: 2,
  rewardsFcfa: 175000,
  history: [
    { id: "R-01", name: "Jean-Paul E.", status: "converted" as const, reward: 100000, date: "12 mai 2026" },
    { id: "R-02", name: "Cabinet Tchatchoua", status: "converted" as const, reward: 75000, date: "28 avril 2026" },
    { id: "R-03", name: "Famille Owono", status: "pending" as const, reward: 0, date: "22 mai 2026" },
    { id: "R-04", name: "Restaurant Source", status: "pending" as const, reward: 0, date: "1 juin 2026" },
  ],
};

export const reviewCategories = [
  { key: "quality", label: "Qualité du travail" },
  { key: "communication", label: "Communication" },
  { key: "deadlines", label: "Respect des délais" },
  { key: "professionalism", label: "Professionnalisme" },
] as const;

export const statusLabel: Record<ClientProjectStatus, string> = {
  lead: "Demande", visit: "Visite", quoted: "Devis envoyé", approved: "Approuvé",
  started: "Démarré", in_progress: "En cours", qa: "Contrôle qualité", completed: "Terminé",
};

export const totalsForClient = () => {
  const total = clientProjects.reduce((s, p) => s + p.amount, 0);
  const paid = clientProjects.reduce((s, p) => s + p.paid, 0);
  const avgProgress = clientProjects.reduce((s, p) => s + p.progress, 0) / clientProjects.length;
  return { total, paid, remaining: total - paid, avgProgress };
};
