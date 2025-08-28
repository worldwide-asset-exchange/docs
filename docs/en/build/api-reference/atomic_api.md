---
title: WAX AtomicAssets API Reference
aside: false
outline: false
---

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useTheme } from 'vitepress-openapi/client'
import { fetchWaxEndpoints } from '../../../.vitepress/theme/index.ts'
import spec from '../../../openapi/atomic-openapi.json' with { type: 'json' }

// Default servers fallback
const defaultServers = [
  'https://atomic.3dkrender.com'
]

const dynamicSpec = ref(spec)

const updateSpecWithServers = async (endpoints) => {
  if (!endpoints) {
    // Use defaults if no endpoints available
    const defaultSpec = {
      ...spec,
      servers: defaultServers.map(item => ({
        url: `${item}/v1/chain`,
      }))
    }
    dynamicSpec.value = defaultSpec
    return
  }
  
  const dynamicServers = endpoints.atomic_https.map(item => item[1])
  const newSpec = {
    ...spec,
    servers: dynamicServers.map(item => ({
      url: item,
    })),
  }
  
  dynamicSpec.value = newSpec
}

onMounted(async () => {
  const endpoints = await fetchWaxEndpoints()
  updateSpecWithServers(endpoints)
})

useTheme({
  operation: {
    defaultBaseUrl: defaultServers[0],
  },
})
</script>

<OASpec
  :key="dynamicSpec.servers?.length || 0"
  :spec="dynamicSpec"
  hideBranding
  hideServers
  hidePathsSummary
 />
