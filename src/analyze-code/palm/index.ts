import { IWithPalm } from "./interface";
import { createPrompt } from "../utils/create-prompt";
import PaLM from "palm-api";
import fetch from "node-fetch";

export const withPalm = async ({
  diff,
  title,
  description,
  apiKey,
}: IWithPalm) => {
  const prompt = await createPrompt(diff, title, description);
  const palm = new PaLM(apiKey, {
    fetch: fetch as any,
  });

  const result = await palm.generateText(prompt, {
    temperature: 0.5,
    candidate_count: 1,
  });

  console.log({ result });

  return result ?? "[]";
};
