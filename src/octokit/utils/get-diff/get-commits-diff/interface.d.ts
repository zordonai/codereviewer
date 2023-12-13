import type { Octokit } from "@octokit/rest";

export interface IGetCommitsDiffParams {
  octokit: InstanceType<typeof Octokit>;
  owner: string;
  repo: string;
  base_sha: string;
  head_sha: string;
}
