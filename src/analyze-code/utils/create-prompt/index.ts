import type { File } from "parse-diff";
import { getFilesChanges } from "./get-files-changes";
import { fileTypeFromFile } from "file-type";

export const createPrompt = async (
  diff: File[],
  title: string,
  description: string
) => {
  const filesChanges = getFilesChanges(diff);

  let prompt = `Please perform a code review considering the following aspects:
1. Code structure and organization
2. Naming conventions and formatting
3. Clarity and readability of the code
4. Efficiency and optimization
5. Logic and correct functioning of the code
6. Error handling and exception handling
7. Code comments and documentation
8. Security best practices
9. Consider performance using BigO notation
10. Good programming practices

Extra Instructions:
1. Provide the response in following JSON format: [{ "file": "<file_name>", "line": <line_number>, "comment": "<review comment>" }]
2. Do not give positive comments or compliments
3. Provide comments as an Staff Engineer
4. Provide comments and suggestions ONLY if there is something to improve
5. Write the comment in GitHub Markdown format
6. Use the given description only for the overall context and only comment the code
7. Make clear performance improvements, better understanding and explain why
8. If have suggestions, consider to give examples in how to do
9. IMPORTANT: EVER consider the file_extension to know which programming language is used and do the code review correctly
10. IMPORTANT²: ALWAYS identify unnecessary code based on good programming language practices
11. IMPORTANT³: NEVER suggest adding comments or descriptions to the code
12. IMPORTANT⁴: BEWARE of duplicate comments and limit duplication to a maximum of 2

Pull request title: ${title}
Pull request description:

---
${description}
---

Files:

`;

  for await (const { file, content, changes } of filesChanges) {
    prompt += `---
file_name: ${file}
file_extension: ${(await fileTypeFromFile(file))?.ext}

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
