'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'motion/react';
import { Send, User, Building2, Phone, Calendar, CheckCircle2, MessageSquare } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type FormData = {
  name: string;
  company: string;
  whatsapp: string;
  package: string;
  date: string;
};

const PACKAGES = [
  { id: 'fun-game', label: 'Fun Game (Rp 100k/pax)' },
  { id: 'team-building', label: 'Team Building (Rp 250k/pax)' },
  { id: 'ldk-osis', label: 'LDK OSIS (Rp 250k/pax)' },
];

export default function Contact({ initialPackage }: { initialPackage?: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      package: initialPackage || ''
    }
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Format message for WhatsApp
    const message = `Halo Growth Indonesia, saya ingin konsultasi program outbound:
    
Nama: ${data.name}
Instansi: ${data.company}
WhatsApp: ${data.whatsapp}
Program: ${PACKAGES.find(p => p.id === data.package)?.label}
Rencana Tanggal: ${data.date || 'Belum ditentukan'}

Mohon informasi lebih lanjut. Terima kasih.`;

    // Open WhatsApp
    window.open(`https://wa.me/6285704748186?text=${encodeURIComponent(message)}`, '_blank');
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <section id="kontak" className="py-20 md:py-32 bg-slate-50 relative overflow-hidden" aria-labelledby="kontak-title">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#0A1628] rounded-l-[100px] opacity-5 md:opacity-10 pointer-events-none transform translate-x-1/3" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#EF4444]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Content */}
          <div className="space-y-8 md:space-y-12">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#EF4444]/10 text-[#EF4444] font-bold text-sm tracking-widest uppercase mb-6">
                <MessageSquare className="w-4 h-4" />
                <span>Mari Berdiskusi</span>
              </div>
              <h2 id="kontak-title" className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-[#0A1628] leading-[1.1] tracking-tight">
                Siap Transformasi <br/><span className="text-[#EF4444] relative inline-block mt-2">
                  Tim Anda?
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 20" preserveAspectRatio="none">
                    <path d="M0 10 Q 50 20 100 10" fill="none" stroke="#EF4444" strokeWidth="4" strokeLinecap="round" className="animate-[dash_2s_ease-in-out_infinite] opacity-30" />
                  </svg>
                </span>
              </h2>
            </div>

            <p className="text-gray-600 text-lg leading-relaxed max-w-lg font-medium">
              Konsultasikan kebutuhan spesifik instansi Anda. Tim ahli kami siap merancang program outbound dan team building yang paling efektif.
            </p>

            <div className="space-y-6">
              {[
                { title: 'Konsultasi Gratis', desc: 'Diskusi awal tanpa komitmen apapun.' },
                { title: 'Custom Program', desc: 'Materi disesuaikan dengan goals perusahaan.' },
                { title: 'Respon Cepat', desc: 'Dibalas dalam waktu kurang dari 1 jam pada jam kerja.' },
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="flex gap-5 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-lg border border-gray-100 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-[#EF4444] transition-all duration-300">
                    <CheckCircle2 className="w-6 h-6 text-[#EF4444] group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-1">{feature.title}</h3>
                    <p className="text-gray-500 text-sm">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#EF4444]/20 to-blue-500/20 blur-3xl -z-10 rounded-full transform translate-y-10" />

            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white p-8 md:p-10 lg:p-12 rounded-[2.5rem] md:rounded-[3rem] shadow-2xl border border-gray-100 relative"
                >
                  <div className="absolute top-8 right-8 text-gray-300 hidden sm:block">
                    <svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 20 L80 20 L80 80 L20 80 Z" stroke="currentColor" strokeWidth="2" strokeDasharray="5 5" />
                      <circle cx="50" cy="50" r="10" fill="currentColor" />
                    </svg>
                  </div>

                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-2 h-2 rounded-full bg-[#EF4444] animate-pulse" />
                      <span className="text-[10px] text-gray-600 font-extrabold uppercase tracking-widest">Growth Intake</span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden p-[2px]" aria-hidden="true">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: isValid ? '100%' : '50%' }}
                        transition={{ type: "spring", stiffness: 100 }}
                        className="h-full bg-[#EF4444] rounded-full" 
                      />
                    </div>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 md:space-y-6" aria-labelledby="kontak-form-title">
                    <h3 id="kontak-form-title" className="sr-only">Formulir Kontak</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-xs font-bold text-gray-900 uppercase tracking-widest flex items-center gap-2 px-1">
                          <User className="w-3.5 h-3.5 text-[#EF4444]" aria-hidden="true" /> Nama Lengkap
                        </label>
                        <Input
                          id="name"
                          type="text"
                          {...register("name", { required: "Nama lengkap wajib diisi" })}
                          placeholder="John Doe"
                          error={!!errors.name}
                          aria-invalid={!!errors.name}
                          aria-describedby={errors.name ? "name-error" : undefined}
                        />
                        {errors.name && <span id="name-error" className="text-xs text-red-500 mt-1 block px-1" role="alert">{errors.name.message}</span>}
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="company" className="text-xs font-bold text-gray-900 uppercase tracking-widest flex items-center gap-2 px-1">
                          <Building2 className="w-3.5 h-3.5 text-[#EF4444]" aria-hidden="true" /> Instansi
                        </label>
                        <Input
                          id="company"
                          type="text"
                          {...register("company", { required: "Instansi wajib diisi" })}
                          placeholder="PT Growth Indonesia"
                          error={!!errors.company}
                          aria-invalid={!!errors.company}
                          aria-describedby={errors.company ? "company-error" : undefined}
                        />
                        {errors.company && <span id="company-error" className="text-xs text-red-500 mt-1 block px-1" role="alert">{errors.company.message}</span>}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="whatsapp" className="text-xs font-bold text-gray-900 uppercase tracking-widest flex items-center gap-2 px-1">
                        <Phone className="w-3.5 h-3.5 text-[#EF4444]" aria-hidden="true" /> WhatsApp
                      </label>
                      <Input
                        id="whatsapp"
                        type="tel"
                        {...register("whatsapp", { 
                          required: "Nomor WhatsApp wajib diisi",
                          minLength: { value: 10, message: "Minimal 10 angka" }
                        })}
                        placeholder="+62 8xx-xxxx-xxxx"
                        error={!!errors.whatsapp}
                        aria-invalid={!!errors.whatsapp}
                        aria-describedby={errors.whatsapp ? "whatsapp-error" : undefined}
                      />
                      {errors.whatsapp && <span id="whatsapp-error" className="text-xs text-red-500 mt-1 block px-1" role="alert">{errors.whatsapp.message}</span>}
                    </div>

                    <div className="space-y-2 relative">
                      <label htmlFor="package" className="text-xs font-bold text-gray-900 uppercase tracking-widest flex items-center gap-2 px-1">
                        Program
                      </label>
                      <select
                        id="package"
                        {...register("package", { required: "Program wajib dipilih" })}
                        className="w-full h-14 md:h-16 px-6 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#EF4444]/10 focus:border-[#EF4444] outline-none transition-all duration-300 text-sm md:text-base font-medium appearance-none cursor-pointer"
                        aria-invalid={!!errors.package}
                        aria-describedby={errors.package ? "package-error" : undefined}
                      >
                        <option value="" disabled>Pilih Program...</option>
                        {PACKAGES.map((pkg) => (
                          <option key={pkg.id} value={pkg.id}>{pkg.label}</option>
                        ))}
                      </select>
                      <div className="absolute right-6 bottom-[19px] pointer-events-none md:bottom-[23px] text-gray-600" aria-hidden="true">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      {errors.package && <span id="package-error" className="text-xs text-red-500 mt-1 block px-1" role="alert">{errors.package.message}</span>}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="date" className="text-xs font-bold text-gray-900 uppercase tracking-widest flex items-center gap-2 px-1">
                        <Calendar className="w-3.5 h-3.5 text-[#EF4444]" aria-hidden="true" /> Rencana Tanggal
                      </label>
                      <Input
                        id="date"
                        type="date"
                        {...register("date")}
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      size="lg"
                      className="w-full mt-4 flex items-center justify-center gap-3"
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div 
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                            aria-hidden="true"
                          />
                          <span>Mengirim...</span>
                        </>
                      ) : (
                        <>
                          Kirim Reservasi
                          <Send className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" />
                        </>
                      )}
                    </Button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-[#0A1628] p-10 md:p-14 lg:p-16 rounded-[3rem] md:rounded-[4rem] border border-white/10 text-center shadow-2xl relative overflow-hidden group"
                  role="status"
                >
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#EF4444]/10 rounded-full blur-[100px] -z-10 group-hover:bg-[#EF4444]/20 transition-all duration-700" />
                  
                  <div className="relative z-10">
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", damping: 15, stiffness: 200, delay: 0.2 }}
                      className="w-20 h-20 md:w-24 md:h-24 bg-[#EF4444] rounded-full mx-auto flex items-center justify-center mb-8 shadow-2xl shadow-[#EF4444]/40"
                    >
                      <CheckCircle2 className="w-10 h-10 md:w-12 md:h-12 text-white" aria-hidden="true" />
                    </motion.div>
                    
                    <h3 className="font-display text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">Terima Kasih!</h3>
                    <p className="text-gray-400 mb-12 text-base md:text-lg leading-relaxed max-w-sm mx-auto">Pesanan Anda telah kami terima. Tim Growth akan menghubungi Anda segera melalui WhatsApp.</p>
                    
                    <div className="space-y-6 text-left max-w-sm mx-auto bg-white/5 p-8 rounded-3xl border border-white/10">
                      <h4 className="text-[10px] font-extrabold text-[#EF4444] uppercase tracking-[0.3em] text-center mb-6">What Happens Next</h4>
                      {[
                        { step: 1, title: 'Check Availability', desc: 'Kami memverifikasi jadwal pilihan Anda.' },
                        { step: 2, title: 'Growth Call', desc: 'Diskusi strategi program via WhatsApp.' },
                        { step: 3, title: 'Final Proposal', desc: 'Penawaran resmi dengan rincian biaya.' }
                      ].map((s, i) => (
                        <motion.div 
                          key={s.step} 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + i * 0.1 }}
                          className="flex gap-5"
                        >
                          <div className="w-6 h-6 rounded-full bg-[#EF4444]/20 flex items-center justify-center text-[10px] font-bold text-[#EF4444] shrink-0 mt-1 border border-[#EF4444]/20" aria-hidden="true">
                            {s.step}
                          </div>
                          <div>
                            <h5 className="text-white font-bold text-sm tracking-tight">{s.title}</h5>
                            <p className="text-gray-500 text-xs leading-relaxed">{s.desc}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <button 
                      onClick={() => setIsSubmitted(false)}
                      className="mt-12 text-gray-500 hover:text-[#EF4444] transition-colors text-[10px] font-bold uppercase tracking-[0.2em] underline underline-offset-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF4444] rounded"
                    >
                      Kirim Pesan Lain
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
