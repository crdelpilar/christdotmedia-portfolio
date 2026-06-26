# chrisdotmedia Portfolio

Portfolio website for Christian Del Pilar — photographer, motion designer, and marketer.

Built with **Next.js 16** · **TypeScript** · **Tailwind CSS 4** · **Supabase** · **Framer Motion**

---

## Setup

### 1. Clone & install

```bash
git clone https://github.com/your-username/christdotmedia-portfolio
cd christdotmedia-portfolio
npm install
```

### 2. Environment variables

Copy `.env.local.example` to `.env.local` and fill in your values:

```bash
cp .env.local.example .env.local
```

| Variable | Where to find it |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase project → Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase project → Settings → API (secret) |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` for dev, production URL for prod |

### 3. Supabase setup

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Run the migration in the SQL editor:  
   Copy `supabase/migrations/001_initial.sql` → paste into **SQL Editor** → run
3. Create an admin user: **Authentication → Users → Add user** (use email/password)
4. Create the storage bucket: **Storage → New bucket** → name it `portfolio-uploads` → enable **Public**

### 4. Git LFS (for self-hosted videos)

```bash
git lfs install
git lfs track "*.mp4"
git lfs track "*.mov"
git lfs track "*.webm"
git add .gitattributes
```

### 5. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Admin panel: [http://localhost:3000/admin](http://localhost:3000/admin)

---

## Media storage

| Type | How to add |
|---|---|
| Portfolio images | Add to `public/images/`, commit, use path `/images/filename.jpg` in admin |
| Self-hosted videos | Add to `public/videos/` (Git LFS), poster to `public/videos/posters/`, use path `/videos/filename.mp4` in admin |
| YouTube / Vimeo | Paste the URL directly in the admin panel |

---

## Deployment (Vercel)

1. Push to GitHub
2. Import the repo in [Vercel](https://vercel.com)
3. Add all environment variables in the Vercel dashboard
4. Set `NEXT_PUBLIC_SITE_URL` to your production domain
5. Vercel auto-deploys on every push to `main`

---

## Project structure

```
app/
  layout.tsx           Root layout + fonts
  page.tsx             Homepage
  photography/         Category pages (×5)
  graphic-design/
  motion-design/
  film/
  marketing/
  case-study/          Full case study
  about/
  contact/
  admin/               Auth-protected CMS
    login/
  api/                 Next.js API routes
    items/
    settings/
    auth/
components/            Shared UI components
lib/                   Types, constants, Supabase clients, utilities
public/
  images/              Portfolio images
  videos/              Self-hosted MP4s (Git LFS)
  videos/posters/      Video thumbnail frames
supabase/
  migrations/          SQL migration files
```
