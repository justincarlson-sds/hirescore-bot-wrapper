import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="page-shell">
      <section className="hero-card">
        <span className="eyebrow">HireScore Demo</span>
        <h1>HireScore Applicant Assistant</h1>
        <p className="supporting-text">
          Minimal Next.js wrapper for demoing the assistant flow on Vercel.
        </p>
        <Link className="primary-link" href="/apply?cycle_id=demo-cycle-123">
          Open /apply test page
        </Link>
      </section>
    </main>
  );
}
