<template>
  <a
    v-if="href && label"
    class="action-highlight"
    :href="href"
    :target="href.startsWith('http') ? '_blank' : '_self'"
    :rel="href.startsWith('http') ? 'noopener noreferrer' : ''"
  >
    <span>{{ label }}</span>
    <span v-if="href.startsWith('http')">
      <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path id="Vector" d="M10.0002 5H8.2002C7.08009 5 6.51962 5 6.0918 5.21799C5.71547 5.40973 5.40973 5.71547 5.21799 6.0918C5 6.51962 5 7.08009 5 8.2002V15.8002C5 16.9203 5 17.4801 5.21799 17.9079C5.40973 18.2842 5.71547 18.5905 6.0918 18.7822C6.5192 19 7.07899 19 8.19691 19H15.8031C16.921 19 17.48 19 17.9074 18.7822C18.2837 18.5905 18.5905 18.2839 18.7822 17.9076C19 17.4802 19 16.921 19 15.8031V14M20 9V4M20 4H15M20 4L13 11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </span>
  </a>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  href: {
    type: String,
    default: '',
  },
})
</script>

<style scoped>
.action-highlight {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border: 1px solid transparent;
  text-align: center;
  font-weight: 600;
  white-space: nowrap;
  transition: color 0.25s, border-color 0.25s, background-color 0.25s;
  border-radius: 20px;
  padding: 0 20px;
  line-height: 38px;
  font-size: 14px;
  border-color: var(--vp-button-brand-border);
  color: var(--vp-button-brand-text);
  background-color: var(--vp-button-brand-bg);
  text-decoration: none;
}

.action-highlight svg {
  width: 16px;
  height: 16px;
}

.action-highlight:hover {
  border-color: var(--vp-button-brand-hover-border);
  color: var(--vp-button-brand-hover-text);
  background-color: var(--vp-button-brand-hover-bg);
}
</style>
