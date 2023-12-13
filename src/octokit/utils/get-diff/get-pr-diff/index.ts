import parseDiff, { File } from "parse-diff";
import { IGetPRDiffParams } from "./interface";

export const getPRDiff = async ({
  octokit,
  owner,
  repo,
  pull_number,
}: IGetPRDiffParams): Promise<File[]> =>
  await octokit.rest.pulls
    .get({
      owner,
      repo,
      pull_number,
      mediaType: { format: "diff" },
    })
    .then((res) => {
      const data = res.data as unknown as string;
      return parseDiff(data);
    });
