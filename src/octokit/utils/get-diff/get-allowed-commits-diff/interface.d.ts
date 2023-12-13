import type { File } from "parse-diff";

export interface IGetDiffBeweenPRAndCommits {
  pr_diff: File[];
  commits_diff: File[];
}
