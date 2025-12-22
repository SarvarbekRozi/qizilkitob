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
        <!-- Search Bar -->
        <UiSearchBar />

        <div class="row">
          <!-- Filter Sidebar -->
          <div class="col-lg-3 col-md-12">
            <SpeciesFilter />
          </div>

          <!-- Species Grid -->
          <div class="col-lg-9 col-md-12">
            <SpeciesGrid :species="displayedSpecies" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

// Get filtered species and search results
const { filteredSpecies, setCategory } = useFilter()
const { searchResults } = useSearch()

// Apply category filter from query params
onMounted(() => {
  const categoryParam = route.query.category as string
  if (categoryParam === 'animal' || categoryParam === 'plant') {
    setCategory(categoryParam)
  }
})

// Combine filters and search
const displayedSpecies = computed(() => {
  // First filter by category/danger level
  let result = filteredSpecies.value

  // Then apply search if there's a search query
  const searchIds = searchResults.value.map(s => s.id)
  if (searchIds.length < filteredSpecies.value.length) {
    result = result.filter(s => searchIds.includes(s.id))
  }

  return result
})

// SEO Meta
useHead({
  title: t('species.title'),
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

@media (max-width: 768px) {
  .page-title {
    padding: 80px 0 60px;
  }

  .page-title h1 {
    font-size: 32px;
  }
}
</style>
