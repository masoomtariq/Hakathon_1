import {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Physical AI & Humanoid Robotics',
  tagline: 'An interactive textbook for learning robotics, AI, and physical systems',
  favicon: 'img/favicon.ico',
  url: 'https://masoomtariq.github.io',
  baseUrl: '/Hakathon_1/',
  organizationName: 'masoomtariq',
  projectName: 'Hakathon_1',
  deploymentBranch: 'gh-pages',
  trailingSlash: false,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ur'],
    localeConfigs: {
      en: {
        label: 'English',
        direction: 'ltr',
        htmlLang: 'en-US',
      },
      ur: {
        label: 'اردو',
        direction: 'rtl',
        htmlLang: 'ur-PK',
      },
    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/masoomtariq/Hakathon_1/tree/main/',
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        language: ['en'],
        indexBlog: false,
      },
    ],
  ],

  themeConfig: {
    image: 'img/logo.svg',
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Physical AI & Robotics',
      logo: {
        alt: 'Physical AI Logo',
        src: 'img/logo.svg',
        srcDark: 'img/logo-dark.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          label: 'Learn',
          position: 'left',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
        {
          href: 'https://github.com/masoomtariq/Hakathon_1',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Learn',
          items: [
            {
              label: 'ROS 2',
              to: 'docs/ros-2',
            },
            {
              label: 'Gazebo & Unity',
              to: 'docs/gazebo-unity',
            },
            {
              label: 'NVIDIA Isaac',
              to: 'docs/isaac',
            },
            {
              label: 'Vision Language Models',
              to: 'docs/vla',
            },
            {
              label: 'Capstone Project',
              to: 'docs/capstone',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/masoomtariq/Hakathon_1',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Masoom Tariq. Built with Docusaurus.`,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
