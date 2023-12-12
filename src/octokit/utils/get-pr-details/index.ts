import { readFileSync } from "fs";
import { Octokit } from "@octokit/rest";
import { IPRDetails } from "./interface";

export const getPRDetails = (): IPRDetails => {
  const { action, pull_request, repository, number } = JSON.parse(
    readFileSync(process.env.GITHUB_EVENT_PATH || "", "utf8")
  );

  return {
    title: pull_request.title ?? "",
    description: pull_request.body ?? "",
    owner: repository.owner.login,
    repo: repository.name,
    pull_number: number,
    action,
  };
};
