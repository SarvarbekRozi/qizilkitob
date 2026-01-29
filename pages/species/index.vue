<template>
  <div class="species-page">
    <!-- Page Title -->
    <section class="page-title">
      <div class="auto-container">
        <div class="content-box">
          <h1>{{ t('species.title') }}</h1>
          <ul class="breadcrumb">
            <li><NuxtLink :to="localePath('/')">{{ t('nav.home') }}</NuxtLink></li>
            <li>{{ t('nav.species') }}</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Species Listing Section -->
    <section class="species-listing sec-pad">
      <div class="auto-container">
        <!-- Category Title -->
        <div class="section-header text-center" v-if="categoryTitle">
          <h2>{{ categoryTitle }}</h2>
          <p class="species-count">{{ displayedSpecies.length }} ta tur topildi</p>
        </div>

        <!-- Species Grid -->
        <div v-if="pending" class="row">
          <div class="col-lg-12">
            <p class="loading-text">Yuklanmoqda...</p>
          </div>
        </div>
        <div v-else-if="error" class="row">
          <div class="col-lg-12">
            <p class="error-text">Ma'lumotlarni yuklashda xatolik yuz berdi.</p>
          </div>
        </div>
        <div v-else class="row">
          <div class="col-lg-12">
            <SpeciesGrid :species="displayedSpecies" />
          </div>
        </div>

        <!-- Pagination -->
        <div v-if="pagination && pagination.last_page > 1" class="pagination-wrap">
          <NuxtLink
            v-if="pagination.current_page > 1"
            :to="pageLink(pagination.current_page - 1)"
            class="page-btn"
          >
            ‹
          </NuxtLink>
          <NuxtLink
            v-for="p in pages"
            :key="p"
            :to="pageLink(p)"
            class="page-btn"
            :class="{ active: p === pagination.current_page }"
          >
            {{ p }}
          </NuxtLink>
          <NuxtLink
            v-if="pagination.current_page < pagination.last_page"
            :to="pageLink(pagination.current_page + 1)"
            class="page-btn"
          >
            ›
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { Species } from '~/types/species'

const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const { getSpecies } = useApi()

// Get query params
const category = computed(() => route.query.category as string)
const type = computed(() => route.query.type as string)
const page = computed(() => Number(route.query.page) || 1)

const { data: speciesResponse, pending, error } = await useAsyncData(
  () => `species-${category.value}-${page.value}`,
  () => getSpecies({
    category: category.value,
    page: page.value,
    per_page: 12,
    sort_by: 'sort',
    sort_dir: 'asc'
  }),
  { watch: [category, page] }
)

// Type labels mapping
const typeLabels: Record<string, string> = {
  'mammal': 'Sutemizuvchilar',
  'bird': 'Qushlar',
  'reptile': 'Reptiliyalar',
  'tree': 'Daraxtlar',
  'flower': 'Gullar',
  'herb': "O'tlar"
}

// Category title
const categoryTitle = computed(() => {
  if (type.value && typeLabels[type.value]) {
    return typeLabels[type.value]
  }
  if (category.value === 'animal') {
    return 'Hayvonlar'
  }
  if (category.value === 'plant') {
    return "O'simliklar"
  }
  return 'Barcha turlar'
})

const displayedSpecies = computed(() => {
  return (speciesResponse.value?.data as Species[]) || []
})

const pagination = computed(() => speciesResponse.value?.pagination || null)

const pages = computed(() => {
  if (!pagination.value) return []
  const total = pagination.value.last_page || 1
  return Array.from({ length: total }, (_, i) => i + 1)
})

const pageLink = (p: number) => {
  return {
    path: localePath('/species'),
    query: {
      ...route.query,
      page: p
    }
  }
}

// SEO Meta
useHead({
  title: categoryTitle.value,
  meta: [
    {
      name: 'description',
      content: t('home.featured.description')
    }
  ]
})
</script>

<style scoped>
.page-title {
  position: relative;
  padding: 120px 0 80px;
  background-image: url('https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=1920&h=600&fit=crop');
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
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.7), rgba(46, 139, 87, 0.5));
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

.section-header {
  margin-bottom: 50px;
}

.section-header h2 {
  font-size: 36px;
  font-weight: 800;
  color: var(--heading-color);
  margin-bottom: 10px;
}

.species-count {
  font-size: 16px;
  color: var(--text-light);
  font-weight: 500;
}

.loading-text,
.error-text {
  text-align: center;
  font-size: 16px;
  color: var(--text-light);
  padding: 20px 0;
}

.pagination-wrap {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 30px;
}

.page-btn {
  min-width: 40px;
  height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  color: var(--heading-color);
  background: var(--white-color);
  transition: var(--transition);
  font-weight: 600;
}

.page-btn:hover {
  background: var(--primary-color);
  color: var(--white-color);
  border-color: var(--primary-color);
}

.page-btn.active {
  background: var(--primary-color);
  color: var(--white-color);
  border-color: var(--primary-color);
}

@media (max-width: 768px) {
  .page-title {
    padding: 80px 0 60px;
  }

  .page-title h1 {
    font-size: 32px;
  }
}
</style>
