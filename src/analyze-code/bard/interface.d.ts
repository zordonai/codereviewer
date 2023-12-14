import type { File } from "parse-diff";

export interface IWithBard {
  diff: File[];
  title: string;
  description: string;
  apiKey: string;
}
