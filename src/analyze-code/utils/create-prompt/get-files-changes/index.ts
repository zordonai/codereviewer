import type { File } from "parse-diff";
import { TFilesChanges } from "./interface";

export const getFilesChanges = (diff: File[]) => {
  const filesChanges = diff.reduce(
    (currenFilesChanges: TFilesChanges, file) => {
      const fileChanges = file.chunks[0].changes
        .filter((change) => change.content.trimEnd())
        .map((change) => {
          const line = change.type === "normal" ? change.ln2 : change.ln;
          return `${line} ${change.content.trimEnd()}`;
        });

      if (fileChanges.length === 0) return currenFilesChanges;

      return [
        ...currenFilesChanges,
        {
          file: file.to ?? "",
          content: file.chunks[0].content,
          changes: fileChanges.join("\n"),
        },
      ];
    },
    []
  );

  return filesChanges;
};
