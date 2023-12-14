import type { File } from "parse-diff";

export type TAIComments = {
  file: string;
  line: number;
  comment: string;
}[];
export interface IAnalyzeCode {
  diff: File[];
  title: string;
  description: string;
  openaiApiKey: string;
  palmApiKey: string;
}
