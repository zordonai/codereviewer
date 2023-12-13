import type { Octokit } from "@octokit/rest";

export interface IGetDiffParams {
  octokit: InstanceType<typeof Octokit>;
  action: string;
  owner: string;
  repo: string;
  pull_number: number;
  base_sha: string;
  head_sha: string;
  exclude_files: string[];
}
