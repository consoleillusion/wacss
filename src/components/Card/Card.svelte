<script lang="ts">
  import type { Component } from "svelte";
  import type { CardFigure, CardProps } from "../types";
  import Accordion from "../Accordion/Accordion.svelte";
  import Audio from "../Audio/Audio.svelte";
  import Avatar from "../Avatar/Avatar.svelte";
  import Badge from "../Badge/Badge.svelte";
  import Button from "../Button/Button.svelte";
  import Checkbox from "../Checkbox/Checkbox.svelte";
  import ColorInput from "../ColorInput/ColorInput.svelte";
  import ColorPicker from "../ColorPicker/ColorPicker.svelte";
  import DatePicker from "../DatePicker/DatePicker.svelte";
  import Dialog from "../Dialog/Dialog.svelte";
  import Form from "../Form/Form.svelte";
  import Image from "../Image/Image.svelte";
  import Input from "../Input/Input.svelte";
  import Label from "../Label/Label.svelte";
  import NavigationMenu from "../NavigationMenu/NavigationMenu.svelte";
import Progress from "../Progress/Progress.svelte";
  import Select from "../Select/Select.svelte";
  import Separator from "../Separator/Separator.svelte";
  import Slider from "../Slider/Slider.svelte";
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
    ColorPicker,
    DatePicker,
    Dialog,
    Form,
    Image,
    Input,
    Label,
    NavigationMenu,
    Progress,
    Select,
    Separator,
    Slider,
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

  const classes = $derived(className || undefined);
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
  const hasHeader = $derived(Boolean((header && typeof header !== "string") || headerText));
  const hasBody = $derived(Boolean(bodyText || bodyContent.component || bodyContent.text || children));
  const hasContent = $derived(hasHeader || hasBody);

  function onCardClick(e: MouseEvent) {
    if (!href) return;
    const target = e.target as HTMLElement | null;
    if (!target) return;
    if (target.closest("a, button, input, select, textarea, label, video, audio, [role='button'], figure")) return;
    const sel = globalThis.getSelection?.();
    if (sel && sel.toString().length > 0) return;
    window.location.href = href;
  }
</script>

<svelte:element
  this={Tag}
  {...restProps}
  class={classes || undefined}
  data-card
  data-href={href || undefined}
  onclick={onCardClick}
>
  {#if hasFigure}
    {#if figureInfo.kind === "component"}
      {@const Comp = registry[figureInfo.name]}
      <figure data-slot="card-figure">
        <Comp {...figureInfo.props} />
      </figure>
    {:else if figureInfo.kind === "media"}
      {@const Comp = registry[figureInfo.name]}
      {#if Comp}
        <figure data-slot="card-figure">
          <Comp {...figureInfo.props} />
        </figure>
      {:else}
        <figure data-slot="card-figure">
          <img src={(figureInfo.props as any).src} alt={(figureInfo.props as any).alt ?? ""} />
        </figure>
      {/if}
    {/if}
  {/if}

  {#if hasContent}
    <div data-slot="card-content">
      {#if header && typeof header !== "string"}
        <div data-slot="card-header">{@render header()}</div>
      {:else if headerText}
        <div data-slot="card-header">
          <h3 data-slot="card-title">
            {#if href}<a href={href}>{headerText}</a>{:else}{headerText}{/if}
          </h3>
        </div>
      {/if}

      {#if bodyText}
        <p data-slot="card-description">{bodyText}</p>
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
    <footer data-slot="card-footer">{footer}</footer>
  {/if}
</svelte:element>
