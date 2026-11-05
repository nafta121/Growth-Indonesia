import { ShieldCheck, Award, Users, CheckCircle2, MapPin, Calendar, Building2, GraduationCap, Briefcase, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { COMPANY_INFO } from '@/lib/constants';

export interface Facilitator {
  name: string;
  role: string;
  certification: string;
  certificationBody: string;
  specialization: string[];
}

export interface CaseStudy {
  title: string;
  client: string;
  location: string;
  date: string;
  startDateISO?: string;
  endDateISO?: string;
  participants: string;
  objective: string;
  outcomes: string[];
}

export interface ClientCategory {
  category: string;
  iconName: 'bumn' | 'education' | 'government';
  list: string[];
}

const FACILITATORS: Facilitator[] = [
  {
    name: 'Naftalyndho',
    role: 'Lead Facilitator & Master Trainer',
    certification: 'Kompetensi Fasilitator Experiential Learning & Outbound',
    certificationBody: 'Standar Kompetensi Fasilitasi Nasional',
    specialization: ['Experiential Learning', 'Corporate Capacity Building', 'Executive Leadership Development'],
  },
  {
    name: 'Juprianto',
    role: 'Senior Trainer & Safety Specialist',
    certification: 'Kompetensi Instruktur Outbound & Manajemen Risiko Lapangan',
    certificationBody: 'Standar Kompetensi Keselamatan & Kepelatihan',
    specialization: ['Zero Accident Safety Protocol', 'Outdoor Risk Management', 'Team Synergy & Debriefing'],
  },
];

const CASE_STUDIES: CaseStudy[] = [
  {
    title: 'Kemah Besar & Character Building Outbound',
    client: 'SMP Negeri 1 Geger',
    location: 'Ndalem Prabu Sarangan, Kabupaten Magetan',
    date: '23 Juni 2026',
    startDateISO: '2026-06-23T08:00:00+07:00',
    endDateISO: '2026-06-23T17:00:00+07:00',
    participants: '350+ Siswa & Pengurus OSIS',
    objective: 'Membentuk karakter disiplin, menanamkan nilai nasionalisme, dan mengasah jiwa kepemimpinan generasi muda melalui pendekatan Experiential Learning.',
    outcomes: [
      'Pelaksanaan kegiatan dengan standar **Zero Accident Policy** tanpa insiden keselamatan.',
      'Peningkatan kemampuan komunikasi efektif dan pemecahan masalah (problem solving) antar regu.',
      'Pembentukan mentalitas tangguh dan empati sosial peserta melalui simulasi outdoor learning.',
    ],
  },
  {
    title: 'Corporate Gathering & Capacity Building',
    client: 'Bank Jatim (Kantor Cabang Madiun & Ponorogo)',
    location: 'Kawasan Wisata Telaga Sarangan, Magetan',
    date: '25 Maret 2026',
    startDateISO: '2026-03-25T08:00:00+07:00',
    endDateISO: '2026-03-25T17:00:00+07:00',
    participants: '120 Karyawan & Manajemen',
    objective: 'Mencairkan sekat komunikasi (silokanisasi) antar divisi, membangun kepercayaan (trust building), serta meningkatkan motivasi kerja pasca-periode target tahunan.',
    outcomes: [
      'Terbangunnya kesepakatan komitmen tim (team synergy commitment) baru untuk pencapaian target kerja.',
      'Sesi debriefing mendalam dengan penyusunan **Action Plan** konkret yang siap diaplikasikan di kantor.',
      'Peningkatan index kepuasan dan keterikatan karyawan (employee engagement score) sebesar 98%.',
    ],
  },
  {
    title: 'Leadership Development & High Performance Team Training',
    client: 'Petrokimia Gresik & Semen Indonesia Group',
    location: 'Madiun & Batu, Jawa Timur',
    date: '12 November 2025',
    startDateISO: '2025-11-12T08:00:00+07:00',
    endDateISO: '2025-11-12T17:00:00+07:00',
    participants: '200+ Eksekutif & Staf Operasional',
    objective: 'Melatih kemampuan adaptasi di bawah tekanan, resolusi konflik internal, serta penguatan kepemimpinan transformasional bagi calon-calon manajer.',
    outcomes: [
      'Evaluasi kompetensi kepemimpinan melalui simulasi dinamika kelompok berbasis tantangan nyata.',
      'Sinergi lintas departemen yang lebih solid melalui metode evaluasi reflektif (Reflect & Conceptualize).',
      'Rekomendasi pengembangan SDM berbasis laporan kualitatif fasilitator berpengalaman.',
    ],
  },
];

const CLIENT_CATEGORIES: ClientCategory[] = [
  {
    category: 'BUMN & Korporasi Nasional',
    iconName: 'bumn',
    list: [
      'Petrokimia Gresik',
      'Semen Indonesia',
      'Bank Jatim',
      'PT KAI (Persero)',
      'Pertamina',
      'PLN (Persero)',
      'PT Waskita Karya (Persero) Tbk',
      'PT Wijaya Karya (Persero) Tbk',
      'Maspion Group',
      'Kapal Api Global',
      'Gudang Garam',
      'Wings Group',
    ],
  },
  {
    category: 'Lembaga Pendidikan & Sekolah',
    iconName: 'education',
    list: [
      'SMP Negeri 1 Geger Madiun',
      'SMA Negeri 1 Madiun',
      'Universitas Brawijaya',
      'SMA Negeri 2 Ponorogo',
      'SMP Negeri 1 Magetan',
      'Pengurus LDK OSIS se-Eks Karesidenan Madiun',
    ],
  },
  {
    category: 'Instansi Pemerintah & Layanan Publik',
    iconName: 'government',
    list: [
      'Dinas Kehutanan Provinsi Jawa Timur (Ngawi)',
      'RS Karya Husada',
      'BPR Pacitan',
      'Pemerintah Kota Madiun',
      'Pemerintah Kabupaten Magetan',
      'Dinas Kesehatan Kabupaten Ponorogo',
    ],
  },
];

export default function CredibilityPortfolio({ headingLevel = 'h2' }: { headingLevel?: 'h1' | 'h2' } = {}) {
  const HeadingTag = headingLevel;
  const SubHeadingTag = headingLevel === 'h1' ? 'h2' : 'h3';
  const ItemHeadingTag = headingLevel === 'h1' ? 'h3' : 'h4';
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': 'https://growthindonesia.my.id/#credibility-portfolio',
    name: `${COMPANY_INFO.brand_name} - Provider Outbound & Event Management`,
    url: 'https://growthindonesia.my.id',
    logo: COMPANY_INFO.logo_url,
    image: COMPANY_INFO.logo_url,
    description: 'Provider outbound, team building, dan event management profesional di Madiun & Jawa Timur. Berpengalaman menangani corporate gathering, capacity building, dan LDK OSIS.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: COMPANY_INFO.address_short,
      addressLocality: 'Madiun',
      addressRegion: 'Jawa Timur',
      postalCode: '63128',
      addressCountry: 'ID',
    },
    telephone: '+6285704748186',
    priceRange: 'Rp (Rupiah)',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '250',
      bestRating: '5',
      worstRating: '1',
    },
    review: [
      {
        '@type': 'Review',
        author: {
          '@type': 'Organization',
          name: 'Bank Jatim (Cabang Madiun & Ponorogo)',
        },
        datePublished: '2026-03-25',
        reviewBody: 'Pelaksanaan Corporate Gathering & Capacity Building berjalan sangat sukses dengan Zero Accident Policy. Index kepuasan dan keterikatan karyawan meningkat hingga 98%.',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
        },
      },
      {
        '@type': 'Review',
        author: {
          '@type': 'Organization',
          name: 'SMP Negeri 1 Geger',
        },
        datePublished: '2026-06-23',
        reviewBody: 'Kemah Besar & Character Building Outbound sangat efektif membentuk kedisiplinan dan kepemimpinan siswa melalui metode Experiential Learning.',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
        },
      },
      {
        '@type': 'Review',
        author: {
          '@type': 'Organization',
          name: 'Petrokimia Gresik & Semen Indonesia Group',
        },
        datePublished: '2025-11-12',
        reviewBody: 'Program Leadership Development & High Performance Team Training memberikan evaluasi kualitatif dan rekomendasi konkret untuk pengembangan SDM perusahaan.',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
        },
      },
    ],
    employee: FACILITATORS.map((f) => ({
      '@type': 'Person',
      name: f.name,
      jobTitle: f.role,
      hasCredential: {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'Professional Competency',
        name: f.certification,
        recognizedBy: {
          '@type': 'Organization',
          name: f.certificationBody,
        },
      },
    })),
    knowsAbout: [
      'Experiential Learning',
      'Professional Outbound Facilitation',
      'Corporate Team Building',
      'Outdoor Safety & Zero Accident Policy',
      'LDK OSIS & Youth Leadership Training',
    ],
    memberOf: CLIENT_CATEGORIES.flatMap((c) =>
      c.list.map((client) => ({
        '@type': 'Organization',
        name: client,
      }))
    ),
    event: CASE_STUDIES.map((cs) => ({
      '@type': 'Event',
      name: cs.title,
      organizer: {
        '@type': 'Organization',
        name: COMPANY_INFO.brand_name,
        url: 'https://growthindonesia.my.id',
      },
      sponsor: {
        '@type': 'Organization',
        name: cs.client,
      },
      performer: {
        '@type': 'Person',
        name: 'Naftalyndho Mycha Grace Mirawandi',
        jobTitle: 'Lead Facilitator',
      },
      location: {
        '@type': 'Place',
        name: cs.location,
        address: {
          '@type': 'PostalAddress',
          streetAddress: cs.location,
          addressLocality: cs.location.includes('Magetan') ? 'Magetan' : 'Madiun',
          addressRegion: 'Jawa Timur',
          postalCode: '63128',
          addressCountry: 'ID',
        },
      },
      startDate: cs.startDateISO || '2026-06-23T08:00:00+07:00',
      endDate: cs.endDateISO || '2026-06-23T17:00:00+07:00',
      offers: {
        '@type': 'Offer',
        url: 'https://growthindonesia.my.id/#kontak',
        price: '150000',
        priceCurrency: 'IDR',
        availability: 'https://schema.org/InStock',
      },
      description: `${cs.objective} Outcomes: ${cs.outcomes.join(' ').replace(/\*\*/g, '')}`,
    })),
  };

  return (
    <section className="py-16 md:py-24 bg-paper text-ink border-t border-rule" id="portofolio-sertifikasi">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-3xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
            <Badge variant="default" className="px-3 py-1 border border-brand-border text-brand-dark bg-brand-tint font-semibold">
              Kredibilitas & Rekam Jejak Resmi
            </Badge>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gold-tint border border-rule text-ink rounded-full text-xs font-bold num">
              <Star className="w-3.5 h-3.5 fill-gold text-gold" />
              <span>4.9 / 5.0 (250+ Ulasan & Kepuasan Klien)</span>
            </div>
          </div>
          <HeadingTag className="text-3xl sm:text-4xl lg:text-5xl font-black text-ink tracking-tight font-display">
            Profil Fasilitator, Studi Kasus & <span className="text-brand-dark">Portofolio Klien</span>
          </HeadingTag>
          <p className="mt-4 text-ink-2 text-base sm:text-lg leading-relaxed">
            Bukti nyata komitmen <strong>Growth Indonesia</strong> dalam menghadirkan program pengembangan SDM, outbound training, dan event management berstandar kompetensi profesional serta keamanan tinggi.
          </p>
        </div>

        <div className="pt-12 border-t border-rule space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-brand-tint text-brand-dark rounded-2xl">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div>
                <SubHeadingTag className="text-2xl font-bold text-ink font-display">1. Profil & Kualifikasi Fasilitator</SubHeadingTag>
                <p className="text-sm text-muted">Tim instruktur utama berpengalaman dengan standar kompetensi profesional</p>
              </div>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-paper-2 text-ink-2 rounded-full text-xs font-bold">
              <Award className="w-4 h-4 text-brand-dark" />
              Master Trainer & Praktisi Ahli
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FACILITATORS.map((f, i) => (
              <div key={i} className="bg-white border border-rule rounded-2xl p-6 space-y-4 hover:border-brand-border transition-colors">
                <div className="flex items-start justify-between">
                  <div>
                    <ItemHeadingTag className="text-xl font-bold text-ink font-display">{f.name}</ItemHeadingTag>
                    <p className="text-sm font-semibold text-brand-dark">{f.role}</p>
                  </div>
                  <span className="text-xs font-extrabold bg-brand-dark text-white px-2.5 py-1 rounded-md">Pro</span>
                </div>

                <div className="space-y-2 pt-2 border-t border-rule text-sm">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-whatsapp mt-0.5 shrink-0" />
                    <div>
                      <span className="font-semibold text-ink">Sertifikasi:</span> {f.certification}
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-whatsapp mt-0.5 shrink-0" />
                    <div>
                      <span className="font-semibold text-ink">Penerbit:</span> {f.certificationBody}
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="text-xs font-bold text-muted block mb-2">Spesialisasi Metodologi:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {f.specialization.map((spec, sIdx) => (
                      <span key={sIdx} className="bg-paper border border-rule text-ink-2 text-xs px-2.5 py-1 rounded-md font-medium">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-brand-tint border border-brand-border rounded-2xl p-5 text-sm text-ink-2 leading-relaxed flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-brand-dark shrink-0 mt-0.5" />
            <div className="max-w-[70ch]">
              <strong>Komitmen Keamanan & Metodologi:</strong> Seluruh kegiatan kami menerapkan <strong>Zero Accident Policy</strong> yang diawasi langsung oleh instruktur keselamatan tersertifikasi. Simulasi dirancang menggunakan metodologi <strong>Experiential Learning (Experience &rarr; Reflect &rarr; Conceptualize &rarr; Apply)</strong> sehingga tidak sekadar rekreasi, melainkan berdampak langsung pada kinerja individu dan organisasi.
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-rule space-y-8">
          <div className="flex items-center gap-3 pb-2">
            <div className="p-3 bg-brand-tint text-brand-dark rounded-2xl">
              <Briefcase className="w-8 h-8" />
            </div>
            <div>
              <SubHeadingTag className="text-2xl font-bold text-ink font-display">2. Portofolio & Studi Kasus Program</SubHeadingTag>
              <p className="text-sm text-muted">Rekam jejak pelaksanaan kegiatan outbound training, gathering, dan LDK OSIS</p>
            </div>
          </div>

          <div className="space-y-6">
            {CASE_STUDIES.map((cs, idx) => (
              <div key={idx} className="border border-rule rounded-2xl p-6 bg-white hover:shadow-md transition-[background-color,box-shadow] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2 border-b border-rule pb-4 mb-4">
                  <div>
                    <ItemHeadingTag className="text-lg sm:text-xl font-bold text-ink font-display">{cs.title}</ItemHeadingTag>
                    <p className="text-base font-bold text-brand-dark">{cs.client}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-ink-2">
                    <span className="flex items-center gap-1.5 bg-paper px-3 py-1.5 rounded-lg border border-rule">
                      <MapPin className="w-3.5 h-3.5 text-brand-dark" />
                      {cs.location}
                    </span>
                    <span className="flex items-center gap-1.5 bg-paper px-3 py-1.5 rounded-lg border border-rule num">
                      <Calendar className="w-3.5 h-3.5 text-brand-dark" />
                      {cs.date}
                    </span>
                    <span className="flex items-center gap-1.5 bg-paper px-3 py-1.5 rounded-lg border border-rule num">
                      <Users className="w-3.5 h-3.5 text-brand-dark" />
                      {cs.participants}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-sm text-ink-2 leading-relaxed max-w-[70ch]">
                    <strong className="text-ink">Tujuan Program:</strong> {cs.objective}
                  </p>
                  <div>
                    <strong className="text-xs font-bold text-ink block mb-2">Capaian & Hasil Terukur (Outcomes):</strong>
                    <ul className="space-y-1.5 text-sm text-ink-2">
                      {cs.outcomes.map((out, oIdx) => (
                        <li key={oIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-whatsapp shrink-0 mt-0.5" />
                          <span dangerouslySetInnerHTML={{ __html: out.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-12 border-t border-rule space-y-8">
          <div className="flex items-center gap-3 pb-2">
            <div className="p-3 bg-brand-tint text-brand-dark rounded-2xl">
              <Users className="w-8 h-8" />
            </div>
            <div>
              <SubHeadingTag className="text-2xl font-bold text-ink font-display">3. Daftar Klien & Mitra Strategis</SubHeadingTag>
              <p className="text-sm text-muted">Instansi BUMN, perusahaan multinasional, sekolah, dan pemerintah yang mempercayai Growth Indonesia</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CLIENT_CATEGORIES.map((cat, idx) => (
              <div key={idx} className="bg-white border border-rule rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-2.5 border-b border-rule pb-3">
                  {cat.iconName === 'bumn' && <Building2 className="w-5 h-5 text-brand-dark" />}
                  {cat.iconName === 'education' && <GraduationCap className="w-5 h-5 text-ink" />}
                  {cat.iconName === 'government' && <Briefcase className="w-5 h-5 text-gold" />}
                  <ItemHeadingTag className="font-bold text-ink font-display text-base">{cat.category}</ItemHeadingTag>
                </div>

                <ul className="space-y-2 text-sm text-ink-2">
                  {cat.list.map((item, iIdx) => (
                    <li key={iIdx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-dark shrink-0" />
                      <span className="font-medium text-ink">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
