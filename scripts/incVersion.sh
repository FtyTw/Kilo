#!/usr/bin/env bash
if [ "$1" = "major" ]; then
  yarn changelog -M && git add CHANGELOG.md && yarn version --major --no-commit-hooks
elif [ "$1" = "minor" ]; then
  yarn changelog -m && git add CHANGELOG.md && yarn version --minor --no-commit-hooks
elif [ "$1" = "patch" ]; then
  yarn changelog -p && git add CHANGELOG.md && yarn version --patch --no-commit-hooks
else
  echo "ERROR! None of supported arguments found [major, minor, patch]"
  exit 1
fi

git push origin --tags
