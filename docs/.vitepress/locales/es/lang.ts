import nav from './components/nav'
import sidebar from './components/sidebar'
import footer from './components/footer'

export default {
  label: 'Spanish',
  lang: 'es-ES',
  title: 'Documentación de la WAX Blockchain',
  description: 'Documentación de WAX Blockchain: tu centro de recursos para desarrolladores, creadores y proyectos para crear, lanzar y aprender todo sobre WAX, NFT y el ecosistema.',
  themeConfig: {
    nav,
    sidebar,
    footer: {
      navigation: footer
    }
  }
}