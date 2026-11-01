# Xibra Web

Public portfolio and private dashboard for **Xibra Platform**, a personal digital ecosystem.

> Status: early development. Scaffolding and foundation only.

## Overview

Xibra Web is the frontend of Xibra Platform. It has two parts:

- **Public site** (`/`): a single-page portfolio and CV, generated as static pages.
- **Private dashboard** (`/dashboard`): personal tasks, schedules, and finance views, available only to the owner after login.

The site does not contain business logic. All data comes from **Xibra API** (Laravel, `/api/v1`).

## Tech stack

- Nuxt 4 with Vue 3 and TypeScript
- Tailwind CSS
- Pinia for client state (auth user and session status)
- Nuxt server routes as a proxy to Xibra API

## Authentication

- The login form calls `POST /api/v1/auth/login` through a Nuxt server route.
- The API token is stored in an **httpOnly cookie**, so browser JavaScript cannot read it.
- The dashboard is protected by route middleware. Unauthenticated users are redirected to `/auth/login`.
- There is no public registration. The owner account is created on the API side with a seeder.

The login route is not hidden. Protection comes from API rate limiting, account lockout after failed attempts, and the fact that only one account exists.

## Project structure

```
app/
  components/   Reusable UI components
  layouts/      default (public), dashboard (private)
  middleware/   auth route guard
  pages/        index.vue (portfolio), auth/login.vue, dashboard/
  stores/       Pinia stores
  composables/  API helpers
server/
  api/          Proxy routes to Xibra API (token handled here)
public/         Static assets
```

## Requirements

- Node.js 20 or newer
- npm
- Xibra API running locally (default `http://localhost:8000`) or on the VPS

## Setup

```bash
git clone https://github.com/rizky66ibrahim/xibra-web.git
cd xibra-web
npm install
cp .env.example .env
npm run dev
```

Open `http://localhost:3000`.

## Environment variables

See `.env.example`. Values are not committed.

| Variable | Purpose |
| --- | --- |
| `XIBRA_API_BASE` | Base URL of Xibra API, used by server routes only |
| `NUXT_PUBLIC_SITE_URL` | Public site URL, for metadata |

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run generate` | Static generation for the public site |
| `npm run preview` | Preview the production build locally |

## Deployment

Planned flow: local development, then commit, then push to GitHub, then pull on the VPS, then build and verify in production. The VPS is for production only, not for development.

## License

Private project. The UI template used as a starting point is subject to its own license and is not redistributed in this repository.
