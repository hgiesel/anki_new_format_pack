import Paragraph from "./Paragraph.svelte";
import StrikeThrough from "./StrikeThrough.svelte";
import HorizontalRuler from "./HorizontalRuler.svelte";
import CodeBlock from "./CodeBlock.svelte";

$editorToolbar.then((editorToolbar) => {
    console.log(editorToolbar, Paragraph, StrikeThrough, HorizontalRuler, CodeBlock);
});
