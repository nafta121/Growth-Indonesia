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
import { getHomepageFaqSchema, getLocalBusinessSchema } from '@/lib/schema';

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
