# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Growth Indonesia melayani tiga segmen institusi utama di Jawa Timur dengan prioritas yang setara:

1. **Korporat & BUMN (Komite HRD, People Development, L&D, dan Procurement):** Merancang dan mengadakan program *outbound*, *team building*, *in-house training* SDM, serta *corporate gathering* untuk meningkatkan kohesi tim, kepemimpinan, dan produktivitas organisasi.
2. **Instansi Pemerintah (Pemprov, Pemkab, Dinas, dan Lembaga Publik):** Menyelenggarakan penguatan kapasitas aparatur, rapat kerja, dan pelatihan lapangan yang membutuhkan kepatuhan penuh terhadap administrasi pengadaan, proposal resmi, serta Laporan Pertanggungjawaban (LPJ).
3. **Institusi Pendidikan (Sekolah SMA/SMK dan Universitas):** Menyelenggarakan LDKS (*Latihan Dasar Kepemimpinan Siswa*), *character building*, dan pelatihan kepemimpinan mahasiswa dengan kurikulum terstruktur serta pengawasan keselamatan lapangan yang ketat.

## Product Purpose

Growth Indonesia adalah portal web B2B dan direktori pengadaan layanan *experiential learning*, *outbound training*, pelatihan SDM, LDKS, serta *event organizer* (EO) di Jawa Timur. Produk ini memungkinkan komite pengadaan dan panitia kegiatan untuk mengevaluasi cakupan layanan di 38 kota/kabupaten, memverifikasi lisensi fasilitator dan sertifikasi keselamatan, menghitung estimasi anggaran secara instan, serta menginisiasi konsultasi dan pengajuan proposal resmi melalui WhatsApp atau formulir kontak.

## Positioning

Eksekusi *end-to-end* satu pintu (*single-vendor execution*) untuk empat pilar program utama (*Outbound & Team Building*, *In-House Training SDM*, *LDKS & Character Building*, dan *Event Organizer & Corporate Gathering*) yang menjangkau seluruh 38 kota dan kabupaten di Jawa Timur, didukung oleh fasilitator berstandar kompetensi fasilitasi nasional serta standar keselamatan K3 *Outbound & High Rope* terverifikasi.

## Operating Context

Panitia dan komite pengadaan menggunakan portal ini saat menyusun rencana kegiatan tahunan, membandingkan vendor pelatihan/EO, atau menyiapkan dokumen anggaran internal. Alur kerja utamanya meliputi:

- Menjelajahi direktori kapabilitas layanan berdasarkan kategori program atau lokasi kota/kabupaten di Jawa Timur (`/layanan/[city]/[category]`).
- Menggunakan **Kalkulator Budget B2B** interaktif untuk menyimulasikan estimasi investasi berdasarkan jumlah peserta (*pax*), durasi hari, pilihan lokasi, dan fasilitas tambahan (*add-ons*).
- Memverifikasi bukti legalitas, lisensi standar kompetensi fasilitasi nasional, standar K3, dan rekam jejak klien institusi pada halaman portofolio & sertifikasi.
- Mengirimkan rincian simulasi anggaran atau permintaan proposal teknis (*Request for Proposal*) secara langsung ke konsultan Growth Indonesia melalui WhatsApp (`+62 857-0474-8186`) atau formulir kontak resmi (`info@growthindonesia.my.id`).

## Capabilities and Constraints

