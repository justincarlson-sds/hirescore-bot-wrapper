import { NextResponse } from 'next/server';

type BotInitRequest = {
  cycle_id?: string;
  job_title?: string;
  company_name?: string;
  apply_url?: string;
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as BotInitRequest;

  return NextResponse.json({
    success: true,
    signed_url: 'https://example.com/mock-mindstudio-url',
    launch_variables: {
      cycle_id: body.cycle_id ?? '',
      job_title: body.job_title ?? '',
      company_name: body.company_name ?? '',
      apply_url: body.apply_url ?? '',
    },
  });
}
