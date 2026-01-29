<template>
  <div v-if="species" class="species-detail-page">
    <!-- Page Title -->
    <section class="page-title" :style="{ backgroundImage: `url(${species.images.main || ''})` }">
      <div class="auto-container">
        <div class="content-box">
          <h1>{{ species.name[locale] }}</h1>
          <p class="scientific-name">{{ species.scientificName }}</p>
          <ul class="breadcrumb">
            <li><NuxtLink :to="localePath('/')">{{ t('nav.home') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/species')">{{ t('nav.species') }}</NuxtLink></li>
            <li>{{ species.name[locale] }}</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Species Details Section -->
    <section class="species-details sec-pad">
      <div class="auto-container">
        <!-- Image and Stats Row - Centered -->
        <div class="row align-items-center">
          <div class="col-lg-8 col-md-12">
            <figure class="main-image">
              <img :src="species.images.main || ''" :alt="species.name[locale]" />
            </figure>
          </div>
          <div class="col-lg-4 col-md-12">
            <SpeciesStats :stats="species.stats" />
          </div>
        </div>

        <!-- Description Row -->
        <div class="row">
          <div class="col-12">
            <div class="detail-content">
              <!-- Badges -->
              <div class="badges-row">
                <SpeciesCategoryBadge :category="species.category" />
                <SpeciesDangerLevelBadge :dangerLevel="species.conservationStatus.level" />
              </div>

              <!-- Description -->
              <div class="description-box">
                <h2>{{ t('nav.about') }} {{ species.name[locale] }}</h2>
                <p>{{ species.description[locale].full }}</p>

                <h3>{{ t('species.features', 'Xususiyatlari') }}</h3>
                <ul class="features-list">
                  <li v-for="(bullet, index) in species.description[locale].bullets" :key="index">
                    <i class="fas fa-check-circle"></i>
                    {{ bullet }}
                  </li>
                </ul>
              </div>

              <!-- Conservation Status -->
              <div class="conservation-box">
                <h3>{{ t('species.conservationStatus') }}</h3>
                <div class="status-info">
                  <div class="info-item">
                    <span class="label">{{ t('species.population') }}:</span>
                    <span class="value">{{ species.conservationStatus.population }}</span>
                  </div>
                  <div class="info-item">
                    <span class="label">{{ t('species.threats') }}:</span>
                    <ul class="threats-list">
                      <li v-for="(threat, index) in species.conservationStatus.threats[locale]" :key="index">
                        {{ threat }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Related Species Section -->
    <section v-if="relatedSpecies.length > 0" class="related-species sec-pad" style="background-color: var(--bg-gray);">
      <div class="auto-container">
        <div class="sec-title centred">
          <h2>{{ t('species.relatedSpecies') }}</h2>
        </div>
        <div class="row">
          <div
            v-for="item in relatedSpecies"
            :key="item.id"
            class="col-lg-4 col-md-6 col-sm-12"
          >
            <SpeciesCard :species="item" />
          </div>
        </div>
      </div>
    </section>
  </div>
  <div v-else class="species-not-found sec-pad">
    <div class="auto-container">
      <div class="centred">
        <h2>{{ t('common.noResults') }}</h2>
        <NuxtLink :to="localePath('/species')" class="theme-btn">
          {{ t('common.viewAll') }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Species } from '~/types/species'

const { t, locale } = useI18n()
const route = useRoute()
const localePath = useLocalePath()
const { getSpeciesBySlug } = useApi()

const slug = computed(() => route.params.slug as string)

const { data: speciesResponse } = await useAsyncData(
  () => `species-${slug.value}`,
  () => getSpeciesBySlug(slug.value)
)

const species = computed<Species | null>(() => (speciesResponse.value?.data as Species) || null)
const relatedSpecies = computed<Species[]>(() => (speciesResponse.value?.related as Species[]) || [])

if (!species.value) {
  throw createError({
    statusCode: 404,
    message: 'Species not found'
  })
}

useHead({
  title: species.value ? species.value.name[locale.value] : '',
  meta: [
    {
      name: 'description',
      content: species.value ? species.value.description[locale.value].short : ''
    }
  ]
})
</script>

<style scoped>
.page-title {
  position: relative;
  padding: 140px 0 100px;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

.page-title::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.75), rgba(46, 139, 87, 0.5));
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
  margin-bottom: 10px;
}

.scientific-name {
  font-size: 20px;
  font-style: italic;
  color: var(--white-color);
  opacity: 0.9;
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

.main-image {
  margin-bottom: 30px;
  border-radius: var(--border-radius-large);
  overflow: hidden;
}

.main-image img {
  width: 100%;
  height: 500px;
  object-fit: cover;
}

.badges-row {
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
}

.description-box {
  margin-bottom: 40px;
}

.description-box h2 {
  font-size: 32px;
  margin-bottom: 20px;
}

.description-box h3 {
  font-size: 24px;
  margin: 30px 0 15px;
}

.description-box p {
  font-size: 16px;
  line-height: 1.8;
  margin-bottom: 20px;
}

.features-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.features-list li {
  display: flex;
  align-items: flex-start;
  gap: 15px;
  padding: 12px 0;
  font-size: 16px;
}

.features-list i {
  color: var(--primary-color);
  font-size: 20px;
  margin-top: 3px;
}

.conservation-box {
  background-color: var(--bg-gray);
  padding: 30px;
  border-radius: var(--border-radius-large);
  margin-top: 40px;
}

.conservation-box h3 {
  font-size: 24px;
  margin-bottom: 20px;
}

.info-item {
  margin-bottom: 20px;
}

.info-item .label {
  font-weight: 600;
  color: var(--heading-color);
  display: block;
  margin-bottom: 10px;
}

.info-item .value {
  color: var(--text-color);
  font-size: 16px;
}

.threats-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.threats-list li {
  padding: 8px 0;
  padding-left: 20px;
  position: relative;
  color: var(--text-color);
}

.threats-list li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: var(--primary-color);
  font-weight: bold;
}

.sec-title {
  margin-bottom: 50px;
}

.sec-title h2 {
  font-size: 42px;
  font-weight: 700;
  position: relative;
  padding-bottom: 20px;
}

.sec-title.centred h2::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 3px;
  background-color: var(--primary-color);
}

@media (max-width: 768px) {
  .page-title {
    padding: 80px 0 60px;
  }

  .page-title h1 {
    font-size: 32px;
  }

  .main-image img {
    height: 300px;
  }
}
</style>
