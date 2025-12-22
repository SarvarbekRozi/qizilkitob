<template>
  <div class="species-filter">
    <div class="filter-header">
      <h3>{{ t('species.filter') }}</h3>
      <button @click="resetFilters" class="reset-btn">
        <i class="fas fa-redo"></i>
        {{ t('common.reset') }}
      </button>
    </div>

    <div class="filter-group">
      <label>{{ t('species.category') }}</label>
      <select v-model="filters.category" class="filter-select">
        <option value="all">{{ t('species.all') }}</option>
        <option value="animal">{{ t('species.animals') }}</option>
        <option value="plant">{{ t('species.plants') }}</option>
      </select>
    </div>

    <div class="filter-group">
      <label>{{ t('species.dangerLevel') }}</label>
      <select v-model="filters.dangerLevel" class="filter-select">
        <option value="all">{{ t('species.all') }}</option>
        <option value="critically_endangered">
          {{ t('dangerLevels.critically_endangered') }}
        </option>
        <option value="endangered">
          {{ t('dangerLevels.endangered') }}
        </option>
        <option value="vulnerable">
          {{ t('dangerLevels.vulnerable') }}
        </option>
        <option value="near_threatened">
          {{ t('dangerLevels.near_threatened') }}
        </option>
      </select>
    </div>

    <div class="filter-stats">
      <p>
        <strong>{{ filteredSpecies.length }}</strong>
        {{ t('species.title') }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const { filters, filteredSpecies, resetFilters } = useFilter()
</script>

<style scoped>
.species-filter {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.08);
  position: sticky;
  top: 100px;
  border: 1px solid rgba(46, 139, 87, 0.1);
}

.filter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  padding-bottom: 20px;
  border-bottom: 2px solid #e9ecef;
}

.filter-header h3 {
  font-size: 22px;
  margin: 0;
  color: var(--heading-color);
  font-weight: 700;
}

.reset-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  background-color: transparent;
  border: 2px solid var(--primary-color);
  color: var(--primary-color);
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.3s ease;
}

.reset-btn:hover {
  background-color: var(--primary-color);
  color: var(--white-color);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(46, 139, 87, 0.3);
}

.reset-btn i {
  transition: transform 0.3s ease;
}

.reset-btn:hover i {
  transform: rotate(180deg);
}

.filter-group {
  margin-bottom: 22px;
}

.filter-group label {
  display: block;
  font-weight: 600;
  color: var(--heading-color);
  margin-bottom: 12px;
  font-size: 15px;
}

.filter-select {
  width: 100%;
  padding: 13px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 15px;
  color: var(--heading-color);
  background-color: var(--white-color);
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-select:hover {
  border-color: var(--primary-color);
}

.filter-select:focus {
  border-color: var(--primary-color);
  outline: none;
  box-shadow: 0 0 0 3px rgba(46, 139, 87, 0.1);
}

.filter-stats {
  margin-top: 25px;
  padding: 20px;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  border-radius: 10px;
  text-align: center;
}

.filter-stats p {
  font-size: 15px;
  color: var(--white-color);
  margin: 0;
}

.filter-stats strong {
  display: block;
  color: var(--white-color);
  font-size: 32px;
  font-weight: 800;
  margin-bottom: 5px;
}

@media (max-width: 991px) {
  .species-filter {
    position: relative;
    top: 0;
    margin-bottom: 40px;
  }

  .filter-header {
    flex-direction: column;
    gap: 15px;
    align-items: flex-start;
  }
}
</style>
