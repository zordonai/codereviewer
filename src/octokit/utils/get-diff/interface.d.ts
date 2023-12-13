import type { Octokit } from "@octokit/rest";

export interface IGetDiffParams {
  octokit: InstanceType<typeof Octokit>;
  owner: string;
  repo: string;
  pull_number: number;
  base_sha: string;
  head_sha: string;
  action: string;
}