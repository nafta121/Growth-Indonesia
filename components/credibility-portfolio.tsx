import React from 'react';
import { ShieldCheck, Award, Users, CheckCircle2, MapPin, Calendar, Building2, GraduationCap, Briefcase } from 'lucide-react';
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
    certification: 'Sertifikat Kompetensi Fasilitator Outbound',
    certificationBody: 'BNSP (Badan Nasional Sertifikasi Profesi)',
    specialization: ['Experiential Learning', 'Corporate Capacity Building', 'Executive Leadership Development'],
  },
  {
    name: 'Juprianto',
    role: 'Senior Trainer & Safety Specialist',
    certification: 'Sertifikat Kompetensi Instruktur Outbound',
    certificationBody: 'BNSP (Badan Nasional Sertifikasi Profesi)',
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
      'Rekomendasi pengembangan SDM berbasis laporan kualitatif fasilitator bersertifikat BNSP.',
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

export default function CredibilityPortfolio() {
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${COMPANY_INFO.brand_name.toLowerCase().replace(/\s+/g, '')}-credibility-portfolio`,
    name: `${COMPANY_INFO.brand_name} - Provider Outbound & Event Management`,
    url: 'https://growthindonesia.my.id',
    logo: COMPANY_INFO.logo_url,
    image: COMPANY_INFO.logo_url,
    description: 'Provider outbound, team building, dan event management bersertifikat BNSP di Madiun & Jawa Timur. Berpengalaman menangani corporate gathering, capacity building, dan LDK OSIS.',
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
    employee: FACILITATORS.map((f) => ({
      '@type': 'Person',
      name: f.name,
      jobTitle: f.role,
      hasCredential: {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'Professional Certification',
        name: f.certification,
        recognizedBy: {
          '@type': 'Organization',
          name: f.certificationBody,
        },
      },
    })),
    knowsAbout: [
      'Experiential Learning',
      'BNSP Certified Outbound Facilitation',
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
          addressLocality: 'Madiun',
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
      description: `${cs.objective} Outcomes: ${cs.outcomes.join(' ')}`,
    })),
  };

  return (
    <section className="py-16 md:py-24 bg-slate-50 text-slate-900 border-t border-slate-200" id="portofolio-sertifikasi">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto">
          <Badge variant="default" className="mb-3 px-3 py-1 border border-red-500/30 text-red-600 bg-red-50 font-semibold">
            Kredibilitas & Legalitas Resmi
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight font-display">
            Profil Fasilitator, Studi Kasus & <span className="text-red-600">Portofolio Klien</span>
          </h2>
          <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed">
            Bukti nyata komitmen <strong>Growth Indonesia</strong> dalam menghadirkan program pengembangan SDM, outbound training, dan event management berstandar resmi <strong>BNSP</strong> dan bersertifikat keamanan tinggi.
          </p>
        </div>

        {/* SECTION 1: Profil & Sertifikasi Fasilitator */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-red-100 text-red-600 rounded-2xl">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 font-display">1. Profil & Sertifikasi Fasilitator</h3>
                <p className="text-sm text-slate-500">Tim instruktur utama tersertifikasi kompetensi resmi negara (BNSP)</p>
              </div>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-xs font-bold uppercase tracking-wider">
              <Award className="w-4 h-4 text-red-600" />
              Sertifikasi BNSP Resmi
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FACILITATORS.map((f, i) => (
              <div key={i} className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 space-y-4 hover:border-red-300 transition-colors">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 font-display">{f.name}</h4>
                    <p className="text-sm font-semibold text-red-600">{f.role}</p>
                  </div>
                  <span className="text-xs font-extrabold bg-red-600 text-white px-2.5 py-1 rounded-md">BNSP</span>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-200/60 text-sm">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                    <div>
                      <span className="font-semibold text-slate-800">Sertifikasi:</span> {f.certification}
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                    <div>
                      <span className="font-semibold text-slate-800">Penerbit:</span> {f.certificationBody}
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Spesialisasi Metodologi:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {f.specialization.map((spec, sIdx) => (
                      <span key={sIdx} className="bg-white border border-slate-200 text-slate-700 text-xs px-2.5 py-1 rounded-md font-medium">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-red-50 border border-red-200 rounded-2xl p-5 text-sm text-slate-700 leading-relaxed flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div>
              <strong>Komitmen Keamanan & Metodologi:</strong> Seluruh kegiatan kami menerapkan <strong>Zero Accident Policy</strong> yang diawasi langsung oleh instruktur keselamatan tersertifikasi. Simulasi dirancang menggunakan metodologi <strong>Experiential Learning (Experience &rarr; Reflect &rarr; Conceptualize &rarr; Apply)</strong> sehingga tidak sekadar rekreasi, melainkan berdampak langsung pada kinerja individu dan organisasi.
            </div>
          </div>
        </div>

        {/* SECTION 2: Portofolio & Studi Kasus */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-8">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-6">
            <div className="p-3 bg-red-100 text-red-600 rounded-2xl">
              <Briefcase className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 font-display">2. Portofolio & Studi Kasus Program</h3>
              <p className="text-sm text-slate-500">Rekam jejak pelaksanaan kegiatan outbound training, gathering, dan LDK OSIS</p>
            </div>
          </div>

          <div className="space-y-6">
            {CASE_STUDIES.map((cs, idx) => (
              <div key={idx} className="border border-slate-200 rounded-2xl p-6 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2 border-b border-slate-200/80 pb-4 mb-4">
                  <div>
                    <h4 className="text-lg sm:text-xl font-bold text-slate-900 font-display">{cs.title}</h4>
                    <p className="text-base font-bold text-red-600">{cs.client}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-600">
                    <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-slate-200">
                      <MapPin className="w-3.5 h-3.5 text-red-500" />
                      {cs.location}
                    </span>
                    <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-slate-200">
                      <Calendar className="w-3.5 h-3.5 text-red-500" />
                      {cs.date}
                    </span>
                    <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-slate-200">
                      <Users className="w-3.5 h-3.5 text-red-500" />
                      {cs.participants}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-sm text-slate-700 leading-relaxed">
                    <strong className="text-slate-900">Tujuan Program:</strong> {cs.objective}
                  </p>
                  <div>
                    <strong className="text-xs font-bold uppercase tracking-wider text-slate-800 block mb-2">Capaian & Hasil Terukur (Outcomes):</strong>
                    <ul className="space-y-1.5 text-sm text-slate-700">
                      {cs.outcomes.map((out, oIdx) => (
                        <li key={oIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
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

        {/* SECTION 3: Daftar Klien */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-8">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-6">
            <div className="p-3 bg-red-100 text-red-600 rounded-2xl">
              <Users className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 font-display">3. Daftar Klien & Mitra Strategis</h3>
              <p className="text-sm text-slate-500">Instansi BUMN, perusahaan multinasional, sekolah, dan pemerintah yang mempercayai Growth Indonesia</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CLIENT_CATEGORIES.map((cat, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-2.5 border-b border-slate-200 pb-3">
                  {cat.iconName === 'bumn' && <Building2 className="w-5 h-5 text-red-600" />}
                  {cat.iconName === 'education' && <GraduationCap className="w-5 h-5 text-blue-600" />}
                  {cat.iconName === 'government' && <Briefcase className="w-5 h-5 text-amber-600" />}
                  <h4 className="font-bold text-slate-900 font-display text-base">{cat.category}</h4>
                </div>

                <ul className="space-y-2 text-sm text-slate-700">
                  {cat.list.map((item, iIdx) => (
                    <li key={iIdx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                      <span className="font-medium text-slate-800">{item}</span>
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
