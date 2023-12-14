import type { File } from "parse-diff";

export const getFilesChanges = (diff: File[]) => {
  const filesChanges = diff.map((file) => {
    const fileChanges = file.chunks[0].changes.map((change) => {
      const line = change.type === "normal" ? change.ln2 : change.ln;
      return `${line} ${change.content.trimEnd()}`;
    });

    return {
      file: file.to ?? "",
      content: file.chunks[0].content,
      changes: fileChanges.join("\n"),
    };
  });

  return filesChanges.flat();
};
