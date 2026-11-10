import React from 'react';
import type { ReactNode } from 'react';
import { COMPANY_INFO } from '@/lib/constants';
import { CITIES, getCityOperationalProfile } from '@/lib/cities';
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
  const cityKey = kotaName.toLowerCase().trim().replace(/\s+/g, '-');
  const cityData = CITIES[cityKey];
  const profile = getCityOperationalProfile(cityKey);
  const primaryVenues =
    cityData && cityData.popularVenues.length > 0
      ? cityData.popularVenues.slice(0, 2).join(' dan ')
      : `lokasi strategis ${kotaName}`;
  const allVenues =
    cityData && cityData.popularVenues.length > 0
      ? cityData.popularVenues.join(', ')
      : `venue unggulan ${kotaName}`;

  const contentMap: Record<string, ContentVariation> = {
    'outbound': {
      title: `Jasa Outbound & Team Building ${kotaName}`,
      h1: <>Provider Outbound &amp; Jasa Outbound di {kotaName}</>,
      subheadline: `Hilangkan risiko acara monoton, kendala cuaca, atau pembengkakan anggaran pada agenda Outbound & Team Building instansi Anda di ${kotaName} (${allVenues}). Dipandu langsung oleh Master Trainer berpengalaman dengan jaminan Zero Accident Policy, Garansi Plan B Cuaca (aula/pendopo indoor), serta draf Proposal, Rundown, RAB, dan dokumen LPJ resmi siap dalam 1x24 jam.`,
      providerType: 'provider outbound',
      bodyIntro: `Sebagai provider outbound B2B, BUMN, dan instansi pemerintah di ${kotaName} (${profile.corridorName}), kami merancang simulasi experiential learning di ${primaryVenues} dengan karakter medan ${profile.terrainType.toLowerCase()}. ${profile.mobilizationSla}, memastikan Core Values organisasi diterjemahkan menjadi kolaborasi lintas divisi yang terukur dan bebas insiden.`,
      deliverables: [
        `Simulasi Low & High Impact Team Challenge di ${primaryVenues}`,
        'Asesmen TNA Pra-Acara & Debriefing Reflektif Berbasis KPI Tim',
        'Garansi Plan B Cuaca (Aula/Pendopo) & Tim Medis P3K Siaga',
        'Draf Proposal, RAB Transparan, Laporan Evaluasi SDM & Dokumen LPJ',
      ],
    },
    'training': {
      title: `Indoor Training & Pelatihan SDM ${kotaName}`,
      h1: <>Pusat Indoor Training &amp; Motivasi di {kotaName}</>,
      subheadline: `Jangan biarkan anggaran pelatihan SDM di ${kotaName} habis hanya untuk seminar satu arah tanpa perubahan perilaku kerja. Growth Indonesia menghadirkan Indoor Training & Capacity Building berbasis Training Need Analysis (TNA) di ${allVenues}, lengkap dengan studi kasus operasional, terukur lewat Laporan Evaluasi Kompetensi SDM dan kelengkapan LPJ pengadaan.`,
      providerType: 'penyelenggara indoor training',
      bodyIntro: `Program Indoor Training dan Capacity Building kami di ${kotaName} (${profile.corridorName}) menggabungkan metodologi andragogi modern, simulasi kepemimpinan manajerial, dan roleplay pelayanan prima pada fasilitas ${profile.terrainType.toLowerCase()}. ${profile.mobilizationSla}, mendukung peningkatan produktivitas staf hingga jajaran supervisor dan aparatur.`,
      deliverables: [
        `Training Needs Analysis (TNA) & Kurikulum Kustom Instansi ${kotaName}`,
        'Modul Leadership, Communication & Service Excellence Terapan',
        'Workshop Interaktif, Roleplay & Simulasi Problem Solving',
        'Laporan Evaluasi Kompetensi Pasca-Pelatihan & Dokumen LPJ Resmi',
      ],
    },
    'fun-games': {
      title: `Jasa Fun Games & Ice Breaking ${kotaName}`,
      h1: <>Jasa Fun Game &amp; Ice Breaking di {kotaName}</>,
      subheadline: `Pastikan agenda penyegaran karyawan (company outing) di ${kotaName} berjalan cair, aman bagi seluruh usia termasuk peserta senior, dan bebas canggung. Paket Fun Games & Ice Breaking kami di ${allVenues} dirancang inklusif (low-risk, high-impact) mulai Rp 150.000/pax untuk 1 hari penuh dengan Garansi Plan B Cuaca dan dukungan RAB satu pintu.`,
      providerType: 'penyedia layanan fun game',
      bodyIntro: `Paket Fun Games dan Ice Breaking kami di ${kotaName} (${profile.corridorName}) memanfaatkan area ${primaryVenues} (${profile.terrainType.toLowerCase()}) untuk mencairkan sekat komunikasi antar-divisi dan memulihkan energi kerja. ${profile.mobilizationSla}, dipimpin oleh Master of Games profesional dengan standar keselamatan Zero Accident Policy.`,
      deliverables: [
        `Energizer & Mass Ice Breaking Inklusif di ${primaryVenues}`,
        'Kompetisi Kelompok Low-Risk High-Impact (Ramah Semua Usia)',
        'Peralatan Permainan Lengkap, Sound System & Garansi Plan B Cuaca',
        'Master of Games Berpengalaman, Tim P3K & Rincian RAB Transparan',
      ],
    },
    'ldk-osis': {
      title: `LDK OSIS & Character Building ${kotaName}`,
      h1: <>Lembaga LDK OSIS &amp; Character Building di {kotaName}</>,
      subheadline: `Bentuk karakter kepemimpinan pelajar dan mahasiswa di ${kotaName} melalui kurikulum LDK OSIS modern yang disiplin, edukatif, dan 100% bebas perpeloncoan maupun kekerasan fisik. Dilaksanakan di ${allVenues} dengan pengawasan ketat K3 lapangan, tim medis P3K siaga, Garansi Plan B Cuaca, serta laporan evaluasi kesiswaan lengkap.`,
      providerType: 'fasilitator LDK OSIS',
      bodyIntro: `Program Latihan Dasar Kepemimpinan (LDK) OSIS, MPK, dan Character Building pelajar di ${kotaName} (${profile.corridorName}) dirancang khusus di kawasan ${primaryVenues} (${profile.terrainType.toLowerCase()}). ${profile.mobilizationSla}, membekali pengurus siswa SMP, SMA/SMK, dan BEM kampus dengan disiplin positif, manajemen organisasi, serta komunikasi publik.`,
      deliverables: [
        `Kurikulum Kepemimpinan Siswa & Manajemen Organisasi di ${kotaName}`,
        'Simulasi Public Speaking, Persidangan & Problem Solving Kelompok',
        'Outbound Karakter Bebas Perpeloncoan dengan Standar K3 & Medis P3K',
        'Sertifikat Peserta, Dokumentasi Kegiatan & Laporan Evaluasi Sekolah',
      ],
    },
    'gathering': {
      title: `EO Corporate & Family Gathering ${kotaName}`,
      h1: <>EO Corporate &amp; Family Gathering di {kotaName}</>,
      subheadline: `Bebaskan panitia internal Anda dari kerumitan mengurus ratusan detail vendor saat menyelenggarakan Corporate & Family Gathering di ${kotaName} (${allVenues}). Kami menangani eksekusi satu pintu (terima beres) mulai dari reservasi venue/hotel, katering higienis, fun games keluarga, Gala Dinner, dokumentasi drone, hingga dokumen LPJ resmi.`,
      providerType: 'event organizer gathering',
      bodyIntro: `Sebagai Event Organizer (EO) Corporate, Employee, dan Family Gathering satu pintu di ${kotaName} (${profile.corridorName}), kami mengelola rangkaian acara di ${primaryVenues} (${profile.terrainType.toLowerCase()}) untuk skala 30 hingga 500+ peserta. ${profile.mobilizationSla}, sehingga panitia dapat ikut menikmati acara tanpa khawatir keterlambatan konsumsi atau kendala cuaca.`,
      deliverables: [
        `Manajemen Satu Pintu Venue, Hotel & Konsumsi di ${primaryVenues}`,
        'Produksi Panggung Gala Dinner, Awarding Night, Musik & Hiburan',
        'Aktivitas Family & Employee Bonding + Garansi Plan B Indoor',
        'Dokumentasi Foto, Video & Drone Sinematik serta Dokumen LPJ/SPJ',
      ],
    }
  };

  return contentMap[kategori.toLowerCase()] || {
    title: `Provider & Jasa ${formatSlug(kategori)} ${kotaName} - Event Organizer`,
    h1: <>Provider {formatSlug(kategori)} di {kotaName}</>,
    subheadline: `${COMPANY_INFO.brand_name} adalah Event Organizer (EO) satu pintu yang menghadirkan layanan profesional ${formatSlug(kategori).toLowerCase()} di ${kotaName} (${allVenues}) dengan jaminan Zero Accident Policy, Garansi Plan B Cuaca, dan draf Proposal & RAB siap dalam 1x24 jam.`,
    providerType: `penyedia layanan ${formatSlug(kategori).toLowerCase()}`,
    bodyIntro: `Sebagai mitra pengembangan SDM dan Event Organizer di ${kotaName} (${profile.corridorName}), ${COMPANY_INFO.brand_name} merancang program ${formatSlug(kategori).toLowerCase()} di ${primaryVenues} dengan pendekatan experiential learning yang selaras dengan visi dan budaya kerja institusi Anda.`,
    deliverables: [
      `Perancangan Program Kustom Berbasis TNA di ${kotaName}`,
      'Fasilitator & Master Trainer Berpengalaman',
      'Standar Keselamatan Zero Accident Policy & Garansi Plan B Cuaca',
      'Dokumentasi, Evaluasi Kegiatan & Dokumen LPJ Lengkap',
    ],
  };
}
