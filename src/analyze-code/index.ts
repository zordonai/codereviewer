import { IAnalyzeCode, TAIComments } from "./interface";

export const analyzeCode = async ({
  diff,
  title,
  description,
  palmApiKey,
  openaiApiKey,
}: IAnalyzeCode) => {
  const apiKey = palmApiKey || openaiApiKey;
  const aiAnalyzer = palmApiKey
    ? (await import("./palm")).withPalm
    : (await import("./openai")).withOpenAI;
  const aiComments = await aiAnalyzer({
    diff,
    title,
    description,
    apiKey,
  });

  console.log({ aiComments });

  return aiComments as unknown as TAIComments;
};
