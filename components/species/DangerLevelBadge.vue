<template>
  <span :class="['danger-badge', dangerLevel]">
    {{ t(`dangerLevels.${dangerLevel}`) }}
  </span>
</template>

<script setup lang="ts">
interface Props {
  dangerLevel: string
}

defineProps<Props>()

const { t } = useI18n()
</script>

<style scoped>
.danger-badge {
  display: inline-block;
  padding: 5px 15px;
  border-radius: var(--border-radius);
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--white-color);
  white-space: nowrap;
}

.danger-badge.critically_endangered {
  background-color: var(--critically-endangered);
}

.danger-badge.endangered {
  background-color: var(--endangered);
}

.danger-badge.vulnerable {
  background-color: var(--vulnerable);
}

.danger-badge.near_threatened {
  background-color: var(--near-threatened);
}
</style>
