<template>
  <div class="search-bar">
    <div class="search-input-wrapper">
      <i class="fas fa-search search-icon"></i>
      <input
        v-model="searchQuery"
        type="search"
        :placeholder="t('species.search')"
        class="search-input"
      />
      <button
        v-if="searchQuery"
        @click="clearSearch"
        class="clear-btn"
      >
        <i class="fas fa-times"></i>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const { searchQuery, clearSearch } = useSearch()
</script>

<style scoped>
.search-bar {
  margin-bottom: 30px;
}

.search-input-wrapper {
  position: relative;
  width: 100%;
}

.search-icon {
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-color);
  font-size: 18px;
}

.search-input {
  width: 100%;
  padding: 15px 60px 15px 55px;
  border: 2px solid #e0e0e0;
  border-radius: var(--border-radius-large);
  font-size: 16px;
  color: var(--heading-color);
  background-color: var(--white-color);
  transition: var(--transition);
}

.search-input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 4px 15px rgba(253, 86, 52, 0.1);
}

.search-input::placeholder {
  color: #999;
}

.clear-btn {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--text-color);
  font-size: 18px;
  cursor: pointer;
  padding: 5px;
  transition: var(--transition);
}

.clear-btn:hover {
  color: var(--primary-color);
}
</style>
