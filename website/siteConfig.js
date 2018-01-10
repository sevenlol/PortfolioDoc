/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const siteConfig = {
  title: 'Stephen Lin\'s Website',
  tagline: 'Built with Angular and Firebase',
  url: 'https://facebook.github.io' /* your website url */,
  baseUrl: '/PortfolioDoc/' /* base url for your project */,
  organizationName : 'sevenlol',
  projectName: 'PortfolioDoc',
  headerLinks: [
    {doc: 'overview', label: 'Design Docs'},
    {href: 'https://sevenlol.github.io/PortfolioWebTSDoc/', label: 'Typescript Doc'}
  ],
  profile : {
    github: 'https://github.com/sevenlol',
    linkedin: 'https://www.linkedin.com/in/stephen-lin-b211aa109/',
    website: 'https://sevenloldev.com'
  },
  /* path to images for header/footer */
  // headerIcon: 'img/docusaurus.svg',
  // footerIcon: 'img/docusaurus.svg',
  favicon: 'img/favicon/favicon.ico',
  /* colors for website */
  colors: {
    primaryColor: '#1565c0',
    secondaryColor: '#4f83cc',
  },
  // This copyright info is used in /core/Footer.js and blog rss/atom feeds.
  copyright:
    'Copyright © ' +
    new Date().getFullYear() +
    ' Stephen Lin',
  citation: 'This website is generated using Facebook\'s Docusaurus',
  // organizationName: 'deltice', // or set an env variable ORGANIZATION_NAME
  // projectName: 'test-site', // or set an env variable PROJECT_NAME
  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks
    theme: 'default',
  },
  scripts: ['https://buttons.github.io/buttons.js'],
  // You may provide arbitrary config keys to be used as needed by your template.
  repoUrl: 'https://github.com/sevenlol/PortfolioDoc',
};

module.exports = siteConfig;
