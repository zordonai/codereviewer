import { RestEndpointMethodTypes } from "@octokit/rest";
import { createComments } from "./create-comments";
import { IGetDiffParams } from "./interface";

export const sendReviewComments = async ({
  octokit,
  owner,
  repo,
  pull_number,
  aiComments,
}: IGetDiffParams): Promise<
  RestEndpointMethodTypes["pulls"]["createReview"]["response"]
> => {
  const comments = createComments(aiComments);

  return await octokit.rest.pulls.createReview({
    owner,
    repo,
    pull_number,
    comments,
    event: "COMMENT",
  });
};
