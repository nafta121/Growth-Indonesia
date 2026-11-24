export interface CityData {
  name: string;
  uniqueSellingPoint: string;
  popularVenues: string[];
  description: string;
}

export const CITIES: Record<string, CityData> = {
  madiun: {
    name: 'Madiun',
    uniqueSellingPoint: 'Sebagai pusat operasional utama kami, Growth Indonesia memiliki jaringan terluas di Madiun dengan berbagai pilihan venue berkapasitas besar.',
    popularVenues: ['Wana Wisata Graha', 'Sun City', 'Nongko Ijo', 'Wana Wisata Grape'],
    description: 'Pusat layanan outbound dan HR development terbaik.',
  },
  ponorogo: {
    name: 'Ponorogo',
    uniqueSellingPoint: 'Kami menggabungkan nilai-nilai kepemimpinan dengan filosofi ketangguhan budaya lokal Ponorogo.',
    popularVenues: ['Telaga Ngebel', 'Mloko Sewu', 'Nyawiji Park'],
    description: 'Layanan team building dengan sentuhan kearifan lokal.',
  },
  magetan: {
    name: 'Magetan',
    uniqueSellingPoint: 'Akses langsung ke venue premium di Telaga Sarangan dan lereng Gunung Lawu, memberikan udara sejuk.',
    popularVenues: ['Telaga Sarangan', 'Lawu Green Forest', 'Mojosemi Forest Park'],
    description: 'Rasakan sensasi outbound di area sejuk kaki pegunungan.',
  },
  ngawi: {
    name: 'Ngawi',
    uniqueSellingPoint: 'Program yang dirancang khusus untuk mendorong resiliensi dan inovasi tim dengan memanfaatkan lokasi historis.',
    popularVenues: ['Benteng Pendem', 'Srambang Park', 'Watu Jonggol'],
    description: 'Program leadership di spot ikonik penuh sejarah.',
  },
  nganjuk: {
    name: 'Nganjuk',
    uniqueSellingPoint: 'Ideal untuk program medium-to-large capacity dengan fasilitas komprehensif untuk corporate retreat.',
    popularVenues: ['Air Terjun Sedudo', 'Taman Nyawiji', 'Kawasan Selo Park'],
    description: 'Destinasi asri untuk sinergi dan kolaborasi tim.',
  },
  pacitan: {
    name: 'Pacitan',
    uniqueSellingPoint: 'Nikmati pengalaman team building unik berbasis pantai dan goa dengan pemandangan kelas dunia.',
    popularVenues: ['Pantai Klayar', 'Pantai Teleng Ria', 'Goa Gong'],
    description: 'Outbound menantang dengan panorama bahari kelas dunia.',
  },
  kediri: {
    name: 'Kediri',
    uniqueSellingPoint: 'Mendukung program capacity building untuk perusahaan manufaktur dan korporasi berskala nasional.',
    popularVenues: ['Kawasan Gunung Kelud', 'Simpang Lima Gumul'],
    description: 'Akselerasi kapasitas SDM korporasi Anda.',
  },
  surabaya: {
    name: 'Surabaya',
    uniqueSellingPoint: 'Program cepat dan efisien yang dirancang untuk budaya korporat metropolitan dengan beragam pilihan venue.',
    popularVenues: ['Kenjeran Park', 'Hutan Bambu Keputih', 'Kebun Bibit'],
    description: 'Optimalisasi kinerja tim di pusat bisnis metropolis.',
  },
  malang: {
    name: 'Malang',
    uniqueSellingPoint: 'Program alam pegunungan yang dirancang untuk relaksasi dan refreshing sambil mempererat bonding tim.',
    popularVenues: ['Kebun Raya Purwodadi', 'Lembah Indah', 'Coban Rondo'],
    description: 'Harmonisasi tim dengan pesona sejuk pegunungan.',
  },
  batu: {
    name: 'Batu',
    uniqueSellingPoint: 'Kawasan wisata premium yang ideal untuk gathering keluarga perusahaan dan wisata apresiasi tim.',
    popularVenues: ['Jatim Park', 'Selecta', 'Coban Talun'],
    description: 'Kombinasi hiburan premium dan edukasi team building.',
  },
  sidoarjo: {
    name: 'Sidoarjo',
    uniqueSellingPoint: 'Fokus pada pengembangan keterampilan dan produktivitas karyawan tanpa harus jauh dari pusat kota.',
    popularVenues: ['Delta Fishing', 'Kawasan Lumpur Lapindo', 'Sun City Waterpark'],
    description: 'Menumbuhkan motivasi karyawan dekat dari pusat industri.',
  },
  gresik: {
    name: 'Gresik',
    uniqueSellingPoint: 'Meningkatkan kapabilitas dan iklim kerja positif untuk industri dan perusahaan logistik terbesar.',
    popularVenues: ['Wego Lamongan (terdekat)', 'Wisata Mangrove'],
    description: 'Sinergi produktif untuk korporasi industri.',
  },
  mojokerto: {
    name: 'Mojokerto',
    uniqueSellingPoint: 'Inspirasi kejayaan nusantara dalam setiap aktivitas team building di bumi Majapahit.',
    popularVenues: ['Pacet Mini Park', 'Obech Wilderness', 'Trawas'],
    description: 'Membangkitkan daya juang di kota sejarah.',
  },
  jombang: {
    name: 'Jombang',
    uniqueSellingPoint: 'Pendekatan spiritual dan emosional yang terintegrasi dengan fun team building dan refleksi personal.',
    popularVenues: ['Wana Wisata Bale Tani', 'Kawasan Wonosalam'],
    description: 'Refleksi dan kolaborasi di kota santri.',
  },
  jember: {
    name: 'Jember',
    uniqueSellingPoint: 'Menghadirkan keindahan budaya dan alam, tepat untuk program revitalisasi budaya kerja dan LDKS.',
    popularVenues: ['Pantai Papuma', 'Botani', 'Remangan'],
    description: 'Kreasi dan kolaborasi tim di pusat Jember HFC.',
  },
  banyuwangi: {
    name: 'Banyuwangi',
    uniqueSellingPoint: 'Pengalaman premium outbound yang diwarnai dengan keelokan alam dan keunikan budaya The Sunrise of Java.',
    popularVenues: ['Pantai Boom', 'Hutan Djawatan', 'Kawah Ijen (Team Adventure)'],
    description: 'Sensasi team adventure eksotis The Sunrise of Java.',
  },
  probolinggo: {
    name: 'Probolinggo',
    uniqueSellingPoint: 'Area strategis Gunung Bromo memberikan latar petualangan team building dan gathering yang epik.',
    popularVenues: ['Kawasan Bromo', 'BJBR', 'Ranu Agung'],
    description: 'Petualangan luar biasa dalam pengembangan SDM.',
  },
  pasuruan: {
    name: 'Pasuruan',
    uniqueSellingPoint: 'Akomodasi premium seperti hotel resor untuk corporate training berskala direksi dan manajemen atas.',
    popularVenues: ['Taman Safari Prigen', 'Kawasan Tretes', 'Kebun Raya Purwodadi'],
    description: 'Eksklusivitas dan premium retreat gathering.',
  },
  trenggalek: {
    name: 'Trenggalek',
    uniqueSellingPoint: 'Menawarkan pesona wisata bahari yang damai sebagai tempat membangun kembali semangat dan jiwa kepemimpinan.',
    popularVenues: ['Pantai Prigi', 'Pantai Karanggongso', 'Goa Lowo'],
    description: 'Penyegaran dan resolusi tim dengan nuansa laut.',
  },
  tulungagung: {
    name: 'Tulungagung',
    uniqueSellingPoint: 'Inkubasi ide dan pengembangan kapasitas melalui pendekatan games yang unik serta fasilitas outdooor yang asri.',
    popularVenues: ['Pantai Gemah', 'Dholo', 'Waduk Wonorejo'],
    description: 'Membangun komunikasi di tengah keasrian alam.',
  },
  blitar: {
    name: 'Blitar',
    uniqueSellingPoint: 'Peningkatan nasionalisme dan nilai kesatuan yang disemburkan dari kota bersejarah proklamator.',
    popularVenues: ['Makam Bung Karno', 'Kampung Coklat', 'Pantai Tambakrejo'],
    description: 'Kuatkan persatuan dan visi misi melalui napak tilas.',
  },
  lamongan: {
    name: 'Lamongan',
    uniqueSellingPoint: 'Wisata buatan berkualitas seperti WBL memberikan perpaduan liburan seru sekaligus melatih kekompakan tim.',
    popularVenues: ['Wisata Bahari Lamongan', 'Maharani Zoo', 'Wego'],
    description: 'Gabungan rekreasi fun game keluarga pegawai.',
  },
  tuban: {
    name: 'Tuban',
    uniqueSellingPoint: 'Aktivitas yang membina kepemimpinan inovatif dengan latar belakang goa-goa eksotis.',
    popularVenues: ['Pantai Boom', 'Goa Maharani', 'Kambang Putih'],
    description: 'Menggali potensi inovasi kepemimpinan SDM.',
  },
  bojonegoro: {
    name: 'Bojonegoro',
    uniqueSellingPoint: 'Fasilitas pengembangan SDM yang tangguh di pusat energi dan budaya lokal yang kuat.',
    popularVenues: ['Kayangan Api', 'Waduk Pacal', 'Agrowisata Belimbing'],
    description: 'Ketangguhan dan energi baru untuk tim tangguh.',
  },
  bangkalan: {
    name: 'Bangkalan',
    uniqueSellingPoint: 'Kesempatan unik menyatukan perbedaan pendapat demi harmoni organisasi dalam tradisi Madura.',
    popularVenues: ['Bukit Jaddih', 'Mercusuar Sembilangan', 'Pantai Rongkang'],
    description: 'Harmoni organisasi dan keragaman budaya bersatu.',
  },
  sampang: {
    name: 'Sampang',
    uniqueSellingPoint: 'Membangun ketangguhan operasional tim yang mengedepankan kolaborasi gigih ala budayawan lokal.',
    popularVenues: ['Pantai Camplong', 'Air Terjun Toroan'],
    description: 'Resiliensi tim untuk menghadapi tantangan gigih.',
  },
  pamekasan: {
    name: 'Pamekasan',
    uniqueSellingPoint: 'Inkubator kepemimpinan masa depan dan LDK OSIS yang memacu potensi generasi muda pelajar.',
    popularVenues: ['Api Tak Kunjung Padam', 'Pantai Jumiang', 'Eduwisata Garam'],
    description: 'Pusat kepemimpinan generasi muda inovatif.',
  },
  sumenep: {
    name: 'Sumenep',
    uniqueSellingPoint: 'Timur Madura yang menawarkan kombinasi team building keraton dan penjelajahan eksotis pulau-pulau kecil.',
    popularVenues: ['Pantai Lombang', 'Gili Labak', 'Keraton Sumenep'],
    description: 'Menangkap peluang kolaborasi eksotis bahari.',
  },
  lumajang: {
    name: 'Lumajang',
    uniqueSellingPoint: 'Keagungan Semeru menjadi motivasi alamiah bagi tim Anda untuk mendaki puncak kesuksesan bersama.',
    popularVenues: ['Ranu Kumbolo', 'Air Terjun Tumpak Sewu', 'Ranu Klakah'],
    description: 'Kekompakan paripurna menembus target tertinggi.',
  },
  bondowoso: {
    name: 'Bondowoso',
    uniqueSellingPoint: 'Merasakan aura Highland Paradise dalam sesi problem solving dan decision making bersama para pimpinan.',
    popularVenues: ['Kawah Ijen', 'Kawah Wurung', 'Puncak Megasari'],
    description: 'Penyusunan visi strategis top management retreat.',
  },
  situbondo: {
    name: 'Situbondo',
    uniqueSellingPoint: 'Pesona Taman Nasional Baluran untuk pengembangan eksekutif perusahaan melalui penjelajahan nature.',
    popularVenues: ['Taman Nasional Baluran', 'Pantai Pasir Putih', 'Waduk Bajulmati'],
    description: 'Merajut fokus jangka panjang untuk para eksekutif.',
  }
};

