<script lang="ts">
  // StreetMap: an OpenStreetMap map, drawn by Leaflet once the script runs. Its frame and focus
  // ring are CSS; its markers take the element's accent-color. Until the map is drawn, and
  // without JavaScript, the element holds a link to the same place on openstreetmap.org.
  import "leaflet/dist/leaflet.css";

  type Marker = { lat: number; long: number; label?: string };
  let {
    lat = 51.5074,
    long = -0.1278,
    zoom = 13,
    markers = [],
    label = "A map",
    class: className = "",
    ...rest
  }: { lat?: number; long?: number; zoom?: number; markers?: Marker[]; label?: string; class?: string; [key: string]: unknown } = $props();

  let element: HTMLDivElement | undefined = $state();
  let drawn = $state(false);
  const href = $derived(`https://www.openstreetmap.org/#map=${zoom}/${lat}/${long}`);

  $effect(() => {
    // Purpose: draw the map, and draw it again when its centre, zoom or markers change
    const centre: [number, number] = [lat, long];
    const level = zoom;
    const places = markers;
    if (!element) return;
    let map: import("leaflet").Map | undefined;
    let cancelled = false;
    import("leaflet").then((L) => {
      if (cancelled || !element) return;
      map = L.map(element, { center: centre, zoom: level });
      const tiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);
      // Where the page may not load images from OpenStreetMap, say so, and link to the place.
      tiles.once("tileerror", () => {
        const notice = new L.Control({ position: "topright" });
        notice.onAdd = () => {
          const box = L.DomUtil.create("div", "leaflet-control-attribution");
          box.innerHTML = `The map's tiles could not load here. <a href="${href}">View this place on OpenStreetMap</a>`;
          return box;
        };
        notice.addTo(map!);
      });
      const color = getComputedStyle(element).accentColor;
      for (const place of places) {
        const dot = L.circleMarker([place.lat, place.long], { radius: 7, color: color, weight: 2, fillColor: color, fillOpacity: 0.85 });
        if (place.label) dot.bindTooltip(place.label, { direction: "top" });
        dot.addTo(map);
      }
      drawn = true;
    });
    return () => { cancelled = true; map?.remove(); drawn = false; };
  });
</script>

<div bind:this={element} {...rest} class={["street-map", className].filter(Boolean).join(" ")} role="region" aria-label={label}>
  {#if !drawn}<a href={href}>View this place on OpenStreetMap</a>{/if}
</div>
