<template>
  <div class="species-card">
    <div class="card-inner">
      <figure class="image-box">
        <img :src="species.images.main || ''" :alt="species.name[locale]" />
        <div class="overlay-content">
          <div class="badges">
            <SpeciesCategoryBadge :category="species.category" />
            <SpeciesDangerLevelBadge :dangerLevel="species.conservationStatus.level" />
          </div>
          <h3>{{ species.name[locale] }}</h3>
          <p class="scientific-name">{{ species.scientificName }}</p>
          <p class="description">{{ species.description[locale].short }}</p>
          <NuxtLink :to="localePath(`/species/${species.slug}`)" class="link-btn">
            <i class="fas fa-arrow-right"></i>
          </NuxtLink>
        </div>
      </figure>
      <div class="content-box">
        <h3>
          <NuxtLink :to="localePath(`/species/${species.slug}`)">
            {{ species.name[locale] }}
          </NuxtLink>
        </h3>
        <p class="location">
          <i class="flaticon-pin"></i>
          {{ species.habitat.location[locale] }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Species } from '~/types/species'

interface Props {
  species: Species
}

defineProps<Props>()

const { locale } = useI18n()
const localePath = useLocalePath()
</script>

<style scoped>
.species-card {
  position: relative;
  margin-bottom: 30px;
}

.card-inner {
  position: relative;
  background-color: var(--white-color);
  border-radius: var(--border-radius-large);
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: var(--transition);
}

.card-inner:hover {
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  transform: translateY(-5px);
}

.image-box {
  position: relative;
  overflow: hidden;
  margin: 0;
  height: 300px;
}

.image-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: var(--transition);
}

.card-inner:hover .image-box img {
  transform: scale(1.1);
}

.overlay-content {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.8));
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  color: var(--white-color);
  opacity: 0;
  transition: var(--transition);
}

.card-inner:hover .overlay-content {
  opacity: 1;
}

.badges {
  position: absolute;
  top: 20px;
  left: 20px;
  right: 20px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.overlay-content h3 {
  color: var(--white-color);
  font-size: 24px;
  margin-bottom: 5px;
}

.scientific-name {
  font-style: italic;
  font-size: 14px;
  margin-bottom: 10px;
  opacity: 0.9;
}

.description {
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 20px;
}

.link-btn {
  position: absolute;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--primary-color);
  color: var(--white-color);
  border-radius: 50%;
  transition: var(--transition);
}

.link-btn:hover {
  background-color: var(--secondary-color);
  transform: scale(1.1);
}

.content-box {
  padding: 20px;
}

.content-box h3 {
  font-size: 20px;
  margin-bottom: 10px;
}

.content-box h3 a {
  color: var(--heading-color);
  transition: var(--transition);
}

.content-box h3 a:hover {
  color: var(--primary-color);
}

.location {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-color);
  font-size: 14px;
}

.location i {
  color: var(--primary-color);
}

@media (max-width: 768px) {
  .image-box {
    height: 250px;
  }

  .overlay-content h3 {
    font-size: 20px;
  }
}
</style>
