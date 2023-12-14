import { TAIComments } from "./interface";

export const createComments = (
  aiComments: TAIComments
): Array<{ body: string; path: string; line: number }> => {
  return aiComments.map(({ file, line, comment }) => ({
    path: file,
    line,
    body: comment,
  }));
};
