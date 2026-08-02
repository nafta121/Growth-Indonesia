import { NextResponse } from 'next/server';

export async function GET() {
  const x402Config = {
    $schema: 'https://x402.org/schemas/v1/x402-config.json',
    version: '1.0',
    title: 'Growth Indonesia x402 Agent-Native Payment Protocol',
    description: 'HTTP 402 Payment Required protocol integration for AI agents requesting premium growth intelligence, SEO reports, and corporate analytics.',
    facilitatorUrl: 'https://x402.org/facilitator',
    payToWallet: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    acceptedCurrencies: [
      {
        code: 'USDC',
        network: 'base',
        contractAddress: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
      },
      {
        code: 'ETH',
        network: 'base',
      },
    ],
    pricingTier: {
      standardReportUSD: 0.10,
      deepIntelligenceUSD: 0.50,
    },
    protectedEndpoints: [
      {
        path: '/api/x402/premium',
        method: 'GET',
        costUSD: 0.10,
        description: 'Premium Indonesian Market Intelligence & Growth Strategy Data.',
      },
    ],
    documentationUrl: 'https://growthindonesia.my.id/docs/api',
  };

  return NextResponse.json(x402Config, {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=86400, s-maxage=604800',
    },
  });
}
