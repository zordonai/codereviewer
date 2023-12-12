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
  const parsedPRDiff = parseDiff(prDiff);

  console.log({
    prDiff,
    parsedPRDiff,
    parsedPRDiffString: JSON.stringify(parsedPRDiff, null, 2),
  });

  if (action === "opened") return parsedPRDiff;

  const prFiles = parsedPRDiff.reduce((currentFiles, file) => {
    currentFiles.add(file.to);
    return currentFiles;
  }, new Set());
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
  const parsedCommitsDiff = parseDiff(commitsDiff).filter((file) =>
    prFiles.has(file.to)
  );

  console.log({
    commitsDiff,
    parsedCommitsDiff,
    parsedCommitsDiffString: JSON.stringify(parsedCommitsDiff, null, 2),
  });

  if (parsedCommitsDiff.length === 0) return [];

  const prChanges = parsedPRDiff.reduce((list, file) => {
    file.chunks[0].changes.forEach((change: any) => {
      list.set(`${file.to}:${change.ln ?? change.ln2}`, change.content);
    });
    return list;
  }, new Map());
  const commitsChanges = parsedCommitsDiff.reduce((list, file) => {
    const changes = file.chunks[0].changes.filter((change: any) => {
      const key = `${file.to}:${change.ln ?? change.ln2}`;
      return prChanges.has(key) && prChanges.get(key).includes(change.content);
    });

    file.chunks[0].changes = changes;
    return [...list, file];
  }, [] as File[]);
  console.log({ commitsChanges });

  return commitsChanges;
};
