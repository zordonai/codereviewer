import type { File } from "parse-diff";
import { IGetDiffParams } from "./interface";
import { getPRDiff } from "./get-pr-diff";
import { getCommitsDiff } from "./get-commits-diff";
import { getAllowedCommitsDiff } from "./get-allowed-commits-diff";

export const getDiff = async ({
  octokit,
  owner,
  repo,
  pull_number,
  base_sha,
  head_sha,
  action,
}: IGetDiffParams): Promise<File[]> => {
  const prDiff = await getPRDiff({
    octokit,
    owner,
    repo,
    pull_number,
  });

  console.log({ prDiffString: JSON.stringify(prDiff) });

  if (action === "opened") return prDiff;

  const commitsDiff = await getCommitsDiff({
    octokit,
    owner,
    repo,
    base_sha,
    head_sha,
  });

  console.log({ commitsDiffString: JSON.stringify(commitsDiff) });

  if (commitsDiff.length === 0) return [];

  const allowedCommitsDiff = getAllowedCommitsDiff({
    pr_diff: prDiff,
    commits_diff: commitsDiff,
  });

  console.log({
    allowedCommitsDiffString: JSON.stringify(allowedCommitsDiff),
  });

  return allowedCommitsDiff;
};
