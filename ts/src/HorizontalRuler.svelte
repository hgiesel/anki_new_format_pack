<script lang="ts">
    import { hrIcon } from "./assets/icons";
    import anki from "anki/runtime";
    const { focusedInput } = anki.editor.context.get();
    const { IconButton } = anki.components;

    $: disabled = $focusedInput?.name !== "rich-text";
</script>

<IconButton
    {disabled}
    tooltip="Horizontal ruler"
    on:click={() => document.execCommand("insertHorizontalRule")}
>
    {@html hrIcon}
</IconButton>
