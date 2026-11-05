import React from 'react';
import type { ReactNode } from 'react';
import { COMPANY_INFO } from '@/lib/constants';
import { formatSlug } from './format';

export interface ContentVariation {
  title: string;
  h1: ReactNode;
  subheadline: string;
  providerType: string;
  bodyIntro: string;
  deliverables: string[];
}

export function getContentVariations(kategori: string, kotaName: string): ContentVariation {
  const contentMap: Record<string, ContentVariation> = {
    'outbound': {
      title: `Jasa Outbound & Team Building ${kotaName}`,
      h1: <>Provider Outbound &amp; Jasa Outbound di {kotaName}</>,
      subheadline: `Ciptakan momen Corporate Gathering yang tak terlupakan dengan Jasa Outbound ${kotaName} terbaik. Tingkatkan soliditas tim dan kapasitas kepemimpinan melalui program Provider Outbound ${kotaName} yang dirancang khusus. Hubungi Growth Indonesia untuk desain penawaran eksklusif!`,
      providerType: 'provider outbound',
      bodyIntro: `Sebagai provider outbound B2B terpercaya di ${kotaName}, kami merancang simulasi outdoor berbasis experiential learning yang menerjemahkan Core Values perusahaan ke dalam tantangan lapangan yang terukur, aman (Zero Accident Policy), dan berdampak nyata pada kolaborasi lintas divisi.`,
      deliverables: [
        'Low & High Impact Team Challenge',
        'Simulasi Leadership & Problem Solving',
        'Debriefing Reflektif Berbasis KPI Tim',
        'Fasilitator Berpengalaman & Tim Medis Siaga',
      ],
    },
    'training': {
      title: `Indoor Training & Pelatihan SDM ${kotaName}`,
      h1: <>Pusat Indoor Training &amp; Motivasi di {kotaName}</>,
      subheadline: `Tingkatkan Soft Skill karyawan Anda dengan Indoor Training ${kotaName} profesional. Growth Indonesia menyajikan program pengembangan SDM dan Motivasi yang aplikatif dan dirancang khusus untuk menjawab tantangan spesifik organisasi Anda. Mari transformasikan potensi tim Anda hari ini!`,
      providerType: 'penyelenggara indoor training',
      bodyIntro: `Program Indoor Training dan Capacity Building kami di ${kotaName} menggabungkan metodologi andragogi modern, studi kasus industri, serta roleplay interaktif untuk mengakselerasi kompetensi kepemimpinan, komunikasi efektif, dan etos kerja berkinerja tinggi.`,
      deliverables: [
        'Training Needs Analysis (TNA) Pra-Acara',
        'Modul Leadership, Communication & Service Excellence',
        'Workshop Interaktif, Roleplay & Case Study',
        'Laporan Evaluasi Kompetensi Pasca-Pelatihan',
      ],
    },
    'fun-games': {
      title: `Jasa Fun Games & Ice Breaking ${kotaName}`,
      h1: <>Jasa Fun Game &amp; Ice Breaking di {kotaName}</>,
      subheadline: `Cairkan suasana dan bangun keakraban tanpa batas melalui paket Fun Game ${kotaName} yang energik. Layanan kami yang penuh Ice Breaking ${kotaName} menjadi pilihan tepat untuk menyempurnakan program Team Building perusahaan Anda!`,
      providerType: 'penyedia layanan fun game',
      bodyIntro: `Paket Fun Games dan Ice Breaking kami di ${kotaName} dirancang khusus untuk mencairkan kekakuan komunikasi, menyegarkan kembali semangat kerja (refreshment), dan membangun keakraban inklusif bagi seluruh peserta dari berbagai jenjang jabatan.`,
      deliverables: [
        'Energizer & Mass Ice Breaking Interaktif',
        'Kompetisi Kelompok Berbasis Kekompakan',
        'Peralatan Permainan Lengkap & Aman',
        'Master of Games & Pemandu Acara Profesional',
      ],
    },
    'ldk-osis': {
      title: `LDK OSIS & Character Building ${kotaName}`,
      h1: <>Lembaga LDK OSIS &amp; Character Building di {kotaName}</>,
      subheadline: `Bentuk mental generasi muda yang tangguh dengan program LDK OSIS ${kotaName} yang intensif. Jadikan kami mitra Pelatihan Siswa melalui Character Building ${kotaName} untuk membina kedisiplinan, kemandirian, dan problem solving peserta didik. Percayakan siswa Anda kepada ahlinya!`,
      providerType: 'fasilitator LDK OSIS',
      bodyIntro: `Program Latihan Dasar Kepemimpinan (LDK) OSIS dan Character Building pelajar di ${kotaName} disusun dengan pendekatan edukatif, disiplin positif, dan simulasi organisasi untuk mencetak pengurus siswa serta generasi muda yang berintegritas, mandiri, dan komunikatif.`,
      deliverables: [
        'Kurikulum Kepemimpinan Siswa & Manajemen Organisasi',
        'Public Speaking, Sidang & Dinamika Kelompok',
        'Outbond Karakter, Bela Negara & Kemandirian',
        'Pendampingan Instruktur Berpengalaman & Ramah Anak',
      ],
    },
    'gathering': {
      title: `EO Corporate & Family Gathering ${kotaName}`,
      h1: <>EO Corporate &amp; Family Gathering di {kotaName}</>,
      subheadline: `Wujudkan acara Corporate Gathering, Employee Gathering, dan Family Gathering di ${kotaName} yang berkesan dan terorganisir secara profesional. ${COMPANY_INFO.brand_name} siap merancang konsep acara, manajemen venue, hingga aktivitas kebersamaan yang mempererat solidaritas tim Anda!`,
      providerType: 'event organizer gathering',
      bodyIntro: `Sebagai Event Organizer (EO) Corporate & Family Gathering di ${kotaName}, kami menangani perencanaan acara dari hulu ke hilir, mulai dari kurasi venue dan akomodasi, rundown acara malam keakraban (Gala Dinner), hingga aktivitas keluarga dan hiburan yang berkesan.`,
      deliverables: [
        'Manajemen Rundown, Venue, Akomodasi & Konsumsi',
        'Konsep Gala Dinner, Awarding Night & Hiburan',
        'Aktivitas Family & Employee Bonding Terpadu',
        'Dokumentasi Foto, Video & Drone Sinematik',
      ],
    }
  };

  return contentMap[kategori.toLowerCase()] || {
    title: `Provider & Jasa ${formatSlug(kategori)} ${kotaName} - Event Organizer`,
    h1: <>Provider {formatSlug(kategori)} di {kotaName}</>,
    subheadline: `${COMPANY_INFO.brand_name} adalah Event Organizer (EO) yang menghadirkan layanan profesional ${formatSlug(kategori).toLowerCase()} di ${kotaName}. Transformasi budaya perusahaan dan semangat kolaborasi tim Anda bersama instruktur profesional ${COMPANY_INFO.brand_name} untuk hasil yang terukur dan berkesinambungan.`,
    providerType: `penyedia layanan ${formatSlug(kategori).toLowerCase()}`,
    bodyIntro: `Sebagai mitra pengembangan SDM dan Event Organizer di ${kotaName}, ${COMPANY_INFO.brand_name} merancang program ${formatSlug(kategori).toLowerCase()} dengan pendekatan experiential learning yang selaras dengan visi dan budaya kerja institusi Anda.`,
    deliverables: [
      'Perancangan Program Kustom Sesuai Objektif',
      'Fasilitator & Instruktur Berpengalaman',
      'Standar Keselamatan Zero Accident Policy',
      'Dokumentasi & Evaluasi Kegiatan Lengkap',
    ],
  };
}
