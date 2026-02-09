<template>
  <!-- Placeholder for fixed header -->
  <div class="header-placeholder"></div>

  <!-- Fixed Header with navigation -->
  <header class="main-header" :class="{ scrolled: isScrolled }">
    <div class="header-lower">
      <div class="auto-container">
        <div class="outer-box">
          <div class="logo-box">
            <NuxtLink :to="localePath('/')" class="logo">
              <div class="logo-content">
                <img src="/public/logo-new.png" alt="" height="60" width="60">
                <div class="logo-text">
                  <span class="brand-name">O'ZBEKISTON</span>
                  <span class="brand-name">QIZIL KITOBI</span>
                </div>
              </div>
            </NuxtLink>
          </div>

          <div class="menu-area">
            <!-- Mobile Navigation Toggler -->
            <div class="mobile-nav-toggler" @click="toggleMobileMenu">
              <i class="icon-bar"></i>
              <i class="icon-bar"></i>
              <i class="icon-bar"></i>
            </div>

            <!-- Main Menu -->
            <nav class="main-menu navbar-expand-md navbar-light">
              <div class="collapse navbar-collapse show clearfix">
                <ul class="navigation clearfix">
                  <li :class="{ current: isActive('/') }">
                    <NuxtLink :to="localePath('/')">Bosh sahifa</NuxtLink>
                  </li>

                  <li :class="{ current: isActive('/about') }">
                    <NuxtLink :to="localePath('/about')">Biz haqimizda</NuxtLink>
                  </li>

                  <li class="dropdown" :class="{ current: isActive('/species') }">
                    <a href="#">Turlar</a>
                    <ul>
                      <li class="dropdown-submenu">
                        <NuxtLink :to="localePath('/species?category=animal')">Hayvonlar</NuxtLink>
                        <ul>
                          <li><NuxtLink :to="localePath('/species?category=animal&type=mammal')">Sutemizuvchilar</NuxtLink></li>
                          <li><NuxtLink :to="localePath('/species?category=animal&type=bird')">Qushlar</NuxtLink></li>
                          <li><NuxtLink :to="localePath('/species?category=animal&type=reptile')">Reptiliyalar</NuxtLink></li>
                        </ul>
                      </li>
                      <li class="dropdown-submenu">
                        <NuxtLink :to="localePath('/species?category=plant')">O'simliklar</NuxtLink>
                        <ul>
                          <li><NuxtLink :to="localePath('/species?category=plant&type=tree')">Daraxtlar</NuxtLink></li>
                          <li><NuxtLink :to="localePath('/species?category=plant&type=flower')">Gullar</NuxtLink></li>
                          <li><NuxtLink :to="localePath('/species?category=plant&type=herb')">O'tlar</NuxtLink></li>
                        </ul>
                      </li>
                    </ul>
                  </li>

                  <li :class="{ current: isActive('/blog') }">
                    <NuxtLink :to="localePath('/blog')">Yangiliklar</NuxtLink>
                  </li>

                  <li class="dropdown" :class="{ current: isActive('/natural-resources') }">
                    <NuxtLink :to="localePath('/natural-resources')">Tabiy boylik</NuxtLink>
                    <ul>
                      <li><NuxtLink :to="localePath('/natural-resources?category=tog-tizimalari')">Tog' tizimlari</NuxtLink></li>
                      <li><NuxtLink :to="localePath('/natural-resources?category=daryolar-kolar')">Daryolar va ko'llar</NuxtLink></li>
                      <li><NuxtLink :to="localePath('/natural-resources?category=chollar')">Cho'llar</NuxtLink></li>
                      <li><NuxtLink :to="localePath('/natural-resources?category=ormonlar')">O'rmonlar</NuxtLink></li>
                      <li><NuxtLink :to="localePath('/natural-resources?category=yaylovlar')">Yaylovlar</NuxtLink></li>
                      <li><NuxtLink :to="localePath('/natural-resources?category=mineral-resurslari')">Mineral resurslari</NuxtLink></li>
                      <li><NuxtLink :to="localePath('/natural-resources?category=hayvonot-dunyosi')">Hayvonot dunyosi</NuxtLink></li>
                      <li><NuxtLink :to="localePath('/natural-resources?category=osimliklar-dunyosi')">O'simliklar dunyosi</NuxtLink></li>
                    </ul>
                  </li>

                  <li :class="{ current: isActive('/partners') }">
                    <NuxtLink :to="localePath('/partners')">Hamkorlar</NuxtLink>
                  </li>

                  <li :class="{ current: isActive('/contact') }">
                    <NuxtLink :to="localePath('/contact')">Aloqa</NuxtLink>
                  </li>

                  <!-- Language Dropdown -->
                  <li class="dropdown lang-dropdown">
                    <a href="#" @click.prevent>
                      <img :src="currentFlag" :alt="currentLangName" class="lang-flag" />
                      {{ currentLangName }}
                    </a>
                    <ul>
                      <li v-for="lang in availableLocales" :key="lang.code">
                        <a
                          href="#"
                          :class="{ 'active-lang': locale === lang.code }"
                          @click.prevent="switchLanguage(lang.code)"
                        >
                          <img :src="langFlags[lang.code]" :alt="lang.name" class="lang-flag" />
                          {{ lang.name }}
                        </a>
                      </li>
                    </ul>
                  </li>

                  <li class="search-icon">
                    <a href="#" @click.prevent="toggleSearch">
                      <i class="fas fa-search"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>

          <!-- Search Modal -->
          <div v-if="isSearchOpen" class="search-popup" @click.self="closeSearch">
            <div class="search-popup-inner">
              <button class="close-search" @click="closeSearch">
                <i class="fas fa-times"></i>
              </button>
              <form @submit.prevent="handleSearch" class="search-form-popup">
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Qidirish..."
                  class="search-input"
                  ref="searchInput"
                  autofocus
                />
                <button type="submit" class="search-btn">
                  <i class="fas fa-search"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <LayoutMobileMenu v-if="isMobileMenuOpen" @close="closeMobileMenu" />
  </header>
