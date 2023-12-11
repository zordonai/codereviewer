import { getInputs } from "./get-inputs";
import { getOctokit, getPRDetails } from "./octokit";
import { getPalmAPI } from "./palm";

const inputs = getInputs();
const octokit = getOctokit(inputs.githubToken);
const palm = getPalmAPI(inputs.palmApiKey);

const start = async () => {
  const prDetails = await getPRDetails(octokit);

  console.log({ prDetails });
};
