import * as core from "@actions/core";

export const getInputs = () => {
  const githubToken: string = core.getInput("github_token");
  const palmApiKey: string = core.getInput("palm_api_key", {
    required: true,
  });

  return {
    githubToken,
    palmApiKey,
  };
};
