export const getIsFileChangesEmpty = (fileChanges: string[]) => {
  const fileChangesWithLengthZero = fileChanges.length === 0;
  const fileChangesWithLengthOne = fileChanges.length === 1;
  const fileChangesFirstLineIsEmpty = fileChanges?.[0].endsWith("+ ");

  return (
    fileChangesWithLengthZero ||
    (fileChangesWithLengthOne && fileChangesFirstLineIsEmpty)
  );
};
