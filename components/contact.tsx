'use client';

import { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Phone, MessageCircle, Send, CheckCircle2, ChevronDown, Calendar, Building2, User } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PACKAGES } from '@/lib/packages';
import { COMPANY_INFO } from '@/lib/constants';

interface ContactProps {
  initialPackage?: string;
}

type FormData = {
  name: string;
  company: string;
  whatsapp: string;
  package: string;
  date: string;
};

function PackageParamSync({ onSelect }: { onSelect: (pkg: string) => void }) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      const pkg = searchParams.get('package');
      if (pkg) {
        onSelect(pkg);
      }
    }
  }, [onSelect]);

  return null;
}

export default function Contact({ initialPackage }: ContactProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<FormData>({
    defaultValues: { package: initialPackage || '' },
    mode: "onChange"
  });

  const handleSelectPackage = useCallback((pkg: string) => {
    setValue('package', pkg, { shouldValidate: true });
  }, [setValue]);

  const onSubmit = async (data: FormData) => {
    // Construction of WhatsApp message
    const selectedPkg = PACKAGES.find(p => p.id === data.package)?.label || data.package;
    const message = `Halo tim Growth Indonesia, saya ingin meminta draf Proposal & RAB resmi untuk rencana kegiatan berikut:

Nama PIC: ${data.name}
Instansi/Perusahaan: ${data.company}
Nomor WhatsApp: ${data.whatsapp}
Program Pilihan: ${selectedPkg}
Rencana Tanggal: ${data.date || 'Menyesuaikan jadwal'}

Mohon informasi rekomendasi venue dan estimasi anggaran sesuai kebutuhan tim kami.`;

    const encodedMessage = encodeURIComponent(message);
    
    // Redirect to WhatsApp
    window.open(`https://wa.me/${COMPANY_INFO.whatsapp_number}?text=${encodedMessage}`, '_blank');
    
    setIsSubmitted(true);
  };

  return (
    <section id="kontak" className="py-20 md:py-32 bg-white relative overflow-hidden">
      <PackageParamSync onSelect={handleSelectPackage} />
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
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-ink leading-[1.1] mb-8">
              Siap untuk Bertransformasi?
            </h2>
            <p className="text-muted text-base md:text-lg leading-relaxed mb-12 max-w-xl">
              Hubungi kami hari ini untuk konsultasi kebutuhan tim Anda dan dapatkan draf proposal, opsi rundown, serta estimasi RAB resmi dalam 1x24 jam tanpa biaya komitmen.
            </p>

            <div className="space-y-6 md:space-y-8">
              <a 
                href={COMPANY_INFO.maps_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-5 md:gap-7 group items-center p-4 -ml-4 rounded-3xl hover:bg-paper transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-dark"
                aria-label="Lihat lokasi Growth Indonesia di Google Maps"
              >
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl md:rounded-[1.5rem] bg-paper flex items-center justify-center text-brand-dark group-hover:bg-brand-dark group-hover:text-white transition-colors duration-200 shadow-sm shrink-0">
                  <MapPin className="w-6 h-6 md:w-7 md:h-7" />
                </div>
                <div>
                  <h3 className="font-extrabold text-ink mb-1 text-base md:text-lg">Kantor Pusat</h3>
                  <address 
                    className="not-italic text-muted group-hover:text-ink transition-colors duration-200 text-sm md:text-base leading-snug"
                    dangerouslySetInnerHTML={{ __html: COMPANY_INFO.address_html }}
                  />
                </div>
              </a>

              <a 
                href={`https://wa.me/${COMPANY_INFO.whatsapp_number}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-5 md:gap-7 group items-center p-4 -ml-4 rounded-3xl hover:bg-paper transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-dark"
                aria-label="Hubungi Growth Indonesia via WhatsApp"
              >
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl md:rounded-[1.5rem] bg-paper flex items-center justify-center text-brand-dark group-hover:bg-brand-dark group-hover:text-white transition-colors duration-200 shadow-sm shrink-0">
                  <Phone className="w-6 h-6 md:w-7 md:h-7" />
                </div>
                <div>
                  <h3 className="font-extrabold text-ink mb-1 text-base md:text-lg">WhatsApp &amp; Telepon</h3>
                  <p className="text-muted group-hover:text-ink transition-colors duration-200 text-sm md:text-base font-bold num">{COMPANY_INFO.whatsapp_display}</p>
                </div>
              </a>

              <a 
                href={`mailto:${COMPANY_INFO.email}`}
                className="flex gap-5 md:gap-7 group items-center p-4 -ml-4 rounded-3xl hover:bg-paper transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-dark"
                aria-label="Kirim email ke Growth Indonesia"
              >
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl md:rounded-[1.5rem] bg-paper flex items-center justify-center text-brand-dark group-hover:bg-brand-dark group-hover:text-white transition-colors duration-200 shadow-sm shrink-0">
                  <MessageCircle className="w-6 h-6 md:w-7 md:h-7" />
                </div>
                <div>
                  <h3 className="font-extrabold text-ink mb-1 text-base md:text-lg">Email Resmi</h3>
                  <p className="text-muted group-hover:text-ink transition-colors duration-200 text-sm md:text-base border-b border-transparent group-hover:border-rule">{COMPANY_INFO.email}</p>
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
                  className="bg-paper p-6 md:p-10 lg:p-12 rounded-[2.5rem] border border-rule shadow-sm transition-shadow duration-200"
                >
                  <div className="mb-8 pb-6 border-b border-rule flex justify-between items-center">
                    <h3 id="kontak-form-title" className="font-display text-xl font-black text-ink tracking-tight">
                      Formulir Reservasi Program
                    </h3>
                    <span className="text-xs text-brand-dark font-bold bg-brand-tint border border-brand-border px-3 py-1 rounded-full">
                      Respon Cepat
                    </span>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 md:space-y-6" aria-labelledby="kontak-form-title">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-xs font-bold text-ink flex items-center gap-2 px-1">
                          <User className="w-3.5 h-3.5 text-brand-dark" aria-hidden="true" /> Nama Lengkap
                        </label>
                        <Input
                          id="name"
                          type="text"
                          autoComplete="name"
                          {...register("name", { required: "Nama lengkap wajib diisi" })}
                          placeholder="Budi Santoso"
                          error={!!errors.name}
                          aria-describedby={errors.name ? "name-error" : undefined}
                        />
                        {errors.name && <span id="name-error" role="alert" className="text-xs text-brand-dark font-semibold mt-1 block px-1">{errors.name.message}</span>}
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="company" className="text-xs font-bold text-ink flex items-center gap-2 px-1">
                          <Building2 className="w-3.5 h-3.5 text-brand-dark" aria-hidden="true" /> Instansi / Perusahaan
                        </label>
                        <Input
                          id="company"
                          type="text"
                          autoComplete="organization"
                          {...register("company", { required: "Instansi wajib diisi" })}
                          placeholder="PT Nusantara Jaya"
                          error={!!errors.company}
                          aria-describedby={errors.company ? "company-error" : undefined}
                        />
                        {errors.company && <span id="company-error" role="alert" className="text-xs text-brand-dark font-semibold mt-1 block px-1">{errors.company.message}</span>}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="whatsapp" className="text-xs font-bold text-ink flex items-center gap-2 px-1">
                        <Phone className="w-3.5 h-3.5 text-brand-dark" aria-hidden="true" /> Nomor WhatsApp
                      </label>
                      <Input
                        id="whatsapp"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        {...register("whatsapp", { 
                          required: "Nomor WhatsApp wajib diisi",
                          minLength: { value: 10, message: "Minimal 10 angka" }
                        })}
                        placeholder="0812-3456-7890"
                        error={!!errors.whatsapp}
                        aria-describedby={errors.whatsapp ? "whatsapp-error" : undefined}
                      />
                      {errors.whatsapp && <span id="whatsapp-error" role="alert" className="text-xs text-brand-dark font-semibold mt-1 block px-1">{errors.whatsapp.message}</span>}
                    </div>

                    <div className="space-y-2 relative">
                      <label htmlFor="package" className="text-xs font-bold text-ink flex items-center gap-2 px-1">
                        Pilihan Program
                      </label>
                      <select
                        id="package"
                        aria-invalid={!!errors.package || undefined}
                        aria-describedby={errors.package ? "package-error" : undefined}
                        {...register("package", { required: "Program wajib dipilih" })}
                        className="w-full h-14 md:h-16 px-6 bg-white border border-rule rounded-2xl focus-visible:ring-2 focus-visible:ring-brand-dark focus-visible:ring-offset-2 focus-visible:border-brand-dark outline-none transition-colors duration-200 text-base font-medium text-ink appearance-none cursor-pointer"
                      >
                        <option value="" disabled>Pilih Program…</option>
                        {PACKAGES.map((pkg) => (
                          <option key={pkg.id} value={pkg.id}>{pkg.label}</option>
                        ))}
                      </select>
                      <div className="absolute right-6 bottom-[19px] pointer-events-none md:bottom-[23px] text-muted" aria-hidden="true">
                        <ChevronDown className="w-4 h-4" />
                      </div>
                      {errors.package && <span id="package-error" role="alert" className="text-xs text-brand-dark font-semibold mt-1 block px-1">{errors.package.message}</span>}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="date" className="text-xs font-bold text-ink flex items-center gap-2 px-1">
                        <Calendar className="w-3.5 h-3.5 text-brand-dark" aria-hidden="true" /> Rencana Tanggal (Opsional)
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
                          />
                          <span>Mengirim…</span>
                        </>
                      ) : (
                        <>
                          Kirim &amp; Konsultasi via WhatsApp
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
                  className="bg-navy p-10 md:p-14 lg:p-16 rounded-[3rem] border border-navy-border text-center shadow-lg relative overflow-hidden group"
                >
                  <div className="relative z-10">
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", damping: 15, stiffness: 200, delay: 0.2 }}
                      className="w-20 h-20 md:w-24 md:h-24 bg-brand-dark rounded-full mx-auto flex items-center justify-center mb-8 shadow-md"
                    >
                      <CheckCircle2 className="w-10 h-10 md:w-12 md:h-12 text-white" />
                    </motion.div>
                    
                    <h3 className="font-display text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">Terima Kasih</h3>
                    <p className="text-navy-muted mb-12 text-base md:text-lg leading-relaxed max-w-sm mx-auto">Permintaan konsultasi Anda telah kami terima. Tim Growth Indonesia siap menindaklanjuti melalui WhatsApp.</p>
                    
                    <div className="space-y-6 text-left max-w-sm mx-auto bg-navy-2 p-8 rounded-3xl border border-navy-border">
                      <h4 className="text-xs font-bold text-brand text-center mb-6">Tahap Selanjutnya</h4>
                      {[
                        { step: 1, title: 'Verifikasi Jadwal', desc: 'Kami memeriksa ketersediaan tanggal dan lokasi pilihan Anda.' },
                        { step: 2, title: 'Konsultasi Program', desc: 'Diskusi kebutuhan dan target tim melalui WhatsApp.' },
                        { step: 3, title: 'Proposal Resmi', desc: 'Pengiriman penawaran lengkap beserta rincian anggaran.' }
                      ].map((s, i) => (
                        <motion.div 
                          key={s.step} 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + i * 0.1 }}
                          className="flex gap-5"
                        >
                          <div className="w-6 h-6 rounded-full bg-navy border border-navy-border flex items-center justify-center text-xs font-bold text-brand shrink-0 mt-1 num">
                            {s.step}
                          </div>
                          <div>
                            <h5 className="text-white font-bold text-sm tracking-tight">{s.title}</h5>
                            <p className="text-navy-muted text-xs leading-relaxed">{s.desc}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <button 
                      type="button"
                      onClick={() => setIsSubmitted(false)}
                      className="mt-10 min-h-11 px-4 inline-flex items-center justify-center text-navy-muted hover:text-white transition-colors text-xs font-bold underline underline-offset-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus rounded-lg whitespace-nowrap"
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
