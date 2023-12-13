import * as core from "@actions/core";

export const getInputs = () => {
  const githubToken: string = core.getInput("github_token");
  const palmApiKey: string = core.getInput("palm_api_key");
  const openaiApiKey: string = core.getInput("openai_api_key", {
    required: !Boolean(palmApiKey),
  });
  const excludeFiles = core
    .getInput("exclude_files")
    .split(",")
    .map((s) => s.trim());

  return {
    githubToken,
    palmApiKey,
    openaiApiKey,
    excludeFiles,
  };
};
