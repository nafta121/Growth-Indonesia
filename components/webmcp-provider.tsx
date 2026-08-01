'use client';

import { useEffect } from 'react';

export interface WebMCPTool {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
  execute: (args: Record<string, unknown>) => Promise<unknown> | unknown;
}

export function WebMCPProvider() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const tools: WebMCPTool[] = [
      {
        name: 'calculate_outbound_budget',
        description: 'Calculate estimated budget and package recommendations for outbound training, team building, or LDK OSIS in East Java.',
        inputSchema: {
          type: 'object',
          properties: {
            participants: {
              type: 'integer',
              description: 'Number of participants (e.g., 30, 50, 100)',
            },
            durationDays: {
              type: 'integer',
              description: 'Duration in days (1, 2, or 3 days)',
            },
            tier: {
              type: 'string',
              enum: ['standard', 'premium', 'exclusive'],
              description: 'Package tier preference',
            },
            city: {
              type: 'string',
              description: 'Target city in East Java (e.g. Madiun, Surabaya, Malang)',
            },
          },
          required: ['participants', 'durationDays'],
        },
        execute: (args) => {
          const participants = Number(args.participants) || 20;
          const durationDays = Number(args.durationDays) || 1;
          const tier = (args.tier as string) || 'standard';
          const city = (args.city as string) || 'Madiun';

          const ratePerPerson = tier === 'exclusive' ? 350000 : tier === 'premium' ? 250000 : 175000;
          const estimatedCost = participants * ratePerPerson * durationDays;

          return {
            status: 'success',
            summary: `Outbound Package Estimate for ${participants} participants in ${city} (${durationDays} day(s), ${tier.toUpperCase()} tier)`,
            estimatedCostIDR: estimatedCost,
            formattedCost: `Rp ${estimatedCost.toLocaleString('id-ID')}`,
            includedServices: [
              'Professional Outbound Facilitators & Trainers',
              'Game Equipment & Sound System',
              'First Aid & Safety Crew',
              'Documentation (Photos & Videos)',
              'Banner & Welcome Gate',
            ],
            bookingWhatsApp: `https://wa.me/6281234567890?text=${encodeURIComponent(
              `Halo Growth Indonesia, saya ingin konsultasi paket outbound ${tier} untuk ${participants} orang di ${city} (${durationDays} hari). Est: Rp ${estimatedCost.toLocaleString('id-ID')}`
            )}`,
          };
        },
      },
      {
        name: 'search_services',
        description: 'Search available outbound programs, leadership training, and HR development services offered by Growth Indonesia.',
        inputSchema: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
              description: 'Search term (e.g., LDK OSIS, Team Building, Fun Games, Character Building)',
            },
          },
          required: ['query'],
        },
        execute: (args) => {
          const query = String(args.query || '').toLowerCase();
          const allServices = [
            {
              id: 'outbound-training',
              title: 'Outbound Training & Team Building',
              description: 'Program peningkatan kerjasama tim, komunikasi, dan kepemimpinan berorientasi hasil.',
              category: 'Corporate',
              recommendedLocation: 'Madiun, Sarangan, Batu Malang, Trawas',
            },
            {
              id: 'ldk-osis',
              title: 'LDK OSIS & Student Leadership',
              description: 'Latihan Dasar Kepemimpinan untuk OSIS, Pramuka, dan organisasi siswa sekolah menengah.',
              category: 'Educational',
              recommendedLocation: 'Madiun, Magetan, Ngawi, Ponorogo',
            },
            {
              id: 'fun-games-gathering',
              title: 'Fun Games & Family Gathering',
              description: 'Program rekreasi dan keakraban untuk perusahaan, instansi, dan keluarga besar.',
              category: 'Event',
              recommendedLocation: 'Magetan, Nganjuk, Pacitan',
            },
            {
              id: 'hr-capacity-building',
              title: 'HR Capacity Building & Workshop',
              description: 'In-house training dan workshop motivasi pengembangan karakter SDM.',
              category: 'Corporate',
              recommendedLocation: 'In-house / Hotel Conference',
            },
          ];

          const results = allServices.filter(
            (s) =>
              s.title.toLowerCase().includes(query) ||
              s.description.toLowerCase().includes(query) ||
              s.category.toLowerCase().includes(query)
          );

          return {
            status: 'success',
            count: results.length,
            query: args.query,
            services: results.length > 0 ? results : allServices,
          };
        },
      },
      {
        name: 'get_city_coverage',
        description: 'Get location details and venue options for Growth Indonesia outbound service coverage in East Java & Central Java.',
        inputSchema: {
          type: 'object',
          properties: {
            cityName: {
              type: 'string',
              description: 'Name of the city (e.g., Madiun, Surabaya, Malang, Kediri, Ponorogo, Ngawi, Solo)',
            },
          },
          required: ['cityName'],
        },
        execute: (args) => {
          const city = String(args.cityName || 'Madiun');
          return {
            status: 'success',
            cityName: city,
            serviceAvailable: true,
            providerName: 'Growth Indonesia',
            popularVenues: [
              `Hutan Pinus & Taman Kota ${city}`,
              `Resort & Outbound Area ${city}`,
              `Bumi Perkemahan & Kampus ${city}`,
            ],
            contactPhone: '+6281234567890',
            infoUrl: `https://growthindonesia.my.id/layanan/outbound-${city.toLowerCase().replace(/\s+/g, '-')}`,
          };
        },
      },
      {
        name: 'contact_consultant',
        description: 'Generate direct WhatsApp consultation link and view contact channels for Growth Indonesia experts.',
        inputSchema: {
          type: 'object',
          properties: {
            clientName: { type: 'string', description: 'Name of the person inquiring' },
            organization: { type: 'string', description: 'Company, school, or organization name' },
            message: { type: 'string', description: 'Inquiry details or event plan' },
          },
        },
        execute: (args) => {
          const name = String(args.clientName || 'Teman Growth');
          const org = String(args.organization || 'Instansi');
          const msg = String(args.message || 'Saya ingin bertanya seputar paket outbound.');

          const waMessage = `Halo Growth Indonesia, saya ${name} dari ${org}. ${msg}`;
          const waUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(waMessage)}`;

          return {
            status: 'success',
            consultant: 'Tim Growth Indonesia',
            whatsappUrl: waUrl,
            email: 'info@growthindonesia.my.id',
            workingHours: 'Senin - Sabtu: 08:00 - 17:00 WIB',
            officeAddress: 'Madiun, Jawa Timur, Indonesia',
          };
        },
      },
    ];

    // Ensure navigator.modelContext exists or initialize object
    const nav = navigator as unknown as {
      modelContext?: {
        provideContext?: (context: { tools: WebMCPTool[] }) => void;
        registerTool?: (tool: WebMCPTool) => void;
        getTools?: () => WebMCPTool[];
        tools?: WebMCPTool[];
      };
    };

    if (!nav.modelContext) {
      nav.modelContext = {
        tools: tools,
        getTools: () => tools,
        provideContext: (context) => {
          if (context && Array.isArray(context.tools)) {
            nav.modelContext!.tools = context.tools;
          }
        },
        registerTool: (tool) => {
          if (nav.modelContext && nav.modelContext.tools) {
            nav.modelContext.tools.push(tool);
          }
        },
      };
    }

    // Call standard WebMCP API methods
    if (nav.modelContext.provideContext) {
      try {
        nav.modelContext.provideContext({ tools });
      } catch (err) {
        console.warn('WebMCP provideContext error:', err);
      }
    }

    if (nav.modelContext.registerTool) {
      tools.forEach((tool) => {
        try {
          nav.modelContext?.registerTool?.(tool);
        } catch {
          // ignore duplicate tool registration
        }
      });
    }

    // Attach to window for easy debugging / agent discovery
    (window as unknown as { __WEBMCP_TOOLS__?: WebMCPTool[] }).__WEBMCP_TOOLS__ = tools;
  }, []);

  return null;
}
