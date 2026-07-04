# Shafayat — Portfolio
live Link : https://shafayat-hosan.vercel.app/

Next.js 14 (App Router) portfolio with dark/light mode, Framer Motion animation,
a MongoDB-backed projects system, a nodemailer contact form, and a private admin
dashboard to manage projects — all in **one Next.js app** (no separate backend server).

## Tech stack

- **Framework:** Next.js 14 (App Router, Route Handlers as the backend)
- **Styling:** Tailwind CSS + CSS variables for dark/light theme
- **Animation:** Framer Motion + a custom cursor-glow component
- **Icons:** lucide-react
- **Database:** MongoDB + Mongoose (projects, contact messages)
- **Email:** Nodemailer (contact form)
- **Auth:** JWT in an httpOnly cookie, single admin account, `middleware.ts`
  protects everything under `/dashboard`
