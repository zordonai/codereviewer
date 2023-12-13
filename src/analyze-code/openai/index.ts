import OpenAI from "openai";

import { IWithOpenAI } from "./interface";
import { createPrompt } from "../utils/create-prompt";

export const withOpenAI = async ({
  diff,
  title,
  description,
  apiKey,
}: IWithOpenAI) => {
  const openai = new OpenAI({
    apiKey,
  });

  const prompt = createPrompt(diff, title, description);
  const result = await openai.chat.completions
    .create({
      model: "gpt-3.5-turbo",
      temperature: 0.5,
      messages: [
        {
          role: "system",
          content: prompt,
        },
      ],
      stream: false,
    })
    .then((answer) => answer.choices);

  return {
    result,
    resultString: JSON.stringify(result),
  };
};