export interface CityOperationalProfile {
  corridorName: string;
  terrainType: string;
  mobilizationSla: string;
  planBContingency: string;
  localProof: string;
  institutionalSegments: {
    corporate: string;
    government: string;
    education: string;
  };
}

const CORRIDOR_MAP: Record<string, { corridorName: string; terrainType: string; mobilizationSla: string }> = {
  madiun: {
    corridorName: 'Koridor Mataraman & Pusat Operasional Madiun Raya',
    terrainType: 'Taman wisata terpadu, hutan pinus lereng Wilis, dan ballroom hotel pusat kota',
    mobilizationSla: 'Respon survei lokasi 1x24 jam langsung dari Basecamp Utama Jl. Mujair No.3 Madiun tanpa biaya mobilisasi kru luar kota',
  },
  magetan: {
    corridorName: 'Koridor Pegunungan Lawu & Sarangan',
    terrainType: 'Lembah pinus dataran tinggi (1.200 mdpl), tepi telaga pegunungan, dan resort berkapasitas 30-500+ peserta',
    mobilizationSla: 'Mobilisasi peralatan & tim medis P3K 45 menit dari Basecamp Madiun dengan penguasaan penuh titik kumpul Sarangan',
  },
  ponorogo: {
    corridorName: 'Koridor Mataraman Selatan & Telaga Ngebel',
    terrainType: 'Kawasan tepi danau vulkanik Ngebel, bukit pinus Mloko Sewu, dan pendopo budaya',
    mobilizationSla: 'Mobilisasi cepat 40 menit dari Basecamp Madiun dengan dukungan logistik katering dan sound system lokal terverifikasi',
  },
  ngawi: {
    corridorName: 'Koridor Mataraman Utara & Lereng Lawu Utara',
    terrainType: 'Kawasan cagar budaya Benteng Pendem, kebun teh Jamus, dan taman air terjun Srambang',
    mobilizationSla: 'Mobilisasi 35 menit via poros Madiun-Ngawi dengan kesiapan peralatan simulasi lapangan penuh',
  },
  nganjuk: {
    corridorName: 'Koridor Mataraman Timur & Lereng Wilis',
    terrainType: 'Kawasan air terjun pegunungan Sedudo, taman kota, dan area retreat dataran tinggi',
    mobilizationSla: 'Mobilisasi 45 menit via akses tol Madiun-Nganjuk untuk skenario One Day maupun menginap 2H1M',
  },
  pacitan: {
    corridorName: 'Koridor Pesisir Selatan & Geopark Gunung Sewu',
    terrainType: 'Pantai pasir putih Klayar & Teleng Ria, bentang karst Goa Gong, dan muara sungai Maron',
    mobilizationSla: 'Tim advance dan peralatan keselamatan standar UIAA/CE tiba H-1 untuk sterilisasi jalur pantai & karst',
  },
  kediri: {
    corridorName: 'Koridor Industri Brantas & Kediri Raya',
    terrainType: 'Kawasan lereng Gunung Kelud, sentra edukasi agrowisata, dan convention hall korporat',
    mobilizationSla: 'Penanganan khusus rombongan industri skala 100-500+ peserta dengan draf RAB & e-Faktur siap dalam 1x24 jam',
  },
  blitar: {
    corridorName: 'Koridor Brantas Selatan & Wisata Historis',
    terrainType: 'Kawasan edukasi Kampung Coklat, situs kebangsaan Bung Karno, dan pesisir selatan Tambakrejo',
    mobilizationSla: 'Koordinasi terpadu tiket masuk grup, manajemen parkir bus pariwisata, dan fasilitasi lapangan satu pintu',
  },
  tulungagung: {
    corridorName: 'Koridor Pesisir Selatan & Waduk Wonorejo',
    terrainType: 'Tepi Waduk Wonorejo, hamparan cemara Pantai Gemah, dan dataran tinggi Dholo',
    mobilizationSla: 'Survei teknis rute bus besar dan penyiapan pos medis P3K lapangan di area waduk maupun pantai',
  },
  trenggalek: {
    corridorName: 'Koridor Teluk Prigi & Pesisir Selatan',
    terrainType: 'Teluk tenang Pantai Prigi, Karanggongso, dan kawasan karst Goa Lowo',
    mobilizationSla: 'Pengamanan penuh aktivitas watersport & beach team building dengan rasio fasilitator 1:12 peserta',
  },
  jombang: {
    corridorName: 'Koridor Brantas Tengah & Pegunungan Wonosalam',
    terrainType: 'Agrowisata pegunungan Wonosalam dan taman edukasi terpadu Bale Tani',
    mobilizationSla: 'Akses langsung via Tol Trans-Jawa dengan opsi paket One Day maupun menginap di villa Wonosalam',
  },
  mojokerto: {
    corridorName: 'Koridor Pegunungan Welirang (Pacet & Trawas)',
    terrainType: 'Hutan pinus Pacet, resort pegunungan Trawas, dan jalur arung jeram/offroad',
    mobilizationSla: 'Kemitraan langsung dengan villa, hotel resort, dan operator rafting Pacet-Trawas berstandar keselamatan K3',
  },
  surabaya: {
    corridorName: 'Koridor Metropolitan Gerbangkertosusila',
    terrainType: 'Ballroom hotel bintang 4-5, taman urban pesisir Kenjeran, dan ruang terbuka hijau kota',
    mobilizationSla: 'Format high-impact 1 hari maupun in-house training tanpa mengganggu jam operasional kantor metropolitan',
  },
  sidoarjo: {
    corridorName: 'Koridor Industri Manufaktur Sidoarjo-Surabaya',
    terrainType: 'Kawasan rekreasi pemancingan grup, waterpark, dan aula pertemuan industri',
    mobilizationSla: 'Dirancang efisien untuk pergantian shift pabrik dan divisi operasional dengan pelaporan evaluasi HRD',
  },
  gresik: {
    corridorName: 'Koridor Industri Strategis & Pesisir Utara',
    terrainType: 'Kawasan ekowisata mangrove, edu-park Wego, dan fasilitas training center BUMN/industri',
    mobilizationSla: 'Kepatuhan penuh pada standar HSE/K3 industri berat, lengkap dengan dokumen SPJ/LPJ dan faktur pajak',
  },
  lamongan: {
    corridorName: 'Koridor Pantura Barat & Wisata Bahari',
    terrainType: 'Wahana terpadu WBL, Maharani Zoo, dan kawasan edukasi alam Wego',
    mobilizationSla: 'Manajemen tiket rombongan besar, katering higienis, dan skenario fun games keluarga karyawan',
  },
  tuban: {
    corridorName: 'Koridor Pantura & Pesisir Tuban',
    terrainType: 'Kawasan pesisir Pantai Boom, Goa Maharani, dan pusat pelatihan industri semen/energi',
    mobilizationSla: 'Penyusunan modul kolaborasi lintas departemen untuk perusahaan industri dan BUMD/OPD setempat',
  },
  bojonegoro: {
    corridorName: 'Koridor Lembah Bengawan Solo & Pusat Energi',
    terrainType: 'Situs geopark Kayangan Api, Waduk Pacal, dan kebun agrowisata belimbing',
    mobilizationSla: 'Mobilisasi cepat via jalur Ngawi-Bojonegoro dengan standar keselamatan K3 migas dan instansi publik',
  },
  malang: {
    corridorName: 'Koridor Pegunungan Malang Raya',
    terrainType: 'Hutan pinus Coban Rondo, Kebun Raya Purwodadi, dan resort lembah pegunungan',
    mobilizationSla: 'Penanganan end-to-end mencakup akomodasi resort, gala dinner, dokumentasi drone, dan fasilitasi Master Trainer',
  },
  batu: {
    corridorName: 'Koridor Wisata Premium Kota Batu',
    terrainType: 'Resort bintang 4-5, taman rekreasi Selecta/Jatim Park, dan hutan pinus Coban Talun',
    mobilizationSla: 'Kurasi venue eksklusif dengan jaminan aula indoor (Plan B) untuk mengantisipasi cuaca dingin dan hujan pegunungan',
  },
  pasuruan: {
    corridorName: 'Koridor Pegunungan Arjuno-Welirang (Prigen & Tretes)',
    terrainType: 'Hotel resort Tretes, Taman Safari Prigen, dan lapangan golf/outbound pegunungan',
    mobilizationSla: 'Spesialisasi leadership camp & executive retreat dengan fasilitas ballroom dan lapangan rumput privat',
  },
  probolinggo: {
    corridorName: 'Koridor Kaldera Tengger & Bromo',
    terrainType: 'Lautan pasir Gunung Bromo, hutan mangrove BJBR, dan danau vulkanik Ranu Agung',
    mobilizationSla: 'Manajemen armada Jeep 4x4, jaket/logistik suhu dingin, dan pengawalan medis P3K dataran tinggi',
  },
  lumajang: {
    corridorName: 'Koridor Lereng Semeru & Ranu Klakah',
    terrainType: 'Danau Ranu Klakah, kebun teh Kertowono, dan panorama air terjun Tumpak Sewu',
    mobilizationSla: 'Perencanaan rute aman ramah keluarga maupun petualangan tim dengan pemandu lapangan bersertifikat',
  },
  jember: {
    corridorName: 'Koridor Tapal Kuda Tengah & Pesisir Papuma',
    terrainType: 'Tanjung Pantai Papuma, Taman Botani Sukorambi, dan kawasan perkebunan Rembangan',
    mobilizationSla: 'Dukungan penuh untuk korporasi agribisnis, perbankan, perguruan tinggi, dan OPD se-karesidenan Besuki',
  },
  bondowoso: {
    corridorName: 'Koridor Dataran Tinggi Ijen & Kawah Wurung',
    terrainType: 'Savana Kawah Wurung, Puncak Megasari, dan perkebunan kopi dataran tinggi',
    mobilizationSla: 'Desain program executive problem solving & character building di lanskap savana pegunungan',
  },
  situbondo: {
    corridorName: 'Koridor Savana Baluran & Pesisir Pasir Putih',
    terrainType: 'Savana Bekol Taman Nasional Baluran, Pantai Pasir Putih, dan Waduk Bajulmati',
    mobilizationSla: 'Perizinan kawasan konservasi, manajemen konsumsi lapangan, dan pengamanan kegiatan korporat/dinas',
  },
  banyuwangi: {
    corridorName: 'Koridor Ujung Timur Jawa & Selat Bali',
    terrainType: 'Hutan trembesi De Djawatan, Marina Pantai Boom, dan kaki Gunung Ijen',
    mobilizationSla: 'Paket integrasi corporate gathering, gala dinner budaya Osing, dan team building eksklusif 2H1M/3H2M',
  },
  bangkalan: {
    corridorName: 'Koridor Madura Barat (Akses Jembatan Suramadu)',
    terrainType: 'Perbukitan kapur Bukit Jaddih, kawasan Mercusuar Sembilangan, dan pesisir Rongkang',
    mobilizationSla: 'Mobilisasi praktis dari Surabaya/Suramadu dengan penyesuaian jadwal waktu ibadah dan kearifan lokal Madura',
  },
  sampang: {
    corridorName: 'Koridor Pesisir Selatan Madura',
    terrainType: 'Hamparan Pantai Camplong dan kawasan pesisir Air Terjun Toroan',
    mobilizationSla: 'Pendampingan penyusunan dokumen RAB, SPJ/LPJ instansi daerah, dan modul peningkatan kinerja aparatur/BUMD',
  },
  pamekasan: {
    corridorName: 'Koridor Pendidikan & Pemerintahan Madura Tengah',
    terrainType: 'Kawasan wisata Api Tak Kunjung Padam, Pantai Jumiang, dan sentra eduwisata',
    mobilizationSla: 'Kurikulum khusus LDK OSIS, kemah karakter pelajar/santri, dan capacity building instansi pemerintah',
  },
  sumenep: {
    corridorName: 'Koridor Madura Timur & Kepulauan Bahari',
    terrainType: 'Pantai cemara udang Lombang, pulau bahari Gili Labak, dan kawasan Keraton Sumenep',
    mobilizationSla: 'Koordinasi transportasi darat-laut, standar keselamatan pelayaran pulau, dan tim medis P3K penuh',
  },
};

