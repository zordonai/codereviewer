import PaLM from "palm-api";
import fetch from "node-fetch";

export const getPalmAPI = (palmApiKey: string) => {
  const bot = new PaLM(palmApiKey, {
    fetch: fetch as any,
  });

  return bot;
};
