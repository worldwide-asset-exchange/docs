import nav from './components/nav'
import sidebar from './components/sidebar'
import footer from './components/footer'

export default {
  label: 'English',
  lang: 'en-EN',
  title: 'WAX Blockchain Documentation',
  description: "WAX Blockchain Documentation – Comprehensive toolkit for developers and creators building dApps, NFTs, and Web3 experiences on the WAX Blockchain",
  themeConfig: {
    nav,
    sidebar,
    footer: {
      navigation: footer
    }
  }
}