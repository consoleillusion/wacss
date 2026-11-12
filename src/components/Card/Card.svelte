<script lang="ts">
  import type { Component } from "svelte";
  import type { CardContent, CardMedia, CardProps } from "../types";
  import Avatar from "../Avatar/Avatar.svelte";
  import Badge from "../Badge/Badge.svelte";
  import Button from "../Button/Button.svelte";
  import Checkbox from "../Checkbox/Checkbox.svelte";
  import Dialog from "../Dialog/Dialog.svelte";
  import Form from "../Form/Form.svelte";
  import Input from "../Input/Input.svelte";
  import Label from "../Label/Label.svelte";
  import Progress from "../Progress/Progress.svelte";
  import Select from "../Select/Select.svelte";
  import Separator from "../Separator/Separator.svelte";
  import Switch from "../Switch/Switch.svelte";
  import Tabs from "../Tabs/Tabs.svelte";

  const registry: Record<string, Component<any>> = {
    Avatar,
    Badge,
    Button,
    Checkbox,
    Dialog,
    Form,
    Input,
    Label,
    Progress,
    Select,
    Separator,
    Switch,
    Tabs,
  };

  let {
    as: Tag = "article",
    title,
    description,
    footer,
    media,
    content,
    component,
    data,
    class: className = "",
    children,
    header,
    footerSnippet,
    ...restProps
  }: CardProps = $props();

  const classes = $derived([className].filter(Boolean).join(" "));

  const resolvedContent = $derived.by((): { component?: Component<any>; componentData?: Record<string, unknown>; text?: string } => {
    if (component) {
      return { component: registry[component], componentData: data ?? {} };
    }
    const c = content as CardContent | undefined;
    if (!c) return {};
    if (typeof c === "string") return { text: c };
    if ("component" in c && c.component) {
      return { component: registry[c.component], componentData: c.data ?? {} };
    }
    if ("text" in c && typeof c.text === "string") return { text: c.text };
    return {};
  });

  const hasContent = $derived(
    Boolean(media || resolvedContent.component || resolvedContent.text || children),
  );

  function pickMediaAttrs(m: CardMedia) {
    const { type, src, sources, alt, caption, ...attrs } = m as any;
    return attrs as Record<string, unknown>;
  }
</script>

<svelte:element this={Tag} {...restProps} class={classes || undefined} wacss="card">
  {#if header}
    {@render header()}
  {:else if title || description}
    <header wacss="card-header">
      {#if title}
        <h3 wacss="card-title">{title}</h3>
      {/if}
      {#if description}
        <p wacss="card-description">{description}</p>
      {/if}
    </header>
  {/if}

  {#if hasContent}
    <div wacss="card-content">
      {#if media?.type === "image"}
        <figure wacss="card-media">
          <img src={media.src} alt={media.alt ?? ""} {...pickMediaAttrs(media)} />
          {#if media.caption}<figcaption>{media.caption}</figcaption>{/if}
        </figure>
      {:else if media?.type === "video"}
        <figure wacss="card-media">
          <!-- svelte-ignore a11y_media_has_caption -->
          <video
            src={media.src}
            poster={media.poster}
            controls={media.controls ?? true}
            autoplay={media.autoplay}
            loop={media.loop}
            muted={media.muted}
            playsinline={media.playsinline}
            preload={media.preload}
            {...pickMediaAttrs(media)}
          >
            {#if media.sources}
              {#each media.sources as s}
                <source src={s.src} type={s.type} />
              {/each}
            {/if}
          </video>
          {#if media.caption}<figcaption>{media.caption}</figcaption>{/if}
        </figure>
      {:else if media?.type === "audio"}
        <figure wacss="card-media">
          <audio
            src={media.src}
            controls={media.controls ?? true}
            autoplay={media.autoplay}
            loop={media.loop}
            muted={media.muted}
            preload={media.preload}
            {...pickMediaAttrs(media)}
          >
            {#if media.sources}
              {#each media.sources as s}
                <source src={s.src} type={s.type} />
              {/each}
            {/if}
          </audio>
          {#if media.caption}<figcaption>{media.caption}</figcaption>{/if}
        </figure>
      {/if}

      {#if resolvedContent.component}
        {@const Comp = resolvedContent.component}
        <Comp {...resolvedContent.componentData} />
      {:else if resolvedContent.text}
        <p>{resolvedContent.text}</p>
      {/if}

      {#if children}
        {@render children()}
      {/if}
    </div>
  {/if}

  {#if footerSnippet}
    {@render footerSnippet()}
  {:else if footer}
    <footer wacss="card-footer">{footer}</footer>
  {/if}
</svelte:element>
