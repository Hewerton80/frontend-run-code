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

export enum SubmissionStatus {
  PENDING = 1,
  RUNNING = 2,
  ACCEPTED = 3,
  WRONG_ANSWER = 4,
  TIME_LIMIT_EXCEEDED = 5,
  MEMORY_LIMIT_EXCEEDED = 6,
  RUNTIME_ERROR = 7,
  COMPILATION_ERROR = 8,
  UNKNOWN_ERROR = 9,
  NO_OUTPUT = 11,
}

export const SUBMISSION_META: Record<
  SubmissionStatus,
  {
    label: string;
    tone: string;
    icon: React.ComponentType<{ className?: string }>;
  }
> = {
  [SubmissionStatus.PENDING]: {
    label: "Não Submetida",
    tone: "bg-white/10 text-white/80 ring-white/15",
    icon: Clock,
  },
  [SubmissionStatus.RUNNING]: {
    label: "Executando",
    tone: "bg-info/30 text-white ring-info/50",
    icon: Loader2,
  },
  [SubmissionStatus.ACCEPTED]: {
    label: "Aceito",
    tone: "bg-success/30 text-white ring-success/60",
    icon: CheckCircle2,
  },
  [SubmissionStatus.WRONG_ANSWER]: {
    label: "Resposta errada",
    tone: "bg-destructive/30 text-white ring-destructive/60",
    icon: XCircle,
  },
  [SubmissionStatus.TIME_LIMIT_EXCEEDED]: {
    label: "Tempo excedido",
    tone: "bg-warning/30 text-white ring-warning/60",
    icon: Timer,
  },
  [SubmissionStatus.MEMORY_LIMIT_EXCEEDED]: {
    label: "Memória excedida",
    tone: "bg-warning/30 text-white ring-warning/60",
    icon: AlertTriangle,
  },
  [SubmissionStatus.RUNTIME_ERROR]: {
    label: "Erro em execução",
    tone: "bg-destructive/30 text-white ring-destructive/60",
    icon: AlertTriangle,
  },
  [SubmissionStatus.COMPILATION_ERROR]: {
    label: "Erro de compilação",
    tone: "bg-destructive/30 text-white ring-destructive/60",
    icon: AlertTriangle,
  },
  [SubmissionStatus.UNKNOWN_ERROR]: {
    label: "Erro desconhecido",
    tone: "bg-destructive/30 text-white ring-destructive/60",
    icon: HelpCircle,
  },
  [SubmissionStatus.NO_OUTPUT]: {
    label: "Sem saída",
    tone: "bg-white/10 text-white/80 ring-white/15",
    icon: FileX,
  },
};

export const XP_BY_DIFFICULTY: Record<number, number> = {
  1: 50,
  2: 100,
  3: 150,
  4: 250,
  5: 400,
};

export type SubmissionStatusType = keyof typeof SubmissionStatus;

export interface ISubmission {
  uuid?: string;
  language?: string;
  sourceCode?: string;
  score?: number;
  error?: string | null;
  updatedAt?: string;
  createdAt?: string;
  status: SubmissionStatus;
}

export enum SubmissionQueryKeys {
  List = "submission-list",
  Details = "submission-details",
  Status = "submission-status",
  Jobs = "submission-jobs",
}
