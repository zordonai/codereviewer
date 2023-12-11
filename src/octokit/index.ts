import fetch from "node-fetch";

import { Octokit } from "@octokit/rest";

export const getOctokit = (githubToken: string) => {
  const octokit = new Octokit({ auth: githubToken, request: { fetch } });
  return octokit;
};

export * from "./utils";
