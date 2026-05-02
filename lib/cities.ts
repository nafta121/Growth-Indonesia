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
