import { IAnalyzeCode } from "./interface";
import { createPrompt } from "../create-prompt";

export const analyzeCode = async ({
  palm,
  diff,
  title,
  description,
}: IAnalyzeCode) => {
  const prompt = createPrompt(diff, title, description);
  const result1 = await palm.generateText(prompt, {
    temperature: 0.5,
    candidate_count: 1,
  });
  const result2 = await palm.generateText(prompt, {
    temperature: 0.5,
    candidate_count: 1,
  });

  console.log({
    result1String: JSON.stringify(result1),
    result2String: JSON.stringify(result2),
  });
};
