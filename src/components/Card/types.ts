import type { Snippet } from "svelte";

export type CardTag = "article" | "section" | "div";

export type CardMediaType = "image" | "video" | "audio";

export type CardMedia = {
  type: CardMediaType;
  src?: string;
  sources?: { src: string; type?: string }[];
  alt?: string;
  poster?: string;
  controls?: boolean;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsinline?: boolean;
  preload?: "none" | "metadata" | "auto";
  [key: string]: unknown;
};

export type CardContent =
  | string
  | {
      component: string;
      data?: Record<string, unknown>;
    }
  | {
      text?: string;
      html?: string;
    };

export type CardFigure =
  | CardMedia
  | ({ component?: string; schema?: { title?: string; [k: string]: unknown }; data?: Record<string, unknown> } & Record<string, unknown>)
  | Record<string, unknown>;

export type CardProps = {
  as?: CardTag;
  /** Card header text. */
  header?: string | Snippet;
  /** Legacy alias for header text. */
  title?: string;
  /** Body text/description below the figure. */
  text?: string;
  /** Legacy alias for body text. */
  description?: string;
  footer?: string;
  /** Figure content: media (image/video/audio) or component data/schema (identified by title). */
  figure?: CardFigure;
  /** Data-driven media (image, video, audio). Legacy alias for figure. */
  media?: CardMedia;
  /** Data-driven body content. */
  content?: CardContent;
  /** Render a registered component by name with data. */
  component?: string;
  /** Data passed to the named component. */
  data?: Record<string, unknown>;
  /** Card aspect ratio. Defaults to portrait (3:4). */
  orientation?: "portrait" | "square" | "landscape";
  /** Back-compat: composed children snippet. */
  children?: Snippet;
  /** Back-compat: footer snippet. */
  footerSnippet?: Snippet;
  class?: string;
  [key: string]: unknown;
};
