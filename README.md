# Oxford Nigeria Society — Website

Built with **Next.js 14 (App Router)** + **Sanity CMS** + **Vercel**.

## Tech Stack
| Layer | Tool |
|-------|------|
| Framework | Next.js 14 (App Router, TypeScript) |
| CMS | Sanity (embedded studio at `/studio`) |
| Hosting | Vercel (free tier) |
| Styling | CSS Modules + custom properties |
| Fonts | Playfair Display + DM Sans |

## First-Time Setup

### 1. Create a Sanity project
```bash
npx sanity@latest init --env
```
Select: create new project → name it `oxford-nigeria-society` → dataset: `production`

### 2. Add your API token
Go to sanity.io/manage → your project → API → Tokens → Add token (Editor).
Add to `.env.local`: `SANITY_API_TOKEN=your_token_here`

### 3. Run locally
```bash
npm install && npm run dev
```
- Website: http://localhost:3000
- Sanity Studio: http://localhost:3000/studio

## Deploy to Vercel
```bash
npx vercel
```
Add these env vars in the Vercel dashboard:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET` → `production`
- `SANITY_API_TOKEN`

### Connect your domain in Vercel → Settings → Domains
Then in Namecheap DNS:
- A record: `@` → `76.76.21.21`
- CNAME: `www` → `cname.vercel-dns.com`

## Content Management (no code needed)
Visit `oxfordnigeriasoc.org/studio` to manage all content:
- **Events** — add title, date, location, RSVP link
- **Newsletter** — write and publish issues
- **Governing Documents** — paste Google Drive links
- **Site Settings** — update email, Instagram, WhatsApp link, mission statement

## Handover Notes
- Content: `/studio` — no code needed
- Domain: Namecheap
- Email: Namecheap Pro Email → contact@oxfordnigeriasoc.org
- Hosting: Vercel (auto-deploys from GitHub main branch)
- CMS: Sanity (free tier)
