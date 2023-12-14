import * as core from "@actions/core";
import { getInputs } from "./get-inputs";
import {
  getOctokit,
  getPRDetails,
  getDiff,
  sendReviewComments,
} from "./octokit";
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

    const aiComments = await analyzeCode({
      diff,
      title,
      description,
      openaiApiKey: inputs.openaiApiKey,
      palmApiKey: inputs.palmApiKey,
    });

    if (aiComments.length === 0) return;

    console.log({
      diffString: JSON.stringify(diff),
      prDetailsString: JSON.stringify({ owner, repo, pull_number, action }),
      aiComments,
    });

    await sendReviewComments({
      octokit,
      owner,
      repo,
      pull_number,
      aiComments,
    });
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message);
  }
}

startCodeReview();
