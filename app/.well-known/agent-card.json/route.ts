import { NextResponse } from 'next/server';

export async function GET() {
  const agentCard = {
    $schema: 'https://a2a-protocol.org/schemas/v1/agent-card.json',
    name: 'Growth Indonesia AI Agent',
    version: '1.0.0',
    description: 'Autonomous AI Agent for Growth Indonesia specializing in Corporate Outbound, Team Building, Experiential Leadership Training, Fun Games, and Outdoor Event Management across Madiun and East Java.',
    protocolVersion: '1.0.0',
    supportedInterfaces: [
      {
        url: 'https://growthindonesia.my.id/api/a2a',
        transport: 'HTTP-REST',
        protocol: 'A2A',
      },
      {
        url: 'https://growthindonesia.my.id/api/a2a/jsonrpc',
        transport: 'JSON-RPC',
        protocol: 'A2A',
      },
      {
        url: 'https://growthindonesia.my.id/api/mcp',
        transport: 'MCP-HTTP',
        protocol: 'MCP',
      },
    ],
    capabilities: {
      streaming: true,
      pushNotifications: false,
      asyncProcessing: true,
      interactiveMode: true,
    },
    agent_auth: {
      skill: 'https://growthindonesia.my.id/auth.md',
    },
    skills: [
      {
        id: 'agent_auth',
        name: 'Agent Authentication & Registration Protocol',
        type: 'auth',
        description: 'Authentication, registration, and identity specifications for Growth Indonesia AI Agent via auth.md.',
        url: 'https://growthindonesia.my.id/auth.md',
      },
      {
        id: 'outbound-team-building-consulting',
        name: 'Outbound & Team Building Program Consulting',
        description: 'Provide customized corporate outbound packages, team building modules, and experiential learning itineraries in Madiun and East Java.',
      },
      {
        id: 'leadership-ldk-capacity-building',
        name: 'Leadership & Character Building Training',
        description: 'Design experiential leadership programs, LDK OSIS training for schools, and employee capacity building workshops guided by certified BNSP trainers.',
      },
      {
        id: 'event-venue-coordination-east-java',
        name: 'Outdoor Event & Venue Coordination',
        description: 'Coordinate outdoor event logistics, venue selections (Sarangan, Magetan, Batu, Madiun), and safety protocols following Zero Accident Policy standards.',
      },
      {
        id: 'corporate-gathering-fun-games',
        name: 'Corporate Gathering & Fun Games Organization',
        description: 'Organize tailored corporate gatherings, family days, and engaging fun games designed to strengthen team synergy and morale.',
      },
    ],
    authentication: {
      type: 'oauth2',
      protectedResource: 'https://growthindonesia.my.id/.well-known/oauth-protected-resource',
      authorizationServer: 'https://growthindonesia.my.id/.well-known/oauth-authorization-server',
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
