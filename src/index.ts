import * as core from "@actions/core";
import { readFileSync } from "fs";
import { getInputs } from "./get-inputs";
import { getOctokit, getPRDetails, getPRDiff } from "./octokit";
import { getPalmAPI } from "./palm";

const inputs = getInputs();
const octokit = getOctokit(inputs.githubToken);
const palm = getPalmAPI(inputs.palmApiKey);

async function startCodeReview() {
  try {
    const { owner, repo, pull_number, base_sha, head_sha, action } =
      getPRDetails();
    const diff = await getPRDiff({
      octokit,
      owner,
      repo,
      pull_number,
      base_sha,
      head_sha,
      action,
    });

    core.info(
      JSON.stringify(
        { diff, pr: { owner, repo, pull_number, action } },
        null,
        2
      )
    );
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message);
  }
}

startCodeReview();
