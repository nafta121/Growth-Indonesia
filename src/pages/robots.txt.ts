import type { APIRoute } from 'astro';

export const prerender = true;

export const GET: APIRoute = async () => {
  const robotsTxt = `User-agent: *
Allow: /
Allow: /_astro/
Allow: /llms.txt
Allow: /pricing.md
Allow: /2c11486128914291876d43ecd6d55580.txt
Disallow: /api/

# 1. Search & AI Citation Crawlers (Google AIO/AI Mode, ChatGPT Search, Claude Search, Perplexity, Apple, Bing)
User-agent: Googlebot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Applebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: meta-webindexer
Allow: /

# 2. User-Triggered AI Browsing Agents
User-agent: ChatGPT-User
Allow: /

User-agent: Claude-User
Allow: /

User-agent: Perplexity-User
Allow: /

# 3. AI Model Training & Grounding Crawlers
User-agent: Google-Extended
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: CCBot
Allow: /

Sitemap: https://growthindonesia.my.id/sitemap.xml
`;

  return new Response(robotsTxt, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Content-Signal': 'ai-train=no, search=yes, ai-input=yes',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
