<script lang="ts">
    import { hrIcon } from "./assets/icons";
    import { editor, components } from "anki/runtime";
    const { focusedInput } = editor.context.get();
    const { IconButton } = components;

    $: disabled = $focusedInput?.name !== "rich-text";
</script>

<IconButton
    {disabled}
    tooltip="Horizontal ruler"
    on:click={() => document.execCommand("insertHorizontalRule")}
>
    {@html hrIcon}
</IconButton>
