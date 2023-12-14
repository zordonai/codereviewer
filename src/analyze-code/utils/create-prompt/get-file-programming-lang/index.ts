import { TLanguageMap } from "./interface";

const languageMap: TLanguageMap = require("language-map");

export const getFileProgrammingLang = (ext: string) => {
  const [language] =
    Object.entries(languageMap).find(([, { extensions }]) =>
      extensions.includes(ext)
    ) ?? [];

  return language;
};
