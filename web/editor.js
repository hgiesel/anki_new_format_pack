import paragraphButton from "./paragraph";
import strikeThroughButton from "./strikeThrough";
import horizontalRulerButton from "./horizontalRuler";
import codeBlockButton from "./codeBlock";

$editorToolbar.then((editorToolbar) => {
  editorToolbar.formatInlineButtons.appendButton(strikeThroughButton, 2);
  editorToolbar.formatBlockButtons.appendButton(paragraphButton);
  editorToolbar.formatBlockButtons.appendButton(horizontalRulerButton);
  editorToolbar.formatBlockButtons.appendButton(codeBlockButton);
});
