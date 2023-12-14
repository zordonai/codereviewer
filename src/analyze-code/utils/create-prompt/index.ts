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
1. Provide your response in the format: [{ "file": "<file_name>", "line": <line_number>, "comment": "<review comment>" }].
2. Write the comment in GitHub Markdown format.
3. Focus on areas for improvement, and provide constructive criticism and suggestions.
4. Comment only on the code itself, avoid duplication, and consider the file extension and given guidelines.
5. Provide comments and suggestions ONLY if there is something to improve.
6. Use the given description only for the overall context and only comment the code.
7. Suggestions for improvements need to have examples.
8. Disregard indentation adjustments.
9. NEVER suggest adding comments or descriptions to the code.
10. BEWARE of duplicate comments and limit duplication to a maximum of 2.

Please make sure to consider the programming language accurately and follow the provided instructions.

Pull request title: ${title}
Pull request description:

---
${description}
---

Files:

`;

  for await (const { file, content, changes } of filesChanges) {
    const ext = getFileExtension(file);
    const programmingLang = getFileProgrammingLang(`.${ext}`);

    prompt += `---
file_name: ${file}
file_extension: ${ext}
file_programming_language: ${programmingLang}

file_diff:
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
