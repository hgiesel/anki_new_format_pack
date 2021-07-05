declare DIR="$(cd "$(dirname "$0")/.." && pwd -P)"

# for filename in "$DIR/designer/"*'.ui'; do
#   pyuic5 "$filename" > "$DIR/gui/forms/$(basename ${filename%.*})_ui.py"
# done

cp -rf "$DIR/__init__.py" "$DIR/src" "$DIR/dist"

yarn --cwd "$DIR/web" build

echo 'Was successfully compiled!'
