import { File } from "parse-diff";
import { IGetDiffBeweenPRAndCommits } from "./interface";

export const getAllowedCommitsDiff = async ({
  pr_diff,
  commits_diff,
}: IGetDiffBeweenPRAndCommits): Promise<File[]> => {
  const initialPRDiffFiles = new Set();
  const prDiffFiles = pr_diff.reduce((currentFiles, file) => {
    currentFiles.add(file.to);
    return currentFiles;
  }, initialPRDiffFiles);

  const commitsDiffFiles = commits_diff.filter((file) =>
    prDiffFiles.has(file.to)
  );

  if (commitsDiffFiles.length === 0) return [];

  const initialPRChanges = new Map();
  const prChanges = pr_diff.reduce((list, file) => {
    file.chunks[0].changes.forEach((change) => {
      const line = change.type === "normal" ? change.ln2 : change.ln;
      list.set(`${file.to}:${line}`, change.content);
    });
    return list;
  }, initialPRChanges);

  const initialAllowedCommitsChanges: File[] = [];
  const allowedCommitsChanges = commitsDiffFiles.reduce((list, file) => {
    const changes = file.chunks[0].changes.filter((change) => {
      const line = change.type === "normal" ? change.ln2 : change.ln;
      const key = `${file.to}:${line}`;
      return prChanges.has(key) && prChanges.get(key).includes(change.content);
    });

    file.chunks[0].changes = changes;
    return [...list, file];
  }, initialAllowedCommitsChanges);

  return allowedCommitsChanges;
};
