<template>
  <div class="language-switcher">
    <button
      v-for="lang in availableLocales"
      :key="lang.code"
      :class="{ active: locale === lang.code }"
      @click="switchLanguage(lang.code)"
      class="lang-btn"
    >
      {{ lang.name }}
    </button>
  </div>
</template>

<script setup lang="ts">
const { locale, locales, setLocale } = useI18n()

const availableLocales = computed(() => {
  return locales.value
})

const switchLanguage = async (code: string) => {
  await setLocale(code)
}
</script>

<style scoped>
.language-switcher {
  display: flex;
  gap: 10px;
}

.lang-btn {
  padding: 8px 20px;
  border: 2px solid var(--primary-color);
  background-color: transparent;
  color: var(--primary-color);
  font-weight: 600;
  cursor: pointer;
  border-radius: var(--border-radius);
  transition: var(--transition);
}

.lang-btn:hover,
.lang-btn.active {
  background-color: var(--primary-color);
  color: var(--white-color);
}
</style>
