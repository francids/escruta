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
      description: 'Complete documentation for Escruta - the AI-powered research assistant for students, researchers, and knowledge workers.',
      logo: {
        src: './src/assets/logo.svg',
        replacesTitle: false,
      },
      editLink: {
        baseUrl: 'https://github.com/francids/escruta/edit/main/frontend/docs/',
      },
      social: [
        {
          icon: 'github',
          href: 'https://github.com/francids/escruta',
          label: 'View on GitHub',
        },
      ],
      head: [
        {
          tag: 'meta',
          attrs: {
            name: 'theme-color',
            content: '#0388fc',
          },
        },
        {
          tag: 'meta',
          attrs: {
            property: 'og:image',
            content: 'https://escruta.francids.com/OpenGraphImageDocumentation.png',
          },
        },
        {
          tag: 'link',
          attrs: {
            rel: 'preconnect',
            href: 'https://fonts.googleapis.com',
          },
        },
        {
          tag: 'link',
          attrs: {
            rel: 'preconnect',
            href: 'https://fonts.gstatic.com',
            crossorigin: '',
          },
        },
      ],
      sidebar: [
        {
          label: 'Get Started',
          badge: 'New',
          items: [
            { 
              label: 'Welcome to Escruta', 
              slug: 'index',
            },
          ],
        },
        {
          label: 'Core Features',
          badge: { text: '7 Features', variant: 'note' },
          collapsed: false,
          items: [
            { 
              label: 'Notebooks', 
              slug: 'features/notebooks',
              badge: 'Essential',
            },
            { 
              label: 'Notes', 
              slug: 'features/notes',
            },
            { 
              label: 'Sources', 
              slug: 'features/sources',
            },
          ],
        },
        {
          label: 'AI-Powered Tools',
          badge: { text: 'AI', variant: 'success' },
          collapsed: false,
          items: [
            { 
              label: 'Audio Summary', 
              slug: 'features/audio-summary',
              badge: 'Beta',
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
      components: {
        // Override default components if needed
        Head: './src/components/Head.astro',
      },
      customCss: [
        './src/styles/custom.css',
      ],
      defaultLocale: 'root',
      locales: {
        root: {
          label: 'English',
          lang: 'en',
        },
      },
      lastUpdated: true,
      pagination: true,
      titleDelimiter: '|',
      disable404Route: false,
      favicon: '/favicon.svg',
    }),
  ],
  vite: {
    define: {
      __ESCRUTA_VERSION__: JSON.stringify(process.env.npm_package_version ?? 'dev'),
    },
  },
});