<template>
  <div class="map-page">
    <!-- Page Title -->
    <section class="page-title">
      <div class="auto-container">
        <div class="content-box">
          <h1>{{ t('nav.map') }}</h1>
          <ul class="breadcrumb">
            <li><NuxtLink :to="localePath('/')">{{ t('nav.home') }}</NuxtLink></li>
            <li>{{ t('nav.map') }}</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Map Section -->
    <section class="map-section">
      <div class="auto-container">
        <div class="map-controls">
          <div class="filter-buttons">
            <button
              @click="filterCategory = 'all'"
              :class="{ active: filterCategory === 'all' }"
              class="filter-btn"
            >
              <i class="fas fa-globe"></i> {{ t('species.all') }}
            </button>
            <button
              @click="filterCategory = 'animal'"
              :class="{ active: filterCategory === 'animal' }"
              class="filter-btn"
            >
              <i class="fas fa-paw"></i> {{ t('species.animals') }}
            </button>
            <button
              @click="filterCategory = 'plant'"
              :class="{ active: filterCategory === 'plant' }"
              class="filter-btn"
            >
              <i class="fas fa-leaf"></i> {{ t('species.plants') }}
            </button>
          </div>
          <div class="legend">
            <h4><i class="fas fa-info-circle"></i> {{ t('species.dangerLevel') }}</h4>
            <div class="legend-items">
              <span class="legend-item critically"><i class="fas fa-circle"></i> Juda xavfli</span>
              <span class="legend-item endangered"><i class="fas fa-circle"></i> Xavfli</span>
              <span class="legend-item vulnerable"><i class="fas fa-circle"></i> Zaif</span>
              <span class="legend-item near-threatened"><i class="fas fa-circle"></i> Xavf ostida</span>
            </div>
          </div>
        </div>
        <ClientOnly>
          <div id="species-map" class="species-map"></div>
          <template #fallback>
            <div class="map-loading">
              <i class="fas fa-spinner fa-spin"></i>
              <p>Xarita yuklanmoqda...</p>
            </div>
          </template>
        </ClientOnly>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const { getSpeciesForMap } = useApi()

const { data: mapResponse } = await useAsyncData(
  'species-map',
  () => getSpeciesForMap()
)

const filterCategory = ref<'all' | 'animal' | 'plant'>('all')
let map: any = null
let markers: any[] = []
let L: any = null

const filteredSpecies = computed(() => {
  const items = mapResponse.value?.data || []
  if (filterCategory.value === 'all') return items
  return items.filter((s: any) => s.category === filterCategory.value)
})

const getDangerLevelColor = (level: string) => {
  const colors = {
    critically_endangered: '#dc2626',
    endangered: '#ea580c',
    vulnerable: '#ca8a04',
    near_threatened: '#16a34a'
  }
  return colors[level as keyof typeof colors] || '#16a34a'
}

const initMap = async () => {
  if (!process.client) return

  if (map) {
    map.remove()
  }

  // Dynamic import Leaflet (client-side only)
  L = (await import('leaflet')).default

  // Initialize map centered on Uzbekistan
  map = L.map('species-map').setView([41.3775, 64.5853], 6)

  // Add OpenStreetMap tiles
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 18
  }).addTo(map)

  updateMarkers()
}

const updateMarkers = () => {
  if (!map || !L) return

  // Remove existing markers
  markers.forEach(marker => marker.remove())
  markers = []

  // Add markers for filtered species
  filteredSpecies.value.forEach(species => {
    if (species.habitat?.coordinates) {
      const color = getDangerLevelColor(species.dangerLevel)

      // Create custom icon with dynamic color
      const icon = L.divIcon({
        className: 'custom-marker',
        html: `
          <div class="marker-pin" style="background-color: ${color}">
            <i class="fas ${species.category === 'animal' ? 'fa-paw' : 'fa-leaf'}"></i>
          </div>
        `,
        iconSize: [40, 50],
        iconAnchor: [20, 50]
      })

      const marker = L.marker(
        [species.coordinates.lat, species.coordinates.lng],
        { icon }
      ).addTo(map!)

      // Add popup with species info
      marker.bindPopup(`
        <div class="species-popup">
          <img src="${species.image || ''}" alt="${species.name}" />
          <h3>${species.name}</h3>
          <p class="scientific">${species.scientificName}</p>
          <a href="${localePath(`/species/${species.slug}`)}" class="view-btn">
            <i class="fas fa-eye"></i> Batafsil
          </a>
        </div>
      `, {
        maxWidth: 300
      })

      markers.push(marker)
    }
  })
}

