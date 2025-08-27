// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import './style.css'
import { theme, useOpenapi } from 'vitepress-openapi/client'
import 'vitepress-openapi/dist/style.css'
import spec from '../../openapi/chain-openapi.json' with { type: 'json' }

// Default servers fallback
const defaultServers = [
  'https://wax.greymass.com'
]

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  async enhanceApp({ app, router, siteData }) {
    // Fetch dynamic servers
    let dynamicServers = defaultServers
    try {
      const response = await fetch('https://validate.eosnation.io/wax/reports/endpoints.json')
      const data = await response.json()
      dynamicServers = data.report.api_https2.map(item => item[1])
    } catch (err) {
      console.error('Failed to fetch dynamic servers, using defaults:', err)
    }

    useOpenapi({
      spec: {
        ...spec,
        servers: dynamicServers.map(item => ({
          url: `${item}/v1/chain`,
        })).sort((a, b) => {
          // if url contains greymass, it should be the first server
          if (a.url.includes('greymass')) return -1
          if (b.url.includes('greymass')) return 1
          return 0
        })
      },
      config: {
        operation: {
          defaultBaseUrl: 'https://wax.greymass.com/v1/chain',
        },
        spec: {
          groupByTags: false,
        },
        server: {
          allowCustomServer: true,
        },
      },
    }),
    theme.enhanceApp({ app, router, siteData })
  }
} satisfies Theme
