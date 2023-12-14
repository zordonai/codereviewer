export const getFileExtension = (file: string) => {
  const [ext] = file.split(/\./gm).reverse();
  return ext;
};
