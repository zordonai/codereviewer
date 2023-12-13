import type { File } from "parse-diff";
import { getFilesChanges } from "../get-files-changes";

export const createPrompt = (
  diff: File[],
  title: string,
  description: string
) => {
  const filesChanges = getFilesChanges(diff);

  console.log({ filesChangesString: JSON.stringify(filesChanges) });

  let prompt = `Please perform a code review considering the following aspects:
1. Consider the file extension
2. Code structure and organization
3. Naming conventions and formatting
4. Clarity and readability of the code
5. Efficiency and optimization
6. Logic and correct functioning of the code
7. Error handling and exception handling
8. Code comments and documentation
9. Security best practices
10. Consider performance using BigO notation

Extra Instructions:
1. Provide the response in following JSON format: [{ "file": <file_name>, "reviews": [{"lineNumber": <line_number>, "reviewComment": "<review comment>"}] }]
2. Do not give positive comments or compliments
3. Provide comments as an Staff Engineer
4. Provide comments and suggestions ONLY if there is something to improve
5. Write the comment in GitHub Markdown format
6. Use the given description only for the overall context and only comment the code
7. Make clear performance improvements, better understanding and explain why
8. If have suggestions, consider to give examples in how to do
9. IMPORTANT: NEVER suggest adding comments or descriptions to the code
10. IMPORTANT²: BEWARE of duplicate comments and limit duplication to a maximum of 2

Pull request title: ${title}
Pull request description:

---
${description}
---

Files:

`;

  for (const { file, content, changes } of filesChanges) {
    prompt += `---
file_name: ${file}

\`\`\`diff
${content}
${changes}
\`\`\`
---
`;
  }

  return prompt;
};
