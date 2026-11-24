'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { MapPin, Phone, MessageCircle, Send, CheckCircle2, ChevronDown, Calendar, Building2, User, AlertCircle } from 'lucide-react';
import { useForm, type FieldErrors } from 'react-hook-form';
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
  const [submittedWaUrl, setSubmittedWaUrl] = useState('');
  const [showErrorSummary, setShowErrorSummary] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const errorSummaryRef = useRef<HTMLDivElement>(null);

  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<FormData>({
    defaultValues: { package: initialPackage || '' },
    mode: "onTouched",
    reValidateMode: "onChange"
  });

  const handleSelectPackage = useCallback((pkg: string) => {
    setValue('package', pkg, { shouldValidate: true });
  }, [setValue]);

  const onInvalid = useCallback((fieldErrors: FieldErrors<FormData>) => {
    if (Object.keys(fieldErrors).length > 0) {
      setShowErrorSummary(true);
      setTimeout(() => {
        errorSummaryRef.current?.focus();
      }, 0);
    }
  }, []);

  const onSubmit = async (data: FormData) => {
    setShowErrorSummary(false);
    // Construction of WhatsApp message
    const selectedPkg = PACKAGES.find(p => p.id === data.package)?.label || data.package;
    const message = `Halo tim Growth Indonesia, saya ingin meminta draf Proposal & RAB resmi untuk rencana kegiatan berikut:

Nama PIC: ${data.name.trim()}
Instansi/Perusahaan: ${data.company.trim()}
Nomor WhatsApp: ${data.whatsapp.trim()}
Program Pilihan: ${selectedPkg}
Rencana Tanggal: ${data.date || 'Menyesuaikan jadwal'}

Mohon informasi rekomendasi venue dan estimasi anggaran sesuai kebutuhan tim kami.`;

    const encodedMessage = encodeURIComponent(message);
    const waUrl = `https://wa.me/${COMPANY_INFO.whatsapp_number}?text=${encodedMessage}`;
    setSubmittedWaUrl(waUrl);
    
    // Redirect to WhatsApp
    window.open(waUrl, '_blank', 'noopener,noreferrer');
    
    setIsSubmitted(true);
  };

  const errorEntries = [
    errors.name ? { id: 'name', message: errors.name.message } : null,
    errors.company ? { id: 'company', message: errors.company.message } : null,
    errors.whatsapp ? { id: 'whatsapp', message: errors.whatsapp.message } : null,
    errors.package ? { id: 'package', message: errors.package.message } : null,
  ].filter((item): item is { id: string; message: string | undefined } => item !== null);

  return (
    <section id="kontak" className="py-20 md:py-32 bg-white relative overflow-hidden">
      <PackageParamSync onSelect={handleSelectPackage} />
      <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          {/* Left Side: Contact Info */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: shouldReduceMotion ? 0.15 : 0.8 }}
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
                  <MapPin className="w-6 h-6 md:w-7 md:h-7" aria-hidden="true" />
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
                  <Phone className="w-6 h-6 md:w-7 md:h-7" aria-hidden="true" />
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
                  <MessageCircle className="w-6 h-6 md:w-7 md:h-7" aria-hidden="true" />
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
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: shouldReduceMotion ? 0.15 : 0.8, delay: shouldReduceMotion ? 0 : 0.2 }}
            className="relative"
          >
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div
                  key="form"
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -20 }}
                  className="bg-paper p-6 md:p-10 lg:p-12 rounded-[2.5rem] border border-rule shadow-sm transition-shadow duration-200"
                >
                  <div className="mb-8 pb-6 border-b border-rule flex justify-between items-center gap-3">
                    <h3 id="kontak-form-title" className="font-display text-xl font-black text-ink tracking-tight">
                      Formulir Reservasi Program
                    </h3>
                    <span className="text-xs text-brand-dark font-bold bg-brand-tint border border-brand-border px-3 py-1 rounded-full shrink-0 whitespace-nowrap">
                      Respon Cepat
                    </span>
                  </div>

                  {showErrorSummary && errorEntries.length > 0 && (
                    <div
                      ref={errorSummaryRef}
                      role="alert"
                      tabIndex={-1}
                      aria-labelledby="contact-error-summary-title"
                      className="mb-6 p-4 rounded-2xl bg-brand-tint border border-brand-border text-ink focus:outline-none focus:ring-2 focus:ring-brand-dark"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="w-4 h-4 text-brand-dark shrink-0" aria-hidden="true" />
                        <h4 id="contact-error-summary-title" className="text-sm font-extrabold text-brand-dark">
                          Mohon lengkapi data berikut sebelum mengirim:
                        </h4>
                      </div>
                      <ul className="list-disc pl-5 space-y-1 text-xs font-semibold text-ink-2">
                        {errorEntries.map((err) => (
                          <li key={err.id}>
                            <a
                              href={`#${err.id}`}
                              className="underline underline-offset-2 text-brand-dark hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-dark rounded"
                            >
                              {err.message}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <form onSubmit={handleSubmit(onSubmit, onInvalid)} noValidate className="space-y-5 md:space-y-6" aria-labelledby="kontak-form-title">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-xs font-bold text-ink flex items-center gap-2 px-1">
                          <User className="w-3.5 h-3.5 text-brand-dark" aria-hidden="true" /> Nama Lengkap <span className="text-brand-dark" aria-hidden="true">*</span>
                        </label>
                        <Input
                          id="name"
                          type="text"
                          autoComplete="name"
                          required
                          {...register("name", {
                            validate: (val) => val.trim().length > 0 || "Nama lengkap wajib diisi"
                          })}
                          placeholder="Budi Santoso"
                          error={!!errors.name}
                          aria-describedby={errors.name ? "name-error" : undefined}
                        />
                        {errors.name && <span id="name-error" role="alert" className="text-xs text-brand-dark font-semibold mt-1 block px-1">{errors.name.message}</span>}
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="company" className="text-xs font-bold text-ink flex items-center gap-2 px-1">
                          <Building2 className="w-3.5 h-3.5 text-brand-dark" aria-hidden="true" /> Instansi / Perusahaan <span className="text-brand-dark" aria-hidden="true">*</span>
                        </label>
                        <Input
                          id="company"
                          type="text"
                          autoComplete="organization"
                          required
                          {...register("company", {
                            validate: (val) => val.trim().length > 0 || "Instansi wajib diisi"
                          })}
                          placeholder="PT Nusantara Jaya"
                          error={!!errors.company}
                          aria-describedby={errors.company ? "company-error" : undefined}
                        />
                        {errors.company && <span id="company-error" role="alert" className="text-xs text-brand-dark font-semibold mt-1 block px-1">{errors.company.message}</span>}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="whatsapp" className="text-xs font-bold text-ink flex items-center gap-2 px-1">
                        <Phone className="w-3.5 h-3.5 text-brand-dark" aria-hidden="true" /> Nomor WhatsApp <span className="text-brand-dark" aria-hidden="true">*</span>
                      </label>
                      <Input
                        id="whatsapp"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        required
                        {...register("whatsapp", { 
                          required: "Nomor WhatsApp wajib diisi",
                          validate: (val) => {
                            const digits = val.replace(/\D/g, '');
                            return digits.length >= 10 || "Minimal 10 angka (contoh: 0812-3456-7890)";
                          }
                        })}
                        placeholder="0812-3456-7890"
                        error={!!errors.whatsapp}
                        aria-describedby={errors.whatsapp ? "whatsapp-error" : undefined}
                      />
                      {errors.whatsapp && <span id="whatsapp-error" role="alert" className="text-xs text-brand-dark font-semibold mt-1 block px-1">{errors.whatsapp.message}</span>}
                    </div>

                    <div className="space-y-2 relative">
                      <label htmlFor="package" className="text-xs font-bold text-ink flex items-center gap-2 px-1">
                        Pilihan Program <span className="text-brand-dark" aria-hidden="true">*</span>
                      </label>
                      <select
                        id="package"
                        required
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
                            animate={shouldReduceMotion ? undefined : { rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                            aria-hidden="true"
                          />
                          <span>Mengirim…</span>
                        </>
                      ) : (
                        <>
                          Kirim &amp; Konsultasi via WhatsApp
                          <Send className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" />
                        </>
                      )}
                    </Button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-navy p-10 md:p-14 lg:p-16 rounded-[3rem] border border-navy-border text-center shadow-lg relative overflow-hidden group"
                >
                  <div className="relative z-10">
                    <motion.div 
                      initial={shouldReduceMotion ? { opacity: 0 } : { scale: 0 }}
                      animate={shouldReduceMotion ? { opacity: 1 } : { scale: 1 }}
                      transition={{ type: "spring", damping: 15, stiffness: 200, delay: shouldReduceMotion ? 0 : 0.2 }}
                      className="w-20 h-20 md:w-24 md:h-24 bg-brand-dark rounded-full mx-auto flex items-center justify-center mb-8 shadow-md"
                    >
                      <CheckCircle2 className="w-10 h-10 md:w-12 md:h-12 text-white" aria-hidden="true" />
                    </motion.div>
                    
                    <h3 className="font-display text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">Terima Kasih</h3>
                    <p className="text-navy-muted mb-8 text-base md:text-lg leading-relaxed max-w-sm mx-auto">Permintaan konsultasi Anda telah kami terima. Tim Growth Indonesia siap menindaklanjuti melalui WhatsApp.</p>

                    {submittedWaUrl && (
                      <div className="mb-10">
                        <a
                          href={submittedWaUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-11 items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-whatsapp-dark hover:bg-whatsapp-hover text-white text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white whitespace-nowrap"
                        >
                          <MessageCircle className="w-4 h-4" aria-hidden="true" />
                          Buka WhatsApp Sekarang
                        </a>
                      </div>
                    )}
                    
                    <div className="space-y-6 text-left max-w-sm mx-auto bg-navy-2 p-8 rounded-3xl border border-navy-border">
                      <h4 className="text-xs font-bold text-brand text-center mb-6">Tahap Selanjutnya</h4>
                      {[
                        { step: 1, title: 'Verifikasi Jadwal', desc: 'Kami memeriksa ketersediaan tanggal dan lokasi pilihan Anda.' },
                        { step: 2, title: 'Konsultasi Program', desc: 'Diskusi kebutuhan dan target tim melalui WhatsApp.' },
                        { step: 3, title: 'Proposal Resmi', desc: 'Pengiriman penawaran lengkap beserta rincian anggaran.' }
                      ].map((s, i) => (
                        <motion.div 
                          key={s.step} 
                          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: shouldReduceMotion ? 0 : 0.5 + i * 0.1 }}
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
                      className="mt-10 min-h-11 px-4 inline-flex items-center justify-center text-navy-muted hover:text-white transition-colors text-xs font-bold underline underline-offset-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus rounded-lg whitespace-nowrap cursor-pointer"
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
