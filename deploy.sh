#!/bin/bash
set -e

npm i

pushd _site &> /dev/null
git init
git config user.name "AutoBot"
git config user.email dylan947@gmail.com
git add -A
git commit -m "Deploy to GitHub pages"
git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" master > /dev/null 2>&1
popd &> /dev/null
