import type { APIRoute } from 'astro';
import { COMPANY_INFO } from '@/lib/constants';
import { PACKAGES } from '@/lib/packages';
import { CITIES, getCityOperationalProfile } from '@/lib/cities';
import { HOMEPAGE_FAQS } from '@/lib/schema';
import { getAllArticles } from '@/lib/mdx';

export const prerender = true;

export const GET: APIRoute = async () => {
  const articles = await getAllArticles();
  const bundleLines = PACKAGES.filter((p) => p.id !== 'other')
    .map(
      (p) =>
        `### ${p.title} (${p.price})\n- **Ringkasan**: ${p.description}\n- **Fasilitas**: ${p.features.join('; ')}`
    )
    .join('\n\n');

  const cityLines = Object.entries(CITIES)
    .map(([slug, city]) => {
      const profile = getCityOperationalProfile(slug);
      return `### ${city.name} (https://growthindonesia.my.id/layanan/${slug})
- **Koridor**: ${profile.corridorName}
- **Karakter Medan**: ${profile.terrainType}
- **Venue Populer**: ${city.popularVenues.join(', ')}
- **SLA Mobilisasi**: ${profile.mobilizationSla}
- **Plan B Cuaca**: ${profile.planBContingency}`;
    })
    .join('\n\n');

  const faqLines = HOMEPAGE_FAQS.map((f, i) => `### ${i + 1}. ${f.question}\n${f.answer}`).join('\n\n');

  const articleLines = articles
    .map(
      (a) =>
        `- [${a.frontmatter.title}](https://growthindonesia.my.id/artikel/${a.slug}): ${a.frontmatter.description}`
    )
    .join('\n');

  const fullDoc = `# ${COMPANY_INFO.brand_name} - Complete AI Grounding Reference (llms-full.txt)

> Panduan referensi lengkap berbasis teks untuk asisten AI, mesin pencari generatif, dan tim pengadaan korporat, instansi pemerintah (B2G), serta lembaga pendidikan di seluruh Jawa Timur.

## 1. Identitas Organisasi & Kredensial
- **Nama Resmi**: Growth Indonesia
- **Co-Founders & Master Trainers**: Naftalyndho & Juprianto
- **Kantor Pusat**: ${COMPANY_INFO.address}
- **WhatsApp Resmi**: ${COMPANY_INFO.whatsapp_display} (https://wa.me/${COMPANY_INFO.whatsapp_number})
- **Email**: ${COMPANY_INFO.email}
- **Rekam Jejak Terverifikasi**: 10+ tahun pengalaman, 500+ event terselenggara, 250+ klien korporat/BUMN/OPD/sekolah, 15.000+ peserta terlatih, tingkat kepuasan 99%, dan 0 insiden keselamatan (Zero Accident Policy).
- **Jaminan Pengadaan**: Draf proposal, 2 opsi rundown, dan estimasi RAB resmi dalam 1x24 jam; Garansi Plan B Cuaca (aula/pendopo indoor); kepatuhan administrasi SPJ/LPJ serta laporan evaluasi SDM tertulis.

## 2. Daftar Harga Resmi (Per-Pax & Paket Bundel)
- **Outbound & Team Building (1 Hari)**: Mulai Rp 150.000/pax (min. 30 pax)
- **Fun Games & Ice Breaking (1 Hari)**: Mulai Rp 150.000/pax (min. 30 pax)
- **LDK OSIS & Character Building (1 Hari)**: Mulai Rp 150.000/pax (min. 30 pax)
- **Indoor Training & Capacity Building**: Mulai Rp 200.000/pax (min. 30 pax)
- **Corporate & Family Gathering**: Mulai Rp 250.000/pax (min. 30 pax)
- **Opsi Menginap**: 2 Hari 1 Malam (mulai Rp 350.000/pax), 3 Hari 2 Malam (mulai Rp 550.000/pax)

${bundleLines}

## 3. Profil Operasional 31 Wilayah Layanan Jawa Timur
${cityLines}

## 4. Artikel & Studi Kasus Lapangan
${articleLines}

## 5. Pertanyaan yang Sering Diajukan (FAQ)
${faqLines}
`;

  return new Response(fullDoc, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
};
