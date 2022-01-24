import StrikeThrough from "./StrikeThrough.svelte";
import Paragraph from "./Paragraph.svelte";
import HorizontalRuler from "./HorizontalRuler.svelte";
import CodeBlock from "./CodeBlock.svelte";
import { onNoteEditorMount } from "anki/NoteEditor";

onNoteEditorMount(({ toolbar }) => {
    toolbar.formatInlineButtons.appendButton(
        { component: StrikeThrough },
        2
    );
    toolbar.formatBlockButtons.appendButton({ component: Paragraph });
    toolbar.formatBlockButtons.appendButton({ component: HorizontalRuler });
    toolbar.formatBlockButtons.appendButton({ component: CodeBlock });
});
