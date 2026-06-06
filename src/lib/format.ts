import { formatDistanceToNowStrict, format as fmtDate } from "date-fns";
import { fr } from "date-fns/locale";

export const fcfa = (n: number) =>
  new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 })
    .format(Math.round(n))
    .replace(/\u202f|\u00a0/g, " ") + " FCFA";

export const num = (n: number) =>
  new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 })
    .format(Math.round(n))
    .replace(/\u202f|\u00a0/g, " ");

export const relTime = (d: Date | string) => {
  const date = typeof d === "string" ? new Date(d) : d;
  return "Il y a " + formatDistanceToNowStrict(date, { locale: fr });
};

export const dateShort = (d: Date | string) =>
  fmtDate(typeof d === "string" ? new Date(d) : d, "dd MMM yyyy", { locale: fr });

export const dateTime = (d: Date | string) =>
  fmtDate(typeof d === "string" ? new Date(d) : d, "dd MMM · HH'h'mm", { locale: fr });

export const COMMISSION: Record<string, number> = {
  "Vêtements": 0.15,
  "Accessoires": 0.12,
  "Téléphones": 0.08,
  "Ordinateurs": 0.07,
  "Électroménager": 0.05,
  "Meubles": 0.1,
  "Véhicules": 0.05,
  "Autres": 0.1,
};

export const commissionFor = (category: string) => COMMISSION[category] ?? 0.1;

export const breakdown = (price: number, category: string) => {
  const rate = commissionFor(category);
  const commission = Math.round(price * rate);
  return { rate, commission, sellerAmount: price - commission };
};
