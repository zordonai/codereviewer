import parseDiff, { File } from "parse-diff";
import { IGetCommitsDiffParams } from "./interface";

export const getCommitsDiff = async ({
  octokit,
  owner,
  repo,
  base_sha,
  head_sha,
}: IGetCommitsDiffParams): Promise<File[]> =>
  await octokit
    .request({
      url: `https://api.github.com/repos/${owner}/${repo}/compare/${base_sha}...${head_sha}`,
      owner,
      repo,
      headers: {
        Accept: "application/vnd.github.diff",
      },
    })
    .then((res) => {
      return parseDiff(res.data);
    });