export const EAST_JAVA_WIKIDATA_URL = 'https://www.wikidata.org/wiki/Q3586';

// Verified Wikidata QIDs via live Wikidata Query Service (wd:Q3586 East Java)
export const CITY_WIKIDATA_QIDS: Record<string, string> = {
  madiun: 'Q11444',
  ponorogo: 'Q11118',
  magetan: 'Q11092',
  ngawi: 'Q11108',
  nganjuk: 'Q11098',
  pacitan: 'Q11111',
  kediri: 'Q11443',
  surabaya: 'Q11462',
  malang: 'Q11445',
  batu: 'Q11434',
  sidoarjo: 'Q11129',
  gresik: 'Q11077',
  mojokerto: 'Q11096',
  jombang: 'Q11082',
  jember: 'Q11080',
  banyuwangi: 'Q11067',
  probolinggo: 'Q11121',
  pasuruan: 'Q11115',
  trenggalek: 'Q11139',
  tulungagung: 'Q11143',
  blitar: 'Q11069',
  lamongan: 'Q11086',
  tuban: 'Q11141',
  bojonegoro: 'Q11071',
  bangkalan: 'Q11066',
  sampang: 'Q11127',
  pamekasan: 'Q11112',
  sumenep: 'Q11137',
  lumajang: 'Q11087',
  bondowoso: 'Q11076',
  situbondo: 'Q11134',
};

