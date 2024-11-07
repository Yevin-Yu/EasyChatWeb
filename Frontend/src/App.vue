<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style>
html,
body,
#app {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  background-image: url('@/assets/banner.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
</style>