</template>

<script setup lang="ts">
const { t, locale, locales, setLocale } = useI18n()
const route = useRoute()
const router = useRouter()
const localePath = useLocalePath()

const isMobileMenuOpen = ref(false)
const isSearchOpen = ref(false)
const searchQuery = ref('')
const searchInput = ref<HTMLInputElement | null>(null)
const isScrolled = ref(false)

// Language switcher
const langFlags: Record<string, string> = {
  uz: 'https://flagcdn.com/w40/uz.png',
  ru: 'https://flagcdn.com/w40/ru.png',
  en: 'https://flagcdn.com/w40/gb.png',
}

const availableLocales = computed(() => locales.value)

const currentFlag = computed(() => langFlags[locale.value] || langFlags.uz)
const currentLangName = computed(() => {
  const current = locales.value.find((l: any) => l.code === locale.value)
  return current ? (current as any).name : "O'zbek"
})

const switchLanguage = async (code: string) => {
  await setLocale(code)
}

const isActive = (path: string) => {
  if (path === '/') {
    return route.path === '/' || route.path === '/uz' || route.path === '/en'
  }
  return route.path.includes(path)
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const toggleSearch = () => {
  isSearchOpen.value = !isSearchOpen.value
  if (isSearchOpen.value) {
    nextTick(() => {
      searchInput.value?.focus()
    })
  }
}

const closeSearch = () => {
  isSearchOpen.value = false
  searchQuery.value = ''
}

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push(localePath(`/search?q=${encodeURIComponent(searchQuery.value)}`))
    closeSearch()
  }
}

// Close search on Escape key
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && isSearchOpen.value) {
    closeSearch()
  }
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()

  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown)
    window.removeEventListener('scroll', handleScroll)
  })
})
</script>

<style scoped>
/* Header Placeholder - prevents content jump when header-lower is fixed */
.header-placeholder {
  height: 0;
}

/* Main Header - fixed navigation, transparent by default */
.main-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: transparent;
  z-index: 999;
  box-shadow: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.25);
  transition: background-color 0.3s ease, box-shadow 0.3s ease, border-bottom 0.3s ease;
}

/* Scrolled state - white background */
.main-header.scrolled {
  background-color: var(--white-color);
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid transparent;
}

/* Header Lower */
.header-lower {
  padding: 12px 0;
  background: transparent;
  box-shadow: none;
  transition: all 0.3s ease;
}

.main-header.scrolled .header-lower {
  background: var(--white-color);
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.08);
}

.outer-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Logo */
.logo {
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
}

