// Moves photos from assets/inbox into the site.
//   node scripts/add-photos.mjs                 -> uses each file's own name
//   node scripts/add-photos.mjs a.png=pedicure  -> renames a.png to "pedicure"
// Keeps the full-res master in assets/originals/photos and writes a web-sized
// JPG (1400px wide, ~150KB) to public/images/photos. Then add the photo to ASSETS.md.
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const inbox = "assets/inbox";
const masters = "assets/originals/photos";
const web = "public/images/photos";
const renames = Object.fromEntries(process.argv.slice(2).map((a) => a.split("=")));

const files = fs.readdirSync(inbox).filter((f) => /\.(png|jpe?g|webp|heic|tiff?)$/i.test(f));
if (!files.length) console.log("Inbox is empty.");

for (const file of files) {
  const name = (renames[file] ?? path.parse(file).name).toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const src = path.join(inbox, file);
  const out = path.join(web, `${name}.jpg`);
  if (fs.existsSync(out)) {
    console.log(`skip ${file}: ${out} already exists (pass ${file}=<new-name>)`);
    continue;
  }
  const info = await sharp(src)
    .rotate()
    .resize({ width: 1400, withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(out);
  fs.renameSync(src, path.join(masters, `${name}${path.extname(file).toLowerCase()}`));
  console.log(`${name}: ${info.width}x${info.height}, ${Math.round(info.size / 1024)} KB -> /images/photos/${name}.jpg`);
}
