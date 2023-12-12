import parseDiff, { File } from "parse-diff";
import { IGetDiffParams } from "./interface";

export const getPRDiff = async ({
  octokit,
  owner,
  repo,
  pull_number,
  head_sha,
  action,
}: IGetDiffParams): Promise<File[]> => {
  console.log({
    owner,
    repo,
    pull_number,
    head_sha,
    action,
  });

  const prDiff = await octokit.rest.pulls
    .get({
      owner,
      repo,
      pull_number,
      mediaType: { format: "diff" },
    })
    .then((res) => {
      return res.data as unknown as string;
    });

  console.log({
    prDiff,
    prDiffParsed: parseDiff(prDiff),
    prDiffParsedString: JSON.stringify(parseDiff(prDiff), null, 2),
  });

  const lastCommit = await octokit.rest.git
    .getCommit({
      owner,
      repo,
      commit_sha: head_sha,
    })
    .then((res) => {
      return res.data;
    });
  const commitDiff = await octokit
    .request({
      url: `https://api.github.com/repos/${owner}/${repo}/commits/${head_sha}`,
      owner,
      repo,
      headers: {
        Accept: "application/vnd.github.diff",
      },
    })
    .then((res) => {
      return res.data;
    });

  console.log({
    commitDiff,
    commitDiffParsed: parseDiff(commitDiff),
    commitDiffParsedString: JSON.stringify(parseDiff(commitDiff), null, 2),
    lastCommit,
    lastCommitString: JSON.stringify(lastCommit, null, 2),
    parents: lastCommit.parents,
  });

  return parseDiff(commitDiff);
};
