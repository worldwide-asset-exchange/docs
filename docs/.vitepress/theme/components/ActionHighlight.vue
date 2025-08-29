<template>
  <a
    v-if="href && label"
    class="action-highlight"
    :href="href"
  >
    {{ label }}
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
  display: inline-block;
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

.action-highlight:hover {
  border-color: var(--vp-button-brand-hover-border);
  color: var(--vp-button-brand-hover-text);
  background-color: var(--vp-button-brand-hover-bg);
}
</style>
