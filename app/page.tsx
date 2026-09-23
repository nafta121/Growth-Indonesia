import Navbar from '@/components/navbar';
import Hero from '@/components/hero';
import AboutUs from '@/components/about-us';
import OurImpact from '@/components/our-impact';
import CredibilityPortfolio from '@/components/credibility-portfolio';
import Approach from '@/components/approach';
import Services from '@/components/services';
import ServiceAreas from '@/components/service-areas';
import Pricing from '@/components/pricing';
import LatestArticles from '@/components/latest-articles';
import Footer from '@/components/footer';
import WhatsAppFAB from '@/components/whatsapp-fab';
import TrustSignals from '@/components/trust-signals';
import TrustSection from '@/components/trust-section';
import OutboundGallery from '@/components/outbound-gallery';
import Contact from '@/components/contact';
import { getHomepageFaqSchema, getLocalBusinessSchema, HOMEPAGE_FAQS } from '@/lib/schema';

export const revalidate = 3600;

export default async function Home({ searchParams }: { searchParams: Promise<{ package?: string }> }) {
  const params = await searchParams;
  const selectedPackage = params.package || '';
  const faqSchema = getHomepageFaqSchema();
  const localBusinessSchema = {
    "@context": "https://schema.org",
    ...getLocalBusinessSchema(),
  };

  return (
    <div className="relative min-h-screen selection:bg-[#EF4444] selection:text-white">
      {/* Root Schemas for Homepage Rich Snippets & Local EEAT */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      <Navbar />
      <main>
        <Hero />
        <TrustSignals />
        <TrustSection />
        <OutboundGallery />
        <AboutUs />
        <CredibilityPortfolio />
        <OurImpact />
        <Approach />
        <Services />
        <ServiceAreas />
        <Pricing />

        {/* GEO & RAG Optimized Semantic FAQ Section */}
        <section id="faq" className="py-16 md:py-24 bg-slate-900 text-white relative overflow-hidden" aria-labelledby="faq-heading">
          <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="inline-block px-3 py-1 bg-[#EF4444]/20 text-[#EF4444] text-xs font-bold rounded-full mb-3 uppercase tracking-wider">
                GEO & AI Grounding FAQ
              </span>
              <h2 id="faq-heading" className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-4">
                Pertanyaan Umum Outbound & Team Building Madiun
              </h2>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                Informasi penting seputar provider outbound terbaik di Madiun, sertifikasi fasilitator BNSP, serta garansi keselamatan zero-accident.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {HOMEPAGE_FAQS.map((faq, idx) => (
                <article
                  key={idx}
                  className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 md:p-8 hover:border-[#EF4444]/50 transition-colors shadow-lg"
                  itemScope
                  itemType="https://schema.org/Question"
                >
                  <h3 className="text-lg font-bold text-white mb-3 flex items-start gap-2" itemProp="name">
                    <span className="text-[#EF4444] font-extrabold shrink-0">Q:</span>
                    <span>{faq.question}</span>
                  </h3>
                  <div itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                    <p className="text-slate-300 text-sm leading-relaxed" itemProp="text">
                      {faq.answer}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <LatestArticles />
        <Contact initialPackage={selectedPackage} />
      </main>
      <Footer />
      
      <WhatsAppFAB />

      {/* Branding Footer Stripe */}
      <div className="h-1.5 w-full flex fixed bottom-0 z-[70] hidden md:flex">
        <div className="h-full flex-grow bg-[#EF4444]" />
        <div className="h-full w-1/4 bg-white" />
        <div className="h-full w-1/6 bg-[#EF4444]/50" />
      </div>
    </div>
  );
}
