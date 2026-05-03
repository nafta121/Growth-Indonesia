import { permanentRedirect } from 'next/navigation';

const CATEGORIES = ['outbound', 'training', 'fun-games', 'ldk-osis', 'gathering'];

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function LegacyServicePage({ params }: Props) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug).toLowerCase();
  
  let detectedCategory = '';
  let detectedCity = '';

  for (const cat of CATEGORIES) {
    if (decodedSlug.startsWith(`${cat}-`)) {
      detectedCategory = cat;
      detectedCity = decodedSlug.replace(`${cat}-`, '');
      break;
    }
  }

  if (detectedCategory && detectedCity) {
    permanentRedirect(`/layanan/${detectedCity}/${detectedCategory}`);
  }

  // Fallback
  permanentRedirect('/');
}
