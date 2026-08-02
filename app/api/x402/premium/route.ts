import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const paymentProof =
    req.headers.get('x-payment-proof') ||
    req.headers.get('x-payment-token') ||
    req.headers.get('authorization')?.replace(/^x402\s+/i, '');

  if (!paymentProof) {
    const paymentRequirement = {
      error: 'Payment Required',
      message: 'Access to Growth Indonesia Premium Market Intelligence requires x402 micropayment.',
      x402: {
        version: '1.0',
        amount: '0.10',
        currency: 'USDC',
        network: 'base',
        recipient: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
        facilitator: 'https://x402.org/facilitator',
        description: 'Premium Growth Analytics & Competitor Intelligence API Access',
        tokenUrl: 'https://growthindonesia.my.id/api/x402/token',
      },
    };

    return NextResponse.json(paymentRequirement, {
      status: 402,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'X-Payment-Required': 'true',
        'X-402-Payment-Requirements': JSON.stringify(paymentRequirement.x402),
        'WWW-Authenticate': 'x402 realm="Growth Indonesia Premium API", facilitator="https://x402.org/facilitator"',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-store',
      },
    });
  }

  // Payment proof present: Return premium report
  return NextResponse.json(
    {
      status: 'success',
      paid: true,
      data: {
        title: 'Premium Indonesian Outbound & Growth Intelligence 2026',
        marketShare: '42.5%',
        keyTrends: [
          'Rising demand for Experiential Leadership Training in East Java',
          'High conversion for outbound packages in Madiun, Batu, & Sarangan',
          'Search volume increase for LDK OSIS & Character Building +34% YoY',
        ],
        topGrowthCities: ['Madiun', 'Surabaya', 'Malang', 'Kediri', 'Ponorogo', 'Ngawi'],
        recommendedStrategies: [
          'Target corporate HR managers with integrated team building + capacity workshops',
          'Deploy AI-ready structured schema for local SEO visibility across all East Java regencies',
        ],
      },
    },
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
      },
    }
  );
}

export async function POST(req: NextRequest) {
  return GET(req);
}
