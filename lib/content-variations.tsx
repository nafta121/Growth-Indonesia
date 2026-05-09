import { ReactNode } from 'react';
import { COMPANY_INFO } from '@/lib/constants';
import { formatSlug } from './format';

export function getContentVariations(kategori: string, kotaName: string) {
  const contentMap: Record<string, { title: string; h1: ReactNode; subheadline: string; providerType: string }> = {
    'outbound': {
      title: `Provider Outbound & Jasa Outbound ${kotaName} - Corporate Gathering`,
      h1: <>Provider Outbound & Jasa Outbound Premium di <span className="text-[#EF4444] font-bold">{kotaName}</span></>,
      subheadline: `Ciptakan momen Corporate Gathering yang tak terlupakan dengan Jasa Outbound ${kotaName} terbaik. Tingkatkan soliditas tim dan kapasitas kepemimpinan melalui program Provider Outbound ${kotaName} yang dirancang khusus. Hubungi Growth Indonesia untuk desain penawaran eksklusif!`,
      providerType: 'provider outbound'
    },
    'training': {
      title: `Indoor Training ${kotaName} & Pelatihan Soft Skill Motivasi`,
      h1: <>Pusat Indoor Training Berdampak & Motivasi di <span className="text-[#EF4444] font-bold">{kotaName}</span></>,
      subheadline: `Tingkatkan Soft Skill karyawan Anda dengan Indoor Training ${kotaName} profesional. Growth Indonesia menyajikan program pengembangan SDM dan Motivasi yang aplikatif dan dirancang khusus untuk menjawab tantangan spesifik organisasi Anda. Mari transformasikan potensi tim Anda hari ini!`,
      providerType: 'penyelenggara indoor training'
    },
    'fun-games': {
      title: `Fun Game ${kotaName} & Ice Breaking - Team Building`,
      h1: <>Jasa Fun Game & Ice Breaking Spesial di <span className="text-[#EF4444] font-bold">{kotaName}</span></>,
      subheadline: `Cairkan suasana dan bangun keakraban tanpa batas melalui paket Fun Game ${kotaName} yang energik. Layanan kami yang penuh Ice Breaking ${kotaName} menjadi pilihan tepat untuk menyempurnakan program Team Building perusahaan Anda!`,
      providerType: 'penyedia layanan fun game'
    },
    'ldk-osis': {
      title: `LDK OSIS ${kotaName} & Program Character Building - Pelatihan Siswa`,
      h1: <>Lembaga LDK OSIS & Character Building Tangguh di <span className="text-[#EF4444] font-bold">{kotaName}</span></>,
      subheadline: `Bentuk mental generasi muda yang tangguh dengan program LDK OSIS ${kotaName} yang intensif. Jadikan kami mitra Pelatihan Siswa melalui Character Building ${kotaName} untuk membina kedisiplinan, kemandirian, dan problem solving peserta didik. Percayakan siswa Anda kepada ahlinya!`,
      providerType: 'fasilitator LDK OSIS'
    }
  };

  return contentMap[kategori.toLowerCase()] || {
    title: `Provider & Jasa ${formatSlug(kategori)} ${kotaName} | EO - ${COMPANY_INFO.brand_name}`,
    h1: <>Provider {formatSlug(kategori)} Premium di <span className="text-[#EF4444] font-bold">{kotaName}</span></>,
    subheadline: `${COMPANY_INFO.brand_name} adalah Event Organizer (EO) yang menghadirkan layanan profesional ${formatSlug(kategori).toLowerCase()} di ${kotaName}. Transformasi budaya perusahaan dan semangat kolaborasi tim Anda bersama instruktur profesional ${COMPANY_INFO.brand_name} untuk hasil yang terukur dan berkesinambungan.`,
    providerType: `penyedia layanan ${formatSlug(kategori).toLowerCase()}`
  };
}
