<script lang="ts">
  import type { Component } from "svelte";
  import type { CardFigure, CardProps } from "./types";
  import Button from "../Button/Button.svelte";

  // Every component folder is listed here, but a component is only fetched when
  // a card is given its name. Card never imports them itself.
  const loaders = import.meta.glob<{ default: Component<any> }>("../*/*.svelte");
  const loaded = new Map<string, Promise<Component<any>>>();

  // Figures given by media type render with the matching component.
  const MEDIA_COMPONENT: Record<string, string> = { image: "Image", video: "Video", audio: "Audio" };

  let {
    as: Tag = "article"
    , header
    , title
    , text
    , description
    , footer
    , figure
    , media
    , content
    , component
    , data
    , href
    , ctaLabel = "Open component"
    , orientation = "portrait"
    , class: className = ""
    , children
    , footerSnippet
    , ...restProps
  }: CardProps & { href?: string; ctaLabel?: string; orientation?: "portrait" | "square" | "landscape" } = $props();

  function loaderFor(name: string | undefined): (() => Promise<{ default: Component<any> }>) | undefined {
    // Purpose: Find the loader for a component name, or undefined when no such component exists.
    if (!name || !/^[A-Z][A-Za-z0-9]*$/.test(name)) return undefined;
    const key = `../${name}/${name}.svelte`;
    return Object.hasOwn(loaders, key) ? loaders[key] : undefined;
  }

  function loadComponent(name: string): Promise<Component<any>> | undefined {
    // Purpose: Fetch a component once by name and reuse the same promise on every later render.
    const loader = loaderFor(name);
    if (!loader) return undefined;
    let promise = loaded.get(name);
    if (!promise) {
      promise = loader().then((module) => module.default);
      loaded.set(name, promise);
    }
    return promise;
  }

  type Target = { name: string; props: Record<string, unknown> };

  function resolveFigure(f: unknown): Target | undefined {
    // Purpose: Turn figure data into the component name and props it asks for, or undefined.
    if (!f || typeof f !== "object") return undefined;
    const { type, component: named, schema, data: d, title: figureTitle, ...rest } = f as Record<string, any>;
    const name: string | undefined =
      typeof type === "string" && Object.hasOwn(MEDIA_COMPONENT, type) ? MEDIA_COMPONENT[type]
      : typeof named === "string" ? named
      : typeof schema?.title === "string" ? schema.title
      : typeof figureTitle === "string" ? figureTitle
      : undefined;
    if (!name || !loaderFor(name)) return undefined;
    return { name, props: d && typeof d === "object" ? d : rest };
  }

  function resolveBody(): { target?: Target; text?: string } {
    // Purpose: Work out whether the card body is a named component or plain text.
    const asTarget = (name: unknown, props: unknown): Target | undefined =>
      // Purpose: Pair a component name with its props when that component exists.
      typeof name === "string" && loaderFor(name)
        ? { name, props: (props ?? {}) as Record<string, unknown> }
        : undefined;
    if (component) return { target: asTarget(component, data) };
    const c = content as any;
    if (!c) return {};
    if (typeof c === "string") return { text: c };
    if (c.component) return { target: asTarget(c.component, c.data) };
    if (typeof c.text === "string") return { text: c.text };
    return {};
  }

  const classes = $derived(["card", className].filter(Boolean).join(" "));
  const headerText = $derived(typeof header === "string" ? header : title);
  const bodyText = $derived(text ?? description);
  const figureTarget = $derived(resolveFigure((figure ?? media) as CardFigure | undefined));
  const body = $derived(resolveBody());
  const hasHeader = $derived(Boolean((header && typeof header !== "string") || headerText));
  const hasBody = $derived(Boolean(bodyText || body.target || body.text || children));
  const hasFooter = $derived(Boolean(footerSnippet || footer || href));
  const hasContent = $derived(hasHeader || hasBody || hasFooter);
  // Image and video go edge-to-edge; everything else in the figure gets padding.
  const figureKind = $derived.by(() => {
    // Purpose: Classify the figure so media can run edge to edge and other content is padded.
    const n = figureTarget?.name.toLowerCase();
    return n === "image" || n === "video" ? n : n === "audio" ? "audio" : "component";
  });
</script>

{#snippet dynamic(target: Target)}
  {#await loadComponent(target.name) then Loaded}
    {#if Loaded}
      <Loaded {...target.props} />
    {/if}
  {/await}
{/snippet}

<svelte:element
  this={Tag}
  {...restProps}
  class={classes || undefined}
  data-card
  data-orientation={orientation !== "portrait" ? orientation : undefined}
>
  {#if hasContent}
    <div data-slot="card-content">
      {#if header && typeof header !== "string"}
        <div data-slot="card-header">{@render header()}</div>
      {:else if headerText}
        <div data-slot="card-header">
          <h3 data-slot="card-title">{headerText}</h3>
        </div>
      {/if}

      {#if bodyText}
        <p data-slot="card-description">{bodyText}</p>
      {/if}

      {#if body.target}
        {@render dynamic(body.target)}
      {:else if body.text}
        <p>{body.text}</p>
      {/if}

      {#if children}
        {@render children()}
      {/if}

      {#if hasFooter}
        <footer data-slot="card-footer">
          {#if footerSnippet}
            {@render footerSnippet()}
          {:else if footer}
            {footer}
          {/if}
          {#if href}
            <Button {href} variant="secondary" data-slot="card-cta">
              <span>{ctaLabel}</span>
              <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </Button>
          {/if}
        </footer>
      {/if}
    </div>
  {/if}

  {#if figureTarget}
    <div data-slot="card-figure" data-figure-kind={figureKind}>
      {@render dynamic(figureTarget)}
    </div>
  {/if}
</svelte:element>
