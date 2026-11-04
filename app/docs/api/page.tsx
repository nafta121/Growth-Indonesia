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
    <div className="min-h-screen bg-navy text-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <Link
            href="/"
            className="text-brand hover:text-white text-sm font-semibold transition-colors mb-4 inline-block"
          >
            &larr; Kembali ke Beranda
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold font-display text-white">
            Dokumentasi API &amp; Penemuan Agen
          </h1>
          <p className="mt-2 text-navy-muted text-base">
            Katalog agen (RFC 9727) dan referensi endpoint terbuka Growth Indonesia untuk sistem indeksasi dan asisten AI.
          </p>
        </div>

        <div className="bg-navy-2 border border-navy-border rounded-2xl p-6 space-y-4">
          <h2 className="text-xl font-semibold text-white">Sumber Daya Penemuan Standar</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="bg-navy p-5 rounded-xl border border-navy-border sm:col-span-2">
              <h3 className="font-semibold text-white">LLMs.txt &amp; Official Pricing Reference</h3>
              <p className="text-sm text-navy-muted mt-1">
                Dokumen referensi resmi berbasis teks dan Markdown untuk penemuan layanan, lokasi venue, serta struktur harga paket korporat.
              </p>
              <div className="mt-3 flex flex-wrap gap-4">
                <a href="/llms.txt" className="text-xs font-mono text-brand hover:underline">/llms.txt</a>
                <a href="/pricing.md" className="text-xs font-mono text-brand hover:underline">/pricing.md</a>
                <a href="/api/markdown?path=/" className="text-xs font-mono text-brand hover:underline">/api/markdown</a>
              </div>
            </div>

            <div className="bg-navy p-5 rounded-xl border border-navy-border sm:col-span-2">
              <h3 className="font-semibold text-white">Client WebMCP Tools API</h3>
              <p className="text-sm text-navy-muted mt-1">
                Implementasi WebMCP (W3C Web Machine Learning CG) melalui <code className="text-white font-mono">navigator.modelContext.provideContext()</code> menyediakan instrumen browser langsung untuk agen AI (kalkulator anggaran, pencarian layanan, cakupan kota, dan konsultasi WhatsApp).
              </p>
              <span className="mt-3 inline-block text-xs font-mono text-brand">
                Client API: navigator.modelContext.provideContext()
              </span>
            </div>

            <div className="bg-navy p-5 rounded-xl border border-navy-border">
              <h3 className="font-semibold text-white">A2A Agent Card</h3>
              <p className="text-sm text-navy-muted mt-1">Kartu agen Agent-to-Agent (A2A) untuk penemuan keahlian dan endpoint Markdown.</p>
              <a href="/.well-known/agent-card.json" className="mt-3 inline-block text-xs font-mono text-brand hover:underline">
                /.well-known/agent-card.json
              </a>
            </div>

            <div className="bg-navy p-5 rounded-xl border border-navy-border">
              <h3 className="font-semibold text-white">MCP Server Card</h3>
              <p className="text-sm text-navy-muted mt-1">Katalog penemuan Model Context Protocol (MCP) dan endpoint Markdown.</p>
              <a href="/.well-known/mcp/server-card.json" className="mt-3 inline-block text-xs font-mono text-brand hover:underline">
                /.well-known/mcp/server-card.json
              </a>
            </div>

            <div className="bg-navy p-5 rounded-xl border border-navy-border">
              <h3 className="font-semibold text-white">API Catalog Endpoint</h3>
              <p className="text-sm text-navy-muted mt-1">Spesifikasi JSON API Catalog sesuai standar RFC 9727.</p>
              <a href="/.well-known/api-catalog" className="mt-3 inline-block text-xs font-mono text-brand hover:underline">
                /.well-known/api-catalog
              </a>
            </div>

            <div className="bg-navy p-5 rounded-xl border border-navy-border">
              <h3 className="font-semibold text-white">XML Sitemap</h3>
              <p className="text-sm text-navy-muted mt-1">Indeks tautan sitemap untuk penjelajahan halaman layanan dan kota.</p>
              <a href="/sitemap.xml" className="mt-3 inline-block text-xs font-mono text-brand hover:underline">
                /sitemap.xml
              </a>
            </div>

            <div className="bg-navy p-5 rounded-xl border border-navy-border sm:col-span-2">
              <h3 className="font-semibold text-white">DNS for AI Discovery (RFC 9460 &amp; DNS-AID)</h3>
              <p className="text-sm text-navy-muted mt-1">
                Katalog dan konfigurasi DNS ServiceMode SVCB/HTTPS records untuk penemuan agen berbasis DNS.
              </p>
              <a href="/.well-known/dns-aid" className="mt-3 inline-block text-xs font-mono text-brand hover:underline">
                /.well-known/dns-aid
              </a>
            </div>
          </div>
        </div>

        <div className="bg-navy-2 border border-navy-border rounded-2xl p-6 space-y-4">
          <h2 className="text-xl font-semibold text-white">Markdown for Agents (Content Negotiation)</h2>
          <p className="text-sm text-navy-muted">
            Situs ini mendukung negosiasi konten Markdown untuk AI Agent. Setiap permintaan dengan header <code className="text-white font-mono">Accept: text/markdown</code> akan menerima konten berformat Markdown murni, header <code className="text-white font-mono">Content-Type: text/markdown; charset=utf-8</code>, dan estimasi <code className="text-white font-mono">x-markdown-tokens</code>.
          </p>
        </div>
      </div>
    </div>
  );
}
