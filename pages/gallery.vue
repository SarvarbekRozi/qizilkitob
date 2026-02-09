<template>
  <div class="gallery-page">
    <!-- Page Title -->
    <section class="simple-page-title">
      <div class="auto-container">
        <h1>{{ t('nav.gallery') }}</h1>
<!--        <ul class="breadcrumb">-->
<!--          <li><NuxtLink :to="localePath('/')">{{ t('nav.home') }}</NuxtLink></li>-->
<!--          <li>{{ t('nav.gallery') }}</li>-->
<!--        </ul>-->
      </div>
    </section>

    <!-- Gallery Section -->
    <section class="gallery-section sec-pad">
      <div class="auto-container">
        <div class="row">
          <div
            v-for="item in galleryItems"
            :key="item.url"
            class="col-lg-4 col-md-6 col-sm-12"
          >
            <div class="gallery-item">
              <img :src="item.url" :alt="item.species?.name || ''" />
              <div class="overlay">
                <h3>{{ item.species?.name }}</h3>
                <NuxtLink :to="localePath(`/species/${item.species?.slug}`)" class="view-btn">
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
const { t } = useI18n()
const localePath = useLocalePath()
const { getSpeciesGallery } = useApi()

const { data: galleryResponse } = await useAsyncData(
  'gallery',
  () => getSpeciesGallery({ per_page: 30 })
)

const galleryItems = computed(() => galleryResponse.value?.data || [])

useHead({
  title: t('nav.gallery')
})
</script>

<style scoped>
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
