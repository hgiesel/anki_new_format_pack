<script lang="ts">
    import { bracesIcon } from "./assets/icons";
    import { editor, components } from "anki/runtime";
    const { focusedInput } = editor.context.get();
    const { IconButton } = components;

    $: disabled = $focusedInput?.name !== "rich-text";
</script>

<IconButton
    {disabled}
    tooltip="Code block"
    on:click={() => document.execCommand("formatBlock", false, "pre")}
>
    {@html bracesIcon}
</IconButton>
