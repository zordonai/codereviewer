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
    octokit,
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

  console.log({ prDiff, prDiffParsed: parseDiff(prDiff) });

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

  console.log({ commitDiff, commitDiffParsed: parseDiff(commitDiff) });

  return parseDiff(commitDiff);
};
