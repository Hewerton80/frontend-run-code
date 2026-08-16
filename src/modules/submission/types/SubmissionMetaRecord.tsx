import { CSSProperties } from "react";
import { SubmissionStatus } from "./SubmissionStatusEnum";
import {
  CheckCircle2,
  Clock,
  Loader2,
  XCircle,
  Timer,
  AlertTriangle,
  HelpCircle,
  FileX,
} from "lucide-react";

export const SUBMISSION_META: Record<
  SubmissionStatus | number,
  {
    label: string;
    tone: string;
    icon: React.ComponentType<{ className?: string; style?: CSSProperties }>;
    color: string;
  }
> = {
  [SubmissionStatus.PENDING]: {
    label: "Não Submetida",
    tone: "bg-white/10 text-white/80 ring-white/15",
    icon: Clock,
    color: "text-white/80",
  },
  [SubmissionStatus.RUNNING]: {
    label: "Executando",
    tone: "bg-info/30 text-white ring-info/50",
    icon: Loader2,
    color: "text-white/80",
  },
  [SubmissionStatus.ACCEPTED]: {
    label: "Aceito",
    tone: "bg-success/30 text-white ring-success/60",
    icon: CheckCircle2,
    color: "text-success",
  },
  [SubmissionStatus.WRONG_ANSWER]: {
    label: "Resposta errada",
    tone: "bg-destructive/30 text-white ring-destructive/60",
    icon: XCircle,
    color: "text-destructive",
  },
  [SubmissionStatus.TIME_LIMIT_EXCEEDED]: {
    label: "Tempo excedido",
    tone: "bg-warning/30 text-white ring-warning/60",
    icon: Timer,
    color: "text-warning",
  },
  [SubmissionStatus.MEMORY_LIMIT_EXCEEDED]: {
    label: "Memória excedida",
    tone: "bg-warning/30 text-white ring-warning/60",
    icon: AlertTriangle,
    color: "text-warning",
  },
  [SubmissionStatus.RUNTIME_ERROR]: {
    label: "Erro em execução",
    tone: "bg-destructive/30 text-white ring-destructive/60",
    icon: AlertTriangle,
    color: "text-destructive",
  },
  [SubmissionStatus.COMPILATION_ERROR]: {
    label: "Erro de compilação",
    tone: "bg-destructive/30 text-white ring-destructive/60",
    icon: AlertTriangle,
    color: "text-destructive",
  },
  [SubmissionStatus.UNKNOWN_ERROR]: {
    label: "Erro desconhecido",
    tone: "bg-destructive/30 text-white ring-destructive/60",
    icon: HelpCircle,
    color: "text-destructive",
  },
  [SubmissionStatus.NO_OUTPUT]: {
    label: "Sem saída",
    tone: "bg-white/10 text-white/80 ring-white/15",
    icon: FileX,
    color: "text-white/80",
  },
};
