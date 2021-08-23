window.require = (name) => {
    if (name === "svelte/internal") {
        return window.svelte_internal;
    } else {
        throw new Error(`Cannot require ${name}`);
    }
};
