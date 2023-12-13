import parseDiff, { File } from "parse-diff";
import { IGetCommitsDiffParams } from "./interface";

import { removeExcludedFiles } from "../remove-excluded-files";
import { removeDeletedFiles } from "../remove-deleted-files";

export const getCommitsDiff = async ({
  octokit,
  owner,
  repo,
  base_sha,
  head_sha,
  exclude_files,
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
      const parsedData = parseDiff(res.data);
      const allowedFiles = removeExcludedFiles(parsedData, exclude_files);
      return removeDeletedFiles(allowedFiles);
    });
