import { COMPANY_FACTS } from '@/lib/company-facts';

const formatRupiah = (amount: number) => {
  return `Rp. ${amount.toLocaleString('id-ID')}`;
};

export const PACKAGES = [
  {
    id: 'leaders',
    title: 'GROWTH LEADERS TRAINING',
    price: formatRupiah(COMPANY_FACTS.prices.tier1),
    description: 'Menciptakan pemimpin percaya diri dan berkarakter untuk menggerakkan perubahan positif di perusahaan Anda.',
    features: ['Leadership Core', 'Strategic Thinking', 'Conflict Resolution', 'Mental Agility'],
    popular: false,
    label: 'GROWTH LEADERS TRAINING',
  },
  {
    id: 'generation',
    title: 'GROWTH GENERATION',
    price: formatRupiah(COMPANY_FACTS.prices.tier2),
    description: 'Membentuk generasi baru yang cepat beradaptasi, inovatif, dan memiliki daya saing tinggi di era modern.',
    features: ['Adaptive Mindset', 'Digital Literacy', 'Collaborative Skills', 'Personal Growth'],
    popular: true,
    label: 'GROWTH GENERATION',
  },
  {
    id: 'fun',
    title: "FUN, PLAY 'N GROW",
    price: formatRupiah(COMPANY_FACTS.prices.tier3),
    description: 'Menciptakan kebersamaan, me-refresh pikiran, dan membangun sinergi tim melalui kegembiraan.',
    features: ['Ice Breaking', 'Team Synergy', 'Stress Relief', 'Fun Adventure'],
    popular: false,
    label: "FUN, PLAY 'N GROW",
  },
  {
    id: 'other',
    title: 'Other / Custom Development',
    price: '-',
    description: 'Silahkan hubungi kami untuk mendiskusikan kebutuhan khusus yang tidak tercantum pada paket lain.',
    features: [],
    popular: false,
    label: 'Other / Custom Development',
  }
];
