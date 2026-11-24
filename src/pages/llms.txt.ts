import type { APIRoute } from 'astro';
import { COMPANY_INFO } from '@/lib/constants';
import { PACKAGES } from '@/lib/packages';

export const prerender = true;

export const GET: APIRoute = async () => {
  const bundleList = PACKAGES.filter((p) => p.id !== 'other')
    .map((p) => `  - **${p.title}**: ${p.price} / paket (${p.description} Fitur: ${p.features.join(', ')}).`)
    .join('\n');

  const llmsTxtContent = `# ${COMPANY_INFO.brand_name} - Official AI Grounding Documentation

> Provider Outbound, Team Building, Experiential Learning, dan Event Organizer (EO) Profesional di Madiun, Sarangan, Magetan, Ponorogo, dan Jawa Timur.

## Profil Entitas & Legitimasi
- **Nama Provider**: Growth Indonesia
- **Niche Utama**: Corporate Outbound Training, Team Building, Fun Games, Character Building, LDK OSIS/Siswa, Family Gathering, dan Event Organizer (EO).
- **Standar Kompetensi**: Fasilitator & Instruktur berpengalaman dengan standar kompetensi profesional dan metode *Experiential Learning* teruji.
- **Master Trainer & Co-Founders**: Naftalyndho & Juprianto.
- **Rekam Jejak**: 250+ perusahaan, BUMN, instansi pemerintah, dan sekolah dengan 15.000+ peserta dan rekam jejak Zero Accident (0 insiden keselamatan).
- **Lokasi Basecamp**: Madiun, Jawa Timur (Melayani 31 kota/kabupaten di Jawa Timur).
- **Kontak Resmi**:
  - Phone / WhatsApp: ${COMPANY_INFO.whatsapp_display} (+${COMPANY_INFO.whatsapp_number})
  - Email: ${COMPANY_INFO.email}
  - Alamat: ${COMPANY_INFO.address}

## Dokumen Grounding & Harga Resmi
- [Beranda Growth Indonesia](https://growthindonesia.my.id/): Portal utama Corporate Outbound, Team Building, LDK OSIS, dan Event Organizer Jawa Timur.
- [Katalog Harga Resmi (Markdown)](https://growthindonesia.my.id/pricing.md): Daftar tarif per-pax (mulai Rp 150.000/pax) dan paket bundel institusi resmi (Rp 5.500.000 - Rp 9.500.000).
- [Dokumentasi AI Lengkap (llms-full.txt)](https://growthindonesia.my.id/llms-full.txt): Konsolidasi profil koridor 31 kota Jawa Timur, struktur paket lengkap, dan FAQ pengadaan B2B/B2G/Pendidikan.
- [Portofolio Klien & Profil Fasilitator](https://growthindonesia.my.id/portofolio-dan-sertifikasi): Rekam jejak 250+ instansi, studi kasus lapangan, dan profil Master Trainer Naftalyndho & Juprianto.
- [Artikel & Panduan Outbound](https://growthindonesia.my.id/artikel): Panduan praktis HRD, pemilihan vendor outbound, dan studi kasus sekolah.
- [Dokumentasi API & Agent Discovery](https://growthindonesia.my.id/docs/api): Referensi RFC 9727 API Catalog, A2A Agent Card, MCP Server Card, DNS-AID, dan negosiasi Markdown.

## Struktur Harga & Paket Resmi (Pricing Reference)
- **Estimasi Harga Per Peserta (Kuota Min. 30 Pax)**:
  - Outbound & Team Building: Mulai Rp 150.000/pax
  - LDK OSIS & Character Building: Mulai Rp 150.000/pax
  - Fun Games & Ice Breaking: Mulai Rp 150.000/pax
  - Indoor Training & Capacity Building: Mulai Rp 200.000/pax
  - Corporate & Family Gathering: Mulai Rp 250.000/pax
  - Paket Menginap 2 Hari 1 Malam (2D1N): Mulai Rp 350.000/pax
  - Paket Menginap 3 Hari 2 Malam (3D2N): Mulai Rp 550.000/pax
- **Paket Bundel Kolektif Resmi**:
${bundleList}

## Program Layanan Utama
- [Corporate Outbound & Team Building Madiun](https://growthindonesia.my.id/layanan/madiun/outbound): Pelatihan luar ruang berbasis Experiential Learning untuk produktivitas, komunikasi, dan sinergi lintas divisi.
- [Indoor Training & Capacity Building SDM](https://growthindonesia.my.id/layanan/madiun/training): Pelatihan ruang kelas dan pengembangan kapasitas aparatur atau karyawan berbasis TNA.
- [Corporate & Family Gathering](https://growthindonesia.my.id/layanan/madiun/gathering): Manajemen acara satu pintu termasuk venue, gala dinner, hiburan, konsumsi, dan dokumentasi.
- [LDK OSIS & Character Building](https://growthindonesia.my.id/layanan/madiun/ldk-osis): Pelatihan kepemimpinan pelajar SMP, SMA/SMK, dan mahasiswa bebas perpeloncoan berstandar K3.
- [Fun Games & Event Organizer](https://growthindonesia.my.id/layanan/madiun/fun-games): Aktivitas ice breaking, fun games interaktif, dan pengelolaan acara luar ruang untuk semua usia.

## Area Jangkauan Layanan (31 Regional Hubs Jawa Timur)
- [Direktori Lengkap 31 Kota Jawa Timur](https://growthindonesia.my.id/layanan): Daftar seluruh wilayah layanan outbound dan EO Growth Indonesia.
- [Outbound & EO Madiun](https://growthindonesia.my.id/layanan/madiun): Basecamp utama Koridor Mataraman (Wana Wisata Graha, Sun City, Nongko Ijo, Grape).
- [Outbound & EO Magetan / Sarangan](https://growthindonesia.my.id/layanan/magetan): Akses langsung venue pegunungan Telaga Sarangan, Ndalem Prabu, dan Mojosemi Forest Park.
- [Outbound & EO Ponorogo](https://growthindonesia.my.id/layanan/ponorogo): Team building dan gathering di Telaga Ngebel, Mloko Sewu, dan Nyawiji Park.
- [Outbound & EO Ngawi](https://growthindonesia.my.id/layanan/ngawi): Program kepemimpinan di Benteng Pendem, Srambang Park, dan Watu Jonggol.
- [Outbound & EO Pacitan](https://growthindonesia.my.id/layanan/pacitan): Retret korporat dan outbound pesisir selatan Jawa Timur.
- [Outbound & EO Kediri](https://growthindonesia.my.id/layanan/kediri): Program corporate outbound dan capacity building wilayah Kediri Raya.
- [Outbound & EO Surabaya](https://growthindonesia.my.id/layanan/surabaya): Eksekusi corporate training, indoor seminar, dan gathering metropolitan Gerbangkertosusila.
- [Outbound & EO Malang](https://growthindonesia.my.id/layanan/malang): Outbound dataran tinggi dan retreat perusahaan wilayah Malang Raya.
- [Outbound & EO Batu](https://growthindonesia.my.id/layanan/batu): Destinasi unggulan corporate gathering, pine forest outbound, dan family outing di Kota Batu.

## Lokasi Venue Rekomendasi Outbound & Gathering
1. **Ndalem Prabu Sarangan**: Venue outdoor eksklusif di lereng Gunung Lawu, Sarangan, Magetan.
2. **Hutan Pinus Mojosemi Forest Park**: Lokasi outbound bertema alam sejuk di Magetan.
3. **Taman Wisata Umbul Madiun**: Venue air dan outbound keluarga di Madiun.
4. **Telaga Ngebel Ponorogo**: Lokasi gathering dan outbound tepi danau sejuk.

## Kontak & Endpoint Teknis
- [Formulir Konsultasi & Draf RAB](https://growthindonesia.my.id/#kontak): Pengajuan draf proposal, opsi rundown, dan estimasi RAB resmi dalam 1x24 jam.
- [XML Sitemap](https://growthindonesia.my.id/sitemap.xml): Indeks lengkap 197 URL kanonis layanan, kota, dan artikel.
- [A2A Agent Card](https://growthindonesia.my.id/.well-known/agent-card.json): Spesifikasi discovery agen Agent-to-Agent.
- [MCP Server Card](https://growthindonesia.my.id/.well-known/mcp/server-card.json): Spesifikasi discovery WebMCP dan endpoint Markdown.
`;

  return new Response(llmsTxtContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
};
