import type { Readable } from 'svelte/store';
import type { SvelteComponent } from 'svelte';
import { SvelteComponentTyped } from 'svelte';
import type { Writable } from 'svelte/store';

declare const __propDef: {
    props: {
        id?: string | undefined;
        class?: string;
        tooltip?: string | undefined;
        active?: boolean;
        disabled?: boolean;
        tabbable?: boolean;
        iconSize?: number;
        widthMultiplier?: number;
        flipX?: boolean;
    };
    events: {
        click: MouseEvent;
        mousedown: MouseEvent;
        mount: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};

declare const __propDef_2: {
    props: {
        key: KeyType_2;
        update: (event: Event) => Promise<boolean>;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {
            state: boolean;
            updateState: (event: Event) => void;
        };
    };
};

declare type Callback = () => void;

declare type Callback_2 = () => void;

declare type ComponentAPIDestroy<T> = (api: T) => void;

declare type ComponentAPIMount<T> = (api: T) => Callback | void;

/**
 * Basic Svelte UI components. Available on all pages.
 */
export declare const components: {
    IconButton: typeof IconButton;
    WithState: typeof WithState;
};

declare interface ContextProperty<T> {
    /**
     * Retrieves the component's context
     *
     * @remarks
     * The typing of the return value is a lie insofar as calling `get` outside
     * of the component's context will return `undefined`.
     * If you are uncertain if your component is actually within the context
     * of this component, you should check with `available` first.
     *
     * @returns The component's context
     */
    get(): T;
    /**
     * Checks whether the component's context is available
     */
    available(): boolean;
}

declare interface DefaultSlotInterface extends Record<string, unknown> {
    insert(button: DynamicSvelteComponent, position?: Identifier): Promise<{
        destroy: Callback;
    }>;
    append(button: DynamicSvelteComponent, position?: Identifier): Promise<{
        destroy: Callback;
    }>;
    show(position: Identifier): Promise<boolean>;
    hide(position: Identifier): Promise<boolean>;
    toggle(position: Identifier): Promise<boolean>;
}

declare interface DynamicSvelteComponent {
    component: typeof SvelteComponent;
    /**
     * Props that are passed to the component
     */
    props?: Record<string, unknown>;
    /**
     * ID that will be assigned to the component that hosts
     * the dynamic component (slot host)
     */
    id?: string;
}

declare interface EditingAreaAPI {
    content: Writable<string>;
    editingInputs: Writable<EditingInputAPI[]>;
    focus(): void;
    refocus(): void;
}

declare interface EditingInputAPI {
    readonly name: string;
    focusable: boolean;
    /**
     * The reaction to a user-initiated focus, e.g. by clicking on the
     * editor label, or pressing Tab.
     */
    focus(): void;
    /**
     * Behaves similar to a refresh, e.g. sync with content, put the caret
     * into a neutral position, and/or clear selections.
     */
    refocus(): void;
}

/**
 * Exports from the editing screen. Only available on pages that show an editor.
 */
export declare const editor: NoteEditorPackage;

declare interface EditorFieldAPI {
    element: Promise<HTMLElement>;
    direction: Readable<"ltr" | "rtl">;
    editingArea: EditingAreaAPI;
}

declare interface EditorToolbarAPI {
    toolbar: DefaultSlotInterface;
    notetypeButtons: DefaultSlotInterface;
    inlineButtons: DefaultSlotInterface;
    blockButtons: DefaultSlotInterface;
    templateButtons: DefaultSlotInterface;
    removeFormats: Writable<RemoveFormat<any>[]>;
}

declare class ElementNode extends TreeNode {
    readonly element: Element;
    readonly insideRange: boolean;
    private constructor();
    static make(element: Element, insideRange: boolean): ElementNode;
}

/**
 * Represents a subset of DOM ranges which can be called with `.surroundContents()`.
 */
declare class FlatRange {
    parent: Node;
    startIndex: number;
    endIndex: number;
    private constructor();
    /**
     * The new flat range does not represent the range itself but
     * rather a possible new node that surrounds the boundary points
     * (node, start) till (node, end).
     *
     * @remarks
     * Indices should be >= 0 and startIndex <= endIndex.
     */
    static make(node: Node, startIndex: number, endIndex?: number): FlatRange;
    /**
     * @remarks
     * Must be sibling flat ranges.
     */
    static merge(before: FlatRange, after: FlatRange): FlatRange;
    /**
     * @remarks
     */
    static fromNode(node: Node): FlatRange;
    get firstChild(): ChildNode;
    get lastChild(): ChildNode;
    /**
     * @see `fromNode`
     */
    select(node: Node): void;
    toDOMRange(): Range;
    [Symbol.iterator](): Iterator<ChildNode, null, unknown>;
    /**
     * @returns Amount of contained nodes
     */
    get length(): number;
    toString(): string;
}

/**
 * Represents a potential insertion point for a tag or, more generally, a point for starting a format procedure.
 */
declare class FormattingNode<T = never> extends TreeNode {
    readonly range: FlatRange;
    readonly insideRange: boolean;
    /**
     * Match ancestors are all matching matches that are direct ancestors
     * of `this`. This is important for deciding whether a text node is
     * turned into a FormattingNode or into a BlockNode, if it is outside
     * the initial DOM range.
     */
    readonly matchAncestors: Match<T>[];
    private constructor();
    private static make;
    static fromText<T>(text: Text, insideRange: boolean, matchAncestors: Match<T>[]): FormattingNode<T>;
    /**
     * A merge is combinging two formatting nodes into a single one.
     * The merged node will take over their children, their match leaves, and
     * their match holes, but will drop their extensions.
     *
     * @example
     * Practically speaking, it is what happens, when you combine:
     * `<b>before</b><b>after</b>` into `<b>beforeafter</b>`, or
     * `<b>before</b><img src="image.jpg"><b>after</b>` into
     * `<b>before<img src="image.jpg">after</b>` (negligible nodes inbetween).
     */
    static merge<T>(before: FormattingNode<T>, after: FormattingNode<T>): FormattingNode<T>;
    toString(): string;
    /**
     * An ascent is placing a FormattingNode above an ElementNode.
     * This happens, when the element node is an extension to the formatting node.
     *
     * @param elementNode: Its children will be discarded in favor of `this`s
     * children.
     *
     * @example
     * Practically speaking, it is what happens, when you turn:
     * `<u><b>inside</b></u>` into `<b><u>inside</u></b>`, or
     * `<u><b>inside</b><img src="image.jpg"></u>` into `<b><u>inside<img src="image.jpg"></u></b>
     */
    ascendAbove(elementNode: ElementNode): void;
    /**
     * Extending only makes sense, if it is following by a FormattingNode
     * ascending above it.
     * Which is why if the match node is not ascendable, we might as well
     * stop extending.
     *
     * @returns Whether formatting node ascended at least one level
     */
    getExtension(): ElementNode | null;
    /**
     * Match leaves are the matching elements that are/were descendants of
     * `this`. This makes them the element nodes, which actually affect text
     * nodes located inside `this`.
     *
     * @example
     * If we are surrounding with bold, then in this case:
     * `<b><b>first</b><b>second</b></b>
     * The inner b tags are match leaves, but the outer b tag is not, because
     * it does affect any text nodes.
     *
     * @remarks
     * These are important for mergers.
     */
    matchLeaves: Match<T>[];
    get firstLeaf(): Match<T> | null;
    /**
     * Match holes are text nodes which are descendants of `this`, but are not
     * descendants of any match leaves of `this`.
     */
    hasMatchHoles: boolean;
    get closestAncestor(): Match<T> | null;
    /**
     * Extensions of formatting nodes with a single element contained in their
     * range are direct exclusive descendant elements of this element.
     * Extensions are sorted in tree order.
     *
     * @example
     * When surrounding "inside" with a bold format in the following case:
     * `<span class="myclass"><em>inside</em></span>`
     * The formatting node would sit above the span (it ascends above both
     * the span and the em tag), and both tags are extensions to this node.
     *
     * @example
     * When a format only wants to add a class, it would typically look for an
     * extension first. When applying class="myclass" to "inside" in the
     * following case:
     * `<em><span style="color: rgb(255, 0, 0)"><b>inside</b></span></em>`
     * It would typically become:
     * `<em><span class="myclass" style="color: rgb(255, 0, 0)"><b>inside</b></span></em>`
     */
    extensions: (HTMLElement | SVGElement)[];
    /**
     * @param insideValue: The value that should be returned, if the formatting
     * node is inside the original range. If the node is not inside the original
     * range, the cache of the first leaf, or the closest match ancestor will be
     * returned.
     */
    getCache(insideValue: T): T | null;
    /**
     * Whether the text nodes in this formatting node are affected by any match.
     * This can only be false, if `insideRange` is true (otherwise it would have
     * become a BlockNode).
     */
    get hasMatch(): boolean;
}

declare class IconButton extends SvelteComponentTyped<IconButtonProps, IconButtonEvents, IconButtonSlots> {
}

declare type IconButtonEvents = typeof __propDef.events;

declare type IconButtonProps = typeof __propDef.props;

declare type IconButtonSlots = typeof __propDef.slots;

declare type Identifier = Element | string | number;

declare type KeyType_2 = Symbol | string;

declare interface LifecycleHooks<T> {
    onMount(callback: ComponentAPIMount<T>): Callback;
    onDestroy(callback: ComponentAPIDestroy<T>): Callback;
}

declare class Match<T> implements MatchType<T> {
    private _shouldRemove;
    remove(): void;
    private _callback;
    clear(callback: Callback_2): void;
    get matches(): boolean;
    /**
     * @internal
     */
    shouldRemove(): boolean;
    cache: T | null;
    setCache(value: T): void;
}

declare interface MatchType<T = never> {
    /**
     * The element represented by the match will be removed from the document.
     */
    remove(): void;
    /**
     * If the element has some styling applied that matches the format, but
     * might contain some styling above that, you should use clear and do the
     * modifying in the callback.
     *
     * @remarks
     * You can still call `match.remove()` in the callback
     *
     * @example
     * If you want to match bold elements, `<span class="myclass" style="font-weight:bold"/>
     * should match via `clear`, but should not be removed, because it still
     * has a class applied, even if the `style` attribute is removed.
     */
    clear(callback: () => void): void;
    /**
     * Used to sustain a value that is needed to recreate the surrounding.
     * Can be retrieved from the FormattingNode interface via `.getCache`.
     */
    setCache(value: T): void;
}

declare interface NoteEditorAPI {
    fields: EditorFieldAPI[];
    focusedField: Writable<EditorFieldAPI | null>;
    focusedInput: Writable<EditingInputAPI | null>;
    toolbar: EditorToolbarAPI;
}

/** anki/NoteEditor */
declare interface NoteEditorPackage {
    context: ContextProperty<NoteEditorAPI>;
    lifecycle: LifecycleHooks<NoteEditorAPI>;
    instances: NoteEditorAPI[];
}

declare interface RemoveFormat<T> {
    name: string;
    show: boolean;
    active: boolean;
    format: SurroundFormat<T>;
}

declare interface SurroundFormat<T = never> {
    /**
     * Determine whether element matches the format. Confirm by calling
     * `match.remove` or `match.clear`. Sustain parameters provided to the format
     * by calling `match.setCache`.
     */
    matcher: (element: HTMLElement | SVGElement, match: MatchType<T>) => void;
    /**
     * @returns Whehter before or after are allowed to merge to a single
     * FormattingNode range
     */
    merger?: (before: FormattingNode<T>, after: FormattingNode<T>) => boolean;
    /**
     * Apply according to this formatter.
     *
     * @returns Whether formatter added a new element around the range.
     */
    formatter?: (node: FormattingNode<T>) => boolean;
    /**
     * Surround with this node as formatting. Shorthand alternative to `formatter`.
     */
    surroundElement?: Element;
}

declare abstract class TreeNode {
    /**
     * Whether all text nodes within this node are inside the initial DOM range.
     */
    insideRange: boolean;
    readonly children: TreeNode[];
    protected constructor(
    /**
     * Whether all text nodes within this node are inside the initial DOM range.
     */
    insideRange: boolean);
    /**
     * @returns Children which were replaced.
     */
    replaceChildren(...newChildren: TreeNode[]): TreeNode[];
    hasChildren(): boolean;
    get length(): number;
}

declare class WithState extends SvelteComponentTyped<WithStateProps, WithStateEvents, WithStateSlots> {
}

declare type WithStateEvents = typeof __propDef_2.events;

declare type WithStateProps = typeof __propDef_2.props;

declare type WithStateSlots = typeof __propDef_2.slots;

export { }
