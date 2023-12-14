import OpenAI from "openai";

import { IWithOpenAI } from "./interface";
import { createPrompt } from "../utils/create-prompt";

export const withOpenAI = async ({
  diff,
  title,
  description,
  apiKey,
}: IWithOpenAI) => {
  const prompt = await createPrompt(diff, title, description);
  const openai = new OpenAI({
    apiKey,
  });

  return await openai.chat.completions
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
    .then((answer) => answer.choices[0].message?.content?.trim() ?? "[]");
};
