'use client';

import { motion } from 'motion/react';
import { MapPin, Phone, MessageCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { COMPANY_INFO } from '@/lib/constants';
import ContactForm from '@/components/contact-form';

interface ContactProps {
  initialPackage?: string;
}

export default function Contact({ initialPackage }: ContactProps) {
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
                href={COMPANY_INFO.maps_url}
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
                  <address 
                    className="not-italic text-gray-500 group-hover:text-gray-900 transition-colors duration-300 text-sm md:text-base leading-snug"
                    dangerouslySetInnerHTML={{ __html: COMPANY_INFO.address_html }}
                  />
                </div>
              </a>

              <a 
                href={`https://wa.me/${COMPANY_INFO.whatsapp_number}`}
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
                  <p className="text-gray-500 group-hover:text-gray-900 transition-colors duration-300 text-sm md:text-base font-bold">{COMPANY_INFO.whatsapp_display}</p>
                </div>
              </a>

              <a 
                href={`mailto:${COMPANY_INFO.email}`}
                className="flex gap-5 md:gap-7 group items-center p-4 -ml-4 rounded-3xl hover:bg-gray-50 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF4444]"
                aria-label="Kirim email ke Growth Indonesia"
              >
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl md:rounded-[1.5rem] bg-gray-50 flex items-center justify-center text-[#EF4444] group-hover:bg-[#EF4444] group-hover:text-white transition-all duration-500 shadow-sm">
                  <MessageCircle className="w-6 h-6 md:w-7 md:h-7" />
                </div>
                <div>
                  <h3 className="font-extrabold text-gray-900 mb-1 uppercase tracking-tight text-sm md:text-base">Email Resmi</h3>
                  <p className="text-gray-500 group-hover:text-gray-900 transition-colors duration-300 text-sm md:text-base border-b border-transparent group-hover:border-gray-200">{COMPANY_INFO.email}</p>
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
          >
            <ContactForm initialPackage={initialPackage} />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
