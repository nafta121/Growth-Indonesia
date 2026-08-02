import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'API & Service Documentation | Growth Indonesia',
  description: 'API catalog, sitemap endpoints, and agent discovery documentation for Growth Indonesia.',
};

export default function ApiDocsPage() {
  return (
    <div className="min-h-screen bg-[#0A1628] text-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <Link
            href="/"
            className="text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors mb-4 inline-block"
          >
            &larr; Kembali ke Beranda
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold font-display text-white">
            API & Agent Discovery Documentation
          </h1>
          <p className="mt-2 text-slate-300 text-base">
            Informasi dokumentasi API, katalog agen (RFC 9727), dan header relasi Link (RFC 8288) Growth Indonesia.
          </p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 space-y-4">
          <h2 className="text-xl font-semibold text-emerald-400">Standard Discovery Resources</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50 sm:col-span-2">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-mono">x402 Agent-Native Payment Protocol</span>
              <h3 className="font-semibold text-white mt-1">x402 Payment Required Standard (HTTP 402)</h3>
              <p className="text-sm text-slate-300 mt-1">
                Protokol pembayaran native agen AI untuk akses API berbayar. Mengembalikan status HTTP 402 dengan rincian harga micropayment (USDC / ETH di jaringan Base) serta endpoint terlindungi untuk intelijen pasar.
              </p>
              <div className="mt-3 flex flex-wrap gap-4">
                <a
                  href="/.well-known/x402"
                  className="text-xs font-mono text-emerald-400 hover:underline"
                >
                  /.well-known/x402
                </a>
                <a
                  href="/api/x402/premium"
                  className="text-xs font-mono text-emerald-400 hover:underline"
                >
                  /api/x402/premium (HTTP 402)
                </a>
              </div>
            </div>

            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50 sm:col-span-2">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-mono">WebMCP Standard (W3C Web Machine Learning CG)</span>
              <h3 className="font-semibold text-white mt-1">Client WebMCP Tools API</h3>
              <p className="text-sm text-slate-300 mt-1">
                Implementasi WebMCP melalui <code className="text-emerald-300">navigator.modelContext.provideContext()</code> menyediakan instrumen browser langsung untuk agen AI (kalkulator anggaran, pencarian layanan, cakupan kota, dan konsultasi WhatsApp).
              </p>
              <span className="mt-3 inline-block text-xs font-mono text-emerald-400">
                Client API: navigator.modelContext.provideContext()
              </span>
            </div>

            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50 sm:col-span-2">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-mono">Agent Skills Discovery RFC v0.2.0</span>
              <h3 className="font-semibold text-white mt-1">Agent Skills Index</h3>
              <p className="text-sm text-slate-300 mt-1">
                Indeks penemuan keahlian agen (Agent Skills Discovery RFC v0.2.0) yang menyediakan daftar nama keahlian, tipe, deskripsi, URL spesifikasi SKILL.md, dan nilai hash SHA-256.
              </p>
              <a
                href="/.well-known/agent-skills/index.json"
                className="mt-3 inline-block text-xs font-mono text-emerald-400 hover:underline"
              >
                /.well-known/agent-skills/index.json
              </a>
            </div>

            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50 sm:col-span-2">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-mono">Agent-to-Agent (A2A) Protocol</span>
              <h3 className="font-semibold text-white mt-1">A2A Agent Card (Agent Discovery)</h3>
              <p className="text-sm text-slate-300 mt-1">
                Kartu agen A2A (Agent Card) yang mendeskripsikan kemampuan agen, antarmuka terdistribusi, versi protokol, dan daftar keahlian (skills) untuk penemuan antar agen AI.
              </p>
              <a
                href="/.well-known/agent-card.json"
                className="mt-3 inline-block text-xs font-mono text-emerald-400 hover:underline"
              >
                /.well-known/agent-card.json
              </a>
            </div>

            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50 sm:col-span-2">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-mono">Model Context Protocol</span>
              <h3 className="font-semibold text-white mt-1">MCP Server Card (SEP-1649)</h3>
              <p className="text-sm text-slate-300 mt-1">
                Katalog penemuan server MCP (Model Context Protocol) berisi informasi server, endpoint transport HTTP/SSE, dan kemampuan instrumen.
              </p>
              <a
                href="/.well-known/mcp/server-card.json"
                className="mt-3 inline-block text-xs font-mono text-emerald-400 hover:underline"
              >
                /.well-known/mcp/server-card.json
              </a>
            </div>

            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50 sm:col-span-2">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-mono">Agent Registration Protocol</span>
              <h3 className="font-semibold text-white mt-1">Auth.md Agent Authentication Specification</h3>
              <p className="text-sm text-slate-300 mt-1">
                Protokol registrasi dan autentikasi agen otomatis (Auth.md) berisi panduan kredensial, endpoint klaim, serta tipe identitas yang didukung.
              </p>
              <a
                href="/auth.md"
                className="mt-3 inline-block text-xs font-mono text-emerald-400 hover:underline"
              >
                /auth.md
              </a>
            </div>

            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50 sm:col-span-2">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-mono">OAuth Protected Resource Metadata</span>
              <h3 className="font-semibold text-white mt-1">OAuth Protected Resource (RFC 9728)</h3>
              <p className="text-sm text-slate-300 mt-1">
                Metadata sumber daya terproteksi RFC 9728 yang memberitahu agen URL server otorisasi, scope yang didukung, dan metode token bearer.
              </p>
              <a
                href="/.well-known/oauth-protected-resource"
                className="mt-3 inline-block text-xs font-mono text-emerald-400 hover:underline"
              >
                /.well-known/oauth-protected-resource
              </a>
            </div>

            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-mono">OpenID Connect Discovery</span>
              <h3 className="font-semibold text-white mt-1">OpenID Configuration</h3>
              <p className="text-sm text-slate-300 mt-1">Spesifikasi OIDC 1.0 Discovery untuk autentikasi agen otomatis.</p>
              <a
                href="/.well-known/openid-configuration"
                className="mt-3 inline-block text-xs font-mono text-emerald-400 hover:underline"
              >
                /.well-known/openid-configuration
              </a>
            </div>

            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-mono">OAuth 2.0 Metadata</span>
              <h3 className="font-semibold text-white mt-1">OAuth Authorization Server</h3>
              <p className="text-sm text-slate-300 mt-1">Metadata OAuth 2.0 Server Otorisasi (RFC 8414).</p>
              <a
                href="/.well-known/oauth-authorization-server"
                className="mt-3 inline-block text-xs font-mono text-emerald-400 hover:underline"
              >
                /.well-known/oauth-authorization-server
              </a>
            </div>

            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-mono">rel=&quot;api-catalog&quot;</span>
              <h3 className="font-semibold text-white mt-1">API Catalog Endpoint</h3>
              <p className="text-sm text-slate-300 mt-1">RFC 9727 API Catalog JSON specification.</p>
              <a
                href="/.well-known/api-catalog"
                className="mt-3 inline-block text-xs font-mono text-emerald-400 hover:underline"
              >
                /.well-known/api-catalog
              </a>
            </div>

            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-mono">rel=&quot;sitemap&quot;</span>
              <h3 className="font-semibold text-white mt-1">XML Sitemap</h3>
              <p className="text-sm text-slate-300 mt-1">Index link sitemap untuk penjelajahan halaman layanan.</p>
              <a
                href="/sitemap.xml"
                className="mt-3 inline-block text-xs font-mono text-emerald-400 hover:underline"
              >
                /sitemap.xml
              </a>
            </div>

            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50 sm:col-span-2">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-mono">Web Bot Auth Specification</span>
              <h3 className="font-semibold text-white mt-1">HTTP Message Signatures Directory (JWKS)</h3>
              <p className="text-sm text-slate-300 mt-1">
                Kunci publik JWKS (Web Bot Auth) untuk verifikasi Tanda Tangan Pesan HTTP (HTTP Message Signatures) saat agen melakukan verifikasi identitas bot.
              </p>
              <a
                href="/.well-known/http-message-signatures-directory"
                className="mt-3 inline-block text-xs font-mono text-emerald-400 hover:underline"
              >
                /.well-known/http-message-signatures-directory
              </a>
            </div>

            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50 sm:col-span-2">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-mono">DNS-AID Specification</span>
              <h3 className="font-semibold text-white mt-1">DNS for AI Discovery (RFC 9460 &amp; DNS-AID)</h3>
              <p className="text-sm text-slate-300 mt-1">
                Katalog dan konfigurasi DNS ServiceMode SVCB/HTTPS records untuk penemuan agen berbasis DNS.
              </p>
              <a
                href="/.well-known/dns-aid"
                className="mt-3 inline-block text-xs font-mono text-emerald-400 hover:underline"
              >
                /.well-known/dns-aid
              </a>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 space-y-4">
          <h2 className="text-xl font-semibold text-emerald-400">DNS for AI Discovery (DNS-AID Records)</h2>
          <p className="text-sm text-slate-300">
            Berikut adalah catatan DNS SVCB/HTTPS (RFC 9460) yang dipublikasikan dan disandikan dengan DNSSEC untuk entri agen otomatis:
          </p>
          <pre className="bg-slate-950 p-4 rounded-lg font-mono text-xs text-emerald-300 overflow-x-auto border border-slate-800">
{`_index._agents.growthindonesia.my.id. 3600 IN HTTPS 1 growthindonesia.my.id. alpn="h2,h3" port=443 path="/.well-known/api-catalog"
_a2a._agents.growthindonesia.my.id.   3600 IN HTTPS 1 growthindonesia.my.id. alpn="h2,h3" port=443 path="/docs/api"`}
          </pre>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 space-y-4">
          <h2 className="text-xl font-semibold text-emerald-400">Markdown for Agents (Content Negotiation)</h2>
          <p className="text-sm text-slate-300">
            Situs ini mendukung negosiasi konten Markdown untuk AI Agent. Setiap permintaan dengan header <code className="text-emerald-300 font-mono">Accept: text/markdown</code> akan menerima konten berformat Markdown murni, header <code className="text-emerald-300 font-mono">Content-Type: text/markdown; charset=utf-8</code>, dan estimasi <code className="text-emerald-300 font-mono">x-markdown-tokens</code>.
          </p>
          <pre className="bg-slate-950 p-4 rounded-lg font-mono text-xs text-emerald-300 overflow-x-auto border border-slate-800">
{`GET / HTTP/1.1
Host: growthindonesia.my.id
Accept: text/markdown

HTTP/1.1 200 OK
Content-Type: text/markdown; charset=utf-8
x-markdown-tokens: 280
Vary: Accept`}
          </pre>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 space-y-4">
          <h2 className="text-xl font-semibold text-emerald-400">Content Signals (AI Usage Preferences)</h2>
          <p className="text-sm text-slate-300">
            Situs ini menyatakan preferensi lisensi dan penggunaan AI melalui direktif Content-Signal pada <code className="text-emerald-300 font-mono">/robots.txt</code>:
          </p>
          <pre className="bg-slate-950 p-4 rounded-lg font-mono text-xs text-emerald-300 overflow-x-auto border border-slate-800">
{`Content-Signal: ai-train=no, search=yes, ai-input=yes`}
          </pre>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 space-y-4">
          <h2 className="text-xl font-semibold text-emerald-400">HTTP Response Link Headers (RFC 8288)</h2>
          <p className="text-sm text-slate-300">
            Respon HTTP pada beranda dan seluruh halaman menyertakan header berikut untuk agen otomatis:
          </p>
          <pre className="bg-slate-950 p-4 rounded-lg font-mono text-xs text-emerald-300 overflow-x-auto border border-slate-800">
{`Link: </.well-known/api-catalog>; rel="api-catalog", </docs/api>; rel="service-doc", </sitemap.xml>; rel="sitemap"`}
          </pre>
        </div>
      </div>
    </div>
  );
}
