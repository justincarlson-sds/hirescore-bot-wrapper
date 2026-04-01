import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json({
    ok: true,
    route: '/api/hirescore/prefill',
    fields: {
      firstName: 'Jamie',
      lastName: 'Applicant',
      email: 'jamie@example.com',
    },
    source: 'mock-data',
  });
}
