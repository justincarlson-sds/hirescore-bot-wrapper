# HireScore Applicant Assistant

A minimal Next.js App Router wrapper for a HireScore applicant-assistant demo. The project includes a simple `/apply` page and mock API endpoints so it can be shown without any real HireScore backend services.

## Requirements

- Node.js 18.18+ or 20+
- npm

## Local development

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open the demo page:

[http://localhost:3000/apply?cycle_id=test-cycle-001](http://localhost:3000/apply?cycle_id=test-cycle-001)

## Mock API routes

All routes currently return mock JSON responses via `POST`:

- `/api/bot/init`
- `/api/hirescore/init-session`
- `/api/hirescore/prefill`
- `/api/hirescore/redirect-link`

## Deploy to Vercel

1. Push this project to a Git repository.
2. Import the repository into Vercel.
3. Use the default build settings for Next.js.
4. Deploy.

This project does not require a database or environment variables for the demo build.
