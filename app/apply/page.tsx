'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

type BotInitResponse = {
  success: true;
  signed_url: string;
};

const GENERIC_ERROR_MESSAGE =
  'Something went wrong starting your application. Please refresh or try again.';

export default function ApplyPage() {
  return (
    <Suspense fallback={<LoadingShell />}>
      <ApplyPageContent />
    </Suspense>
  );
}

function ApplyPageContent() {
  const searchParams = useSearchParams();
  const cycleId = searchParams.get('cycle_id')?.trim() ?? '';
  const [signedUrl, setSignedUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isActive = true;

    async function initBot() {
      setIsLoading(true);
      setError('');
      setSignedUrl('');

      if (!cycleId) {
        if (isActive) {
          setError(GENERIC_ERROR_MESSAGE);
          setIsLoading(false);
        }

        return;
      }

      try {
        const response = await fetch('/api/bot/init', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            cycle_id: cycleId,
          }),
        });

        if (!response.ok) {
          throw new Error('Bot initialization failed.');
        }

        const data = (await response.json()) as BotInitResponse;

        if (isActive) {
          setSignedUrl(data.signed_url);
        }
      } catch {
        if (isActive) {
          setError(GENERIC_ERROR_MESSAGE);
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
  }, [cycleId]);

  return (
    <PageShell isLoading={isLoading} error={error} signedUrl={signedUrl} />
  );
}

function LoadingShell() {
  return <PageShell isLoading error="" signedUrl="" />;
}

type PageShellProps = {
  isLoading: boolean;
  error: string;
  signedUrl: string;
};

function PageShell({ isLoading, error, signedUrl }: PageShellProps) {
  return (
    <>
      <main className="apply-page">
        <header className="apply-header">
          <div className="brand-lockup">
            <span className="brand-name">HireScore</span>
            <span className="brand-subtitle">Applicant Assistant</span>
          </div>
        </header>

        <section className="apply-content">
          {isLoading ? (
            <div className="status-panel" aria-live="polite">
              <div className="spinner" aria-hidden="true" />
              <p className="status-text">Starting your application...</p>
            </div>
          ) : null}

          {!isLoading && error ? (
            <div className="status-panel">
              <p className="error-text">
                Something went wrong starting your application. Please refresh or try again.
              </p>
            </div>
          ) : null}

          {!isLoading && !error && signedUrl ? (
            <iframe
              className="bot-iframe"
              title="HireScore Applicant Assistant"
              src={signedUrl}
            />
          ) : null}
        </section>
      </main>

      <style jsx>{`
        .apply-page {
          min-height: 100dvh;
          display: flex;
          flex-direction: column;
          background: #f9fafb;
          color: #111827;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        .apply-header {
          display: flex;
          align-items: center;
          min-height: 64px;
          padding: 0 24px;
          background: rgba(255, 255, 255, 0.96);
          border-bottom: 1px solid rgba(61, 189, 255, 0.32);
          box-shadow: 0 1px 2px rgba(17, 24, 39, 0.04);
          backdrop-filter: blur(10px);
        }

        .brand-lockup {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .brand-name {
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: 0.01em;
        }

        .brand-subtitle {
          font-size: 0.75rem;
          color: #4b5563;
        }

        .apply-content {
          flex: 1;
          min-height: calc(100dvh - 64px);
          display: flex;
          background: #f9fafb;
        }

        .status-panel {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16px;
          padding: 32px;
          text-align: center;
        }

        .status-text,
        .error-text {
          margin: 0;
          max-width: 28rem;
          font-size: 1rem;
          line-height: 1.6;
          color: #111827;
        }

        .spinner {
          width: 32px;
          height: 32px;
          border-radius: 9999px;
          border: 3px solid rgba(61, 189, 255, 0.18);
          border-top-color: #3dbdff;
          animation: spin 0.9s linear infinite;
        }

        .bot-iframe {
          width: 100%;
          height: calc(100dvh - 64px);
          border: 0;
          background: #ffffff;
          transition: opacity 180ms ease;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 640px) {
          .apply-header {
            min-height: 60px;
            padding: 0 16px;
          }

          .apply-content {
            min-height: calc(100dvh - 60px);
          }

          .bot-iframe {
            height: calc(100dvh - 60px);
          }
        }
      `}</style>
    </>
  );
}
