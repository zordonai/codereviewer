import { File } from "parse-diff";

export const removeDeletedFiles = (diff: File[]): File[] =>
  diff.filter((file) => {
    return file.to !== "/dev/null";
  });
