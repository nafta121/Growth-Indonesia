import { NextResponse } from 'next/server';

export async function GET() {
  const agentCard = {
    $schema: 'https://a2a-protocol.org/schemas/v1/agent-card.json',
    name: 'Growth Indonesia AI Agent',
    version: '1.0.0',
    description: 'AI Discovery Card for Growth Indonesia specializing in Corporate Outbound, Team Building, Experiential Leadership Training, Fun Games, and Outdoor Event Management across Madiun and East Java.',
    protocolVersion: '1.0.0',
    supportedInterfaces: [
      {
        url: 'https://growthindonesia.my.id/api/markdown',
        transport: 'HTTP-REST',
        protocol: 'MARKDOWN',
      },
      {
        url: 'https://growthindonesia.my.id/llms.txt',
        transport: 'HTTP-GET',
        protocol: 'LLMS-TXT',
      },
      {
        url: 'https://growthindonesia.my.id/pricing.md',
        transport: 'HTTP-GET',
        protocol: 'MARKDOWN',
      },
    ],
    capabilities: {
      streaming: false,
      pushNotifications: false,
      asyncProcessing: false,
      interactiveMode: true,
    },
    skills: [
      {
        id: 'outbound-team-building-consulting',
        name: 'Outbound & Team Building Program Consulting',
        description: 'Provide customized corporate outbound packages, team building modules, and experiential learning itineraries in Madiun and East Java.',
        url: 'https://growthindonesia.my.id/layanan/madiun/outbound',
      },
      {
        id: 'leadership-ldk-capacity-building',
        name: 'Leadership & Character Building Training',
        description: 'Design experiential leadership programs, LDK OSIS training for schools, and employee capacity building workshops guided by experienced master trainers.',
        url: 'https://growthindonesia.my.id/layanan/madiun/ldk-osis',
      },
      {
        id: 'event-venue-coordination-east-java',
        name: 'Outdoor Event & Venue Coordination',
        description: 'Coordinate outdoor event logistics, venue selections (Sarangan, Magetan, Batu, Madiun), and safety protocols following Zero Accident Policy standards.',
        url: 'https://growthindonesia.my.id/layanan',
      },
      {
        id: 'corporate-gathering-fun-games',
        name: 'Corporate Gathering & Fun Games Organization',
        description: 'Organize tailored corporate gatherings, family days, and engaging fun games designed to strengthen team synergy and morale.',
        url: 'https://growthindonesia.my.id/layanan/madiun/gathering',
      },
    ],
    authentication: {
      type: 'none',
    },
    documentationUrl: 'https://growthindonesia.my.id/docs/api',
  };

  return NextResponse.json(agentCard, {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=86400, s-maxage=604800',
    },
  });
}
