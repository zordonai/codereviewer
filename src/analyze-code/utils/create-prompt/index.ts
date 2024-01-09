import type { File } from "parse-diff";
import { getFilesChanges } from "./get-files-changes";
import { getFileExtension } from "./get-file-extension";
import { getFileProgrammingLang } from "./get-file-programming-lang";

export const createPrompt = async (
  diff: File[],
  title: string,
  description: string
) => {
  const filesChanges = getFilesChanges(diff);

  let prompt = `Perform a code review as an expert, considering the specific programming language based on the file extension. Evaluate the following aspects:
1. Code structure and organization.
2. Naming conventions, formatting, and readability.
3. Efficiency and optimization.
4. Logic and correctness of the code.
5. Error handling and exception handling.
6. Code comments and documentation.
7. Security best practices.
8. Consider performance using BigO notation.
9. Good programming practices.

Instructions:
1. ALWAYS provide the response in following JSON format: [{ "file": "<file_name>", "line": <line_number>, "comment": "<review comment>" }] (IMPORTANT: Response must be 1 array as an inline string).
2. Line breaks are ONLY allowed in comments, never in JSON format response.
3. Write the comment in GitHub Markdown format.
4. Focus on areas for improvement, and provide constructive criticism and suggestions.
5. Comment only on the code itself, avoid duplication, and consider the file extension and given guidelines.
6. Provide comments and suggestions ONLY if there is something to improve.
7. Use the given title and description only for the overall context and only comment the code.
8. Suggestions for improvements need to have examples.
9. Disregard indentation adjustments.
10. NEVER suggest adding comments or descriptions to the code.
11. BEWARE of duplicate comments and limit duplication to a maximum of 2.

Please make sure to consider the programming language accurately and follow the provided instructions.

Pull request title: ${title}
Pull request description:

\`\`\`
${description}
\`\`\`

Files:

`;

  for await (const { file, content, changes } of filesChanges) {
    const ext = getFileExtension(file);
    const programmingLang = getFileProgrammingLang(`.${ext}`);

    prompt += `---
File Details:

- File Name: ${file}
- File Extension: ${ext}
- Programming Language: ${programmingLang}

File Diff:

\`\`\`diff
${content}
${changes}
\`\`\`
---
`;
  }

  console.log({ prompt });

  return prompt;
};
