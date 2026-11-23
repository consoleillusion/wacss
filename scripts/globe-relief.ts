// Writes src/components/Globe/relief.webp: a greyscale texture of the world's relief and the
// depth of its seas, in an equirectangular projection twice as wide as it is high, which Globe
// lays over its land and sea. Mid-grey changes nothing; lighter and darker lighten and darken.
// On land it is the relief shading of NASA's Blue Marble (shaded relief and bathymetry); at sea,
// the depth, lighter over the shelves and darker over the deep ocean.
//
// The source is planet.jpeg from the npm package @freetiler/nasa-bluemarble (Web Mercator,
// 4096 by 4096), which is large and so is not a dependency: give its path.
//   bun run globe-relief <path to planet.jpeg>
import sharp from "sharp";

const W = 1024;
const H = 512;
const source = process.argv[2];
if (!source) throw new Error("usage: bun run globe-relief <path to planet.jpeg>");

const { data: src, info } = await sharp(source).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const S = info.width;

const sample = (lon: number, lat: number) => {
  // Purpose: the average colour of the Mercator source around a longitude and latitude
  const phi = (Math.max(-85.05, Math.min(85.05, lat)) * Math.PI) / 180;
  const cx = Math.floor(((lon + 180) / 360) * S);
  const cy = Math.floor(((1 - Math.log(Math.tan(Math.PI / 4 + phi / 2)) / Math.PI) / 2) * S);
  let r = 0, g = 0, b = 0, n = 0;
  for (let dy = -2; dy <= 2; dy++)
    for (let dx = -2; dx <= 2; dx++) {
      const x = (cx + dx + S) % S;
      const y = Math.max(0, Math.min(S - 1, cy + dy));
      const i = (y * S + x) * 3;
      r += src[i]!; g += src[i + 1]!; b += src[i + 2]!; n++;
    }
  return [r / n, g / n, b / n] as const;
};

const lum = new Float32Array(W * H);
const sea = new Uint8Array(W * H);
for (let y = 0; y < H; y++)
  for (let x = 0; x < W; x++) {
    const [r, g, b] = sample(((x + 0.5) / W) * 360 - 180, 90 - ((y + 0.5) / H) * 180);
    lum[y * W + x] = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
    sea[y * W + x] = b > r + 12 && b > g ? 1 : 0;
  }

// The broad brightness of each place, so that land shows only its relief and not its colour.
const grey = Buffer.from(Uint8Array.from(lum, (v) => Math.round(v * 255)));
const soft = await sharp(grey, { raw: { width: W, height: H, channels: 1 } }).blur(6).extractChannel(0).raw().toBuffer();
const blurred = Float32Array.from(soft, (v) => v / 255);

const seaValues = [...lum].filter((_, i) => sea[i]).sort((a, b) => a - b);
const seaMid = seaValues[Math.floor(seaValues.length / 2)]!;
const seaSpread = seaValues[Math.floor(seaValues.length * 0.95)]! - seaValues[Math.floor(seaValues.length * 0.05)]!;

const out = Buffer.alloc(W * H);
for (let i = 0; i < W * H; i++) {
  const t = sea[i]
    ? 0.5 + ((lum[i]! - seaMid) / seaSpread) * 0.8
    : 0.5 + (lum[i]! - blurred[i]!) * 3;
  // Beyond the Mercator source's reach, near the poles, the texture is neutral.
  const lat = 90 - ((Math.floor(i / W) + 0.5) / H) * 180;
  out[i] = Math.abs(lat) > 84 ? 128 : Math.round(Math.max(0, Math.min(1, t)) * 255);
}
await sharp(out, { raw: { width: W, height: H, channels: 1 } })
  .webp({ quality: 70, effort: 6 })
  .toFile(new URL("../src/components/Globe/relief.webp", import.meta.url).pathname);
console.log("relief.webp written");
