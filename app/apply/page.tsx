import ApplyClient from './page-client';

type ApplyPageProps = {
  searchParams: Promise<{
    cycle_id?: string | string[];
  }>;
};

export default async function ApplyPage({ searchParams }: ApplyPageProps) {
  const params = await searchParams;
  const rawCycleId = params.cycle_id;
  const cycleId = Array.isArray(rawCycleId) ? rawCycleId[0] : rawCycleId ?? '';

  return <ApplyClient initialCycleId={cycleId} />;
}
