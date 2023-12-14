import { IAnalyzeCode, TAIComments } from "./interface";

export const analyzeCode = async ({
  diff,
  title,
  description,
  openaiApiKey,
  bardApiCookie,
  palmApiKey,
}: IAnalyzeCode) => {
  let aiAnalyzer;
  const apiKey = openaiApiKey || palmApiKey || bardApiCookie;

  if (openaiApiKey) aiAnalyzer = (await import("./openai")).withOpenAI;
  else if (bardApiCookie) aiAnalyzer = (await import("./bard")).withBard;
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
