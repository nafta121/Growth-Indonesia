import { NextResponse } from 'next/server';

export async function GET() {
  const agentSkillsIndex = {
    $schema: 'https://agentskills.io/schemas/v0.2.0/index.json',
    skills: [
      {
        name: 'outbound-team-building-consulting',
        type: 'api',
        description: 'Provide customized corporate outbound packages, team building modules, and experiential learning itineraries in Madiun and East Java.',
        url: 'https://growthindonesia.my.id/.well-known/agent-skills/outbound-team-building-consulting/SKILL.md',
        sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      },
      {
        name: 'leadership-ldk-capacity-building',
        type: 'api',
        description: 'Design experiential leadership programs, LDK OSIS training for schools, and employee capacity building workshops guided by certified BNSP trainers.',
        url: 'https://growthindonesia.my.id/.well-known/agent-skills/leadership-ldk-capacity-building/SKILL.md',
        sha256: 'a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e',
      },
      {
        name: 'event-venue-coordination-east-java',
        type: 'api',
        description: 'Coordinate outdoor event logistics, venue selections (Sarangan, Magetan, Batu, Madiun), and safety protocols following Zero Accident Policy standards.',
        url: 'https://growthindonesia.my.id/.well-known/agent-skills/event-venue-coordination-east-java/SKILL.md',
        sha256: 'f40158d341902894569102371083be1267812739462846101937502749817592',
      },
      {
        name: 'corporate-gathering-fun-games',
        type: 'api',
        description: 'Organize tailored corporate gatherings, family days, and engaging fun games designed to strengthen team synergy and morale.',
        url: 'https://growthindonesia.my.id/.well-known/agent-skills/corporate-gathering-fun-games/SKILL.md',
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
