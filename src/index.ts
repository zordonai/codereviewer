import * as core from "@actions/core";
import { getInputs } from "./get-inputs";
import { getOctokit, getPRDetails, getDiff } from "./octokit";
import { analyzeCode } from "./analyze-code";

const inputs = getInputs();
const octokit = getOctokit(inputs.githubToken);

async function startCodeReview() {
  try {
    const {
      title,
      description,
      owner,
      repo,
      pull_number,
      base_sha,
      head_sha,
      action,
    } = getPRDetails();
    const diff = await getDiff({
      octokit,
      action,
      owner,
      repo,
      pull_number,
      base_sha,
      head_sha,
      exclude_files: inputs.excludeFiles,
    });

    if (diff.length === 0) return;

    const results = await analyzeCode({
      diff,
      title,
      description,
      palmApiKey: inputs.palmApiKey,
      openaiApiKey: inputs.openaiApiKey,
    });

    console.log({
      diffString: JSON.stringify(diff),
      prDetailsString: JSON.stringify({ owner, repo, pull_number, action }),
      results,
    });
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message);
  }
}

startCodeReview();
