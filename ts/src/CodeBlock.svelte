<script lang="ts">
    import { bracesIcon } from "./assets/icons";
    import anki from "anki/runtime";
    const { focusedInput } = anki.editor.context.get();
    const { IconButton } = anki.components;

    $: disabled = $focusedInput?.name !== "rich-text";
</script>

<IconButton
    {disabled}
    tooltip="Code block"
    on:click={() => document.execCommand("formatBlock", false, "pre")}
>
    {@html bracesIcon}
</IconButton>