.logo-content {
  display: flex;
  align-items: center;
  gap: 15px;
}

.logo-content i {
  font-size: 48px;
  color: var(--primary-color);
  transition: all 0.3s ease;
}

.logo:hover .logo-content i {
  transform: scale(1.1) rotate(5deg);
}

.logo-text {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}

.brand-name {
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 0.5px;
  color: var(--white-color);
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}

.main-header.scrolled .brand-name {
  color: transparent;
  background: #b02923;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: none;
}

.brand-tagline {
  font-size: 13px;
  font-weight: 500;
  color: var(--text-color);
  margin-top: 2px;
}

/* Mobile Nav Toggler */
.mobile-nav-toggler {
  display: none;
  flex-direction: column;
  gap: 6px;
  cursor: pointer;
  padding: 12px;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  border-radius: 8px;
  transition: all 0.3s ease;
}

.mobile-nav-toggler:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 15px rgba(160, 51, 45, 0.3);
}

.mobile-nav-toggler .icon-bar {
  width: 28px;
  height: 3px;
  background-color: var(--white-color);
  border-radius: 2px;
  transition: all 0.3s ease;
}

/* Navigation */
.navigation {
  list-style: none;
  display: flex;
  gap: 5px;
  margin: 0;
  padding: 0;
  align-items: center;
}

.navigation li {
  position: relative;
}

.navigation li a {
  color: var(--white-color);
  font-size: 15px;
  font-weight: 600;
  padding: 10px 18px;
  display: block;
  transition: all 0.3s ease;
  border-radius: 8px;
  position: relative;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

.main-header.scrolled .navigation li a {
  color: var(--heading-color);
  text-shadow: none;
}

.navigation li a::before {
  content: '';
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%) scaleX(0);
  width: 80%;
  height: 2px;
  background: linear-gradient(90deg, var(--secondary-color), var(--white-color));
  transition: transform 0.3s ease, background 0.3s ease;
}

.main-header.scrolled .navigation li a::before {
  background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
}

.navigation li a:hover::before,
.navigation li.current > a::before {
  transform: translateX(-50%) scaleX(1);
}

.navigation li a:hover,
.navigation li.current > a {
  color: var(--secondary-color);
}

.main-header.scrolled .navigation li a:hover,
.main-header.scrolled .navigation li.current > a {
  color: var(--primary-color);
}

/* Dropdown */
.navigation .dropdown {
  position: relative;
}

.navigation .dropdown > a::after {
  content: '\f107';
  font-family: 'Font Awesome 5 Free';
  font-weight: 900;
  margin-left: 6px;
  font-size: 12px;
  transition: transform 0.3s ease;
}

.navigation .dropdown:hover > a::after {
  transform: rotate(180deg);
}

.navigation .dropdown > ul {
  position: absolute;
  top: 100%;
  left: 0;
  background: var(--white-color);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  padding: 15px;
  min-width: 220px;
  list-style: none;
  opacity: 0;
  visibility: hidden;
  transform: translateY(20px);
  transition: all 0.3s ease;
  z-index: 100;
  border-radius: 12px;
  border-top: 3px solid var(--primary-color);
}

