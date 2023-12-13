import type { File } from "parse-diff";

export interface IWithPalm {
  diff: File[];
  title: string;
  description: string;
  apiKey: string;
}
