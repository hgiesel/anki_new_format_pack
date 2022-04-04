<script lang="ts">
    import { strikeThroughIcon } from "./assets/icons";
    import { editor, components } from "anki/runtime";
    const { focusedInput } = editor.context.get();
    const { IconButton, WithState } = components;

    const key = "strikeThrough";

    $: disabled = $focusedInput?.name !== "rich-text";
</script>

<WithState
    {key}
    update={() => Promise.resolve(document.queryCommandState(key))}
    let:state={active}
    let:updateState
>
    <IconButton
        {disabled}
        {active}
        tooltip="Strike-through text"
        on:click={(event) => {
            document.execCommand(key);
            updateState(event);
        }}
    >
        {@html strikeThroughIcon}
    </IconButton>
</WithState>
