export const fcfa = (n: number) =>
  new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(n) + " FCFA";

export const pct = (n: number) => `${n.toFixed(1)}%`;

export const marginColor = (m: number) =>
  m >= 20 ? "text-success" : m >= 5 ? "text-warning" : "text-destructive";
