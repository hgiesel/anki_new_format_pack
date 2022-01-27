#!/usr/bin/env bash
declare DIR="$(cd "$(dirname "$0")/.." && pwd -P)"

git clean -fd "$DIR/dist"

mkdir -p "$DIR/dist/src"
rsync -ai --exclude='*.pyc' --exclude=__pycache__ 'src' "$DIR/dist"

yarn --cwd "$DIR/ts" && yarn --cwd "$DIR/ts" build

echo 'Was successfully compiled!'
