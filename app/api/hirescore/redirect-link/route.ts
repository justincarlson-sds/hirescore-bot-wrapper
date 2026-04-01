import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json({
    ok: true,
    route: '/api/hirescore/redirect-link',
    redirectUrl: 'https://example.com/mock-hire-score-redirect',
    expiresAt: '2099-01-01T00:00:00.000Z',
  });
}
