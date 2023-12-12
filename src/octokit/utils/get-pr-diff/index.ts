import parseDiff, { File } from "parse-diff";
import { IGetDiffParams } from "./interface";

export const getPRDiff = async ({
  octokit,
  owner,
  repo,
  pull_number,
  base_sha,
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

  if (action === "opened") return parseDiff(prDiff);

  const commitsDiff = await octokit
    .request({
      url: `https://api.github.com/repos/${owner}/${repo}/compare/${base_sha}...${head_sha}`,
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
    commitsDiff,
    commitsDiffParsed: parseDiff(commitsDiff),
    commitsDiffParsedString: JSON.stringify(parseDiff(commitsDiff), null, 2),
  });

  return parseDiff(commitsDiff);
};
