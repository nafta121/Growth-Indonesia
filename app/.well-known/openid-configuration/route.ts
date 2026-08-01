import { NextResponse } from 'next/server';

export async function GET() {
  const oidcConfig = {
    issuer: 'https://growthindonesia.my.id',
    authorization_endpoint: 'https://growthindonesia.my.id/oauth/authorize',
    token_endpoint: 'https://growthindonesia.my.id/oauth/token',
    userinfo_endpoint: 'https://growthindonesia.my.id/oauth/userinfo',
    jwks_uri: 'https://growthindonesia.my.id/.well-known/http-message-signatures-directory',
    response_types_supported: ['code', 'token', 'id_token', 'code id_token'],
    grant_types_supported: ['authorization_code', 'client_credentials', 'refresh_token', 'urn:ietf:params:oauth:grant-type:jwt-bearer'],
    subject_types_supported: ['public'],
    id_token_signing_alg_values_supported: ['RS256', 'ES256', 'EdDSA'],
    scopes_supported: ['openid', 'profile', 'email', 'api:read', 'api:write'],
    token_endpoint_auth_methods_supported: ['client_secret_basic', 'client_secret_post', 'private_key_jwt'],
    claims_supported: ['sub', 'iss', 'aud', 'exp', 'iat', 'name', 'email'],
    code_challenge_methods_supported: ['S256'],
    service_documentation: 'https://growthindonesia.my.id/docs/api',
  };

  return NextResponse.json(oidcConfig, {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=86400, s-maxage=604800',
    },
  });
}
