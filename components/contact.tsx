'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Phone, MessageCircle, Send, CheckCircle2, Calendar, Building2, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ContactProps {
  initialPackage?: string;
}

const PACKAGES = [
  { id: 'leaders', label: 'GROWTH LEADERS TRAINING' },
  { id: 'generation', label: 'GROWTH GENERATION' },
  { id: 'fun', label: "FUN, PLAY 'N GROW" },
  { id: 'other', label: 'Other / Custom Development' },
];

export default function Contact({ initialPackage }: ContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    whatsapp: '',
    package: initialPackage || '',
    date: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (initialPackage) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData((prev) => ({ ...prev, package: initialPackage }));
    }
  }, [initialPackage]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const isFormValid = formData.name && formData.company && formData.whatsapp && formData.package;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      setIsLoading(true);
      
      // Construction of WhatsApp message
      const selectedPkg = PACKAGES.find(p => p.id === formData.package)?.label || formData.package;
      const message = `Halo tim GROWTH INDONESIA, saya berminat untuk reservasi program:

Nama: ${formData.name}
Instansi/Perusahaan: ${formData.company}
Paket Pilihan: ${selectedPkg}
Rencana Tanggal: ${formData.date || 'TBC'}`;

      const encodedMessage = encodeURIComponent(message);
      
      // Brief artificial delay for "loading" feel as requested
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to WhatsApp
      window.open(`https://wa.me/6285704748186?text=${encodedMessage}`, '_blank');
      
      setIsLoading(false);
      setIsSubmitted(true);
    }
  };

  return (
    <section id="kontak" className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Left Side: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block mb-4 text-[#EF4444] font-bold uppercase tracking-widest text-xs">Get In Touch</span>
            <h2 className="font-display text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-8">
              Siap untuk <span className="text-[#EF4444]">Bertransformasi?</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-12">
              Hubungi kami hari ini untuk konsultasi gratis dan temukan bagaimana kami dapat membantu tim Anda mencapai potensi maksimalnya.
            </p>

            <div className="space-y-8">
              <div className="flex gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-[#EF4444] group-hover:bg-[#EF4444] group-hover:text-white transition-all duration-300">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Kantor Pusat</h4>
                  <p className="text-gray-600">Jl. Mujair No.3, Nambangan Kidul,<br />Kota Madiun, Jawa Timur</p>
                </div>
              </div>

              <div className="flex gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-[#EF4444] group-hover:bg-[#EF4444] group-hover:text-white transition-all duration-300">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">WhatsApp & Telepon</h4>
                  <p className="text-gray-600">+62 857-0474-8186</p>
                </div>
              </div>

              <div className="flex gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-[#EF4444] group-hover:bg-[#EF4444] group-hover:text-white transition-all duration-300">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Email Resmi</h4>
                  <p className="text-gray-600">info@growthindonesia.id</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Lead Generation Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-gray-50 p-8 md:p-12 rounded-[2.5rem] border border-gray-100 shadow-sm"
                >
                  <div className="mb-8">
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-xs font-bold text-[#EF4444] uppercase tracking-widest">Booking Form</span>
                      <span className="text-[10px] text-gray-400 font-bold">STEP 1 OF 2</span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: isFormValid ? '100%' : '50%' }}
                        className="h-full bg-[#EF4444]" 
                      />
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-400" /> Nama Lengkap
                        </label>
                        <input
                          required
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          className="w-full px-5 py-4 bg-gray-50/50 border border-gray-300 rounded-xl focus:ring-1 focus:ring-[#EF4444] focus:border-[#EF4444] outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-gray-400" /> Perusahaan / Instansi
                        </label>
                        <input
                          required
                          name="company"
                          type="text"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="PT Growth Indonesia"
                          className="w-full px-5 py-4 bg-gray-50/50 border border-gray-300 rounded-xl focus:ring-1 focus:ring-[#EF4444] focus:border-[#EF4444] outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-400" /> Nomor WhatsApp
                      </label>
                      <input
                        required
                        name="whatsapp"
                        type="tel"
                        value={formData.whatsapp}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="+62 8xx-xxxx-xxxx"
                        className={cn(
                          "w-full px-5 py-4 bg-gray-50/50 border rounded-xl focus:ring-1 focus:ring-[#EF4444] focus:border-[#EF4444] outline-none transition-all",
                          touched.whatsapp && formData.whatsapp.length < 10 ? "border-red-400" : "border-gray-300"
                        )}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                        Pilih Paket Program
                      </label>
                      <select
                        required
                        name="package"
                        value={formData.package}
                        onChange={handleChange}
                        className="w-full px-5 py-4 bg-gray-50/50 border border-gray-300 rounded-xl focus:ring-1 focus:ring-[#EF4444] focus:border-[#EF4444] outline-none transition-all appearance-none"
                      >
                        <option value="" disabled>Pilih salah satu...</option>
                        {PACKAGES.map((pkg) => (
                          <option key={pkg.id} value={pkg.id}>{pkg.label}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" /> Rencana Tanggal Kegiatan
                      </label>
                      <input
                        name="date"
                        type="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full px-5 py-4 bg-gray-50/50 border border-gray-300 rounded-xl focus:ring-1 focus:ring-[#EF4444] focus:border-[#EF4444] outline-none transition-all"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className={cn(
                        "w-full py-5 rounded-2xl font-black text-white uppercase tracking-widest flex items-center justify-center gap-3 transition-all relative overflow-hidden bg-[#EF4444] hover:bg-[#d63d3d] hover:shadow-xl hover:shadow-[#EF4444]/30 active:scale-95",
                        !isFormValid && !isLoading && "opacity-80 cursor-not-allowed hover:bg-[#EF4444] hover:shadow-none"
                      )}
                    >
                      {isLoading ? (
                        <>
                          <motion.div 
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                          />
                          <span>Memproses...</span>
                        </>
                      ) : (
                        <>
                          Kirim Pesanan
                          <Send className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-[#0A1628] p-10 md:p-14 rounded-[2.5rem] border border-white/10 text-center shadow-2xl relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#EF4444]/10 rounded-full blur-3xl" />
                  
                  <div className="relative z-10">
                    <div className="w-20 h-20 bg-[#EF4444] rounded-full mx-auto flex items-center justify-center mb-8 shadow-lg shadow-[#EF4444]/40">
                      <CheckCircle2 className="w-10 h-10 text-white" />
                    </div>
                    
                    <h3 className="font-display text-4xl font-black text-white mb-4">Terima Kasih!</h3>
                    <p className="text-gray-400 mb-12">Pesanan Anda telah kami terima. Tim kami akan menghubungi Anda segera melalui WhatsApp.</p>
                    
                    <div className="space-y-6 text-left max-w-sm mx-auto">
                      <h4 className="text-xs font-bold text-[#EF4444] uppercase tracking-widest text-center mb-4">Next Steps</h4>
                      {[
                        { step: 1, title: 'Verifikasi Data', desc: 'Tim admin mengecek ketersediaan jadwal.' },
                        { step: 2, title: 'Konsultasi Gratis', desc: 'Diskusi detail kebutuhan via WhatsApp.' },
                        { step: 3, title: 'Penawaran Program', desc: 'Proposal resmi dikirim via email/WA.' }
                      ].map((s) => (
                        <div key={s.step} className="flex gap-4">
                          <div className="w-6 h-6 rounded-full border border-[#EF4444]/30 flex items-center justify-center text-[10px] font-black text-[#EF4444] shrink-0 mt-1">
                            {s.step}
                          </div>
                          <div>
                            <h5 className="text-white font-bold text-sm tracking-tight">{s.title}</h5>
                            <p className="text-gray-500 text-xs">{s.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button 
                      onClick={() => setIsSubmitted(false)}
                      className="mt-12 text-gray-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest underline underline-offset-4"
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
