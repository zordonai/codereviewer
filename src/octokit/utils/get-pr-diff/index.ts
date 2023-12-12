import parseDiff, { File } from "parse-diff";
import { IGetDiffParams } from "./interface";

export const getPRDiff = async ({
  octokit,
  owner,
  repo,
  pull_number,
  action,
}: IGetDiffParams): Promise<File[]> => {
  const prResponse = await octokit.rest.pulls.get({
    owner,
    repo,
    pull_number,
    mediaType: { format: "diff" },
  });
  const prCommitsResponse = await octokit.rest.pulls.listCommits({
    owner,
    repo,
    pull_number,
  });
  const commitDiff = await octokit
    .request({
      url: `https://api.github.com/repos/${owner}/${repo}/commits/47b985e529773089a9d7913a56df62ca2ee9c8a1`,
      owner,
      repo,
      headers: {
        Accept: "application/vnd.github.diff",
      },
    })
    .then((res) => {
      return res.data;
    });

  console.log({ commits: prCommitsResponse.data, commitDiff });

  const diff = prResponse.data as unknown as string;

  return parseDiff(diff);
};
