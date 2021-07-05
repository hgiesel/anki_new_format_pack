import StrikeThrough from "./StrikeThrough.svelte";
import Paragraph from "./Paragraph.svelte";
import HorizontalRuler from "./HorizontalRuler.svelte";
import CodeBlock from "./CodeBlock.svelte";

$editorToolbar.then((editorToolbar) => {
    editorToolbar.formatInlineButtons.appendButton({ component: StrikeThrough }, 2)
    editorToolbar.formatBlockButtons.appendButton({ component: Paragraph })
    editorToolbar.formatBlockButtons.appendButton({ component: HorizontalRuler })
    editorToolbar.formatBlockButtons.appendButton({ component: CodeBlock })
});
