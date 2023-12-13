import type { File } from "parse-diff";

export interface IWithOpenAI {
  diff: File[];
  title: string;
  description: string;
  apiKey: string;
}
