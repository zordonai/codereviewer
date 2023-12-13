import parseDiff, { File } from "parse-diff";
import { IGetPRDiffParams } from "./interface";

import { removeExcludedFiles } from "../remove-excluded-files";
import { removeDeletedFiles } from "../remove-deleted-files";

export const getPRDiff = async ({
  octokit,
  owner,
  repo,
  pull_number,
  exclude_files,
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
      const parsedData = parseDiff(data);
      const allowedFiles = removeExcludedFiles(parsedData, exclude_files);
      return removeDeletedFiles(allowedFiles);
    });
