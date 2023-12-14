import type { Octokit } from "@octokit/rest";
import { TAIComments } from "./create-comments/interface";

export interface IGetDiffParams {
  octokit: InstanceType<typeof Octokit>;
  owner: string;
  repo: string;
  pull_number: number;
  aiComments: TAIComments;
}
