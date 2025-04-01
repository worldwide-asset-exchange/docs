import nav from './components/nav'
import sidebar from './components/sidebar'
import footer from './components/footer'

export default {
  label: 'Spanish',
  lang: 'es-ES',
  title: 'Documentación de la WAX Blockchain',
  description: 'Portal para desarrolladores en WAX Blockchain',
  themeConfig: {
    nav,
    sidebar,
    footer: {
      navigation: footer
    }
  }
}