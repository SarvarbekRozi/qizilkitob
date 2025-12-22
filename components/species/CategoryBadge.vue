<template>
  <span :class="['category-badge', category]">
    <i :class="iconClass"></i>
    {{ t(`species.${category}s`) }}
  </span>
</template>

<script setup lang="ts">
interface Props {
  category: 'animal' | 'plant'
}

const props = defineProps<Props>()

const { t } = useI18n()

const iconClass = computed(() => {
  return props.category === 'animal' ? 'flaticon-elephant' : 'flaticon-leaf'
})
</script>

<style scoped>
.category-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 5px 15px;
  border-radius: var(--border-radius);
  font-size: 12px;
  font-weight: 600;
  background-color: rgba(0, 0, 0, 0.7);
  color: var(--white-color);
}

.category-badge i {
  font-size: 14px;
}
</style>
