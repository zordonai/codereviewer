import PaLM from "palm-api";
import fetch from "node-fetch";

export const getPalmAPI = (palmApiKey: string) => {
  const palm = new PaLM(palmApiKey, {
    fetch: fetch as any,
  });

  return palm;
};

export * from "./utils";
