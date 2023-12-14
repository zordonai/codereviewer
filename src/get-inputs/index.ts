import * as core from "@actions/core";

export const getInputs = () => {
  const githubToken: string = core.getInput("github_token");
  const openaiApiKey: string = core.getInput("openai_api_key");
  const palmApiKey: string = core.getInput("palm_api_key", {
    required: !Boolean(openaiApiKey),
  });
  const excludeFiles = core
    .getInput("exclude_files")
    .split(",")
    .map((s) => s.trim());

  return {
    githubToken,
    openaiApiKey,
    palmApiKey,
    excludeFiles,
  };
};
