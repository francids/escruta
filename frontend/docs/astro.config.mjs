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
            { label: 'Welcome', link: '/' },
          ],
        },
        {
          label: 'Features',
          items: [
            { label: 'Notebooks', link: '/features/notebooks/' },
            { label: 'Notes', link: '/features/notes/' },
            { label: 'Sources', link: '/features/sources/' },
            { label: 'Audio Summary', link: '/features/audio-summary/' },
            { label: 'Mind Map', link: '/features/mind-map/' },
            { label: 'Study Guide', link: '/features/study-guide/' },
            { label: 'Flashcards', link: '/features/flashcards/' },
          ],
        },
      ],
      customCss: [
        './src/styles/custom.css',
      ],
    }),
  ],
});