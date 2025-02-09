<script setup lang="ts">
import NavigationItem from './NavigationItem.vue';
import CaretRight from '~icons/material-symbols/keyboard-arrow-right'
import type { Item } from './Item';
import { useVModel } from '@nanostores/vue';
import { $openSidebarItems } from '../stores';

const openItems = useVModel($openSidebarItems)

const props = defineProps<{
  items: Item[];
  currentItem: Item;
}>()

const handleToggle = (item: Item, event: Event) => {
  openItems.value = { ...openItems.value, [item.id]: (event.target as HTMLDetailsElement).open }
};
</script>

<template>
  <ul>
    <li v-for="item in props.items" :key="item.id">
      <template v-if="item.children">
        <details @toggle="handleToggle(item, $event)" :open="openItems[item.id]">
          <summary>
            <CaretRight v-if="item.children" class="caret" />
            <NavigationItem :item :isActive="item.id === currentItem.id" />
          </summary>
          <Navigation :items="item.children" :currentItem :openItems />
        </details>
      </template>
      <template v-else>
        <NavigationItem :item :isActive="item.id === currentItem.id" />
      </template>
    </li>
  </ul>
</template>

<style scoped>
details {
  --caret-size: var(--text-size);
  --middle-of-caret: calc(var(--caret-size) / 2);
  --summary-gap: 6px;
  --entry-padding-y: 4px;
  font-size: var(--text-size-sm);

  li {
    margin-left: var(--middle-of-caret);
    padding: var(--entry-padding-y) calc(var(--middle-of-caret) + var(--summary-gap));
    border-inline-start: var(--border);

    &:hover {
      color: var(--theme-color-text-highlight);
      border-color: var(--theme-color-text-highlight);
    }
  }

  .caret {
    transition: transform 0.2s ease-in-out;
    flex-shrink: 0;
    width: var(--caret-size);
    height: var(--caret-size);
  }

  &[open] {
    .caret {
      transform: rotate(90deg);
    }
  }
}

summary {
  padding: var(--entry-padding-y) 0;
  display: flex;
  align-items: center;
  font-size: var(--text-size);
  font-weight: var(--text-weight-bold);
  color: var(--theme-color-text-highlight);
  user-select: none;
  column-gap: var(--summary-gap);
}
</style>
