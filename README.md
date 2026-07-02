# Shafayat — Portfolio

Next.js 14 (App Router) portfolio with dark/light mode, Framer Motion animation,
a MongoDB-backed projects system, a nodemailer contact form, and a private admin
dashboard to manage projects — all in **one Next.js app** (no separate backend server).

## 1. Install

```bash
npm install
```

That single command installs everything: Next.js, React, Framer Motion,
Tailwind CSS, lucide-react, next-themes, mongoose, nodemailer, jsonwebtoken, jose,
bcryptjs, and the TypeScript types — they're all already listed in `package.json`.

## 2. Environment variables

Copy the example file and fill in real values:

```bash
cp .env.example .env.local
```

| Variable | What it's for |
|---|---|
| `MONGODB_URI` | MongoDB Atlas connection string (free tier is enough) |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Your dashboard login — pick your own strong password |
| `JWT_SECRET` | Any long random string, used to sign the admin session cookie |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASS` | Email account the contact form sends from (Gmail needs an **App Password**, not your normal password) |
| `CONTACT_RECEIVER_EMAIL` | Where contact form messages land — your inbox |

### Getting a MongoDB URI (free)
1. Create a free cluster at https://www.mongodb.com/cloud/atlas
2. Database Access → add a user + password
3. Network Access → allow `0.0.0.0/0` (or your deploy IP)
4. Connect → Drivers → copy the connection string into `MONGODB_URI`

### Gmail App Password (free)
1. Turn on 2-Step Verification on your Google account
2. Google Account → Security → App Passwords → generate one for "Mail"
3. Use that 16-character password as `SMTP_PASS` (not your real Gmail password)

## 3. Run locally

```bash
npm run dev
```

Visit `http://localhost:3000` for the site, `http://localhost:3000/dashboard`
for the admin panel (redirects to `/dashboard/login` until you sign in).

## 4. Seed your projects into MongoDB (optional)

The site works without this — it falls back to the sample data in `lib/data.ts`.
Once your `MONGODB_URI` is set, push that sample data into the database so you
can edit it from the dashboard instead:

```bash
npm run seed
```

## 5. Add your real content

- Replace `public/images/profile.jpg` with your real photo
- Drop your resume as `public/resume.pdf` (the Hero button already links to `/resume.pdf`)
- Edit `lib/data.ts` — name, tagline, skills, education, social links, seed projects
- Manage/replace projects any time from `/dashboard/projects` once logged in

## 6. Deploy (Vercel — same app handles frontend + backend)

```bash
npm i -g vercel
vercel
```

In the Vercel project settings → Environment Variables, paste in everything
from your `.env.local`. That's it — no separate server to host, the `app/api/*`
routes run as serverless functions on the same deployment.

## Tech stack

- **Framework:** Next.js 14 (App Router, Route Handlers as the backend)
- **Styling:** Tailwind CSS + CSS variables for dark/light theme
- **Animation:** Framer Motion + a custom cursor-glow component
- **Icons:** lucide-react
- **Database:** MongoDB + Mongoose (projects, contact messages)
- **Email:** Nodemailer (contact form)
- **Auth:** JWT in an httpOnly cookie, single admin account, `middleware.ts`
  protects everything under `/dashboard`
