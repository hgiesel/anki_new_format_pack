# New Format Pack for Anki

Adds four buttons:

- Strike-through text
- Horizontal ruler
- Code block
- Paragraph

![](https://i.ibb.co/WHp4mkD/Screenshot-2021-07-13-at-12-02-48.png)

## Scripts

* Build with `bin/compile.sh`.
* Built output will be put into `dist/`. This folder can be linked into your Anki add-on folder.
* Zip built output with `bin/zip.sh`. Will be put into `build/`.

## Directories

### `anki/`

A submodule pointing to `ankitects/anki`.

### `ankidata/`

A submodule pointing to `ankitects/anki`.
When invoking Anki through `scripts/run`, it will be started with `$ANKI_BASE` pointing to this directory.
This means that all data related to profiles, collections, and decks will be saved here.

### `ankidata/addons21/dist`

A symlink pointing to `dist/`.

### `dist/`

Contains the compiled output of python and typescript.

### `ts/`

Contains the Typescript and Svelte files which are used for Anki webviews.
