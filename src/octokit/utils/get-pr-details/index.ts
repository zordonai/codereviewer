import { readFileSync } from "fs";
import { Octokit } from "@octokit/rest";
import { IPRDetails } from "./interface";

export const getPRDetails = (): IPRDetails => {
  console.log({
    event: JSON.parse(
      readFileSync(process.env.GITHUB_EVENT_PATH || "", "utf8")
    ),
  });
  const { action, pull_request, repository, number, before, after } =
    JSON.parse(readFileSync(process.env.GITHUB_EVENT_PATH || "", "utf8"));

  return {
    title: pull_request.title ?? "",
    description: pull_request.body ?? "",
    owner: repository.owner.login,
    repo: repository.name,
    pull_number: number,
    base_sha: before,
    head_sha: after,
    action,
  };
};
