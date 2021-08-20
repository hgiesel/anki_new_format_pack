export const {
  iconButton,
  slottedHtml,
  withContext,
  withShortcut,
  withState,
} = components;

export const { fieldFocusedKey, inCodableKey } = components.contextKeys;

export function onlyEditable(dynamic) {
  return withContext({
    key: fieldFocusedKey,
    getComponent: (fieldFocused) =>
      withContext({
        key: inCodableKey,
        getComponent: (inCodable) => dynamic(!fieldFocused || inCodable),
      }),
  });
}
