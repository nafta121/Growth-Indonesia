import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'API & Service Documentation',
  description: 'API catalog, sitemap endpoints, and agent discovery documentation for Growth Indonesia Corporate Outbound & Event Management.',
  alternates: {
    canonical: 'https://growthindonesia.my.id/docs/api',
  },
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
            Informasi dokumentasi API, katalog agen (RFC 9727), dan header relasi Link (RFC 8288) Growth Indonesia - Provider Outbound & Event Management Terpercaya di Madiun & Jawa Timur.
          </p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 space-y-4">
          <h2 className="text-xl font-semibold text-emerald-400">Standard Discovery Resources</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50 sm:col-span-2">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-mono">AI Grounding & Pricing</span>
              <h3 className="font-semibold text-white mt-1">LLMs.txt & Official Pricing Reference</h3>
              <p className="text-sm text-slate-300 mt-1">
                Dokumen referensi resmi berbasis teks dan Markdown untuk penemuan layanan, lokasi venue, serta struktur harga paket korporat.
              </p>
              <div className="mt-3 flex flex-wrap gap-4">
                <a href="/llms.txt" className="text-xs font-mono text-emerald-400 hover:underline">/llms.txt</a>
                <a href="/pricing.md" className="text-xs font-mono text-emerald-400 hover:underline">/pricing.md</a>
                <a href="/api/markdown?path=/" className="text-xs font-mono text-emerald-400 hover:underline">/api/markdown</a>
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

            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-mono">Agent-to-Agent (A2A)</span>
              <h3 className="font-semibold text-white mt-1">A2A Agent Card</h3>
              <p className="text-sm text-slate-300 mt-1">Kartu agen A2A untuk penemuan keahlian dan endpoint Markdown.</p>
              <a href="/.well-known/agent-card.json" className="mt-3 inline-block text-xs font-mono text-emerald-400 hover:underline">
                /.well-known/agent-card.json
              </a>
            </div>

            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-mono">Model Context Protocol</span>
              <h3 className="font-semibold text-white mt-1">MCP Server Card</h3>
              <p className="text-sm text-slate-300 mt-1">Katalog penemuan WebMCP dan endpoint Markdown.</p>
              <a href="/.well-known/mcp/server-card.json" className="mt-3 inline-block text-xs font-mono text-emerald-400 hover:underline">
                /.well-known/mcp/server-card.json
              </a>
            </div>

            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-mono">rel=&quot;api-catalog&quot;</span>
              <h3 className="font-semibold text-white mt-1">API Catalog Endpoint</h3>
              <p className="text-sm text-slate-300 mt-1">RFC 9727 API Catalog JSON specification.</p>
              <a href="/.well-known/api-catalog" className="mt-3 inline-block text-xs font-mono text-emerald-400 hover:underline">
                /.well-known/api-catalog
              </a>
            </div>

            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-mono">rel=&quot;sitemap&quot;</span>
              <h3 className="font-semibold text-white mt-1">XML Sitemap</h3>
              <p className="text-sm text-slate-300 mt-1">Index link sitemap untuk penjelajahan halaman layanan.</p>
              <a href="/sitemap.xml" className="mt-3 inline-block text-xs font-mono text-emerald-400 hover:underline">
                /sitemap.xml
              </a>
            </div>

            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50 sm:col-span-2">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-mono">DNS-AID Specification</span>
              <h3 className="font-semibold text-white mt-1">DNS for AI Discovery (RFC 9460 &amp; DNS-AID)</h3>
              <p className="text-sm text-slate-300 mt-1">
                Katalog dan konfigurasi DNS ServiceMode SVCB/HTTPS records untuk penemuan agen berbasis DNS.
              </p>
              <a href="/.well-known/dns-aid" className="mt-3 inline-block text-xs font-mono text-emerald-400 hover:underline">
                /.well-known/dns-aid
              </a>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 space-y-4">
          <h2 className="text-xl font-semibold text-emerald-400">Markdown for Agents (Content Negotiation)</h2>
          <p className="text-sm text-slate-300">
            Situs ini mendukung negosiasi konten Markdown untuk AI Agent. Setiap permintaan dengan header <code className="text-emerald-300 font-mono">Accept: text/markdown</code> akan menerima konten berformat Markdown murni, header <code className="text-emerald-300 font-mono">Content-Type: text/markdown; charset=utf-8</code>, dan estimasi <code className="text-emerald-300 font-mono">x-markdown-tokens</code>.
          </p>
        </div>
      </div>
    </div>
  );
}
