// Anki doesn't currently provide typings for this module, so we need to declare it ourselves.
declare module "anki/NoteEditor" {
    type ContextProperty<T> =
        import("@anki/sveltelib/context-property").ContextProperty<T>;
    type LifecycleHooks<T> =
        import("@anki/sveltelib/lifecycle-hooks").LifecycleHooks<T>;
    type NoteEditorAPI = import("@anki/editor/NoteEditor.svelte").NoteEditorAPI;

    export const context: ContextProperty<NoteEditorAPI>;
    export const lifecycle: LifecycleHooks<NoteEditorAPI>;
    export const instances: NoteEditorAPI[];
}