export function getCityWikidataUrl(cityKeyOrName: string): string | undefined {
  const normalized = cityKeyOrName
    .toLowerCase()
    .trim()
    .replace(/^(kota|kabupaten)\s+/, '')
    .replace(/\s+/g, '-');
  if (normalized === 'jawa-timur' || normalized === 'east-java') {
    return EAST_JAVA_WIKIDATA_URL;
  }
  const qid = CITY_WIKIDATA_QIDS[normalized];
  return qid ? `https://www.wikidata.org/wiki/${qid}` : undefined;
}

const LOCAL_PROOF: Record<string, string> = {
  madiun:
    'Rekam jejak lokal Madiun: Dipercaya oleh PT INKA (Persero) Madiun, SMA Negeri 1 Madiun, SMAN 2 Madiun, dan instansi daerah Madiun Raya dengan tingkat kepuasan 99% dan 0 insiden.',
  magetan:
    'Rekam jejak lokal Magetan & Sarangan: Menangani Kemah Besar & Outdoor Learning SMPN 1 Geger di Ndalem Prabu Sarangan serta agenda tahunan RS Karya Husada di lereng Lawu.',
  ponorogo:
    'Rekam jejak lokal Ponorogo: Mendampingi program corporate gathering dan team building Bank Jatim Ponorogo serta instansi pendidikan di kawasan Telaga Ngebel.',
  ngawi:
    'Rekam jejak lokal Ngawi: Menyelenggarakan capacity building dan penguatan sinergi pegawai bagi Dinas Kehutanan Ngawi serta instansi pemerintahan daerah.',
  pacitan:
    'Rekam jejak lokal Pacitan: Dipercaya BPR Pacitan untuk program corporate outing dan team building lintas unit dengan manajemen keselamatan lapangan penuh.',
  kediri:
    'Rekam jejak lokal Kediri: Menyelenggarakan program experiential learning pemecahan silo lintas divisi untuk tim HR Development Gudang Garam dan perusahaan industri Brantas.',
  surabaya:
    'Rekam jejak lokal Surabaya & Gerbangkertosusila: Dipercaya oleh Bank Jatim, Pemprov Jatim, Maspion Group, Kapal Api, Wings Group, dan Universitas Airlangga.',
  gresik:
    'Rekam jejak lokal Gresik: Dipercaya oleh korporasi industri besar termasuk Petrokimia Gresik dan Semen Indonesia untuk pelatihan kepemimpinan dan team building.',
  sidoarjo:
    'Rekam jejak lokal Sidoarjo: Melayani perusahaan manufaktur dan BUMN koridor Surabaya-Sidoarjo dengan eksekusi satu pintu dari mobilisasi armada hingga laporan evaluasi SDM.',
  malang:
    'Rekam jejak lokal Malang: Dipercaya Universitas Brawijaya serta rombongan korporat Jawa Timur untuk program retreat, indoor training, dan outbound dataran tinggi.',
  batu:
    'Rekam jejak lokal Kota Batu: Mengelola corporate gathering, gala dinner, dan outbound skala 30 hingga 500+ peserta dengan cadangan ballroom hotel bintang empat dan aula indoor.',
  mojokerto:
    'Kesiapan koridor Mojokerto (Pacet & Trawas): Jaringan langsung dengan resort pegunungan Welirang, operator rafting berstandar K3, dan aula Plan B untuk rombongan korporat Surabaya-Madiun.',
  jombang:
    'Kesiapan koridor Jombang & Wonosalam: Akses cepat exit Tol Trans-Jawa dengan opsi venue agrowisata Bale Tani dan villa retreat Wonosalam untuk agenda One Day maupun 2H1M.',
  nganjuk:
    'Kesiapan koridor Nganjuk: Mobilisasi 45 menit dari Basecamp Madiun via Tol Trans-Jawa untuk program outbound OPD, perbankan, dan sekolah di kawasan lereng Wilis serta Sedudo.',
  pasuruan:
    'Kesiapan koridor Pasuruan (Prigen & Tretes): Kurasi hotel resort berkapasitas besar untuk executive retreat, leadership training, dan family gathering skala 50-500+ peserta.',
  probolinggo:
    'Kesiapan koridor Probolinggo & Bromo: Pengelolaan terpadu armada Jeep 4x4, perlengkapan suhu dingin, dan pengawalan tim medis P3K untuk corporate adventure di Tengger dan BJBR.',
  jember:
    'Kesiapan koridor Jember & Tapal Kuda: Mendukung agenda capacity building perbankan, korporasi agribisnis, universitas, dan OPD di Pantai Papuma, Taman Botani, dan Rembangan.',
  banyuwangi:
    'Kesiapan koridor Banyuwangi: Manajemen penuh program gathering multi-hari (2H1M/3H2M) yang memadukan team building di De Djawatan, Pantai Boom, dan gala dinner korporat.',
  blitar:
    'Kesiapan koridor Blitar: Koordinasi satu pintu tiket rombongan, manajemen bus pariwisata, dan fasilitasi outbound karakter di kawasan Kampung Coklat serta destinasi historis.',
  tulungagung:
    'Kesiapan koridor Tulungagung: Penataan rute bus besar dan pos medis lapangan untuk program team building korporat dan sekolah di Waduk Wonorejo serta Pantai Gemah.',
  trenggalek:
    'Kesiapan koridor Trenggalek: Rasio fasilitator 1:12 dan prosedur pengamanan pesisir ketat untuk agenda outing dan team building di kawasan Teluk Prigi dan Karanggongso.',
};

