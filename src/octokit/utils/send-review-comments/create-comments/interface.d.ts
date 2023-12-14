export type TAIComments = {
  file: string;
  line: number;
  comment: string;
}[];

export type TGithubComments = {
  path: string;
  line: number;
  body: string;
}[];
