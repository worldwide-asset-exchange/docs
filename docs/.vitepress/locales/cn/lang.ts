import nav from './components/nav'
import sidebar from './components/sidebar'
import footer from './components/footer'

export default {
  label: 'Chinese',
  lang: 'cn-CN',
  title: 'WAX 区块链文档',
  description: '开发者门户在WAX区块链',
  themeConfig: {
    nav,
    sidebar,
    footer: {
      navigation: footer
    }
  }
}