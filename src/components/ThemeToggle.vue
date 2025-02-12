<template>
  <button @click="toggleTheme">
    <moon v-if="theme == 'dark'" />
    <sun v-else />
  </button>
</template>

<script setup>
import { useVModel } from '@nanostores/vue';
import { $theme } from '../stores';
import moon from 'virtual:icons/line-md/moon'
import sun from 'virtual:icons/line-md/sunny-outline'

const theme = useVModel($theme);

function toggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', theme.value);
}
</script>
