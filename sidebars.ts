import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// Categories are established here so later content tasks can add their approved
// document IDs without changing public navigation labels or ordering.
const sidebars: SidebarsConfig = {
  docsSidebar: [
    'intro',
    {type: 'category', label: 'Introduction', link: {type: 'doc', id: 'intro'}, items: []},
    {type: 'category', label: 'Get started', link: {type: 'doc', id: 'intro'}, items: []},
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
