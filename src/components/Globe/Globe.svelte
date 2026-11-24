<script lang="ts" module>
  // The texture is requested as soon as this module loads in the browser, before any globe is
  // drawn, and decoded once for every globe on the page.
  type Relief = { data: Uint8ClampedArray; width: number; height: number };
  const loadRelief = (): Promise<Relief | null> => {
    // Purpose: fetch and decode relief.webp into its pixels
    const image = new Image();
    image.decoding = "async";
    image.fetchPriority = "high";
    image.src = new URL("./relief.webp", import.meta.url).href;
    return image.decode().then(() => {
      const c = document.createElement("canvas");
      c.width = image.naturalWidth;
      c.height = image.naturalHeight;
      const context = c.getContext("2d", { willReadFrequently: true })!;
      context.drawImage(image, 0, 0);
      return { data: context.getImageData(0, 0, c.width, c.height).data, width: c.width, height: c.height };
    }).catch(() => null);
  };
  const reliefReady: Promise<Relief | null> | null = typeof window === "undefined" ? null : loadRelief();
</script>

<script lang="ts">
  // Globe: the world in an orthographic projection, drawn as SVG. Its colors come from the
  // svg element's color (sea) and fill (land), which the shapes inherit; its
  // states are CSS. JavaScript turns it, on its own under the pointer, by dragging, and with the
  // arrow keys when focused, and lays the texture of relief and sea depth over it (relief.webp).
  import { geoOrthographic, geoPath, geoRotation } from "d3-geo";
  import { feature } from "topojson-client";
  import world from "world-atlas/land-110m.json";

  const land = feature(world as any, (world as any).objects.land) as any;
  const SIZE = 200;
  const R = 96;
  const C = SIZE / 2;

  let {
    label = "A globe of the world",
    longitude = 20,
    latitude = 0,
    tilt = 23.44,
    class: className = "",
    ...rest
  }: {
    label?: string;
    longitude?: number;
    latitude?: number;
    tilt?: number;
    class?: string;
    [key: string]: unknown;
  } = $props();

  const id = $props.id();
  let lambda = $state(-longitude);
  let phi = $state(-latitude);

  const projection = $derived(geoOrthographic().scale(R).translate([C, C]).clipAngle(90).rotate([lambda, phi, -tilt]));
  const path = $derived(geoPath(projection).digits(1));
  const landPath = $derived(path(land) ?? "");

  // The texture: drawn on a canvas of TEXTURE pixels across, over the land and sea. Mid-grey in
  // relief.webp changes nothing; darker darkens, up to DARKEN, and lighter lightens, up to LIGHTEN.
  const TEXTURE = 256;
  const DARKEN = 0.32;
  const LIGHTEN = 0.22;
  let canvas: HTMLCanvasElement | undefined = $state();
  let relief: Relief | null = $state(null);

  $effect(() => {
    // Purpose: take the texture as soon as it is ready
    reliefReady?.then((r) => { relief = r; });
  });

  const cartesian = ([lon, lat]: [number, number]) => {
    // Purpose: a longitude and latitude, in degrees, as a point on the unit sphere
    const l = (lon * Math.PI) / 180, p = (lat * Math.PI) / 180;
    return [Math.cos(p) * Math.cos(l), Math.cos(p) * Math.sin(l), Math.sin(p)];
  };

  $effect(() => {
    // Purpose: draw the texture for the globe's present turn
    if (!canvas || !relief) return;
    const rotate = geoRotation([lambda, phi, -tilt]);
    // Where the rotation takes each axis of the world; the view of a pixel is turned back by
    // these to find the place on the world it shows.
    const ex = cartesian(rotate([0, 0]) as [number, number]);
    const ey = cartesian(rotate([90, 0]) as [number, number]);
    const ez = cartesian(rotate([0, 90]) as [number, number]);
    const context = canvas.getContext("2d")!;
    const out = context.createImageData(TEXTURE, TEXTURE);
    const { data, width, height } = relief;
    for (let j = 0; j < TEXTURE; j++) {
      const sy = ((j + 0.5) / TEXTURE) * 2 - 1;
      for (let i = 0; i < TEXTURE; i++) {
        const sx = ((i + 0.5) / TEXTURE) * 2 - 1;
        const r2 = sx * sx + sy * sy;
        if (r2 >= 1) continue;
        const X = Math.sqrt(1 - r2), Y = sx, Z = -sy;
        const ox = ex[0]! * X + ex[1]! * Y + ex[2]! * Z;
        const oy = ey[0]! * X + ey[1]! * Y + ey[2]! * Z;
        const oz = ez[0]! * X + ez[1]! * Y + ez[2]! * Z;
        const lon = Math.atan2(oy, ox), lat = Math.asin(Math.max(-1, Math.min(1, oz)));
        const u = Math.min(width - 1, Math.floor(((lon + Math.PI) / (2 * Math.PI)) * width));
        const v = Math.min(height - 1, Math.floor(((Math.PI / 2 - lat) / Math.PI) * height));
        const t = data[(v * width + u) * 4]! / 255 - 0.5;
        const k = (j * TEXTURE + i) * 4;
        const shade = t < 0 ? 0 : 255;
        out.data[k] = out.data[k + 1] = out.data[k + 2] = shade;
        out.data[k + 3] = Math.abs(t) * 2 * (t < 0 ? DARKEN : LIGHTEN) * 255;
      }
    }
    context.putImageData(out, 0, 0);
  });

  const clampPhi = (value: number) =>
    // Purpose: keep the lean toward or away from the viewer within sixty degrees
    Math.max(-60, Math.min(60, value));

  const reduced = () =>
    // Purpose: whether the reader prefers reduced motion
    typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Its timing is CSS, read from its computed style: one full turn takes its animation-duration,
  // and the turn speeds up and slows down as its colors change, over its transition duration
  // and along its transition timing function.
  let hovering = false;
  let spin = 0;
  let ease: (t: number) => number = (t) => t;
  let rampMs = 250;
  let turnMs = 25000;

  const bezier = (x1: number, y1: number, x2: number, y2: number) => (x: number) => {
    // Purpose: a CSS cubic-bezier timing function, as the progress it gives at time x
    const at = (a: number, b: number, t: number) => 3 * a * t * (1 - t) ** 2 + 3 * b * t * t * (1 - t) + t ** 3;
    let lo = 0, hi = 1, t = x;
    for (let i = 0; i < 24; i++) { t = (lo + hi) / 2; if (at(x1, x2, t) < x) lo = t; else hi = t; }
    return at(y1, y2, t);
  };
  const KEYWORDS: Record<string, number[]> = {
    linear: [0, 0, 1, 1], ease: [0.25, 0.1, 0.25, 1], "ease-in": [0.42, 0, 1, 1],
    "ease-out": [0, 0, 0.58, 1], "ease-in-out": [0.42, 0, 0.58, 1],
  };
  const readTiming = (el: Element) => {
    // Purpose: take the element's turn time, transition duration and timing function
    const style = getComputedStyle(el);
    const ms = (value: string) => {
      // Purpose: a CSS time, the first of a list, in milliseconds
      const v = value.split(",")[0]!.trim();
      return v.endsWith("ms") ? parseFloat(v) : parseFloat(v) * 1000;
    };
    rampMs = ms(style.transitionDuration);
    turnMs = ms(style.animationDuration);
    const f = style.transitionTimingFunction.split(/,(?![^(]*\))/)[0]!.trim();
    const points = f.startsWith("cubic-bezier") ? f.slice(13, -1).split(",").map(Number) : KEYWORDS[f] ?? KEYWORDS.linear!;
    ease = bezier(points[0]!, points[1]!, points[2]!, points[3]!);
  };

  let dragging = false;
  let velocity = 0;
  let frame = 0;
  let last = 0;
  let pointer = { x: 0, y: 0, t: 0 };

  const tick = (now: number) => {
    // Purpose: advance the turn by the time since the last frame, then ask for the next frame
    const dt = last ? Math.min(now - last, 64) : 16;
    last = now;
    if (!dragging) {
      if (Math.abs(velocity) > 0.001) {
        lambda += velocity * dt;
        velocity *= Math.pow(0.996, dt);
      } else velocity = 0;
      const target = hovering && !reduced() ? 1 : 0;
      spin = target > spin ? Math.min(1, spin + dt / Math.max(rampMs, 1)) : Math.max(0, spin - dt / Math.max(rampMs, 1));
      if (spin > 0) lambda += ease(spin) * (360 / Math.max(turnMs, 1)) * dt;
    }
    if (hovering || dragging || velocity !== 0 || spin > 0) frame = requestAnimationFrame(tick);
    else { frame = 0; last = 0; }
  };

  const run = () => {
    // Purpose: start the frame loop if it is not already running
    if (!frame) { last = 0; frame = requestAnimationFrame(tick); }
  };

  let svg: SVGSVGElement | undefined = $state();
  const sync = () => {
    // Purpose: turn while the element's computed animation-play-state is running, as the hover
    // state sets it; read its timing at the same moment
    if (!svg) return;
    readTiming(svg);
    hovering = getComputedStyle(svg).animationPlayState.split(",")[0]!.trim() === "running";
    run();
  };
  // A state can also be applied by changing the element's attributes or inline style (as the
  // demo's state selector does), so those changes are watched as well as the pointer.
  $effect(() => {
    if (!svg) return;
    const observer = new MutationObserver(sync);
    observer.observe(svg, { attributes: true, attributeFilter: ["style", "class", "aria-disabled"] });
    sync();
    return () => observer.disconnect();
  });
  const enter = () => sync();
  const leave = () => requestAnimationFrame(sync);

  const down = (e: PointerEvent) => {
    // Purpose: take hold of the globe
    dragging = true;
    velocity = 0;
    pointer = { x: e.clientX, y: e.clientY, t: e.timeStamp };
    (e.currentTarget as Element).setPointerCapture(e.pointerId);
    run();
  };

  const move = (e: PointerEvent) => {
    // Purpose: turn the globe with the pointer: a full width of drag turns it half a turn
    if (!dragging) return;
    const el = e.currentTarget as Element;
    const scale = 180 / el.getBoundingClientRect().width;
    const dx = (e.clientX - pointer.x) * scale;
    const dy = (e.clientY - pointer.y) * scale;
    const dt = Math.max(e.timeStamp - pointer.t, 1);
    lambda += dx;
    phi = clampPhi(phi - dy);
    velocity = reduced() ? 0 : dx / dt;
    pointer = { x: e.clientX, y: e.clientY, t: e.timeStamp };
  };

  const up = (e: PointerEvent) => {
    // Purpose: let go; the globe carries on with the speed it was given
    dragging = false;
    (e.currentTarget as Element).releasePointerCapture?.(e.pointerId);
    run();
  };

  const key = (e: KeyboardEvent) => {
    // Purpose: turn the globe ten degrees with an arrow key
    const step = { ArrowLeft: [-10, 0], ArrowRight: [10, 0], ArrowUp: [0, -10], ArrowDown: [0, 10] }[e.key];
    if (!step) return;
    e.preventDefault();
    lambda += step[0]!;
    phi = clampPhi(phi + step[1]!);
  };
