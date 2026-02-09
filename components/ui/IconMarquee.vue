<template>
  <div class="icon-marquee-wrapper" :class="`icon-marquee--${type}`">
    <NuxtMarquee :speed="40" autoFill="true" :direction="direction">
      <div class="icon-item" v-for="(icon, index) in icons" :key="index">
        <i :class="icon"></i>
      </div>
    </NuxtMarquee>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  type: 'animals' | 'plants'
  direction?: 'left' | 'right'
}>()

const animalIcons = [
  'fas fa-paw',
  'fas fa-dove',
  'fas fa-fish',
  'fas fa-horse',
  'fas fa-frog',
  'fas fa-spider',
  'fas fa-feather-alt',
  'fas fa-dragon',
  'fas fa-hippo',
  'fas fa-otter',
  'fas fa-crow',
  'fas fa-cat',
  'fas fa-dog',
  'fas fa-kiwi-bird',
]

const plantIcons = [
  'fas fa-leaf',
  'fas fa-seedling',
  'fas fa-tree',
  'fas fa-spa',
  'fas fa-cannabis',
  'fas fa-pagelines fab',
  'fas fa-envira fab',
  'fas fa-leaf',
  'fas fa-seedling',
  'fas fa-tree',
  'fas fa-spa',
  'fas fa-canadian-maple-leaf fab',
]

const icons = props.type === 'animals' ? animalIcons : plantIcons
</script>

<style scoped>
.icon-marquee-wrapper {
  width: 100%;
  overflow: hidden;
  background: #b02923;
  padding: 12px 0;
}

.icon-item {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 0 25px;
}

.icon-item i {
  font-size: 28px;
  color: #ffffff;
  opacity: 0.9;
  transition: all 0.3s ease;
}

.icon-item:hover i {
  opacity: 1;
  transform: scale(1.2);
}
</style>
