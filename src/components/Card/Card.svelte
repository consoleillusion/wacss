<script lang="ts">
  import type { Component } from "svelte";
  import type { CardFigure, CardProps } from "../types";
  import Audio from "../Audio/Audio.svelte";
  import Avatar from "../Avatar/Avatar.svelte";
  import Badge from "../Badge/Badge.svelte";
  import Button from "../Button/Button.svelte";
  import Checkbox from "../Checkbox/Checkbox.svelte";
  import Accordion from "../Accordion/Accordion.svelte";
  import ColorInput from "../ColorInput/ColorInput.svelte";
  import Dialog from "../Dialog/Dialog.svelte";
  import Form from "../Form/Form.svelte";
  import Image from "../Image/Image.svelte";
  import Input from "../Input/Input.svelte";
  import Label from "../Label/Label.svelte";
  import Progress from "../Progress/Progress.svelte";
  import Select from "../Select/Select.svelte";
  import Separator from "../Separator/Separator.svelte";
  import Switch from "../Switch/Switch.svelte";
  import Tabs from "../Tabs/Tabs.svelte";
  import Video from "../Video/Video.svelte";

  const registry: Record<string, Component<any>> = {
    Accordion,
    Audio,
    Avatar,
    Badge,
    Button,
    Checkbox,
    Color: ColorInput,
    ColorInput,
    Dialog,
    Form,
    Image,
    Input,
    Label,
    Progress,
    Select,
    Separator,
    Switch,
    Tabs,
    Video,
  };

  let {
    as: Tag = "article",
    header,
    title,
    text,
    description,
    footer,
    figure,
    media,
    content,
    component,
    data,
    href,
    class: className = "",
    children,
    footerSnippet,
    ...restProps
  }: CardProps & { href?: string } = $props();

  const classes = $derived([className].filter(Boolean).join(" "));
  const headerText = $derived(typeof header === "string" ? header : title);
  const bodyText = $derived(text ?? description);

  function resolveComponentName(f: any): string | undefined {
    if (!f || typeof f !== "object") return undefined;
    if (typeof f.component === "string") return f.component;
    if (f.schema && typeof f.schema.title === "string") return f.schema.title;
    if (typeof f.title === "string" && registry[f.title]) return f.title;
    if (f.type === "image" || f.type === "video" || f.type === "audio") return undefined;
    return undefined;
  }

  const figureInfo = $derived.by(() => {
    const f = (figure ?? media) as CardFigure | undefined;
    if (!f || typeof f !== "object") return { kind: "none" as const };
    if ((f as any).type === "image" || (f as any).type === "video" || (f as any).type === "audio") {
      const t = (f as any).type as string;
      return { kind: "media" as const, name: t.charAt(0).toUpperCase() + t.slice(1), props: f as Record<string, unknown> };
    }
    const name = resolveComponentName(f);
    if (name && registry[name]) {
      const { component: _c, schema: _s, data: d, title: _t, ...rest } = f as any;
      const props = d && typeof d === "object" ? d : rest;
      return { kind: "component" as const, name, props: props as Record<string, unknown> };
    }
    return { kind: "none" as const };
  });

  const bodyContent = $derived.by(() => {
    if (component) return { component: registry[component], props: data ?? {} };
    const c = content as any;
    if (!c) return {};
    if (typeof c === "string") return { text: c };
    if (c.component) return { component: registry[c.component], props: c.data ?? {} };
    if (typeof c.text === "string") return { text: c.text };
    return {};
  });

  const hasFigure = $derived(figureInfo.kind !== "none");
  const hasBody = $derived(Boolean(bodyText || bodyContent.component || bodyContent.text || children));

  function onCardClick(e: MouseEvent) {
    if (!href) return;
    const target = e.target as HTMLElement | null;
    if (!target) return;
    if (target.closest("a, button, input, select, textarea, label, video, audio, [role='button'], [data-wacss='card-figure']")) return;
    const sel = globalThis.getSelection?.();
    if (sel && sel.toString().length > 0) return;
    window.location.href = href;
  }
</script>

<svelte:element
  this={Tag}
  {...restProps}
  class={classes || undefined}
  data-wacss="card"
  data-href={href || undefined}
  onclick={onCardClick}
>
  {#if header && typeof header !== "string"}
    {@render header()}
  {:else if headerText}
    <header data-wacss="card-header">
      <h3 data-wacss="card-title">
        {#if href}<a href={href} data-wacss="card-link">{headerText}</a>{:else}{headerText}{/if}
      </h3>
    </header>
  {/if}

  {#if hasFigure || hasBody}
    <div data-wacss="card-content">
      {#if figureInfo.kind === "component"}
        {@const Comp = registry[figureInfo.name]}
        <figure data-wacss="card-figure">
          <Comp {...figureInfo.props} />
        </figure>
      {:else if figureInfo.kind === "media"}
        {@const Comp = registry[figureInfo.name]}
        {#if Comp}
          <Comp {...figureInfo.props} />
        {:else}
          <figure data-wacss="card-figure"><img src={(figureInfo.props as any).src} alt={(figureInfo.props as any).alt ?? ""} /></figure>
        {/if}
      {/if}

      {#if bodyText}
        <p data-wacss="card-text">{bodyText}</p>
      {/if}

      {#if bodyContent.component}
        {@const C = bodyContent.component}
        <C {...bodyContent.props} />
      {:else if bodyContent.text}
        <p>{bodyContent.text}</p>
      {/if}

      {#if children}
        {@render children()}
      {/if}
    </div>
  {/if}

  {#if footerSnippet}
    {@render footerSnippet()}
  {:else if footer}
    <footer data-wacss="card-footer">{footer}</footer>
  {/if}
</svelte:element>