- **Arsitektur Web & Runtime:** Dibangun di atas Astro 5 (`output: 'static'` hybrid) dan di-deploy ke Cloudflare Workers (`@astrojs/cloudflare`), menggunakan Tailwind CSS v4 serta komponen pulau interaktif React 19 (`@astrojs/react`) yang dibatasi secara ketat pada 6 pulau interaktif (`navbar-mobile`, `services-tabs`, `outbound-gallery-client`, `our-impact`, `kalkulator-budget`, `contact`).
- **Direktori Programmatic SEO (pSEO):** Menyediakan 186 halaman layanan regional statis yang mencakup 31 hub kota/kabupaten di Jawa Timur × 5 kategori layanan kanonis (`outbound`, `training`, `fun-games`, `ldk-osis`, `gathering`) + 31 halaman hub kota, ditambah pusat artikel edukasi berbasis MDX Content Collections (`src/content/artikel/`).
- **Standar Web Agent-Ready:** Mendukung penemuan dan konsumsi oleh agen AI melalui `/llms.txt`, RFC 9727 API Catalog (`/.well-known/api-catalog`), metadata OAuth/OIDC discovery, MCP Server Card (`/.well-known/mcp/server-card.json`), indeks Agent Skills (`/.well-known/agent-skills/index.json`), JSON-LD terstruktur, endpoint API (`/api/services`, `/api/contact`, `/api/mdx/[slug]`), serta deklarasi WebMCP (`navigator.modelContext.provideContext()`).
- **Disiplin Bahasa:** Seluruh teks antarmuka pengguna ditulis dalam Bahasa Indonesia B2B yang formal, lugas, dan spesifik; penamaan simbol dan struktur kode menggunakan Bahasa Inggris.

## Brand Commitments

- **Identitas & Domisili Operasional:** Growth Indonesia (PT Growth Indonesia), berkantor pusat di Madiun, Jawa Timur, dengan jangkauan operasional penuh di seluruh provinsi Jawa Timur.
- **Karakter Komunikasi:** Berwibawa, terukur secara operasional, transparan dalam rincian pengadaan, dan menempatkan keselamatan peserta serta pencapaian kurikulum sebagai prioritas utama.

## Evidence on Hand

- **Sertifikasi & Lisensi Resmi:** Kompetensi Fasilitator Experiential Learning & Outbound (Standar Kompetensi Fasilitasi Nasional), Sertifikasi K3 Outbound & Manajemen Risiko Lapangan, dan Asesor Kompetensi Metodologi Pelatihan (`src/pages/portofolio-dan-sertifikasi.astro`, `components/credibility-portfolio.tsx`).
- **Portofolio Institusi & Studi Kasus:** Bank Jatim, Pemprov Jatim, Petrokimia Gresik, Universitas Airlangga, PT INKA (Persero), dan SMAN 2 Madiun (`components/clients.tsx`, `components/credibility-portfolio.tsx`, `components/testimonials.tsx`).
- **Aset Visual & Data Regional:** Dokumentasi lapangan asli di `public/images/outbound/`, logo klien di `public/images/clients/`, serta basis data kota dan kategori layanan Jawa Timur di `lib/cities.ts` dan `lib/categories.ts`.
- **Batasan Fakta:** Pekerjaan desain atau konten di masa depan tidak boleh mengarang testimoni, nama klien, nomor sertifikasi, atau klaim harga baru di luar bukti yang telah terverifikasi.

## Product Principles

1. **Kesetaraan Tiga Segmen Institusi:** Layani kebutuhan pengadaan Korporat/BUMN, Instansi Pemerintah, dan Institusi Pendidikan (LDKS/Universitas) dengan bobot prioritas, kejelasan alur, dan relevansi informasi yang setara.
2. **Kemudahan Pengadaan Satu Pintu:** Permudah panitia mengambil keputusan melalui transparansi simulasi anggaran, rincian fasilitas, dan kepastian eksekusi di seluruh 38 kota/kabupaten Jawa Timur.
3. **Kredibilitas Berbasis Bukti:** Utamakan bukti sertifikasi standar kompetensi nasional, prosedur keselamatan K3, metrik jam terbang lapangan, dan portofolio nyata dibandingkan klaim promosi yang generik.
4. **Kecepatan Edge & Keterbacaan Agen:** Jaga pengiriman halaman tetap ringan dengan hidrasi JavaScript minimal sekaligus mempertahankan struktur data dan endpoint yang siap diakses oleh manusia maupun agen AI.

## Accessibility & Inclusion

- Memenuhi standar kontras warna minimum WCAG AA di seluruh permukaan gelap (`navy`) maupun terang (`slate`/`white`).
- Menyediakan dukungan navigasi keyboard penuh (`focus-visible`, *focus trap* pada menu mobile dan *lightbox* galeri, serta *roving tabindex* pada tab layanan).
- Memastikan ukuran target sentuh (*touch targets*) yang memadai lintas perangkat serta menghormati preferensi sistem `prefers-reduced-motion`.
