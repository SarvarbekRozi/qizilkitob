<template>
  <div class="species-grid">
    <div v-if="species.length > 0" class="row">
      <div
        v-for="item in species"
        :key="item.id"
        class="col-lg-4 col-md-6 col-sm-12"
      >
        <SpeciesCard :species="item" />
      </div>
    </div>
    <div v-else class="no-results">
      <i class="flaticon-sad"></i>
      <h3>{{ t('common.noResults') }}</h3>
      <p>{{ t('species.filter') }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Species } from '~/types/species'

interface Props {
  species: Species[]
}

defineProps<Props>()

const { t } = useI18n()
</script>

<style scoped>
.species-grid {
  margin-top: 40px;
}

.no-results {
  text-align: center;
  padding: 80px 20px;
  color: var(--text-color);
}

.no-results i {
  font-size: 80px;
  color: var(--primary-color);
  margin-bottom: 20px;
}

.no-results h3 {
  font-size: 28px;
  margin-bottom: 10px;
}

.no-results p {
  font-size: 16px;
}
</style>
