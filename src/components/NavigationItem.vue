<script setup lang="ts">
import type { Item } from './Item';

const props = defineProps<{
  item: Item
  isActive: boolean
}>();

</script>

<template>
  <a :href="item.href" :data-active="isActive">{{ props.item.name }}</a>
</template>

<style scoped>
a[data-active="true"] {
  color: var(--theme-color-primary);
  font-weight: var(--text-weight-bold);
}
</style>
