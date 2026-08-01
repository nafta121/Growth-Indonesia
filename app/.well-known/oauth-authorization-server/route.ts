import { NextResponse } from 'next/server';

export async function GET() {
  const oauthConfig = {
    issuer: 'https://growthindonesia.my.id',
    authorization_endpoint: 'https://growthindonesia.my.id/oauth/authorize',
    token_endpoint: 'https://growthindonesia.my.id/oauth/token',
    jwks_uri: 'https://growthindonesia.my.id/.well-known/http-message-signatures-directory',
    response_types_supported: ['code', 'token'],
    grant_types_supported: ['authorization_code', 'client_credentials', 'refresh_token', 'urn:ietf:params:oauth:grant-type:jwt-bearer'],
    token_endpoint_auth_methods_supported: ['client_secret_basic', 'client_secret_post', 'private_key_jwt'],
    scopes_supported: ['api:read', 'api:write'],
    code_challenge_methods_supported: ['S256'],
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
