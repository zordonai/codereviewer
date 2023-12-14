import Bard from "bard-ai";
import { IWithBard } from "./interface";
import { createPrompt } from "../utils/create-prompt";

export const withBard = async ({
  diff,
  title,
  description,
  apiKey,
}: IWithBard) => {
  const prompt = await createPrompt(diff, title, description);
  const bard = new Bard(apiKey);

  let result = await bard.ask(prompt);

  console.log({ result });

  return (result as any) ?? "[]";
};
