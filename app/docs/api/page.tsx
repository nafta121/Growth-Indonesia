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
