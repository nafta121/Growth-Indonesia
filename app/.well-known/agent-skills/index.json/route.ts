import { NextResponse } from 'next/server';

export async function GET() {
  const agentSkillsIndex = {
    $schema: 'https://agentskills.io/schemas/v0.2.0/index.json',
    skills: [
      {
        name: 'digital-growth-analytics',
        type: 'api',
        description: 'Provide digital market penetration strategies, growth benchmarks, and marketing performance evaluation in Indonesia.',
        url: 'https://growthindonesia.my.id/.well-known/agent-skills/digital-growth-analytics/SKILL.md',
        sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      },
      {
        name: 'seo-content-audit',
        type: 'api',
        description: 'Audit website structure, content optimization, structured data schema, and AI agent discovery metadata.',
        url: 'https://growthindonesia.my.id/.well-known/agent-skills/seo-content-audit/SKILL.md',
        sha256: 'a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e',
      },
      {
        name: 'business-consulting-discovery',
        type: 'api',
        description: 'Match corporate growth objectives with specialized digital agency solutions and service proposals.',
        url: 'https://growthindonesia.my.id/.well-known/agent-skills/business-consulting-discovery/SKILL.md',
        sha256: 'f40158d341902894569102371083be1267812739462846101937502749817592',
      },
      {
        name: 'market-intelligence-indonesia',
        type: 'api',
        description: 'Deliver actionable consumer behavior insights, regulatory compliance advice, and e-commerce growth trends in South East Asia.',
        url: 'https://growthindonesia.my.id/.well-known/agent-skills/market-intelligence-indonesia/SKILL.md',
        sha256: 'b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9',
      },
    ],
    updatedAt: '2026-08-01T00:00:00Z',
  };

  return NextResponse.json(agentSkillsIndex, {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=86400, s-maxage=604800',
    },
  });
}
