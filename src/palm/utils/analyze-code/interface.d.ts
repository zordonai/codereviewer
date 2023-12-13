import PaLM from "palm-api";
import type { File } from "parse-diff";

export interface IAnalyzeCode {
  palm: PaLM;
  diff: File[];
  title: string;
  description: string;
}
