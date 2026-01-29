<template>
  <div class="natural-resources-page">
    <!-- Page Title -->
    <section class="page-title">
      <div class="auto-container">
        <div class="content-box">
          <h1>Tabiy boylik</h1>
          <ul class="breadcrumb">
            <li><NuxtLink :to="localePath('/')">Bosh sahifa</NuxtLink></li>
            <li>Tabiy boylik</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Natural Resources Section -->
    <section class="natural-resources-section sec-pad">
      <div class="auto-container">
        <div class="sec-title text-center">
          <h2>{{ categoryTitle }}</h2>
          <p>Mamlakatimizning noyob tabiiy resurslari va ularni muhofaza qilish</p>
        </div>

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
          <!-- Resource Card -->
          <div class="col-lg-3 col-md-6 col-sm-12" v-for="resource in resources" :key="resource.id">
            <div class="resource-card">
              <div class="resource-image">
                <img :src="resource.image || ''" :alt="resource.title[locale]" />
              </div>
              <div class="resource-content">
                <h3>
                  <NuxtLink :to="localePath(`/natural-resources/${resource.slug}`)">
                    {{ resource.title[locale] }}
                  </NuxtLink>
                </h3>
                <p>{{ resource.excerpt[locale] }}</p>
                <NuxtLink :to="localePath(`/natural-resources/${resource.slug}`)" class="read-more">
                  Batafsil <i class="fas fa-arrow-right"></i>
                </NuxtLink>
              </div>
            </div>
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
import type { NaturalResource } from '~/types/natural-resource'

const { locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const { getNaturalResources } = useApi()

// Filtrlash logikasi
const categoryQuery = computed(() => route.query.category as string | undefined)
const page = computed(() => Number(route.query.page) || 1)

const { data: resourcesResponse, pending, error } = await useAsyncData(
  () => `natural-resources-${categoryQuery.value || 'all'}-${page.value}`,
  () => getNaturalResources({
    category: categoryQuery.value,
    page: page.value,
    per_page: 12,
    sort_by: 'sort',
    sort_dir: 'asc'
  }),
  { watch: [categoryQuery, page] }
)

const resources = computed<NaturalResource[]>(() => (resourcesResponse.value?.data as NaturalResource[]) || [])

// Kategoriya nomi
const categoryTitle = computed(() => {
  if (!categoryQuery.value || resources.value.length === 0) {
    return "O'zbekistonning Tabiy Boyliklari"
  }
  return resources.value[0]?.title?.[locale.value] || "Tabiy boylik"
})

const pagination = computed(() => resourcesResponse.value?.pagination || null)
const pages = computed(() => {
  if (!pagination.value) return []
  const total = pagination.value.last_page || 1
  return Array.from({ length: total }, (_, i) => i + 1)
})

const pageLink = (p: number) => {
  return {
    path: localePath('/natural-resources'),
    query: { ...route.query, page: p }
  }
}

useHead({
  title: 'Tabiy boylik',
  meta: [
    {
      name: 'description',
      content: "O'zbekistonning noyob tabiiy boyliklari va ularni muhofaza qilish"
    }
  ]
})
</script>

<style scoped>
.page-title {
  position: relative;
  padding: 120px 0 80px;
  background-image: url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&h=600&fit=crop');
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
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.7), rgba(160, 51, 45, 0.5));
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

.sec-title {
  margin-bottom: 50px;
}

.sec-title h2 {
  font-size: 36px;
  font-weight: 800;
  color: var(--heading-color);
  margin-bottom: 15px;
}

.sec-title p {
  font-size: 18px;
  color: var(--text-light);
}

.resource-card {
  background: var(--white-color);
  border-radius: var(--border-radius-large);
  overflow: hidden;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.1);
  transition: var(--transition);
  margin-bottom: 30px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.resource-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
}

.resource-image {
  height: 250px;
  overflow: hidden;
}

.resource-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: var(--transition);
}

.resource-card:hover .resource-image img {
  transform: scale(1.1);
}

.resource-content {
  padding: 30px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.resource-content h3 {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 15px;
}

.resource-content h3 a {
  color: var(--heading-color);
  transition: var(--transition);
}

.resource-content h3 a:hover {
  color: var(--primary-color);
}

.resource-content p {
  font-size: 15px;
  line-height: 1.7;
  color: var(--text-color);
  margin-bottom: 20px;
  flex: 1;
}

.read-more {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--primary-color);
  font-weight: 600;
  transition: var(--transition);
}

.read-more:hover {
  color: var(--secondary-color);
  gap: 12px;
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

  .sec-title h2 {
    font-size: 28px;
  }

  .resource-image {
    height: 200px;
  }
}
</style>
