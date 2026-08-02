import { NextResponse } from 'next/server';

export async function GET() {
  const oauthConfig = {
    issuer: 'https://growthindonesia.my.id',
    authorization_endpoint: 'https://growthindonesia.my.id/oauth/authorize',
    token_endpoint: 'https://growthindonesia.my.id/oauth/token',
    registration_endpoint: 'https://growthindonesia.my.id/oauth/register',
    revocation_endpoint: 'https://growthindonesia.my.id/oauth/revoke',
    introspection_endpoint: 'https://growthindonesia.my.id/oauth/introspect',
    jwks_uri: 'https://growthindonesia.my.id/.well-known/http-message-signatures-directory',
    response_types_supported: ['code', 'token'],
    grant_types_supported: [
      'authorization_code',
      'client_credentials',
      'refresh_token',
      'urn:ietf:params:oauth:grant-type:jwt-bearer',
    ],
    token_endpoint_auth_methods_supported: [
      'client_secret_basic',
      'client_secret_post',
      'private_key_jwt',
    ],
    scopes_supported: ['api:read', 'api:write'],
    code_challenge_methods_supported: ['S256'],
    agent_auth: {
      skill: 'https://isitagentready.com/.well-known/agent-skills/auth-md/SKILL.md',
      register_uri: 'https://growthindonesia.my.id/oauth/register',
      auth_md_uri: 'https://growthindonesia.my.id/auth.md',
      identity_types_supported: ['identity_assertion', 'anonymous', 'agent', 'user', 'organization'],
      supported_identity_types: ['identity_assertion', 'anonymous', 'agent', 'user', 'organization'],
      credential_types_supported: ['client_credentials', 'jwt_bearer', 'http_signature', 'bearer_token', 'api_key'],
      supported_credential_types: ['client_credentials', 'jwt_bearer', 'http_signature', 'bearer_token', 'api_key'],
      identity_assertion: {
        assertion_types_supported: [
          'urn:ietf:params:oauth:token-type:id-jag',
          'verified_email',
        ],
        credential_types_supported: ['bearer_token', 'api_key', 'client_credentials'],
      },
      anonymous: {
        credential_types_supported: ['api_key', 'bearer_token'],
      },
      claim_uri: 'https://growthindonesia.my.id/oauth/claim',
      revocation_uri: 'https://growthindonesia.my.id/oauth/revoke',
      events_supported: ['revocation'],
    },
    service_documentation: 'https://growthindonesia.my.id/docs/api',
  };

  return NextResponse.json(oauthConfig, {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=86400, s-maxage=604800',
    },
  });
}