.navigation .dropdown:hover > ul {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.navigation .dropdown ul li {
  padding: 0;
  margin-bottom: 5px;
}

.navigation .dropdown ul li:last-child {
  margin-bottom: 0;
}

.navigation .dropdown ul li a {
  font-weight: 500;
  padding: 10px 15px;
  font-size: 14px;
  border-radius: 6px;
  transition: all 0.3s ease;
  color: var(--heading-color) !important;
  text-shadow: none !important;
}

.navigation .dropdown ul li a::before {
  display: none;
}

.navigation .dropdown ul li a:hover {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: var(--white-color)!important;
  /*transform: translateX(5px);*/
}

/* Multi-level Dropdown (Submenu) */
.navigation .dropdown-submenu {
  position: relative;
}

.navigation .dropdown-submenu > a::after,
.navigation .dropdown-submenu > :deep(a)::after {
  content: '\f105';
  font-family: 'Font Awesome 5 Free';
  font-weight: 900;
  position: absolute;
  right: 15px;
  font-size: 12px;
  transition: transform 0.3s ease;
}

.navigation .dropdown-submenu:hover > a::after,
.navigation .dropdown-submenu:hover > :deep(a)::after {
  transform: translateX(3px);
}

.navigation .dropdown-submenu > ul {
  position: absolute;
  top: 0;
  left: 100%;
  background: var(--white-color);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  padding: 15px;
  min-width: 220px;
  list-style: none;
  opacity: 0;
  visibility: hidden;
  transform: translateX(20px);
  transition: all 0.3s ease;
  z-index: 100;
  border-radius: 12px;
  border-left: 3px solid var(--primary-color);
  margin-left: 2px;
}

.navigation .dropdown-submenu:hover > ul {
  opacity: 1;
  visibility: visible;
  transform: translateX(0);
}

.navigation .dropdown-submenu > a,
.navigation .dropdown-submenu > :deep(a) {
  position: relative;
  padding-right: 35px !important;
}

/* Language Dropdown */
.lang-flag {
  width: 22px;
  height: 15px;
  object-fit: cover;
  border-radius: 2px;
  vertical-align: middle;
}

.lang-dropdown > a {
  display: flex !important;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
}

.lang-dropdown > ul {
  right: 0;
  left: auto !important;
  min-width: 180px !important;
}

.lang-dropdown ul li a {
  display: flex !important;
  align-items: center;
  gap: 10px;
}

.lang-dropdown ul li a.active-lang {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: var(--white-color)!important;
}

/* Search Icon */
.navigation .search-icon a {
  padding: 10px 15px;
}

.navigation .search-icon i {
  font-size: 18px;
  color: var(--white-color);
  transition: var(--transition);
}

.main-header.scrolled .navigation .search-icon i {
  color: var(--heading-color);
}

.navigation .search-icon:hover i {
  color: var(--secondary-color);
  transform: scale(1.1);
}

.main-header.scrolled .navigation .search-icon:hover i {
  color: var(--primary-color);
}

/* Search Popup */
.search-popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.search-popup-inner {
  position: relative;
  width: 90%;
  max-width: 700px;
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from {
    transform: translateY(-50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.close-search {
  position: absolute;
  top: -50px;
  right: 0;
  background: transparent;
  border: none;
  color: var(--white-color);
  font-size: 32px;
  cursor: pointer;
  transition: var(--transition);
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-search:hover {
  transform: rotate(90deg);
  color: var(--secondary-color);
}

.search-form-popup {
  display: flex;
  gap: 10px;
  background: var(--white-color);
  padding: 10px;
  border-radius: 50px;
  box-shadow: 0 10px 50px rgba(0, 0, 0, 0.3);
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  padding: 15px 25px;
  font-size: 18px;
  background: transparent;
  color: var(--heading-color);
}

.search-input::placeholder {
  color: #999;
}

.search-btn {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: var(--white-color);
  font-size: 20px;
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 5px 20px rgba(160, 51, 45, 0.4);
}

/* Wider container for header to fit all menus */
.header-lower :deep(.auto-container) {
  max-width: 1400px;
}

/* Responsive */
@media (max-width: 1400px) {
  .navigation {
    gap: 2px;
  }

  .navigation li a {
    padding: 10px 12px;
    font-size: 14px;
  }
}

@media (max-width: 1200px) {
  .main-menu {
    display: none;
  }

  .mobile-nav-toggler {
    display: flex;
  }
}

@media (max-width: 991px) {
  .logo-content i {
    font-size: 40px;
  }

  .brand-name {
    font-size: 20px;
  }

  .brand-tagline {
    font-size: 12px;
  }
}

@media (max-width: 768px) {
  .header-placeholder {
    height: 90px;
  }

  .header-lower {
    padding: 15px 0;
  }

  .logo-content {
    gap: 10px;
  }

  .logo-content i {
    font-size: 36px;
  }

  .brand-name {
    font-size: 18px;
  }

  .brand-tagline {
    font-size: 11px;
  }

  .mobile-nav-toggler {
    padding: 10px;
  }

  .mobile-nav-toggler .icon-bar {
    width: 25px;
    height: 2.5px;
  }
}

@media (max-width: 480px) {
  .header-placeholder {
    height: 80px;
  }

  .logo-content i {
    font-size: 32px;
  }

  .brand-name {
    font-size: 16px;
  }

  .brand-tagline {
    font-size: 10px;
  }
}
</style>
