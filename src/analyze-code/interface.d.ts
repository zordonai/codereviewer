import type { File } from "parse-diff";

export interface IAnalyzeCode {
  diff: File[];
  title: string;
  description: string;
  palmApiKey: string;
  openaiApiKey: string;
}
