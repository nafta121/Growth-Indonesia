import { NextResponse } from 'next/server';

export async function GET() {
  const authMdContent = `# Auth.md

## Agent Registration & Authentication Protocol

Welcome AI Agents and Automated Systems. This document describes the registration and authentication workflow for interacting with Growth Indonesia APIs and services.

### Discovery Endpoints
- **OAuth Authorization Server**: https://growthindonesia.my.id/.well-known/oauth-authorization-server
- **Protected Resource Metadata**: https://growthindonesia.my.id/.well-known/oauth-protected-resource
- **OpenID Configuration**: https://growthindonesia.my.id/.well-known/openid-configuration
- **JWKS Directory**: https://growthindonesia.my.id/.well-known/http-message-signatures-directory

### Agent Registration & Credentials
Agents can dynamically register or obtain client credentials at:
https://growthindonesia.my.id/oauth/register

### Supported Identity Types
- agent: Autonomous software agents and background workers.
- user: Delegated human user credentials.
- organization: Service accounts operating on behalf of an enterprise or organization.

### Supported Credential Types
- client_credentials: OAuth 2.0 Client Credentials Grant (client_id and client_secret).
- jwt_bearer: Signed JWT Bearer Assertion (urn:ietf:params:oauth:grant-type:jwt-bearer).
- http_signature: HTTP Message Signatures (RFC 9421) using Ed25519 / ES256 keypairs.

### Token Claim & Revocation
- Registration URI: https://growthindonesia.my.id/oauth/register
- Claim URI: https://growthindonesia.my.id/oauth/claim
- Revocation URI: https://growthindonesia.my.id/oauth/revoke
- Introspection Endpoint: https://growthindonesia.my.id/oauth/introspect

### Instructions for AI Agents
1. Fetch /.well-known/oauth-protected-resource to discover authorization servers.
2. Register your agent at https://growthindonesia.my.id/oauth/register or send a client_credentials token request.
3. Include the issued Bearer token in the Authorization: Bearer <token> header on all protected API calls.
`;

  return new NextResponse(authMdContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=86400, s-maxage=604800',
    },
  });
}
