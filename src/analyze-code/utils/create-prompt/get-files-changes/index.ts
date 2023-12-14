import type { File } from "parse-diff";
import { TFilesChanges } from "./interface";
import { getIsFileChangesEmpty } from "./get-is-file-changes-empty";

export const getFilesChanges = (diff: File[]) => {
  const filesChanges = diff.reduce(
    (currenFilesChanges: TFilesChanges, file) => {
      const fileChanges = file.chunks[0].changes.map((change) => {
        const line = change.type === "normal" ? change.ln2 : change.ln;
        return `${line} ${change.content.trimEnd()}`;
      });

      if (getIsFileChangesEmpty(fileChanges)) return currenFilesChanges;

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
