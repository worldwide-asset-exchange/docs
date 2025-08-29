// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import './style.css'
import { theme, useOpenapi } from 'vitepress-openapi/client'
import 'vitepress-openapi/dist/style.css'
import ActionHighlight from './components/ActionHighlight.vue'

// Global server fetching utility
export const fetchWaxEndpoints = async () => {
  // Check cache first
  const cacheKey = 'wax-endpoints-cache'
  const cacheExpiry = 1000 * 60 * 60 * 24 // 24 hours in milliseconds
  
  try {
    const cached = localStorage.getItem(cacheKey)
    if (cached) {
      const { endpoints: cachedEndpoints, timestamp } = JSON.parse(cached)
      const now = Date.now()
      
      // Use cached endpoints if they're still valid
      if (now - timestamp < cacheExpiry) {
        console.log('Using cached endpoint list')
        return cachedEndpoints
      }
    }
    
    // Fetch fresh data if cache is expired or doesn't exist
    console.log('Fetching fresh endpoint list')
    const response = await fetch('https://validate.eosnation.io/wax/reports/endpoints.json')
    const data = await response.json()
    const endpoints = data.report
    
    // Cache the new data
    const cacheData = {
      endpoints,
      timestamp: Date.now()
    }
    localStorage.setItem(cacheKey, JSON.stringify(cacheData))
    
    return endpoints
  } catch (err) {
    console.error('Failed to fetch endpoints, using defaults:', err)
    return null
  }
}

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  async enhanceApp({ app, router, siteData }) {
    app.component('ActionHighlight', ActionHighlight),
    useOpenapi({
      config: {
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
