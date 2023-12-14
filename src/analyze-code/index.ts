import { IAnalyzeCode, TAIComments } from "./interface";

export const analyzeCode = async ({
  diff,
  title,
  description,
  openaiApiKey,
  palmApiKey,
}: IAnalyzeCode) => {
  let aiAnalyzer;
  const apiKey = openaiApiKey || palmApiKey;

  if (openaiApiKey) aiAnalyzer = (await import("./openai")).withOpenAI;
  else aiAnalyzer = (await import("./palm")).withPalm;

  const aiCommentsString = await aiAnalyzer({
    diff,
    title,
    description,
    apiKey,
  });
  const aiComments: TAIComments = JSON.parse(aiCommentsString);
  return aiComments;
};
