import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
  site: 'https://escruta.francids.com',
  base: '/docs',
  outDir: '../dist/docs',
  integrations: [
    starlight({
      title: 'Escruta Documentation',
      description: 'AI-powered research assistant documentation',
      logo: {
        src: './src/assets/logo.svg',
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
          label: 'Get started',
          items: [
            { label: 'Welcome', link: '/docs/' },
          ],
        },
        {
          label: 'Features',
          items: [
            { label: 'Notebooks', link: '/docs/features/notebooks/' },
            { label: 'Notes', link: '/docs/features/notes/' },
            { label: 'Sources', link: '/docs/features/sources/' },
            { label: 'Audio Summary', link: '/docs/features/audio-summary/' },
            { label: 'Mind Map', link: '/docs/features/mind-map/' },
            { label: 'Study Guide', link: '/docs/features/study-guide/' },
            { label: 'Flashcards', link: '/docs/features/flashcards/' },
          ],
        },
      ],
      customCss: [
        './src/styles/custom.css',
      ],
    }),
  ],
});