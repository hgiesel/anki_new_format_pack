import {
  iconButton,
  slottedHtml,
  withState,
  withShortcut,
  onlyEditable,
} from "./helpers";

function nodeIsElement(node) {
  return node.nodeType === Node.ELEMENT_NODE;
}

const getAnchorParent = (predicate) => (currentField) => {
  const selection = currentField.getSelection();
  if (!selection || !selection.anchorNode) {
    return null;
  }

  const anchor = selection.anchorNode;

  let anchorParent = null;
  let element = nodeIsElement(anchor) ? anchor : anchor.parentElement;

  while (element) {
    anchorParent = anchorParent || (predicate(element) ? element : null);
    element = element.parentElement;
  }

  return anchorParent;
};

const isParagraph = (element) => element.tagName === "P";
const getParagraph = getAnchorParent(isParagraph);

function toggleParagraph() {
  const currentField = document.activeElement;
  const paragraph = getParagraph(currentField.shadowRoot);

  if (!paragraph) {
    document.execCommand("formatBlock", false, "p");
  } else {
    paragraph.insertAdjacentElement("beforeend", document.createElement("br"));
    paragraph.replaceWith(...paragraph.childNodes);
  }
}

function checkForParagraph() {
  const currentField = document.activeElement;
  return Boolean(getParagraph(currentField.shadowRoot));
}

const key = "paragraph";
const icon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-paragraph" viewBox="0 0 16 16">
    <path d="M10.5 15a.5.5 0 0 1-.5-.5V2H9v12.5a.5.5 0 0 1-1 0V9H7a4 4 0 1 1 0-8h5.5a.5.5 0 0 1 0 1H11v12.5a.5.5 0 0 1-.5.5z"/>
</svg>`;

export const paragraph = onlyEditable((disabled) =>
  withShortcut({
    shortcut: "Control+P",
    getComponent: (createShortcut, shortcutLabel) =>
      withState({
        key,
        update: checkForParagraph,
        getComponent: (state, updateState) =>
          slottedHtml({
            slotted: icon,
            component: iconButton({
              disabled,
              active: state,
              tooltip: `Paragraph ${shortcutLabel}`,
              onClick: (event) => {
                toggleParagraph();
                updateState(event);
              },
              onMount: (event) => createShortcut(event.detail.button),
            }),
          }),
      }),
  })
);

export default paragraph;
