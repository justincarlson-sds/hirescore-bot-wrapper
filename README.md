# HireScore Applicant Assistant

A minimal Next.js App Router wrapper for a HireScore applicant-assistant flow. The project includes a simple `/apply` page, a server-side MindStudio signed URL initializer, and mock HireScore API endpoints for local demos.

## Requirements

- Node.js 18.18+ or 20+
- npm

## Local development

1. Install dependencies:

```bash
npm install
```

2. Configure environment variables:

```bash
cp .env.example .env.local
```

Set:

- `MINDSTUDIO_API_KEY`
- `MINDSTUDIO_AGENT_ID`

3. Start the development server:

```bash
npm run dev
```

4. Open the demo page:

[http://localhost:3000/apply?cycle_id=test-cycle-001](http://localhost:3000/apply?cycle_id=test-cycle-001)

## API routes

`/api/bot/init` creates a MindStudio signed access URL on the server using your environment variables and returns the URL to the frontend without exposing secrets.

The HireScore routes below still return mock JSON responses via `POST`:

- `/api/hirescore/init-session`
- `/api/hirescore/prefill`
- `/api/hirescore/redirect-link`

## Deploy to Vercel

1. Push this project to a Git repository.
2. Import the repository into Vercel.
3. Add `MINDSTUDIO_API_KEY` and `MINDSTUDIO_AGENT_ID` in the Vercel project environment variables.
4. Use the default build settings for Next.js.
5. Deploy.

This project does not require a database.
