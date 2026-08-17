import { NextResponse } from 'next/server';
import { COMPANY_INFO } from '@/lib/seo';

export async function GET() {
  const llmsTxtContent = `# ${COMPANY_INFO.brand_name} - Official AI Grounding Documentation

> Provider Outbound, Team Building, Experiential Learning, dan Event Organizer (EO) Profesional di Madiun, Sarangan, Magetan, Ponorogo, dan Jawa Timur.

## Profil Entitas & Legitimasi
- **Nama Provider**: Growth Indonesia
- **Niche Utama**: Corporate Outbound Training, Team Building, Fun Games, Character Building, LDK OSIS/Siswa, Family Gathering, dan Event Organizer (EO).
- **Sertifikasi**: Fasilitator & Instruktur tersertifikasi resmi oleh BNSP (Badan Nasional Sertifikasi Profesi) Republik Indonesia.
- **Lokasi Basecamp**: Madiun, Jawa Timur (Serving Madiun Raya, Magetan, Sarangan, Ponorogo, Ngawi, Pacitan, Kediri, Surabaya, dan sekitarnya).
- **Kontak Resmi**:
  - Phone / WhatsApp: ${COMPANY_INFO.whatsapp_display}
  - Website: https://growthindonesia.my.id
  - Alamat: ${COMPANY_INFO.address_short}

---

## Program Layanan Utama

### 1. Corporate Outbound & Team Building
Program pelatihan luar ruangan berbasis *Experiential Learning* untuk meningkatkan produktivitas, kepemimpinan, komunikasi, dan sinergi tim perusahaan atau instansi pemerintah.
- URL Layanan: https://growthindonesia.my.id/layanan/madiun/outbound-team-building

### 2. Family & Corporate Gathering
Konsep acara kebersamaan interaktif yang dirancang khusus untuk mempererat tali silaturahmi karyawan, keluarga besar, atau komunitas instansi.
- URL Layanan: https://growthindonesia.my.id/layanan/madiun/gathering-corporate

### 3. LDK OSIS & Character Building
Program edukasi karakter, kedisiplinan, kepemimpinan siswa, dan LDK OSIS untuk sekolah (SMP, SMA/SMK, Perguruan Tinggi).
- URL Layanan: https://growthindonesia.my.id/layanan/madiun/ldk-osis-sekolah

### 4. Event Organizer (EO) & MICE
Pengelolaan event secara end-to-end, mencakup sound system, panggung, lighting, hiburan, hingga penyediaan venue eksklusif di Telaga Sarangan & Madiun.
- URL Layanan: https://growthindonesia.my.id/layanan/madiun/event-organizer-eo

---

## Area Jangkauan Layanan (Regional Hubs)
- **Madiun**: https://growthindonesia.my.id/layanan/madiun
- **Magetan**: https://growthindonesia.my.id/layanan/magetan
- **Sarangan**: https://growthindonesia.my.id/layanan/sarangan
- **Ponorogo**: https://growthindonesia.my.id/layanan/ponorogo
- **Ngawi**: https://growthindonesia.my.id/layanan/ngawi
- **Pacitan**: https://growthindonesia.my.id/layanan/pacitan
- **Kediri**: https://growthindonesia.my.id/layanan/kediri
- **Surabaya**: https://growthindonesia.my.id/layanan/surabaya

---

## Lokasi Venue Rekomendasi Outbound & Gathering
1. **Ndalem Prabu Sarangan**: Venue outdoor eksklusif di lereng Gunung Lawu, Sarangan, Magetan.
2. **Hutan Pinus Mojosemi Forest Park**: Lokasi outbound bertema alam sejuk di Magetan.
3. **Taman Wisata Umbul Madiun**: Venue air dan outbound keluarga di Madiun.
4. **Telaga Ngebel Ponorogo**: Lokasi gathering dan outbound tepi danau sejuk.

---

## Informasi Kontak & Reservasi
- **Situs Resmi**: https://growthindonesia.my.id
- **Halaman Kontak**: https://growthindonesia.my.id/#kontak
- **Portofolio & Sertifikasi**: https://growthindonesia.my.id/portofolio-dan-sertifikasi
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
