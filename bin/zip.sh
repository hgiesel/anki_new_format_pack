declare DIR="$(cd "$(dirname "$0")/.." && pwd -P)"
mkdir -p "$DIR/build"

if [[ "$1" =~ ^-?a$ ]]; then
  # for uploading to AnkiWeb
  declare addon_id=''
else
  # for installing myself
  declare addon_id='new_format_pack'
fi

cd "$DIR"

"$DIR/bin/compile.sh"

zip -r "$DIR/build/$addon_id.ankiaddon" "$DIR/dist/"*
