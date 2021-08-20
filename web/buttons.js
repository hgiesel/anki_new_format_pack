const {
    iconButton,
    slottedHtml,
    withContext,
    withShortcut,
    withState,
} = components;

const {
    fieldFocusedKey,
    inCodableKey,
} = components.contextKeys;

function onlyEditable(dynamic) {
    return withContext({
        key: fieldFocusedKey,
        getComponent: (fieldFocused) => withContext({
            key: inCodableKey,
            getComponent: (inCodable) => dynamic(fieldFocused, inCodable),
        }),
    });
}

///////////
const strikeThroughKey = "strikeThrough";
const strikeThroughIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-type-strikethrough" viewBox="0 0 16 16">
    <path d="M6.333 5.686c0 .31.083.581.27.814H5.166a2.776 2.776 0 0 1-.099-.76c0-1.627 1.436-2.768 3.48-2.768 1.969 0 3.39 1.175 3.445 2.85h-1.23c-.11-1.08-.964-1.743-2.25-1.743-1.23 0-2.18.602-2.18 1.607zm2.194 7.478c-2.153 0-3.589-1.107-3.705-2.81h1.23c.144 1.06 1.129 1.703 2.544 1.703 1.34 0 2.31-.705 2.31-1.675 0-.827-.547-1.374-1.914-1.675L8.046 8.5H1v-1h14v1h-3.504c.468.437.675.994.675 1.697 0 1.826-1.436 2.967-3.644 2.967z"/>
</svg>`

export const strikeThrough = withContext({
    key: fieldFocusedKey,
    getComponent: (fieldFocused) => withContext({
        key: inCodableKey,
        getComponent: (inCodable) => withShortcut({
            shortcut: "Control+Shift+S",
            getComponent: (createShortcut, shortcutLabel) => withState({
                strikeThroughKey,
                update: () => document.queryCommandState(strikeThroughKey),
                getComponent: (state, updateState) => slottedHtml({
                    slotted: strikeThroughIcon,
                    component: iconButton({
                        disabled: !fieldFocused || inCodable,
                        active: state,
                        tooltip: `Strike-through text ${shortcutLabel}`,
                        onClick: (event) => {
                            document.execCommand(strikeThroughKey);
                            updateState(event);
                        },
                        onMount: (event) => {
                            createShortcut(event.detail.button);
                        },
                    }),
                }),
            }),
        }),
    }),
});

///////////
const bracesIcon =`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-braces" viewBox="0 0 16 16">
    <path d="M2.114 8.063V7.9c1.005-.102 1.497-.615 1.497-1.6V4.503c0-1.094.39-1.538 1.354-1.538h.273V2h-.376C3.25 2 2.49 2.759 2.49 4.352v1.524c0 1.094-.376 1.456-1.49 1.456v1.299c1.114 0 1.49.362 1.49 1.456v1.524c0 1.593.759 2.352 2.372 2.352h.376v-.964h-.273c-.964 0-1.354-.444-1.354-1.538V9.663c0-.984-.492-1.497-1.497-1.6zM13.886 7.9v.163c-1.005.103-1.497.616-1.497 1.6v1.798c0 1.094-.39 1.538-1.354 1.538h-.273v.964h.376c1.613 0 2.372-.759 2.372-2.352v-1.524c0-1.094.376-1.456 1.49-1.456V7.332c-1.114 0-1.49-.362-1.49-1.456V4.352C13.51 2.759 12.75 2 11.138 2h-.376v.964h.273c.964 0 1.354.444 1.354 1.538V6.3c0 .984.492 1.497 1.497 1.6z"/>
</svg>`

export const codeBlock = withContext({
    key: fieldFocusedKey,
    getComponent: (fieldFocused) => withContext({
        key: inCodableKey,
        getComponent: (inCodable) => slottedHtml({
            slotted: bracesIcon,
            component: iconButton({
                disabled: !fieldFocused || inCodable,
                tooltip: "Code block",
                onClick: () => document.execCommand("formatBlock", false, "pre"),
            }),
        }),
    }),
});

///////////
const horizontalRulerKey = "insertHorizontalRule";
const horizontalRulerIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hr" viewBox="0 0 16 16">
    <path d="M12 3H4a1 1 0 0 0-1 1v2.5H2V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2.5h-1V4a1 1 0 0 0-1-1zM2 9.5h1V12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V9.5h1V12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.5zm-1.5-2a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1H.5z"/>
</svg>`

export const horizontalRuler = withContext({
    key: fieldFocusedKey,
    getComponent: (fieldFocused) => withContext({
        key: inCodableKey,
        getComponent: (inCodable) => slottedHtml({
            slotted: horizontalRulerIcon,
            component: iconButton({
                disabled: !fieldFocused || inCodable,
                tooltip: "Horizontal ruler",
                onClick: () => document.execCommand(horizontalRulerKey),
            }),
        }),
    }),
});
