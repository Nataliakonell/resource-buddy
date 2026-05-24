import { Badge } from "@/components/ui/badge";

const statusConfig: Record<string, { label: string; className: string }> = {
  disponivel: {
    label: "Disponível",
    className: "bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950/50 dark:text-emerald-200 dark:border-emerald-800"
  },
  em_uso: {
    label: "Em uso",
    className: "bg-sky-100 text-sky-900 border-sky-300 dark:bg-sky-950/50 dark:text-sky-200 dark:border-sky-800"
  },
  manutencao: {
    label: "Manutenção",
    className: "bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950/50 dark:text-amber-200 dark:border-amber-800"
  },
  pendente: {
    label: "Pendente",
    className: "bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950/50 dark:text-amber-200 dark:border-amber-800"
  },
  aprovado: {
    label: "Aprovado",
    className: "bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950/50 dark:text-emerald-200 dark:border-emerald-800"
  },
  rejeitado: {
    label: "Rejeitado",
    className: "bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-950/50 dark:text-rose-200 dark:border-rose-800"
  },
  devolvido: {
    label: "Devolvido",
    className: "bg-slate-100 text-slate-800 border-slate-300 dark:bg-slate-900/60 dark:text-slate-200 dark:border-slate-700"
  },
  atrasado: {
    label: "Atrasado",
    className: "bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-950/50 dark:text-rose-200 dark:border-rose-800"
  },
};

export function StatusBadge({ status }: { status: string }) {
  const config = statusConfig[status] || { label: status, className: "" };
  return (
    <Badge variant="outline" className={`text-xs sm:text-sm font-semibold px-3 py-1 border shadow-sm ${config.className}`}>
      {config.label}
    </Badge>
  );
}
