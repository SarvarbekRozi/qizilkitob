<template>
  <div class="species-stats">
    <h4>{{ t('species.stats.title', 'Ma\'lumotlar') }}</h4>
    <ul class="stats-list">
      <li v-if="stats.mass">
        <span class="label">{{ t('species.stats.mass') }}:</span>
        <span class="value">{{ stats.mass }}</span>
      </li>
      <li v-if="stats.speed">
        <span class="label">{{ t('species.stats.speed') }}:</span>
        <span class="value">{{ stats.speed }}</span>
      </li>
      <li v-if="stats.lifespan">
        <span class="label">{{ t('species.stats.lifespan') }}:</span>
        <span class="value">{{ stats.lifespan }}</span>
      </li>
      <li v-if="stats.diet">
        <span class="label">{{ t('species.stats.diet') }}:</span>
        <span class="value">{{ stats.diet }}</span>
      </li>
      <li v-if="stats.height">
        <span class="label">{{ t('species.stats.height') }}:</span>
        <span class="value">{{ stats.height }}</span>
      </li>
      <li v-if="stats.bloomPeriod">
        <span class="label">{{ t('species.stats.bloomPeriod') }}:</span>
        <span class="value">{{ stats.bloomPeriod }}</span>
      </li>
      <li v-if="stats.habitat">
        <span class="label">{{ t('species.habitat') }}:</span>
        <span class="value">{{ stats.habitat }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
interface Props {
  stats: {
    mass?: string
    speed?: string
    lifespan: string
    diet?: string
    height?: string
    bloomPeriod?: string
    habitat?: string
  }
}

defineProps<Props>()

const { t } = useI18n()
</script>

<style scoped>
.species-stats {
  background-color: var(--bg-gray);
  padding: 30px;
  border-radius: var(--border-radius-large);
  position: sticky;
  top: 200px;
}

.species-stats h4 {
  font-size: 22px;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 2px solid var(--primary-color);
}

.stats-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.stats-list li {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 15px 0;
  border-bottom: 1px solid #ddd;
}

.stats-list li:last-child {
  border-bottom: none;
}

.stats-list .label {
  font-weight: 600;
  color: var(--heading-color);
  flex: 0 0 40%;
}

.stats-list .value {
  color: var(--text-color);
  text-align: right;
  flex: 1;
}

@media (max-width: 991px) {
  .species-stats {
    position: relative;
    top: 0;
    margin-top: 40px;
  }

  .stats-list li {
    flex-direction: column;
    gap: 8px;
  }

  .stats-list .value {
    text-align: left;
  }
}
</style>
