import { Badge } from "@/components/ui/badge";
import { CheckCircle2, PlayCircle, AlertCircle, HelpCircle, Check, XCircle, Clock, Wrench } from "lucide-react";

const statusConfig: Record<string, { label: string; className: string; icon: any }> = {
  disponivel: {
    label: "Disponível",
    className: "bg-success/15 text-success border-success/30 dark:bg-success/20 dark:text-success",
    icon: CheckCircle2
  },
  em_uso: {
    label: "Em uso",
    className: "bg-info/15 text-info border-info/30 dark:bg-info/20 dark:text-info",
    icon: PlayCircle
  },
  manutencao: {
    label: "Manutenção",
    className: "bg-warning/15 text-warning border-warning/30 dark:bg-warning/20 dark:text-warning",
    icon: Wrench
  },
  pendente: {
    label: "Pendente",
    className: "bg-warning/15 text-warning border-warning/30 dark:bg-warning/20 dark:text-warning",
    icon: Clock
  },
  aprovado: {
    label: "Aprovado",
    className: "bg-success/15 text-success border-success/30 dark:bg-success/20 dark:text-success",
    icon: CheckCircle2
  },
  rejeitado: {
    label: "Rejeitado",
    className: "bg-destructive/15 text-destructive border-destructive/30 dark:bg-destructive/20 dark:text-destructive",
    icon: XCircle
  },
  devolvido: {
    label: "Devolvido",
    className: "bg-muted text-muted-foreground border-muted-foreground/30 dark:bg-muted/50 dark:text-muted-foreground",
    icon: Check
  },
  atrasado: {
    label: "Atrasado",
    className: "bg-destructive/15 text-destructive border-destructive/30 dark:bg-destructive/20 dark:text-destructive",
    icon: AlertCircle
  },
};

export function StatusBadge({ status }: { status: string }) {
  const config = statusConfig[status] || { label: status, className: "", icon: HelpCircle };
  const Icon = config.icon;
  return (
    <Badge variant="outline" className={`text-xs sm:text-sm font-semibold px-2.5 py-0.5 border shadow-sm flex items-center gap-1.5 w-fit ${config.className}`}>
      <Icon className="h-3.5 w-3.5 shrink-0" />
      <span>{config.label}</span>
    </Badge>
  );
}
