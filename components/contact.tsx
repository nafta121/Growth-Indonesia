'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Phone, MessageCircle, Send, CheckCircle2, Calendar, Building2, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useForm } from 'react-hook-form';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ContactProps {
  initialPackage?: string;
}

const PACKAGES = [
  { id: 'leaders', label: 'GROWTH LEADERS TRAINING' },
  { id: 'generation', label: 'GROWTH GENERATION' },
  { id: 'fun', label: "FUN, PLAY 'N GROW" },
  { id: 'other', label: 'Other / Custom Development' },
];

type FormData = {
  name: string;
  company: string;
  whatsapp: string;
  package: string;
  date: string;
};

export default function Contact({ initialPackage }: ContactProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { register, handleSubmit, formState: { errors, isValid, isSubmitting }, setValue } = useForm<FormData>({
    defaultValues: { package: initialPackage || '' },
    mode: "onChange"
  });

  useEffect(() => {
    if (initialPackage) {
      setValue('package', initialPackage);
    }
  }, [initialPackage, setValue]);

  const onSubmit = async (data: FormData) => {
    // Construction of WhatsApp message
    const selectedPkg = PACKAGES.find(p => p.id === data.package)?.label || data.package;
    const message = `Halo tim GROWTH INDONESIA, saya berminat untuk reservasi program:

Nama: ${data.name}
Instansi/Perusahaan: ${data.company}
Paket Pilihan: ${selectedPkg}
Rencana Tanggal: ${data.date || 'TBC'}`;

    const encodedMessage = encodeURIComponent(message);
    
    // Brief artificial delay for "loading" feel as requested
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Redirect to WhatsApp
    window.open(`https://wa.me/6285704748186?text=${encodedMessage}`, '_blank');
    
    setIsSubmitted(true);
  };

  return (
    <section id="kontak" className="py-20 md:py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          {/* Left Side: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:sticky lg:top-32"
          >
            <Badge className="mb-4">Get In Touch</Badge>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.1] mb-8">
              Siap untuk <span className="text-[#EF4444]">Bertransformasi?</span>
            </h2>
            <p className="text-gray-500 text-base md:text-lg leading-relaxed mb-12 max-w-xl">
              Hubungi kami hari ini untuk konsultasi gratis dan temukan bagaimana kami dapat membantu tim Anda mencapai potensi maksimalnya melalui pengalaman outbound yang transformatif.
            </p>

            <div className="space-y-6 md:space-y-8">
              <a 
                href="https://maps.app.goo.gl/s5sLVajjti61reWw8?g_st=ac"
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-5 md:gap-7 group items-center p-4 -ml-4 rounded-3xl hover:bg-gray-50 transition-all duration-300"
                aria-label="Lihat lokasi Growth Indonesia di Google Maps"
              >
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl md:rounded-[1.5rem] bg-gray-50 flex items-center justify-center text-[#EF4444] group-hover:bg-[#EF4444] group-hover:text-white transition-all duration-500 shadow-sm">
                  <MapPin className="w-6 h-6 md:w-7 md:h-7" />
                </div>
                <div>
                  <h3 className="font-extrabold text-gray-900 mb-1 uppercase tracking-tight text-sm md:text-base">Kantor Pusat</h3>
                  <address className="not-italic text-gray-500 group-hover:text-gray-900 transition-colors duration-300 text-sm md:text-base leading-snug">
                    Jl. Mujair No.3, Nambangan Kidul,<br className="hidden md:block" /> Kota Madiun, Jawa Timur
                  </address>
                </div>
              </a>

              <a 
                href="https://wa.me/6285704748186"
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-5 md:gap-7 group items-center p-4 -ml-4 rounded-3xl hover:bg-gray-50 transition-all duration-300"
                aria-label="Hubungi Growth Indonesia via WhatsApp"
              >
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl md:rounded-[1.5rem] bg-gray-50 flex items-center justify-center text-[#EF4444] group-hover:bg-[#EF4444] group-hover:text-white transition-all duration-500 shadow-sm">
                  <Phone className="w-6 h-6 md:w-7 md:h-7" />
                </div>
                <div>
                  <h3 className="font-extrabold text-gray-900 mb-1 uppercase tracking-tight text-sm md:text-base">WhatsApp & Telepon</h3>
                  <p className="text-gray-500 group-hover:text-gray-900 transition-colors duration-300 text-sm md:text-base font-bold">+62 857-0474-8186</p>
                </div>
              </a>

              <a 
                href="mailto:info@growthindonesia.my.id"
                className="flex gap-5 md:gap-7 group items-center p-4 -ml-4 rounded-3xl hover:bg-gray-50 transition-all duration-300 focus:outline-none"
                aria-label="Kirim email ke Growth Indonesia"
              >
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl md:rounded-[1.5rem] bg-gray-50 flex items-center justify-center text-[#EF4444] group-hover:bg-[#EF4444] group-hover:text-white transition-all duration-500 shadow-sm">
                  <MessageCircle className="w-6 h-6 md:w-7 md:h-7" />
                </div>
                <div>
                  <h3 className="font-extrabold text-gray-900 mb-1 uppercase tracking-tight text-sm md:text-base">Email Resmi</h3>
                  <p className="text-gray-500 group-hover:text-gray-900 transition-colors duration-300 text-sm md:text-base border-b border-transparent group-hover:border-gray-200">info@growthindonesia.my.id</p>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Right Side: Lead Generation Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-gray-50 p-6 md:p-10 lg:p-12 rounded-[2.5rem] md:rounded-[3.5rem] border border-gray-100 shadow-sm active:shadow-md transition-shadow duration-500"
                >
                  <div className="mb-10">
                    <div className="flex justify-between items-end mb-3">
                       <h3 id="kontak-form-title" className="text-[10px] font-extrabold text-[#EF4444] uppercase tracking-[0.3em]">Booking Form</h3>
                      <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest">Growth Intake</span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden p-[2px]">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: isValid ? '100%' : '50%' }}
                        transition={{ type: "spring", stiffness: 100 }}
                        className="h-full bg-[#EF4444] rounded-full" 
                      />
                    </div>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 md:space-y-6" aria-labelledby="kontak-form-title">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-xs font-bold text-gray-900 uppercase tracking-widest flex items-center gap-2 px-1">
                          <User className="w-3.5 h-3.5 text-[#EF4444]" /> Nama Lengkap
                        </label>
                        <input
                          id="name"
                          type="text"
                          {...register("name", { required: "Nama lengkap wajib diisi" })}
                          placeholder="John Doe"
                          className="w-full h-14 md:h-16 px-6 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#EF4444]/10 focus:border-[#EF4444] outline-none transition-all duration-300 text-sm md:text-base font-medium placeholder:text-gray-300"
                        />
                        {errors.name && <span className="text-xs text-red-500 mt-1 block px-1">{errors.name.message}</span>}
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="company" className="text-xs font-bold text-gray-900 uppercase tracking-widest flex items-center gap-2 px-1">
                          <Building2 className="w-3.5 h-3.5 text-[#EF4444]" /> Instansi
                        </label>
                        <input
                          id="company"
                          type="text"
                          {...register("company", { required: "Instansi wajib diisi" })}
                          placeholder="PT Growth Indonesia"
                          className="w-full h-14 md:h-16 px-6 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#EF4444]/10 focus:border-[#EF4444] outline-none transition-all duration-300 text-sm md:text-base font-medium placeholder:text-gray-300"
                        />
                        {errors.company && <span className="text-xs text-red-500 mt-1 block px-1">{errors.company.message}</span>}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="whatsapp" className="text-xs font-bold text-gray-900 uppercase tracking-widest flex items-center gap-2 px-1">
                        <Phone className="w-3.5 h-3.5 text-[#EF4444]" /> WhatsApp
                      </label>
                      <input
                        id="whatsapp"
                        type="tel"
                        {...register("whatsapp", { 
                          required: "Nomor WhatsApp wajib diisi",
                          minLength: { value: 10, message: "Minimal 10 angka" }
                        })}
                        placeholder="+62 8xx-xxxx-xxxx"
                        className={cn(
                          "w-full h-14 md:h-16 px-6 bg-white border rounded-2xl focus:ring-2 focus:ring-[#EF4444]/10 focus:border-[#EF4444] outline-none transition-all duration-300 text-sm md:text-base font-medium placeholder:text-gray-300",
                          errors.whatsapp ? "border-red-500 bg-red-50/10" : "border-gray-200"
                        )}
                      />
                      {errors.whatsapp && <span className="text-xs text-red-500 mt-1 block px-1">{errors.whatsapp.message}</span>}
                    </div>

                    <div className="space-y-2 relative">
                      <label htmlFor="package" className="text-xs font-bold text-gray-900 uppercase tracking-widest flex items-center gap-2 px-1">
                        Program
                      </label>
                      <select
                        id="package"
                        {...register("package", { required: "Program wajib dipilih" })}
                        className="w-full h-14 md:h-16 px-6 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#EF4444]/10 focus:border-[#EF4444] outline-none transition-all duration-300 text-sm md:text-base font-medium appearance-none cursor-pointer"
                      >
                        <option value="" disabled>Pilih Program...</option>
                        {PACKAGES.map((pkg) => (
                          <option key={pkg.id} value={pkg.id}>{pkg.label}</option>
                        ))}
                      </select>
                      <div className="absolute right-6 bottom-[19px] pointer-events-none md:bottom-[23px] text-gray-400">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      {errors.package && <span className="text-xs text-red-500 mt-1 block px-1">{errors.package.message}</span>}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="date" className="text-xs font-bold text-gray-900 uppercase tracking-widest flex items-center gap-2 px-1">
                        <Calendar className="w-3.5 h-3.5 text-[#EF4444]" /> Rencana Tanggal
                      </label>
                      <input
                        id="date"
                        type="date"
                        {...register("date")}
                        className="w-full h-14 md:h-16 px-6 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#EF4444]/10 focus:border-[#EF4444] outline-none transition-all duration-300 text-sm md:text-base font-medium"
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
                          />
                          <span>Mengirim...</span>
                        </>
                      ) : (
                        <>
                          Kirim Reservasi
                          <Send className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
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
                >
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#EF4444]/10 rounded-full blur-[100px] -z-10 group-hover:bg-[#EF4444]/20 transition-all duration-700" />
                  
                  <div className="relative z-10">
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", damping: 15, stiffness: 200, delay: 0.2 }}
                      className="w-20 h-20 md:w-24 md:h-24 bg-[#EF4444] rounded-full mx-auto flex items-center justify-center mb-8 shadow-2xl shadow-[#EF4444]/40"
                    >
                      <CheckCircle2 className="w-10 h-10 md:w-12 md:h-12 text-white" />
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
                          <div className="w-6 h-6 rounded-full bg-[#EF4444]/20 flex items-center justify-center text-[10px] font-bold text-[#EF4444] shrink-0 mt-1 border border-[#EF4444]/20">
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
                      className="mt-12 text-gray-500 hover:text-[#EF4444] transition-colors text-[10px] font-bold uppercase tracking-[0.2em] underline underline-offset-8"
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
