import { readFileSync } from "fs";
import { getInputs } from "./get-inputs";
import { getOctokit, getPRDetails, getPRDiff } from "./octokit";
import { getPalmAPI } from "./palm";

const inputs = getInputs();
const octokit = getOctokit(inputs.githubToken);
const palm = getPalmAPI(inputs.palmApiKey);

const startCodeReview = async () => {
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

  console.log({ prDetails, diff, event });
};

startCodeReview();
