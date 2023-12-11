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
    const event = JSON.parse(
      readFileSync(process.env.GITHUB_EVENT_PATH ?? "", "utf8")
    );
    const prDetails = await getPRDetails(octokit);

    const diff = await getPRDiff({
      octokit,
      owner: prDetails.owner,
      repo: prDetails.repo,
      pull_number: prDetails.pull_number,
    });

    core.info(JSON.stringify({ prDetails, diff, event }, null, 2));
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message);
  }
}

startCodeReview();
