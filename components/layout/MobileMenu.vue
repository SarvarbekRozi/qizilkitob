<template>
  <div class="mobile-menu-wrapper">
    <div class="mobile-menu-backdrop" @click="$emit('close')"></div>
    <div class="mobile-menu-panel">
      <div class="mobile-menu-header">
        <div class="logo">
          <img src="/logo.png" alt="Logo" />
        </div>
        <button class="close-btn" @click="$emit('close')">
          <span>&times;</span>
        </button>
      </div>

      <div class="mobile-menu-content">
        <nav class="mobile-navigation">
          <ul>
            <li>
              <NuxtLink :to="localePath('/')" @click="$emit('close')">
                {{ t('nav.home') }}
              </NuxtLink>
            </li>

            <li class="has-children">
              <a href="#" @click.prevent="toggleSubmenu('species')">
                {{ t('nav.species') }}
                <span class="toggle-icon">+</span>
              </a>
              <ul v-show="activeSubmenu === 'species'">
                <li>
                  <NuxtLink :to="localePath('/species')" @click="$emit('close')">
                    {{ t('common.viewAll') }}
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink :to="localePath('/species?category=animal')" @click="$emit('close')">
                    {{ t('nav.animals') }}
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink :to="localePath('/species?category=plant')" @click="$emit('close')">
                    {{ t('nav.plants') }}
                  </NuxtLink>
                </li>
              </ul>
            </li>

            <li>
              <NuxtLink :to="localePath('/about')" @click="$emit('close')">
                {{ t('nav.about') }}
              </NuxtLink>
            </li>

            <li>
              <NuxtLink :to="localePath('/gallery')" @click="$emit('close')">
                {{ t('nav.gallery') }}
              </NuxtLink>
            </li>

            <li>
              <NuxtLink :to="localePath('/blog')" @click="$emit('close')">
                {{ t('nav.blog') }}
              </NuxtLink>
            </li>

            <li class="has-children">
              <a href="#" @click.prevent="toggleSubmenu('natural-resources')">
                Tabiy boylik
                <span class="toggle-icon">+</span>
              </a>
              <ul v-show="activeSubmenu === 'natural-resources'">
                <li>
                  <NuxtLink :to="localePath('/natural-resources')" @click="$emit('close')">
                    Barchasi
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink :to="localePath('/natural-resources?category=davlat-qoriqxonalari')" @click="$emit('close')">
                    Davlat qo'riqxonalari
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink :to="localePath('/natural-resources?category=majmua-buyurtma-qoriqxonasi')" @click="$emit('close')">
                    Majmua buyurtma qo'riqxonasi
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink :to="localePath('/natural-resources?category=milliy-tabiat-boglari')" @click="$emit('close')">
                    Milliy tabiat bog'lari
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink :to="localePath('/natural-resources?category=tabiat-yodgorliklari')" @click="$emit('close')">
                    Tabiat yodgorliklari
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink :to="localePath('/natural-resources?category=buyurtma-qoriqxonalari')" @click="$emit('close')">
                    Buyurtma qo'riqxonalari
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink :to="localePath('/natural-resources?category=maxsus-jayron-pitomnigi')" @click="$emit('close')">
                    Maxsus Jayron pitomnigi
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink :to="localePath('/natural-resources?category=biosfera-rezervatlari')" @click="$emit('close')">
                    Biosfera rezervatlari
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink :to="localePath('/natural-resources?category=milliy-bog')" @click="$emit('close')">
                    Milliy bog'
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink :to="localePath('/natural-resources?category=davlat-ormon-xojaliklari')" @click="$emit('close')">
                    Davlat o'rmon xo'jaliklari
                  </NuxtLink>
                </li>
              </ul>
            </li>

            <li>
              <NuxtLink :to="localePath('/map')" @click="$emit('close')">
                {{ t('nav.map') }}
              </NuxtLink>
            </li>

            <li>
              <NuxtLink :to="localePath('/contact')" @click="$emit('close')">
                {{ t('nav.contact') }}
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <div class="mobile-menu-footer">
          <div class="mobile-lang-title">Tilni tanlang</div>
          <div class="mobile-lang-switcher">
            <button
              v-for="lang in availableLocales"
              :key="lang.code"
              :class="{ active: locale === lang.code }"
              class="mobile-lang-btn"
              @click="switchLanguage(lang.code)"
            >
              <img :src="langFlags[lang.code]" :alt="lang.name" class="mobile-lang-flag" />
              {{ lang.name }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineEmits(['close'])

const { t, locale, locales, setLocale } = useI18n()
const localePath = useLocalePath()

const activeSubmenu = ref<string | null>(null)

const langFlags: Record<string, string> = {
  uz: 'https://flagcdn.com/w40/uz.png',
  ru: 'https://flagcdn.com/w40/ru.png',
  en: 'https://flagcdn.com/w40/gb.png',
}

const availableLocales = computed(() => locales.value)

const switchLanguage = async (code: string) => {
  await setLocale(code)
}

const toggleSubmenu = (menu: string) => {
  activeSubmenu.value = activeSubmenu.value === menu ? null : menu
}
</script>

<style scoped>
.mobile-menu-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
}

.mobile-menu-backdrop {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  animation: fadeIn 0.3s ease;
}

.mobile-menu-panel {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 300px;
  background-color: var(--white-color);
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.2);
  animation: slideInRight 0.3s ease;
  overflow-y: auto;
}

.mobile-menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #eee;
}

.mobile-menu-header .logo img {
  max-height: 40px;
}

.close-btn {
  background: none;
  border: none;
  font-size: 40px;
  color: var(--heading-color);
  cursor: pointer;
  line-height: 1;
  padding: 0;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mobile-menu-content {
  padding: 20px;
}

.mobile-navigation ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.mobile-navigation > ul > li {
  border-bottom: 1px solid #eee;
}

.mobile-navigation li a {
  display: block;
  padding: 15px 0;
  color: var(--heading-color);
  font-size: 16px;
  font-weight: 600;
  transition: var(--transition);
}

.mobile-navigation li a:hover {
  color: var(--primary-color);
  padding-left: 10px;
}

.mobile-navigation .has-children > a {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.mobile-navigation .has-children > a .toggle-icon {
  font-size: 24px;
  transition: var(--transition);
}

.mobile-navigation .has-children ul {
  padding-left: 20px;
}

.mobile-navigation .has-children ul li {
  border-bottom: none;
}

.mobile-navigation .has-children ul li a {
  font-weight: 500;
  font-size: 14px;
  padding: 10px 0;
}

.mobile-menu-footer {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.mobile-lang-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 12px;
}

.mobile-lang-switcher {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.mobile-lang-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border: 1px solid #eee;
  background: var(--white-color);
  border-radius: 8px;
  font-size: 15px;
  font-weight: 500;
  color: var(--heading-color);
  cursor: pointer;
  transition: all 0.3s ease;
}

.mobile-lang-btn:hover {
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.mobile-lang-btn.active {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: var(--white-color);
  border-color: transparent;
}

.mobile-lang-flag {
  width: 28px;
  height: 20px;
  object-fit: cover;
  border-radius: 3px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideInRight {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}
</style>
