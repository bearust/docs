import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const siteUrl = process.env.DOCS_SITE_URL ?? 'http://localhost:3000';
const baseUrl = process.env.DOCS_BASE_URL ?? '/';

const config: Config = {
  title: 'Bearust',
  tagline: 'The Rust-powered reverse proxy, load balancer, and WAF.',
  favicon: 'img/favicon.png',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  url: siteUrl,
  baseUrl,

  stylesheets: [
    {
      href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap',
      type: 'text/css',
    },
  ],

  onBrokenLinks: 'throw',

  markdown: {
    mermaid: true,
  },

  // English is the default and fallback locale. Indonesian and Japanese are
  // enabled for gradual, page-by-page translation: untranslated pages fall
  // back to their English source content rather than 404ing.
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'id', 'ja'],
    localeConfigs: {
      en: {label: 'English'},
      id: {label: 'Bahasa Indonesia'},
      ja: {label: '日本語'},
    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          exclude: ['superpowers/**'],
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themes: [
    '@docusaurus/theme-mermaid',
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        // The plugin's tokenizer supports a fixed language list; 'id' is not
        // one of them. English tokenization still indexes Indonesian and
        // Japanese content usably (word-boundary search, no stemming) until
        // upstream adds Indonesian support.
        language: ['en', 'ja'],
        indexDocs: true,
        indexBlog: true,
        indexPages: false,
        docsRouteBasePath: '/docs',
      },
    ],
  ],

  themeConfig: {
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Bearust',
      logo: {
        alt: 'Bearust logo',
        src: 'img/logo.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          type: 'docSidebar',
          sidebarId: 'apiSidebar',
          position: 'left',
          label: 'API',
        },
        {
          to: '/blog',
          position: 'left',
          label: 'Blog',
        },
        {
          href: 'https://github.com/bearust/bearust/discussions',
          position: 'left',
          label: 'Community',
        },
        {
          type: 'docsVersionDropdown',
          position: 'right',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
        {
          href: 'https://github.com/bearust/bearust',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Introduction',
              to: '/docs/introduction/what-is-bearust',
            },
            {
              label: 'API reference',
              to: '/docs/reference/api/api-overview',
            },
            {
              label: 'Blog',
              to: '/blog',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub Discussions',
              href: 'https://github.com/bearust/bearust/discussions',
            },
            {
              label: 'Issues',
              href: 'https://github.com/bearust/bearust/issues',
            },
          ],
        },
        {
          title: 'Project',
          items: [
            {
              label: 'Source code',
              href: 'https://github.com/bearust/bearust',
            },
            {
              label: 'Container Images',
              href: 'https://github.com/bearust/bearust/pkgs/container/bearust',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Bearust contributors.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    mermaid: {
      theme: {light: 'neutral', dark: 'dark'},
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
