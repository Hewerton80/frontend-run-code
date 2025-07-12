export interface ISubmission {
  uuid?: string;
  language?: string;
  sourceCode?: string;
  score?: number;
  error?: string | null;
  updatedAt?: string;
  createdAt?: string;
}
