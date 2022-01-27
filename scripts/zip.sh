#!/usr/bin/env bash
declare DIR="$(cd "$(dirname "$0")/.." && pwd -P)"
set -e

mkdir -p "$DIR/build"

"$DIR/scripts/compile.sh"

cd "$DIR/dist"

zip -r "$DIR/build/addon.ankiaddon" *
