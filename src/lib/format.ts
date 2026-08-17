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

export const pct = (n: number) => `${Math.round(n)} %`;

export const relTime = (d: Date | string) =>
  "Il y a " + formatDistanceToNowStrict(typeof d === "string" ? new Date(d) : d, { locale: fr });

export const dateShort = (d: Date | string) =>
  fmtDate(typeof d === "string" ? new Date(d) : d, "dd MMM yyyy", { locale: fr });

export const dateLong = (d: Date | string) =>
  fmtDate(typeof d === "string" ? new Date(d) : d, "EEEE dd MMMM yyyy", { locale: fr });

export const dateTime = (d: Date | string) =>
  fmtDate(typeof d === "string" ? new Date(d) : d, "dd MMM · HH'h'mm", { locale: fr });

export const timeOnly = (d: Date | string) =>
  fmtDate(typeof d === "string" ? new Date(d) : d, "HH'h'mm", { locale: fr });
