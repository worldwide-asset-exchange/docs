// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import './style.css'
import { theme, useOpenapi } from 'vitepress-openapi/client'
import 'vitepress-openapi/dist/style.css'
import spec from '../../openapi/chain-openapi.json' with { type: 'json' }

// get servers from https://validate.eosnation.io/wax/reports/endpoints.json and save to a variable
const servers = await fetch('https://validate.eosnation.io/wax/reports/endpoints.json')
  .then(res => res.json())
  .then(data => {
    return data.report.api_https2.map(item => item[1])
  })
  .catch(err => {
    console.error(err)
  })

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    useOpenapi({
      spec,
      config: {
        path: {
          showBaseURL: true,
        },
        operation: {
          defaultBaseUrl: 'https://wax.greymass.com/v1/chain',
        },
        spec: {
          groupByTags: false,
        },
        server: {
          // allowCustomServer: true,
          // getServers({ path }) {
          //   return servers.map(item => `${item}/v1/chain${path}`)
          // },
        },
      },
    }),
    theme.enhanceApp({ app, router, siteData })
  }
} satisfies Theme
