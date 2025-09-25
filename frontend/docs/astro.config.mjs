import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
  site: 'https://escruta.francids.com',
  base: '/docs',
  outDir: './dist-docs',
  integrations: [
    starlight({
      title: 'Escruta Documentation',
      description: 'Complete documentation for Escruta - AI-powered research assistant',
      logo: {
        src: './src/assets/logo.svg',
        replacesTitle: false,
      },
      social: [
        {
          icon: 'github',
          href: 'https://github.com/francids/escruta',
          label: 'GitHub',
        },
      ],
      sidebar: [
        {
          label: 'Get Started',
          items: [
            { 
              label: 'Welcome', 
              slug: 'index',
            },
          ],
        },
        {
          label: 'Features',
          items: [
            { 
              label: 'Notebooks', 
              slug: 'features/notebooks',
            },
            { 
              label: 'Notes', 
              slug: 'features/notes',
            },
            { 
              label: 'Sources', 
              slug: 'features/sources',
            },
            { 
              label: 'Audio Summary', 
              slug: 'features/audio-summary',
            },
            { 
              label: 'Mind Map', 
              slug: 'features/mind-map',
            },
            { 
              label: 'Study Guide', 
              slug: 'features/study-guide',
            },
            { 
              label: 'Flashcards', 
              slug: 'features/flashcards',
            },
          ],
        },
      ],
      customCss: [
        './src/styles/custom.css',
      ],
      lastUpdated: true,
      pagination: true,
      editLink: {
        baseUrl: 'https://github.com/francids/escruta/edit/main/frontend/docs/',
      },
    }),
  ],
});