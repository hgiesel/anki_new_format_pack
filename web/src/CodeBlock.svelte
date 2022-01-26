<script lang="ts">
    import * as NoteEditor from "anki/NoteEditor";
    import bracesIcon from "../public/braces.svg";

    const { focusedInput } = NoteEditor.context.get();
    //@ts-ignore
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