watch(filterCategory, () => {
  if (process.client && map) {
    updateMarkers()
  }
})

onMounted(() => {
  if (process.client) {
    initMap()
  }
})

onUnmounted(() => {
  if (map) {
    map.remove()
  }
})

useHead({
  title: t('nav.map'),
  link: [
    { rel: 'stylesheet', href: 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css' }
  ]
})
</script>

<style scoped>
.page-title {
  position: relative;
  padding: 120px 0 80px;
  background-image: url('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1920&h=600&fit=crop');
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

/* Map Section */
.map-section {
  padding: 60px 0;
  background: #f8f9fa;
}

.map-controls {
  background: var(--white-color);
  padding: 25px;
  border-radius: 15px;
  margin-bottom: 25px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
  flex-wrap: wrap;
}

.filter-buttons {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.filter-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: #f8f9fa;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  color: var(--heading-color);
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-btn:hover {
  background: var(--primary-color);
  border-color: var(--primary-color);
  color: var(--white-color);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(46, 139, 87, 0.3);
}

.filter-btn.active {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  border-color: var(--primary-color);
  color: var(--white-color);
  box-shadow: 0 4px 15px rgba(46, 139, 87, 0.4);
}

.legend {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.legend h4 {
  font-size: 16px;
  font-weight: 700;
  color: var(--heading-color);
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.legend-items {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 500;
}

.legend-item.critically i {
  color: #dc2626;
}

.legend-item.endangered i {
  color: #ea580c;
}

.legend-item.vulnerable i {
  color: #ca8a04;
}

.legend-item.near-threatened i {
  color: #16a34a;
}

/* Map Container */
.species-map {
  width: 100%;
  height: 700px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  border: 3px solid var(--white-color);
}

.map-loading {
  width: 100%;
  height: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  border-radius: 15px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  border: 3px solid var(--white-color);
}

.map-loading i {
  font-size: 60px;
  color: var(--primary-color);
  margin-bottom: 20px;
}

.map-loading p {
  font-size: 18px;
  color: var(--text-color);
  font-weight: 500;
}

/* Responsive */
@media (max-width: 768px) {
  .page-title {
    padding: 80px 0 60px;
  }

  .page-title h1 {
    font-size: 32px;
  }

  .map-controls {
    flex-direction: column;
    align-items: flex-start;
  }

  .filter-buttons {
    width: 100%;
  }

  .filter-btn {
    flex: 1;
    justify-content: center;
    padding: 10px 15px;
    font-size: 14px;
  }

  .species-map {
    height: 500px;
  }
}
</style>

<style>
/* Global Leaflet Marker Styles */
.custom-marker {
  background: transparent;
  border: none;
}

.marker-pin {
  width: 40px;
  height: 50px;
  border-radius: 50% 50% 50% 0;
  position: relative;
  transform: rotate(-45deg);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid white;
}

.marker-pin i {
  transform: rotate(45deg);
  font-size: 18px;
  color: white;
}

.marker-pin::after {
  content: '';
  width: 10px;
  height: 10px;
  background: white;
  position: absolute;
  border-radius: 50%;
  bottom: -5px;
  right: -5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

/* Popup Styles */
.leaflet-popup-content-wrapper {
  border-radius: 12px;
  padding: 0;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
}

.leaflet-popup-content {
  margin: 0;
  padding: 0;
}

.species-popup {
  width: 280px;
}

.species-popup img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  display: block;
}

.species-popup h3 {
  font-size: 18px;
  font-weight: 700;
  margin: 15px 15px 8px;
  color: var(--heading-color);
}

.species-popup .scientific {
  font-size: 13px;
  font-style: italic;
  color: #666;
  margin: 0 15px 10px;
}

.species-popup .location {
  font-size: 14px;
  color: var(--text-color);
  margin: 0 15px 15px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.species-popup .location i {
  color: var(--primary-color);
}

.species-popup .view-btn {
  display: block;
  text-align: center;
  padding: 12px;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.3s ease;
}

.species-popup .view-btn:hover {
  background: linear-gradient(135deg, var(--secondary-color), var(--primary-color));
}

.species-popup .view-btn i {
  margin-right: 5px;
}

.leaflet-popup-tip {
  background: white;
}
</style>