export function getCityOperationalProfile(cityKey: string): CityOperationalProfile {
  const normalized = cityKey.toLowerCase().trim();
  const city = CITIES[normalized] || CITIES.madiun;
  const venueList = city.popularVenues.join(', ');
  const base = CORRIDOR_MAP[normalized] || CORRIDOR_MAP.madiun;
  const localProof =
    LOCAL_PROOF[normalized] ||
    `Rekam jejak koridor ${city.name}: Bagian dari cakupan resmi 250+ klien perusahaan, BUMN, instansi pemerintah, dan sekolah Growth Indonesia (15.000+ peserta) se-Jawa Timur dengan 0 insiden keselamatan.`;

  return {
    corridorName: base.corridorName,
    terrainType: base.terrainType,
    mobilizationSla: base.mobilizationSla,
    planBContingency: `Garansi Plan B Cuaca: Setiap pelaksanaan di ${city.name} (${venueList}) dilengkapi reservasi cadangan aula indoor atau pendopo semi-outdoor representatif agar agenda tetap berjalan 100% sesuai rundown meskipun turun hujan.`,
    localProof,
    institutionalSegments: {
      corporate: `Korporat & BUMN di ${city.name}: Kurikulum berbasis Training Need Analysis (TNA), simulasi sinergi lintas divisi, serta Laporan Evaluasi Performa SDM tertulis untuk HRD dan manajemen.`,
      government: `Instansi Pemerintah & OPD di ${city.name}: Penguatan kapasitas aparatur dan rapat kerja satu pintu dengan rincian RAB transparan, kepatuhan pajak/e-Faktur, serta kelengkapan dokumen LPJ/SPJ.`,
      education: `Sekolah & Kampus di ${city.name}: Program LDK OSIS, kemah karakter, dan kepemimpinan pelajar bebas perpeloncoan dengan pengawasan ketat K3 lapangan dan tim medis P3K.`,
    },
  };
}
