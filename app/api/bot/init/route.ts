import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json({
    ok: true,
    route: '/api/bot/init',
    botId: 'mock-bot-001',
    launchMode: 'demo',
    message: 'Mock bot initialization complete.',
  });
}
