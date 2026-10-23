import { NextResponse } from 'next/server';
import { COMPANY_INFO } from '@/lib/constants';
import { PACKAGES } from '@/lib/packages';

export async function GET() {
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
- **Lokasi Basecamp**: Madiun, Jawa Timur (Serving Madiun Raya, Magetan, Sarangan, Ponorogo, Ngawi, Pacitan, Kediri, Surabaya, dan sekitarnya).
- **Kontak Resmi**:
  - Phone / WhatsApp: ${COMPANY_INFO.whatsapp_display} (+${COMPANY_INFO.whatsapp_number})
  - Email: ${COMPANY_INFO.email}
  - Website: https://growthindonesia.my.id
  - Alamat: ${COMPANY_INFO.address}

---

## Struktur Harga & Paket Resmi (Pricing Reference)
- **Referensi Harga Lengkap (Markdown)**: https://growthindonesia.my.id/pricing.md
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

---

## Program Layanan Utama

### 1. Corporate Outbound & Team Building
Program pelatihan luar ruangan berbasis *Experiential Learning* untuk meningkatkan produktivitas, kepemimpinan, komunikasi, dan sinergi tim perusahaan atau instansi pemerintah.
- URL Outbound: https://growthindonesia.my.id/layanan/madiun/outbound
- URL Training: https://growthindonesia.my.id/layanan/madiun/training

### 2. Family & Corporate Gathering
Konsep acara kebersamaan interaktif yang dirancang khusus untuk mempererat tali silaturahmi karyawan, keluarga besar, atau komunitas instansi.
- URL Layanan: https://growthindonesia.my.id/layanan/madiun/gathering

### 3. LDK OSIS & Character Building
Program edukasi karakter, kedisiplinan, kepemimpinan siswa, dan LDK OSIS untuk sekolah (SMP, SMA/SMK, Perguruan Tinggi).
- URL Layanan: https://growthindonesia.my.id/layanan/madiun/ldk-osis

### 4. Fun Games & Event Organizer (EO)
Pengelolaan aktivitas fun games, outbound rekreatif, dan event secara end-to-end mencakup sound system, panggung, lighting, hiburan, hingga penyediaan venue eksklusif di Telaga Sarangan & Madiun.
- URL Layanan: https://growthindonesia.my.id/layanan/madiun/fun-games

---

## Area Jangkauan Layanan (31 Regional Hubs Jawa Timur)
- **Direktori Lengkap 31 Kota**: https://growthindonesia.my.id/layanan
- **Madiun**: https://growthindonesia.my.id/layanan/madiun
- **Magetan (Kawasan Telaga Sarangan)**: https://growthindonesia.my.id/layanan/magetan
- **Ponorogo**: https://growthindonesia.my.id/layanan/ponorogo
- **Ngawi**: https://growthindonesia.my.id/layanan/ngawi
- **Pacitan**: https://growthindonesia.my.id/layanan/pacitan
- **Kediri**: https://growthindonesia.my.id/layanan/kediri
- **Surabaya**: https://growthindonesia.my.id/layanan/surabaya
- **Malang**: https://growthindonesia.my.id/layanan/malang
- **Batu**: https://growthindonesia.my.id/layanan/batu

---

## Lokasi Venue Rekomendasi Outbound & Gathering
1. **Ndalem Prabu Sarangan**: Venue outdoor eksklusif di lereng Gunung Lawu, Sarangan, Magetan.
2. **Hutan Pinus Mojosemi Forest Park**: Lokasi outbound bertema alam sejuk di Magetan.
3. **Taman Wisata Umbul Madiun**: Venue air dan outbound keluarga di Madiun.
4. **Telaga Ngebel Ponorogo**: Lokasi gathering dan outbound tepi danau sejuk.

---

## Informasi Kontak & Reservasi
- **Situs Resmi**: https://growthindonesia.my.id
- **Dokumentasi Harga Resmi**: https://growthindonesia.my.id/pricing.md
- **Halaman Kontak**: https://growthindonesia.my.id/#kontak
- **Portofolio & Kredensial**: https://growthindonesia.my.id/portofolio-dan-sertifikasi
- **Artikel & Studi Kasus**: https://growthindonesia.my.id/artikel
`;

  return new NextResponse(llmsTxtContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
