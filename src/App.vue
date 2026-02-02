<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import { useTelegramStore } from './stores/telegram';

const telegramStore = useTelegramStore();

onMounted(() => {
  telegramStore.registerTelegramScript();
});

</script>

<template>
  <RouterView />
</template>

<style scoped>

</style>
