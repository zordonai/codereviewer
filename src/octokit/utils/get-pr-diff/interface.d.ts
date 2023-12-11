import type { Octokit } from "@octokit/rest";

export interface IGetDiffParams {
  octokit: InstanceType<typeof Octokit>;
  owner: string;
  repo: string;
  pull_number: number;
}
