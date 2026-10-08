// Builds the site logos from the client's master (transparent PNG, gold on alpha).
//   node scripts/make-logos.mjs
// public/images/logo.png                full lockup (monogram, name, tagline), gold
// public/images/logo-wordmark.png       "THE POLISH HAUS" only, for the nav bar, gold, strokes thinned
// public/images/logo-pink.png, logo-wordmark-pink.png   the same two recoloured metallic pink
import sharp from "sharp";

const master = "assets/originals/logos/logo-gold-glow.png";

// Metallic pink: map each pixel's brightness onto a ramp so the bevels and shine survive.
// Stops follow the brand palette: wine shadow, deep pink, pink, blush highlight.
const ramp = [
  [0.0, [74, 20, 38]],
  [0.35, [150, 58, 86]],
  [0.6, [196, 104, 123]],
  [0.82, [232, 170, 178]],
  [1.0, [253, 232, 234]],
];

async function pink(input) {
  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  // Normalise brightness over the visible pixels so the ramp spans the logo's full range.
  const lum = (i) => 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
  const seen = [];
  for (let i = 0; i < data.length; i += 4) if (data[i + 3] > 128) seen.push(lum(i));
  seen.sort((a, b) => a - b);
  const lo = seen[Math.floor(seen.length * 0.02)];
  const hi = seen[Math.floor(seen.length * 0.98)];
  for (let i = 0; i < data.length; i += 4) {
    const t = Math.min(1, Math.max(0, (lum(i) - lo) / (hi - lo)));
    let k = 1;
    while (k < ramp.length - 1 && ramp[k][0] < t) k++;
    const [t0, c0] = ramp[k - 1];
    const [t1, c1] = ramp[k];
    const f = (t - t0) / (t1 - t0);
    for (let c = 0; c < 3; c++) data[i + c] = Math.round(c0[c] + (c1[c] - c0[c]) * f);
  }
  return sharp(data, { raw: info }).png();
}

// The bold caps read heavy at nav size, so thin the strokes: blur the alpha, then raise the
// cut-off so the edges pull in (about 4px at this resolution, under 1px once displayed).
async function thin(input, sigma = 2.5, cut = 0.65) {
  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const n = info.width * info.height;
  const alpha = Buffer.alloc(n);
  for (let p = 0; p < n; p++) alpha[p] = data[p * 4 + 3];
  const blurred = await sharp(alpha, { raw: { width: info.width, height: info.height, channels: 1 } })
    .blur(sigma)
    .extractChannel(0)
    .raw()
    .toBuffer();
  for (let p = 0; p < n; p++) {
    const a = Math.min(1, Math.max(0, ((blurred[p] / 255 - cut) / (1 - cut)) * 1.6));
    data[p * 4 + 3] = Math.round(Math.min(data[p * 4 + 3], a * 255));
  }
  return sharp(data, { raw: info }).png().toBuffer();
}

const full = await sharp(master).trim({ threshold: 10 }).png().toBuffer();
// The wordmark band sits between the monogram ring and the tagline.
const band = await sharp(master).extract({ left: 0, top: 664, width: 1536, height: 220 }).png().toBuffer();
const word = await thin(await sharp(band).trim({ threshold: 10 }).png().toBuffer());

await sharp(full).toFile("public/images/logo.png");
await sharp(word).toFile("public/images/logo-wordmark.png");
await (await pink(full)).toFile("public/images/logo-pink.png");
await (await pink(word)).toFile("public/images/logo-wordmark-pink.png");

for (const f of ["logo.png", "logo-wordmark.png", "logo-pink.png", "logo-wordmark-pink.png"]) {
  const m = await sharp(`public/images/${f}`).metadata();
  console.log(f, `${m.width}x${m.height}`);
}
