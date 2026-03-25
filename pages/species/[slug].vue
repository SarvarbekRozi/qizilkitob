<template>
  <div v-if="species" class="species-detail-page">
    <!-- Page Title -->
    <section class="simple-page-title">
      <div class="auto-container">
        <h1>{{ species.name[locale] }}</h1>
<!--        <ul class="breadcrumb">-->
<!--          <li><NuxtLink :to="localePath('/')">{{ t('nav.home') }}</NuxtLink></li>-->
<!--          <li><NuxtLink :to="localePath('/species')">{{ t('nav.species') }}</NuxtLink></li>-->
<!--          <li>{{ species.name[locale] }}</li>-->
<!--        </ul>-->
      </div>
    </section>

    <!-- Species Details Section -->
    <section class="species-details sec-pad">
      <div class="auto-container">
        <!-- Image and Stats Row - Centered -->
        <div class="row align-items-center">
          <div class="col-lg-8 col-md-12">
            <!-- Slider (multiple images) -->
            <div v-if="allImages.length > 1" class="image-slider">
              <div class="slider-track" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
                <div class="slide" v-for="(img, i) in allImages" :key="i">
                  <img :src="img" :alt="species.name[locale]" />
                </div>
              </div>
              <button class="slider-btn slider-prev" @click="prevSlide" aria-label="Oldingi">
                <i class="fas fa-chevron-left"></i>
              </button>
              <button class="slider-btn slider-next" @click="nextSlide" aria-label="Keyingi">
                <i class="fas fa-chevron-right"></i>
              </button>
              <div class="slider-dots">
                <span
                  v-for="(img, i) in allImages"
                  :key="i"
                  class="dot"
                  :class="{ active: i === currentSlide }"
                  @click="currentSlide = i"
                ></span>
              </div>
            </div>
            <!-- Single image -->
            <figure v-else class="main-image">
              <img :src="allImages[0] || ''" :alt="species.name[locale]" />
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
                <h2>{{ species.name[locale] }}</h2>
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

const currentSlide = ref(0)

const slug = computed(() => route.params.slug as string)

const { data: speciesResponse } = await useAsyncData(
  () => `species-${slug.value}`,
  () => getSpeciesBySlug(slug.value)
)

const species = computed<Species | null>(() => (speciesResponse.value?.data as Species) || null)
const relatedSpecies = computed<Species[]>(() => (speciesResponse.value?.related as Species[]) || [])

const allImages = computed<string[]>(() => {
  const imgs: string[] = []
  if (species.value?.images?.main) imgs.push(species.value.images.main)
  if (species.value?.images?.gallery?.length) {
    imgs.push(...(species.value.images.gallery as string[]))
  }
  return imgs
})
const prevSlide = () => { currentSlide.value = (currentSlide.value - 1 + allImages.value.length) % allImages.value.length }
const nextSlide = () => { currentSlide.value = (currentSlide.value + 1) % allImages.value.length }

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
.species-details{
  padding-top: 0!important;
}

/* Slider */
.image-slider {
  position: relative;
  border-radius: var(--border-radius-large);
  overflow: hidden;
  margin-bottom: 30px;
  height: 500px;
}

.slider-track {
  display: flex;
  height: 100%;
  transition: transform 0.4s ease;
}

.slide {
  min-width: 100%;
  height: 100%;
}

.slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.slider-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.85);
  border: none;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
  color: var(--heading-color);
  transition: background 0.2s;
  z-index: 10;
}

.slider-btn:hover {
  background: var(--white-color);
}

.slider-prev { left: 15px; }
.slider-next { right: 15px; }

.slider-dots {
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 10;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  transition: background 0.2s;
}

.dot.active {
  background: var(--white-color);
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

/*.sec-title {*/
/*  margin-bottom: 50px;*/
/*}*/

/*.sec-title h2 {*/
/*  font-size: 42px;*/
/*  font-weight: 700;*/
/*  position: relative;*/
/*  padding-bottom: 20px;*/
/*}*/

/*.sec-title.centred h2::after {*/
/*  content: '';*/
/*  position: absolute;*/
/*  bottom: 0;*/
/*  left: 50%;*/
/*  transform: translateX(-50%);*/
/*  width: 80px;*/
/*  height: 3px;*/
/*  background-color: var(--primary-color);*/
/*}*/

@media (max-width: 768px) {
  .main-image img {
    height: 300px;
  }

  .image-slider {
    height: 300px;
  }
}
</style>
