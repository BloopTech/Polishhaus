@AGENTS.md

# The Polish Haus website

## Assets: read ASSETS.md first
All photos, logos, fonts and brand colours are catalogued in [ASSETS.md](ASSETS.md): what each
photo shows (nail type, shape, service), its size, and where it is used. Use it to pick images
instead of asking the user to re-upload.

- Web photos: `public/images/photos/<name>.jpg` → `src="/images/photos/<name>.jpg"`
- Full-res masters: `assets/originals/photos/` (re-export from these)
- New photos: put in `assets/inbox/`, run `node scripts/add-photos.mjs`, then add a row to ASSETS.md.
  Photos attached in chat must be copied into `assets/inbox/` first; chat attachments live in a temp folder that gets cleared.

## Pages and content
- Routes: `/` (home), `/services`, `/the-haus`, `/contact`, `/book`. Nav + footer live in `app/layout.tsx`.
- `app/site.ts` holds studio contact details (WhatsApp number, Instagram, address, hours, closed days), the services/treatments list (add `price` to show prices), nail styles and FAQs.
- Booking has no backend: `/book` composes a WhatsApp message to `studio.whatsapp`.

## Dev server
This project runs on **http://localhost:3001**. Port 3000 is a different project (`edlizer`).
