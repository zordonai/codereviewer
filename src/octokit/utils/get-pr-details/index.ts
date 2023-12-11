import { readFileSync } from "fs";
import { Octokit } from "@octokit/rest";
import { IPRDetails } from "./interface";

export const getPRDetails = async (
  octokit: InstanceType<typeof Octokit>
): Promise<IPRDetails> => {
  const { repository, number } = JSON.parse(
    readFileSync(process.env.GITHUB_EVENT_PATH || "", "utf8")
  );

  const prResponse = await octokit.rest.pulls.get({
    owner: repository.owner.login,
    repo: repository.name,
    pull_number: number,
  });
  const prFilesResponse = await octokit.rest.pulls.listFiles({
    owner: repository.owner.login,
    repo: repository.name,
    pull_number: number,
  });

  console.log({
    prResponse,
    prChangedFilesResponse: prFilesResponse,
    prChangedFilesData: prFilesResponse.data,
  });

  return {
    owner: repository.owner.login,
    repo: repository.name,
    pull_number: number,
    title: prResponse.data.title ?? "",
    description: prResponse.data.body ?? "",
    files: prFilesResponse.data.map(({ filename }) => filename),
  };
};
