type ApplyPageProps = {
  searchParams: Promise<{
    cycle_id?: string | string[];
  }>;
};

export default async function ApplyPage({ searchParams }: ApplyPageProps) {
  const params = await searchParams;
  const rawCycleId = params.cycle_id;
  const cycleId = Array.isArray(rawCycleId) ? rawCycleId[0] : rawCycleId;

  return (
    <main className="page-shell">
      <section className="hero-card">
        <span className="eyebrow">HireScore</span>
        <h1>HireScore Applicant Assistant</h1>
        <p className="cycle-line">
          Testing cycle_id: <strong>{cycleId ?? 'not provided'}</strong>
        </p>

        <div className="placeholder-card">
          <p className="placeholder-label">Assistant Embed</p>
          <h2>MindStudio bot will live here</h2>
          <p className="supporting-text">
            This placeholder keeps the wrapper demo-ready while backend integrations are still mocked.
          </p>
        </div>
      </section>
    </main>
  );
}
