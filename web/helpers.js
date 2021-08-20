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
    getComponent: ({ context: fieldFocused }) =>
      withContext({
        key: inCodableKey,
        getComponent: ({ context: inCodable }) =>
          dynamic(!fieldFocused || inCodable),
      }),
  });
}
