import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// Completed sections link to their first published page. Later sections retain
// the introductory landing page until their dedicated guides are written.
const sidebars: SidebarsConfig = {
  docsSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Introduction',
      link: {type: 'doc', id: 'introduction/what-is-bearust'},
      items: ['introduction/what-is-bearust', 'introduction/architecture', 'introduction/feature-status'],
    },
    {
      type: 'category',
      label: 'Get started',
      link: {type: 'doc', id: 'getting-started/installation'},
      items: [
        'getting-started/installation',
        'getting-started/first-time-setup',
        'getting-started/first-proxy',
        'getting-started/development-stack',
        'getting-started/troubleshooting',
      ],
    },
    {type: 'category', label: 'Operate BeaRust', link: {type: 'doc', id: 'intro'}, items: []},
    {
      type: 'category',
      label: 'Reference',
      link: {type: 'doc', id: 'intro'},
      items: [
        {type: 'category', label: 'Configuration', link: {type: 'doc', id: 'intro'}, items: []},
        {type: 'category', label: 'Control-plane API', link: {type: 'doc', id: 'intro'}, items: []},
      ],
    },
    {type: 'category', label: 'Contributing', link: {type: 'doc', id: 'intro'}, items: []},
    {type: 'category', label: 'Roadmap', link: {type: 'doc', id: 'intro'}, items: []},
  ],
};

export default sidebars;
