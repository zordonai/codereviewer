import { File } from "parse-diff";
import { minimatch } from "minimatch";

export const removeExcludedFiles = (
  diff: File[],
  exclude_files: string[]
): File[] =>
  diff.filter((file) => {
    return !exclude_files.some((pattern) => minimatch(file.to ?? "", pattern));
  });
