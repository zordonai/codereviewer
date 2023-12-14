import * as core from "@actions/core";

export const getInputs = () => {
  const githubToken: string = core.getInput("github_token");
  const openaiApiKey: string = core.getInput("openai_api_key");
  const bardApiCookie: string = core.getInput("bard_api_cookie");
  const palmApiKey: string = core.getInput("palm_api_key", {
    required: !Boolean(openaiApiKey) && !Boolean(bardApiCookie),
  });
  const excludeFiles = core
    .getInput("exclude_files")
    .split(",")
    .map((s) => s.trim());

  return {
    githubToken,
    openaiApiKey,
    bardApiCookie,
    palmApiKey,
    excludeFiles,
  };
};
