import "./styles/fields-grid.scss";

import StrikeThrough from "./StrikeThrough.svelte";
import Paragraph from "./Paragraph.svelte";
import HorizontalRuler from "./HorizontalRuler.svelte";
import CodeBlock from "./CodeBlock.svelte";

import * as NoteEditor from "anki/NoteEditor";

NoteEditor.lifecycle.onMount(({ toolbar }): void => {
    toolbar.formatInlineButtons.append({ component: StrikeThrough }, 2);
    toolbar.formatBlockButtons.append({ component: Paragraph });
    toolbar.formatBlockButtons.append({ component: HorizontalRuler });
    toolbar.formatBlockButtons.append({ component: CodeBlock });
});
