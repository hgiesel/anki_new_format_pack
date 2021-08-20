import { strikeThrough, horizontalRuler, codeBlock } from "./buttons";

$editorToolbar.then((editorToolbar) => {
  editorToolbar.formatInlineButtons.appendButton(strikeThrough, 2);
  // editorToolbar.formatBlockButtons.appendButton(paragraph);
  editorToolbar.formatBlockButtons.appendButton(horizontalRuler);
  editorToolbar.formatBlockButtons.appendButton(codeBlock);
});
