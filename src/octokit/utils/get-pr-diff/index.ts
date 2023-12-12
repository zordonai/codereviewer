import parseDiff, { File } from "parse-diff";
import { IGetDiffParams } from "./interface";

export const getPRDiff = async ({
  octokit,
  owner,
  repo,
  pull_number,
  action,
}: IGetDiffParams): Promise<File[]> => {
  // const prResponse = await octokit.rest.pulls.get({
  //   owner,
  //   repo,
  //   pull_number,
  //   mediaType: { format: "diff" },
  // });
  let diff = [];
  const prCommits = await octokit.rest.pulls
    .listCommits({
      owner,
      repo,
      pull_number,
    })
    .then((response) => response.data);
  const prCommitsWithoutMerge = prCommits.filter(
    (commit) => commit.parents.length < 2
  );

  for await (const commit of prCommitsWithoutMerge) {
    const commitDiff = await octokit
      .request({
        url: `https://api.github.com/repos/${owner}/${repo}/commits/${commit.sha}`,
        owner,
        repo,
        headers: {
          Accept: "application/vnd.github.diff",
        },
      })
      .then((res) => {
        return res.data;
      });

    diff.push(...parseDiff(commitDiff));
  }

  console.log({ prCommits, prCommitsWithoutMerge, diff });

  return diff;
};
