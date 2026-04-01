'use client';

import { useEffect, useState } from 'react';

type BotInitResponse = {
  success: true;
  signed_url: string;
  launch_variables: {
    cycle_id: string;
    job_title: string;
    company_name: string;
    apply_url: string;
  };
};

type ApplyClientProps = {
  initialCycleId: string;
};

export default function ApplyClient({ initialCycleId }: ApplyClientProps) {
  const [botData, setBotData] = useState<BotInitResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isActive = true;

    async function initBot() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/bot/init', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            cycle_id: initialCycleId,
          }),
        });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = (await response.json()) as BotInitResponse;

        if (isActive) {
          setBotData(data);
        }
      } catch (requestError) {
        if (isActive) {
          setError(
            requestError instanceof Error
              ? requestError.message
              : 'Unable to initialize the mock bot session.',
          );
          setBotData(null);
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    void initBot();

    return () => {
      isActive = false;
    };
  }, [initialCycleId]);

  return (
    <main className="page-shell">
      <section className="hero-card">
        <span className="eyebrow">HireScore</span>
        <h1>HireScore Applicant Assistant</h1>

        <div className="debug-grid">
          <div className="debug-row">
            <span className="debug-label">cycle_id</span>
            <code className="debug-value">{initialCycleId || 'not provided'}</code>
          </div>

          <div className="debug-row">
            <span className="debug-label">signed_url</span>
            <code className="debug-value">
              {botData?.signed_url ?? (isLoading ? 'Loading mock bot init...' : 'Unavailable')}
            </code>
          </div>
        </div>

        <div className="placeholder-card">
          <p className="placeholder-label">Debug Payload</p>
          <h2>MindStudio bot will live here</h2>
          <p className="supporting-text">
            The wrapper is initializing against a mock endpoint for now so the Vercel deploy can
            be demoed without external dependencies.
          </p>

          <div className="debug-panel">
            <p className="json-label">launch_variables</p>
            <pre className="json-block">
              {JSON.stringify(
                botData?.launch_variables ?? {
                  cycle_id: initialCycleId,
                  job_title: '',
                  company_name: '',
                  apply_url: '',
                },
                null,
                2,
              )}
            </pre>
          </div>

          {error ? <p className="error-text">Mock bot init failed: {error}</p> : null}
        </div>
      </section>
    </main>
  );
}
