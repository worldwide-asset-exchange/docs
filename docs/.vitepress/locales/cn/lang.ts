import nav from './components/nav'
import sidebar from './components/sidebar'
import footer from './components/footer'

export default {
  label: 'Chinese',
  lang: 'cn-CN',
  title: 'WAX 区块链文档',
  description: 'WAX区块链文档中心——专为开发者、创作者及项目团队打造的资源枢纽，助您构建、启动并全面掌握WAX、NFT及生态系统的核心知识。',
  themeConfig: {
    nav,
    sidebar,
    footer: {
      navigation: footer
    }
  }
}