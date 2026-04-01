import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

type BotInitRequest = {
  cycle_id?: string;
};

const MINDSTUDIO_SIGNED_URL_ENDPOINT =
  'https://v1.mindstudio-api.com/developer/v2/generate-signed-access-url';

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as BotInitRequest | null;
  const cycleId = body?.cycle_id?.trim();

  if (!cycleId) {
    return NextResponse.json(
      {
        success: false,
        error: 'cycle_id is required',
      },
      { status: 400 },
    );
  }

  const apiKey = process.env.MINDSTUDIO_API_KEY;
  const agentId = process.env.MINDSTUDIO_AGENT_ID;

  if (!apiKey || !agentId) {
    console.error('MindStudio environment variables are not configured.');

    return NextResponse.json(
      {
        success: false,
        error: 'Unable to initialize the applicant assistant.',
      },
      { status: 500 },
    );
  }

  try {
    const mindStudioResponse = await fetch(MINDSTUDIO_SIGNED_URL_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        agentId,
        userId: `candidate-${cycleId}`,
      }),
    });

    const responseText = await mindStudioResponse.text();
    const responseData = responseText ? (JSON.parse(responseText) as { url?: unknown }) : null;
    const signedUrl =
      responseData && typeof responseData.url === 'string' ? responseData.url : null;

    if (!mindStudioResponse.ok || !signedUrl) {
      console.error('MindStudio signed URL request failed.', {
        status: mindStudioResponse.status,
        body: responseText,
      });

      return NextResponse.json(
        {
          success: false,
          error: 'Unable to initialize the applicant assistant.',
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      signed_url: signedUrl,
    });
  } catch (error) {
    console.error('Unexpected MindStudio init error.', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Unable to initialize the applicant assistant.',
      },
      { status: 500 },
    );
  }
}
