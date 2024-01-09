<div align="center">
<br />
<img src="https://raw.githubusercontent.com/zordonai/codereviewer/main/logo.svg" width="120" />

ZordonAI
### Code Reviewer
</div>

## Usage

```yml
# .github/workflows/ai-codereviewer.yml
name: ZordonAI CodeReviewer 🤖
on:
  pull_request:
    types: [opened, reopened, synchronize]

jobs:
  ai-codereviewer:
    runs-on: ubuntu-latest
    steps:
      - name: ZordonAI CodeReview
        uses: zordonai/codereviewer@main
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          openai_api_key: ${{ secrets.OPENAI_API_KEY }}
          openai_api_url: ${{ secrets.OPENAI_API_URL }}
          exclude_files: "**/*.json, **/*.md"
```

## License

MIT [@zordonai](https://github.com/zordonai)
