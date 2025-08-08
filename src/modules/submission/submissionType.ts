export enum SubmissionStatus {
  PENDING = 1,
  RUNNING = 2,
  ACCEPTED = 3,
  WRONG_ANSWER = 4,
  TIME_LIMIT_EXCEEDED = 5,
  MEMORY_LIMIT_EXCEEDED = 6,
  RUNTIME_ERROR = 7,
  COMPILATION_ERROR = 8,
}

export const SubmissionStatusLabels: Record<
  SubmissionStatus,
  { label: string; emoji: string; color: string }
> = {
  [SubmissionStatus.PENDING]: {
    label: "Pendente",
    emoji: "⏳",
    color: "#FFA500",
  },
  [SubmissionStatus.RUNNING]: {
    label: "Em execução",
    emoji: "🏃",
    color: "#007bff",
  },
  [SubmissionStatus.ACCEPTED]: {
    label: "Aceito",
    emoji: "😀",
    color: "#28a745",
  },
  [SubmissionStatus.WRONG_ANSWER]: {
    label: "Resposta Incorreta",
    emoji: "❌",
    color: "#dc3545",
  },
  [SubmissionStatus.TIME_LIMIT_EXCEEDED]: {
    label: "Tempo Excedido",
    emoji: "⏰",
    color: "#ffc107",
  },
  [SubmissionStatus.MEMORY_LIMIT_EXCEEDED]: {
    label: "Memória Excedida",
    emoji: "💾",
    color: "#6f42c1",
  },
  [SubmissionStatus.RUNTIME_ERROR]: {
    label: "Erro de Execução",
    emoji: "💥",
    color: "#fd7e14",
  },
  [SubmissionStatus.COMPILATION_ERROR]: {
    label: "Erro de Compilação",
    emoji: "🛠️",
    color: "#17a2b8",
  },
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
}
