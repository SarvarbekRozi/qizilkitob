<template>
  <header class="main-header header-style-one" :class="{ 'sticky-header': isSticky }">
    <!-- Header Top -->
    <div class="header-top">
      <div class="auto-container">
        <div class="top-inner">
          <div class="top-left">
            <ul class="info clearfix">
              <li><i class="fas fa-map-marker-alt"></i>{{ t('contact.address') }}</li>
              <li><i class="fas fa-envelope"></i><a href="mailto:info@redbook.uz">info@redbook.uz</a></li>
            </ul>
          </div>
          <div class="top-right">
            <ul class="social-links clearfix">
              <li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
              <li><a href="#"><i class="fab fa-instagram"></i></a></li>
              <li><a href="#"><i class="fab fa-telegram"></i></a></li>
            </ul>
            <LayoutLanguageSwitcher />
          </div>
        </div>
      </div>
    </div>

    <!-- Header Lower -->
    <div class="header-lower">
      <div class="auto-container">
        <div class="outer-box">
          <div class="logo-box">
            <NuxtLink :to="localePath('/')" class="logo">
              <div class="logo-content">
                <i class="fas fa-book-open"></i>
                <div class="logo-text">
                  <span class="brand-name">QIZIL KITOB</span>
                  <span class="brand-tagline">O'zbekiston</span>
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
                    <NuxtLink :to="localePath('/')">{{ t('nav.home') }}</NuxtLink>
                  </li>

                  <li class="dropdown" :class="{ current: isActive('/species') }">
                    <a href="#">{{ t('nav.species') }}</a>
                    <ul>
                      <li><NuxtLink :to="localePath('/species')">{{ t('common.viewAll') }}</NuxtLink></li>
                      <li><NuxtLink :to="localePath('/species?category=animal')">{{ t('nav.animals') }}</NuxtLink></li>
                      <li><NuxtLink :to="localePath('/species?category=plant')">{{ t('nav.plants') }}</NuxtLink></li>
                    </ul>
                  </li>

                  <li :class="{ current: isActive('/about') }">
                    <NuxtLink :to="localePath('/about')">{{ t('nav.about') }}</NuxtLink>
                  </li>

                  <li :class="{ current: isActive('/gallery') }">
                    <NuxtLink :to="localePath('/gallery')">{{ t('nav.gallery') }}</NuxtLink>
                  </li>

                  <li :class="{ current: isActive('/blog') }">
                    <NuxtLink :to="localePath('/blog')">{{ t('nav.blog') }}</NuxtLink>
                  </li>

                  <li :class="{ current: isActive('/map') }">
                    <NuxtLink :to="localePath('/map')">{{ t('nav.map') }}</NuxtLink>
                  </li>

                  <li :class="{ current: isActive('/contact') }">
                    <NuxtLink :to="localePath('/contact')">{{ t('nav.contact') }}</NuxtLink>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <LayoutMobileMenu v-if="isMobileMenuOpen" @close="closeMobileMenu" />
  </header>
</template>

<script setup lang="ts">
const { t } = useI18n()
const route = useRoute()
const localePath = useLocalePath()

const isMobileMenuOpen = ref(false)
const isSticky = ref(false)

const isActive = (path: string) => {
  return route.path.includes(path)
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

// Sticky header on scroll
onMounted(() => {
  const handleScroll = () => {
    isSticky.value = window.scrollY > 100
  }
  window.addEventListener('scroll', handleScroll)

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })
})
</script>

<style scoped>
.main-header {
  position: relative;
  background-color: var(--white-color);
  z-index: 999;
  transition: all 0.3s ease;
}

.sticky-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  animation: slideDown 0.3s ease;
}

.sticky-header .header-top {
  display: none;
}

.sticky-header .header-lower {
  padding: 12px 0;
}

@keyframes slideDown {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
}

/* Header Top */
.header-top {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  padding: 12px 0;
  color: var(--white-color);
  transition: all 0.3s ease;
}

.top-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
}

.top-left .info {
  list-style: none;
  display: flex;
  gap: 30px;
  margin: 0;
  padding: 0;
}

.top-left .info li {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.95);
  display: flex;
  align-items: center;
  gap: 8px;
}

.top-left .info li i {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
}

.top-left .info a {
  color: rgba(255, 255, 255, 0.95);
  transition: all 0.3s ease;
}

.top-left .info a:hover {
  color: var(--white-color);
}

.top-right {
  display: flex;
  align-items: center;
  gap: 25px;
}

.social-links {
  list-style: none;
  display: flex;
  gap: 12px;
  margin: 0;
  padding: 0;
}

.social-links a {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.15);
  color: var(--white-color);
  font-size: 14px;
  border-radius: 50%;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.social-links a:hover {
  background: var(--white-color);
  color: var(--primary-color);
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Header Lower */
.header-lower {
  padding: 20px 0;
  background: var(--white-color);
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
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
  font-size: 24px;
  font-weight: 800;
  color: var(--heading-color);
  letter-spacing: 0.5px;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
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
  box-shadow: 0 4px 15px rgba(46, 139, 87, 0.3);
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
  color: var(--heading-color);
  font-size: 15px;
  font-weight: 600;
  padding: 10px 18px;
  display: block;
  transition: all 0.3s ease;
  border-radius: 8px;
  position: relative;
}

.navigation li a::before {
  content: '';
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%) scaleX(0);
  width: 80%;
  height: 2px;
  background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
  transition: transform 0.3s ease;
}

.navigation li a:hover::before,
.navigation li.current > a::before {
  transform: translateX(-50%) scaleX(1);
}

.navigation li a:hover,
.navigation li.current > a {
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
}

.navigation .dropdown ul li a::before {
  display: none;
}

.navigation .dropdown ul li a:hover {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: var(--white-color);
  transform: translateX(5px);
}

/* Responsive */
@media (max-width: 1200px) {
  .main-menu {
    display: none;
  }

  .mobile-nav-toggler {
    display: flex;
  }

  .navigation {
    gap: 3px;
  }

  .navigation li a {
    padding: 8px 12px;
    font-size: 14px;
  }
}

@media (max-width: 991px) {
  .header-top {
    padding: 10px 0;
  }

  .top-left .info {
    gap: 20px;
    font-size: 13px;
  }

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
  .header-top {
    padding: 8px 0;
  }

  .top-left .info {
    flex-direction: column;
    gap: 8px;
    font-size: 12px;
  }

  .top-inner {
    flex-direction: column;
    gap: 12px;
    text-align: center;
  }

  .top-right {
    gap: 15px;
  }

  .social-links {
    gap: 10px;
  }

  .social-links a {
    width: 30px;
    height: 30px;
    font-size: 13px;
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
  .top-left .info {
    display: none;
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
