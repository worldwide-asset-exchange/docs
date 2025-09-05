import nav from './components/nav'
import sidebar from './components/sidebar'
import footer from './components/footer'

export default {
  label: 'English',
  lang: 'en-EN',
  title: 'WAX Blockchain Documentation',
  description: "WAX Blockchain Documentation – Your resource hub for developers, creators, and project to build, launch, and learn everything about WAX, NFTs, and the ecosystem.",
  themeConfig: {
    nav,
    sidebar,
    footer: {
      navigation: footer
    }
  }
}