<template>
  <div class="gallery-page">
    <!-- Page Title -->
    <section class="page-title">
      <div class="auto-container">
        <div class="content-box">
          <h1>{{ t('nav.gallery') }}</h1>
          <ul class="breadcrumb">
            <li><NuxtLink :to="localePath('/')">{{ t('nav.home') }}</NuxtLink></li>
            <li>{{ t('nav.gallery') }}</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Gallery Section -->
    <section class="gallery-section sec-pad">
      <div class="auto-container">
        <div class="row">
          <div
            v-for="species in allSpecies"
            :key="species.id"
            class="col-lg-4 col-md-6 col-sm-12"
          >
            <div class="gallery-item">
              <img :src="species.images.main" :alt="species.name[locale]" />
              <div class="overlay">
                <h3>{{ species.name[locale] }}</h3>
                <NuxtLink :to="localePath(`/species/${species.slug}`)" class="view-btn">
                  {{ t('common.viewDetails') }}
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()
const { allSpecies } = useSpeciesData()

useHead({
  title: t('nav.gallery')
})
</script>

<style scoped>
.page-title {
  position: relative;
  padding: 120px 0 80px;
  background-image: url('/images/background/page-title.jpg');
  background-size: cover;
  background-position: center;
}

.page-title::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
}

.page-title .content-box {
  position: relative;
  z-index: 2;
  text-align: center;
  color: var(--white-color);
}

.page-title h1 {
  font-size: 48px;
  font-weight: 800;
  color: var(--white-color);
  margin-bottom: 15px;
}

.breadcrumb {
  list-style: none;
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 0;
  padding: 0;
}

.breadcrumb li {
  color: var(--white-color);
  font-size: 16px;
}

.breadcrumb li::after {
  content: '/';
  margin-left: 10px;
}

.breadcrumb li:last-child::after {
  display: none;
}

.breadcrumb a {
  color: var(--white-color);
  transition: var(--transition);
}

.breadcrumb a:hover {
  color: var(--secondary-color);
}

.gallery-item {
  position: relative;
  margin-bottom: 30px;
  border-radius: var(--border-radius-large);
  overflow: hidden;
  height: 300px;
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: var(--transition);
}

.gallery-item:hover img {
  transform: scale(1.1);
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.8));
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 30px;
  color: var(--white-color);
  opacity: 0;
  transition: var(--transition);
}

.gallery-item:hover .overlay {
  opacity: 1;
}

.overlay h3 {
  color: var(--white-color);
  margin-bottom: 15px;
}

.view-btn {
  display: inline-block;
  padding: 10px 20px;
  background-color: var(--primary-color);
  color: var(--white-color);
  border-radius: var(--border-radius);
  transition: var(--transition);
}

.view-btn:hover {
  background-color: var(--secondary-color);
}
</style>
