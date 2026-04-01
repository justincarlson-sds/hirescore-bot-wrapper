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
        <p className="supporting-text">
          Your assistant session is prepared on page load and embedded below once the signed bot
          URL is available.
        </p>

        <div className="debug-inline">
          <span className="debug-label">cycle_id</span>
          <code className="debug-value">{initialCycleId || 'not provided'}</code>
        </div>

        <section className="embed-card">
          <div className="embed-header">
            <div>
              <p className="placeholder-label">Bot Embed</p>
              <h2>Applicant assistant panel</h2>
            </div>
            {botData?.signed_url ? (
              <code className="embed-url">{botData.signed_url}</code>
            ) : null}
          </div>

          {isLoading ? (
            <div className="embed-loading" aria-live="polite">
              <div className="loading-spinner" aria-hidden="true" />
              <p>Initializing the assistant...</p>
            </div>
          ) : null}

          {!isLoading && error ? (
            <div className="embed-fallback">
              <p className="error-text">Mock bot init failed: {error}</p>
            </div>
          ) : null}

          {!isLoading && !error && botData?.signed_url ? (
            <div className="embed-frame-shell">
              <iframe
                className="bot-iframe"
                title="HireScore Applicant Assistant Bot Embed"
                src={botData.signed_url}
              />
            </div>
          ) : null}
        </section>
      </section>
    </main>
  );
}
