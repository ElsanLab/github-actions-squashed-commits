### INSTALLATION
Créer un fichier _./github/workflows/squashed.yml_
```
name: Allow only squashed PR
on: pull_request

jobs:
  squashed:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
        with:
          fetch-depth: 0
      - uses: ElsanLab/github-actions-squashed-commits@1.0.0
        with:
          token: ${{ secrets.GITHUB_TOKEN }}

