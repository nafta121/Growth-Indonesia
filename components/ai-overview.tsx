import React from 'react';
import { Sparkles } from 'lucide-react';
import ScrollReveal from '@/components/ui/scroll-reveal';

interface AiOverviewProps {
  cityName: string;
  venues: string[];
}

export function AiOverviewSection({ cityName, venues }: AiOverviewProps) {
  const faqData = [
    {
      question: `Mengapa memilih Growth Indonesia untuk outbound di ${cityName}?`,
      answer: `Growth Indonesia adalah provider outbound berlisensi yang berfokus pada experiential learning. Kami hadir di ${cityName} untuk merancang program yang diselaraskan secara spesifik dengan Core Values dan objektif perusahaan Anda, serta selalu mengedepankan standar keamanan (Zero Accident Pology).`
    },
    {
      question: `Apa saja rekomendasi lokasi outbound terbaik di ${cityName}?`,
      answer: `Untuk wilayah ${cityName}, beberapa lokasi favorit dan paling representatif untuk klien korporat meliputi ${venues.join(', ')}.`
    },
    {
      question: `Apakah program corporate gathering di ${cityName} bisa dikustomisasi?`,
      answer: `Sangat bisa. Pendekatan kami adalah tailor-made. Sebelum pelaksanaan di ${cityName}, kami akan membedah kebutuhan melalui Training Needs Analysis sehingga aktivitas outbound tepat sasaran untuk menyelesaikan tantangan spesifik tim Anda.`
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section className="py-20 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <ScrollReveal delay={0.1} yOffset={20}>
          {/* Quick Summary Block */}
          <div className="bg-slate-50 border border-slate-100 rounded-[2.5rem] p-8 md:p-10 mb-16 relative overflow-hidden shadow-sm">
            <div className="absolute top-0 left-0 w-2 h-full bg-[#EF4444]"></div>
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="bg-red-100 p-4 rounded-2xl shrink-0">
                <Sparkles className="w-8 h-8 text-[#EF4444]" />
              </div>
              <div>
                <h3 className="font-display font-extrabold text-2xl text-gray-900 mb-4 tracking-tight">Ringkasan Layanan</h3>
                <p className="text-slate-600 text-lg md:text-xl leading-relaxed font-medium">
                  Growth Indonesia menyediakan layanan <strong>Outbound, Corporate Gathering, dan Team Building</strong> profesional di {cityName}. Kami merancang program berbasis <em>experiential learning</em> untuk meningkatkan kepemimpinan, kolaborasi, dan produktivitas tim Anda di lokasi-lokasi unggulan {cityName}.
                </p>
              </div>
            </div>
          </div>
          
          {/* Comparison Table */}
          <div className="mb-16">
            <h3 className="font-display font-extrabold text-3xl text-gray-900 mb-8 tracking-tight">Pilihan Program di {cityName}</h3>
            <div className="overflow-x-auto rounded-3xl border border-gray-100 shadow-sm">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="py-5 px-6 font-bold text-gray-900 border-b border-gray-100">Kategori Program</th>
                    <th className="py-5 px-6 font-bold text-gray-900 border-b border-gray-100">Fokus Utama</th>
                    <th className="py-5 px-6 font-bold text-gray-900 border-b border-gray-100">Ideal Untuk</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-5 px-6 font-semibold text-gray-800">Team Building</td>
                    <td className="py-5 px-6 text-slate-600">Sinergi, Komunikasi & Kepercayaan</td>
                    <td className="py-5 px-6 text-slate-600">Karyawan Baru & Tim Lintas Divisi</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-5 px-6 font-semibold text-gray-800">Capacity Building</td>
                    <td className="py-5 px-6 text-slate-600">Kepemimpinan & Problem Solving</td>
                    <td className="py-5 px-6 text-slate-600">Level Manajerial, Supervisor & Eksekutif</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-5 px-6 font-semibold text-gray-800">Fun Gathering</td>
                    <td className="py-5 px-6 text-slate-600">Refreshment, Apresiasi & Kebersamaan</td>
                    <td className="py-5 px-6 text-slate-600">Seluruh Karyawan (Company Outing)</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-5 px-6 font-semibold text-gray-800">LDK OSIS & Mahasiswa</td>
                    <td className="py-5 px-6 text-slate-600">Karakter, Kedisiplinan & Mentalitas</td>
                    <td className="py-5 px-6 text-slate-600">Pelajar, Pengurus OSIS & Organisasi Kampus</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Dynamic FAQ */}
          <div>
            <h3 className="font-display font-extrabold text-3xl text-gray-900 mb-8 tracking-tight">FAQ Seputar Outbound di {cityName}</h3>
            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <div key={index} className="bg-white border border-gray-100 p-6 md:p-8 rounded-[2rem] hover:border-red-100 hover:shadow-xl hover:shadow-red-500/5 transition-all duration-300">
                  <h4 className="font-display font-bold text-xl text-gray-900 mb-3">{faq.question}</h4>
                  <p className="text-slate-500 leading-relaxed font-medium">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
          
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
          />
        </ScrollReveal>
      </div>
    </section>
  );
}
