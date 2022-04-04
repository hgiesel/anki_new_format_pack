// https://github.com/ankitects/anki/issues/1386
/// <reference path="../../anki/ts/lib/shadow-dom.d.ts" />

import "./styles/fields-grid.scss";

import StrikeThrough from "./StrikeThrough.svelte";
import Paragraph from "./Paragraph.svelte";
import HorizontalRuler from "./HorizontalRuler.svelte";
import CodeBlock from "./CodeBlock.svelte";

import { editor } from "anki/runtime";

editor.lifecycle.onMount((editor): void => {
    // editor.focusedField. etc...
    editor.toolbar.inlineButtons.append({ component: StrikeThrough, id: "strikeThroughButton" }, 2);
    editor.toolbar.blockButtons.append({ component: Paragraph, id: "paragraphButton" });
    editor.toolbar.blockButtons.append({ component: HorizontalRuler, id: "horizontalRulerButton" });
    editor.toolbar.blockButtons.append({ component: CodeBlock, id: "codeBlockButton" });
});
