import { NextResponse } from 'next/server';

export async function GET() {
  const directory = {
    keys: [
      {
        kty: 'OKP',
        crv: 'Ed25519',
        x: 'fA26f7K2bC8A0E4D_GrowthIndonesiaBotKeySampleXValue1234567890',
        use: 'sig',
        alg: 'EdDSA',
        kid: 'growthindonesia-bot-2026-1',
      },
      {
        kty: 'EC',
        crv: 'P-256',
        x: 'W3_growth_indonesia_bot_key_p256_x_val',
        y: 'Y4_growth_indonesia_bot_key_p256_y_val',
        use: 'sig',
        alg: 'ES256',
        kid: 'growthindonesia-bot-2026-2',
      },
    ],
    issuer: 'https://growthindonesia.my.id',
    documentation: 'https://growthindonesia.my.id/docs/api',
  };

  return NextResponse.json(directory, {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
