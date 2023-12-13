import { IAnalyzeCode } from "./interface";
import { createPrompt } from "../create-prompt";

export const analyzeCode = async ({
  palm,
  diff,
  title,
  description,
}: IAnalyzeCode) => {
  const prompt = createPrompt(diff, title, description);
  console.log({ prompt });
};
