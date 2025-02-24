import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Introduction',
      items: [
        'getting-started',
        'z2zlib-specification',
      ],
    },
    {
      type: 'category',
      label: 'API Reference',
      items: [
        'api/state-manager',
        'api/state',
        'api/ecdsa-crypto-manager',
        'api/signaling-server',
        'api/webrtc-manager',
      ],
    },
    {
      type: 'link',
      href: 'https://github.com/Yeshilabs/z2zlib',
      label: 'GitHub',
    },
  ],
};

export default sidebars;
