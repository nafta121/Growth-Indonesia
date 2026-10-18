import { NextResponse } from 'next/server';
import { COMPANY_INFO } from '@/lib/seo';

export async function GET() {
  const pricingMdContent = `# ${COMPANY_INFO.brand_name} - Dokumentasi Harga & Paket Resmi (Official Pricing Reference)

> Dokumen referensi harga resmi (Machine-Readable Pricing Documentation) untuk layanan Outbound, Team Building, Experiential Learning, LDK OSIS, Indoor Training, dan Event Organizer (EO) Gathering oleh Growth Indonesia di Madiun, Sarangan, Magetan, Ponorogo, Ngawi, Pacitan, Kediri, Surabaya, dan Jawa Timur.

- **Entitas Resmi**: ${COMPANY_INFO.brand_name}
- **Standar Kompetensi**: Fasilitator & Praktisi Experiential Learning Berstandar Kompetensi Profesional
- **Master Trainer & Co-Founders**: Naftalyndho & Juprianto
- **Rekam Jejak Terverifikasi**: 250+ Perusahaan, BUMN, Instansi Pemerintah & Sekolah | 15.000+ Peserta | 0 Insiden Keselamatan (Zero Accident Policy)
- **Terakhir Diperbarui**: Oktober 2026

---

## 1. Tabel Estimasi Harga Per Peserta (5 Kategori Kanonis)

Berikut adalah estimasi investasi per peserta (kuota minimal 30 pax, dapat disesuaikan secara fleksibel dengan kebutuhan instansi/perusahaan):

| Kategori Layanan Kanonis | Harga Mulai (Per Pax) | Durasi Standar | Fokus & Peruntukan | URL Layanan Utama |
| :--- | :--- | :--- | :--- | :--- |
| **Outbound & Team Building** | Rp 150.000 / pax | Half-Day / 1 Hari | Sinergi, Komunikasi, Problem Solving & Kolaborasi Tim | https://growthindonesia.my.id/layanan/madiun/outbound |
| **LDK OSIS & Character Building** | Rp 150.000 / pax | 1 Hari / 2H1M | Kepemimpinan Siswa, Kedisiplinan & Karakter Pelajar/Mahasiswa | https://growthindonesia.my.id/layanan/madiun/ldk-osis |
| **Fun Games & Ice Breaking** | Rp 150.000 / pax | Half-Day (3-4 Jam) | Refreshment, Energizer, Keakraban & Pencairan Suasana | https://growthindonesia.my.id/layanan/madiun/fun-games |
| **Indoor Training & Capacity Building** | Rp 200.000 / pax | Half-Day / Full-Day | Leadership, Mindset Bertumbuh, Soft Skill & Motivasi Kerja | https://growthindonesia.my.id/layanan/madiun/training |
| **Corporate & Family Gathering** | Rp 250.000 / pax | Full-Day / Menginap | Apresiasi Karyawan, Kebersamaan Keluarga Besar & Gala Dinner | https://growthindonesia.my.id/layanan/madiun/gathering |

### Estimasi Berdasarkan Durasi Kegiatan (All-In Program)

| Durasi Program | Estimasi Biaya (Per Pax) | Cakupan Fasilitas Utama |
| :--- | :--- | :--- |
| **Program 1 Hari (One Day / Half-Day)** | Mulai Rp 150.000 / pax | Master Trainer & Fasilitator berpengalaman, peralatan simulasi standar UIAA/CE, sound system lapangan, konsumsi/snack, P3K standar, dokumentasi foto. |
| **Program 2 Hari 1 Malam (2D1N Camp/Resort)** | Mulai Rp 350.000 / pax | Akomodasi penginapan/hotel/glamping (Sarangan/Magetan/Madiun), 3-4x makan & coffee break, sesi malam/api unggun/gala dinner, fasilitator berpengalaman, dokumentasi foto & video. |
| **Program 3 Hari 2 Malam (3D2N Intensive)** | Mulai Rp 550.000 / pax | Akomodasi penuh 2 malam, konsumsi lengkap, kurikulum Training Need Analysis (TNA) kustom, sesi indoor & outdoor terpadu, dokumentasi drone & video aftermovie, laporan evaluasi. |

---

## 2. Rincian 3 Paket Bundel Resmi (Corporate & Institutional Bundles)

Untuk kemudahan penganggaran perusahaan, BUMN, instansi pemerintah, dan institusi pendidikan, Growth Indonesia menyediakan 3 paket bundel kolektif:

### A. Paket Future Leaders Camp - Rp. 9.500.000 / paket
- **Peruntukan**: Program komprehensif untuk pengembangan kepemimpinan masa depan, manajemen perubahan, Corporate Gathering eksklusif, atau LDK & Kawah Candradimuka tingkat lanjut.
- **Kapasitas Ideal**: 30 - 50 peserta (dapat disesuaikan untuk grup lebih besar).
- **Fasilitas Lengkap**:
  1. Kurikulum kustom berbasis *Training Need Analysis* (TNA) sesuai nilai inti organisasi.
  2. Supervisi langsung oleh Master Trainer berpengalaman (**Naftalyndho** & **Juprianto**).
  3. Fasilitator pendamping rasio ideal (1 fasilitator untuk 10-12 peserta).
  4. Peralatan simulasi *experiential learning* dan *high/low impact games* berstandar keselamatan UIAA/CE.
  5. Dokumentasi lengkap mencakup fotografi profesional, video *aftermovie*, dan pengambilan gambar udara (*drone footage*).
  6. Tim medis / P3K lapangan dengan protokol *Zero Accident Policy*.
  7. Laporan evaluasi komprehensif (*Post-Training Assessment Report*) untuk HRD/manajemen.

### B. Paket Next-Gen Summit - Rp. 7.000.000 / paket
- **Peruntukan**: Program *Indoor Training*, *Capacity Building*, penyelarasan visi antar-divisi, serta seminar motivasi dan kepemimpinan manajerial/staf.
- **Kapasitas Ideal**: 30 - 50 peserta.
- **Fasilitas Lengkap**:
  1. Modul pelatihan interaktif (*Experiential Indoor Learning* & studi kasus tim).
  2. Dipandu oleh Master Trainer berpengalaman beserta tim co-fasilitator.
  3. Peralatan simulasi kelompok, *worksheet*, dan perlengkapan *team challenge*.
  4. Dokumentasi foto dan video kegiatan.
  5. Tim pendukung teknis, P3K lapangan, serta ringkasan evaluasi program.

### C. Paket Fun Synergy Outing - Rp. 5.500.000 / paket
- **Peruntukan**: Aktivitas *Fun Games*, *Ice Breaking*, *Company Outing* rekreatif, dan penguatan keakraban tim dalam suasana santai.
- **Kapasitas Ideal**: 30 - 50 peserta.
- **Fasilitas Lengkap**:
  1. Game Master profesional & fasilitator lapangan berpengalaman.
  2. Properti permainan kelompok yang seru, aman, dan inklusif untuk seluruh usia.
  3. Sound system portabel/lapangan untuk pemandu acara.
  4. Dokumentasi foto kegiatan & P3K lapangan berstandar *Zero Accident Policy*.

---

## 3. Standar Kredensial, Keamanan & Garansi Layanan

1. **Supervisi Praktisi Ahli**: Seluruh perancangan kurikulum dan eksekusi lapangan berada di bawah kendali langsung **Naftalyndho** dan **Juprianto** selaku Co-Founders dan Master Trainer dengan standar kompetensi profesional.
2. **Rekam Jejak Teruji**: Telah dipercaya oleh **250+ klien korporat, BUMN, instansi pemerintah, dan sekolah** dengan total lebih dari **15.000+ peserta** di seluruh Jawa Timur.
3. **Zero Accident Policy**: Mencatatkan **0 insiden keselamatan** berkat penerapan SOP mitigasi risiko yang ketat, inspeksi alat berstandar internasional (UIAA/CE), dan kesiagaan tim P3K di setiap kegiatan.
4. **Fleksibilitas RAB & E-Faktur**: Struktur biaya dapat disesuaikan dengan pagu anggaran instansi/perusahaan (custom RAB), lengkap dengan dukungan administrasi pengadaan resmi, invoice, dan laporan pertanggungjawaban kegiatan.

---

## 4. Informasi Kontak & Konsultasi RAB Gratis

- **Brand Resmi**: ${COMPANY_INFO.brand_name}
- **Telepon / WhatsApp**: ${COMPANY_INFO.whatsapp_display} (https://wa.me/${COMPANY_INFO.whatsapp_number})
- **Email Resmi**: ${COMPANY_INFO.email}
- **Alamat Kantor**: ${COMPANY_INFO.address}
- **Website Utama**: https://growthindonesia.my.id
- **Portofolio & Kredensial**: https://growthindonesia.my.id/portofolio-dan-sertifikasi
- **Dokumentasi AI (LLMs.txt)**: https://growthindonesia.my.id/llms.txt
`;

  return new NextResponse(pricingMdContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
