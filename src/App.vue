<script setup>
import { RouterView } from 'vue-router'
import Header from '@/components/Header.vue'
</script>

<template>
  <Header />
  <div class="content">
    <RouterView />
  </div>
</template>

<style>
.content {
  width: 100vw;
  min-height: 100vh;
  background-color: #b0d8df;
}
</style>
