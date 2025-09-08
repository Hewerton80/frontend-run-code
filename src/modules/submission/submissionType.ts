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
}

export const SubmissionStatusLabels: Record<
  SubmissionStatus,
  { label: string; emoji: string; color: string }
> = {
  [SubmissionStatus.PENDING]: {
    label: "Pendente",
    emoji: "⏳",
    color: "rgb(255,165,0)",
  },
  [SubmissionStatus.RUNNING]: {
    label: "Em execução",
    emoji: "🏃",
    color: "rgb(0,123,255)",
  },
  [SubmissionStatus.ACCEPTED]: {
    label: "Aceito",
    emoji: "😀",
    color: "rgb(40,167,69)",
  },
  [SubmissionStatus.WRONG_ANSWER]: {
    label: "Resposta Incorreta",
    emoji: "❌",
    color: "rgb(220,53,69)",
  },
  [SubmissionStatus.TIME_LIMIT_EXCEEDED]: {
    label: "Tempo Excedido",
    emoji: "⏰",
    color: "rgb(255,193,7)",
  },
  [SubmissionStatus.MEMORY_LIMIT_EXCEEDED]: {
    label: "Memória Excedida",
    emoji: "💾",
    color: "rgb(111,66,193)",
  },
  [SubmissionStatus.RUNTIME_ERROR]: {
    label: "Erro de Execução",
    emoji: "💥",
    color: "rgb(253,126,20)",
  },
  [SubmissionStatus.COMPILATION_ERROR]: {
    label: "Erro de Compilação",
    emoji: "🛠️",
    color: "rgb(23,162,184)",
  },
  [SubmissionStatus.UNKNOWN_ERROR]: {
    label: "Erro Desconhecido",
    emoji: "❓",
    color: "rgb(108,117,125)",
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
