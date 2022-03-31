# Anki add-on template

Adds four buttons:

- Strike-through text
- Horizontal ruler
- Code block
- Paragraph


## Requirements

You'll need node and yarn installed.

## Tools

- Build with `tools/build.sh`. This makes a release build, so console.log lines are stripped out.
- Built output will be put into `dist/`. This folder can be linked into your Anki add-on folder
  (eg `ln -sf $(pwd)/dist ~/Library/Application\ Support/Anki2/addons21/myaddon`).
- Develop by changing to the ts dir, and running `yarn run dev`.
- Zip built output with `bin/zip.sh`. Will be put into `build/`.

## Directories

### `dist/`

Contains the compiled output of python and typescript.

### `ts/`

Contains the Typescript and Svelte files which are used for Anki webviews.

### `anki/`

A submodule pointing to `ankitects/anki`.

This can be used for (very) limited typechecking/IDE support, as this area
is still a work in progress. To set up:

    cd anki && git submodule update

Read the docs/development.md file, and ensure you have the necessary dependencies (particular Bazel). Then
build the ts portions of Anki, which will take some time:

    bazel build ts/...

If the build completes successfully, you can then open the ../ts folder with VSCode.

Only a few explicit types can be imported at the moment. For example, this line
imports an object at runtime, and is not typed, and will show an error in the
editor (but will build):

    import * as NoteEditor from "anki/NoteEditor";

This line imports a type however:

    import type { NoteEditorAPI } from "@anki/editor/NoteEditor.svelte";

You can then tell the editor that a variable is that type, to be able to get code completion
on it:

    NoteEditor.lifecycle.onMount(({ toolbar }: NoteEditorAPI): void => {
        toolbar.inlineButtons.append({ component: StrikeThrough }, 2);

Typing 'toolbar.' will show the various available toolbar categories.

### `ankidata/`

When invoking Anki through `tools/run`, it will be started with `$ANKI_BASE` pointing to this directory.
This means that all data related to profiles, collections, and decks will be saved here.

### `ankidata/addons21/dist`

A symlink pointing to `dist/`.
