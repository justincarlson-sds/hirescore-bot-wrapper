import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json({
    ok: true,
    route: '/api/hirescore/init-session',
    sessionId: 'mock-session-123',
    applicantId: 'mock-applicant-456',
    expiresInMinutes: 30,
  });
}