</script>

<svg
  bind:this={svg}
  {...rest}
  data-globe
  class={className || undefined}
  viewBox="0 0 {SIZE} {SIZE}"
  role="img"
  aria-label={label}
  tabindex="0"
  onpointerenter={enter}
  onpointerleave={leave}
  onpointerdown={down}
  onpointermove={move}
  onpointerup={up}
  onpointercancel={up}
  onkeydown={key}
>
  <defs>
    <radialGradient id="{id}-light" cx="0.34" cy="0.3" r="0.62">
      <stop offset="0" stop-color="white" stop-opacity="0.5" />
      <stop offset="1" stop-color="white" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="{id}-rim" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0.72" stop-color="black" stop-opacity="0" />
      <stop offset="1" stop-color="black" stop-opacity="0.22" />
    </radialGradient>
  </defs>
  <circle cx={C} cy={C} r={R} fill="currentColor" />
  <path d={landPath} />
  <foreignObject x={C - R} y={C - R} width={R * 2} height={R * 2} aria-hidden="true">
    <canvas bind:this={canvas} width={TEXTURE} height={TEXTURE} style="display: block; inline-size: 100%; block-size: 100%"></canvas>
  </foreignObject>
  <circle cx={C} cy={C} r={R} fill="url(#{id}-light)" />
  <circle cx={C} cy={C} r={R} fill="url(#{id}-rim)" />
</svg>
