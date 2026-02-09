<template>
  <div class="resource-detail-page">
    <!-- Page Title -->
    <section class="simple-page-title">
      <div class="auto-container">
        <h1>{{ resource.title[locale] }}</h1>
<!--        <ul class="breadcrumb">-->
<!--          <li><NuxtLink :to="localePath('/')">Bosh sahifa</NuxtLink></li>-->
<!--          <li><NuxtLink :to="localePath('/natural-resources')">Tabiy boylik</NuxtLink></li>-->
<!--          <li>{{ resource.title[locale] }}</li>-->
<!--        </ul>-->
      </div>
    </section>

    <!-- Resource Detail Section -->
    <section class="resource-detail sec-pad">
      <div class="auto-container">
        <div class="row justify-content-center">
          <div class="col-lg-10 col-md-12">
            <article class="resource-post">
              <!-- Featured Image -->
              <figure class="featured-image">
                <img :src="resource.image || ''" :alt="resource.title[locale]" />
              </figure>

              <!-- Resource Stats -->
              <div class="resource-stats" v-if="resource.stats">
                <div class="stat-item" v-if="resource.stats.area">
                  <i class="fas fa-map-marked-alt"></i>
                  <div>
                    <span class="stat-label">Hudud</span>
                    <span class="stat-value">{{ resource.stats.area }}</span>
                  </div>
                </div>
                <div class="stat-item" v-if="resource.stats.species">
                  <i class="fas fa-leaf"></i>
                  <div>
                    <span class="stat-label">Turlar</span>
                    <span class="stat-value">{{ resource.stats.species }}</span>
                  </div>
                </div>
                <div class="stat-item" v-if="resource.stats.protected">
                  <i class="fas fa-shield-alt"></i>
                  <div>
                    <span class="stat-label">Muhofaza</span>
                    <span class="stat-value">{{ resource.stats.protected }}</span>
                  </div>
                </div>
              </div>

              <!-- Resource Content -->
              <div class="resource-content">
                <p v-for="(paragraph, index) in contentParagraphs" :key="index">
                  {{ paragraph }}
                </p>
              </div>

              <!-- Resource Features -->
              <div class="resource-features">
                <h3>Asosiy xususiyatlar</h3>
                <ul class="features-list">
                  <li v-for="(feature, index) in resource.features[locale]" :key="index">
                    <i class="fas fa-check-circle"></i>
                    {{ feature }}
                  </li>
                </ul>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { NaturalResource } from '~/types/natural-resource'

const { locale } = useI18n()
const route = useRoute()
const localePath = useLocalePath()
const { getNaturalResourceBySlug } = useApi()

const slug = computed(() => route.params.slug as string)

const { data: resourceResponse } = await useAsyncData(
  () => `natural-resource-${slug.value}`,
  () => getNaturalResourceBySlug(slug.value)
)

const resource = computed<NaturalResource | null>(() => (resourceResponse.value?.data as NaturalResource) || null)

if (!resource.value) {
  throw createError({
    statusCode: 404,
    message: 'Resource not found'
  })
}

const contentParagraphs = computed(() => {
  if (!resource.value) return []
  const content = resource.value.content[locale.value] || ''
  return content.split('\n\n').filter(Boolean)
})

useHead({
  title: resource.value ? resource.value.title[locale.value] : '',
  meta: [
    {
      name: 'description',
      content: resource.value ? resource.value.excerpt[locale.value] : ''
    }
  ]
})
</script>

<style scoped>
.featured-image {
  margin-bottom: 30px;
  border-radius: var(--border-radius-large);
  overflow: hidden;
}

.featured-image img {
  width: 100%;
  height: 500px;
  object-fit: cover;
}

.resource-stats {
  display: flex;
  gap: 30px;
  margin-bottom: 40px;
  padding: 30px;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  border-radius: var(--border-radius-large);
  flex-wrap: wrap;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 15px;
  color: var(--white-color);
  flex: 1;
  min-width: 200px;
}

.stat-item i {
  font-size: 36px;
  opacity: 0.9;
}

.stat-item div {
  display: flex;
  flex-direction: column;
}

.stat-label {
  font-size: 13px;
  opacity: 0.9;
  margin-bottom: 5px;
}

.stat-value {
  font-size: 20px;
  font-weight: 700;
}

.resource-content p {
  font-size: 16px;
  line-height: 1.8;
  margin-bottom: 20px;
  color: var(--text-color);
}

.resource-features {
  margin-top: 40px;
  padding: 40px;
  background-color: var(--bg-gray);
  border-radius: var(--border-radius-large);
}

.resource-features h3 {
  font-size: 28px;
  font-weight: 700;
  color: var(--heading-color);
  margin-bottom: 25px;
}

.features-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.features-list li {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 16px;
  color: var(--text-color);
  padding: 15px;
  background: var(--white-color);
  border-radius: var(--border-radius);
  transition: var(--transition);
}

.features-list li:hover {
  transform: translateX(5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.features-list i {
  font-size: 24px;
  color: var(--primary-color);
}

@media (max-width: 768px) {
  .featured-image img {
    height: 300px;
  }

  .resource-stats {
    flex-direction: column;
    gap: 20px;
  }

  .stat-item {
    min-width: 100%;
  }

  .resource-features {
    padding: 25px 20px;
  }

  .resource-features h3 {
    font-size: 24px;
  }

  .features-list {
    grid-template-columns: 1fr;
  }
}
</style>
