import { IAnalyzeCode } from "./interface";

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

  return await aiAnalyzer({
    diff,
    title,
    description,
    apiKey,
  });
};
