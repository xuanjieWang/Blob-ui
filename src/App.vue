<template>
  <div class="body">
    <div class="star"></div>
    <div class="medium-star"></div>
    <div class="big-star"></div>
    <Header />
    <router-view :key="$route.path" />
    <Footer />
  </div>
</template>

<script setup>
import Header from './views/Header/index.vue'
import Footer from './views/Footer/index.vue'
</script>

<style lang="scss" scoped>
.body {
  height: 100%;
  background: radial-gradient(ellipse at bottom, #1b2745 0%, #090a0f 100%);
  overflow: hidden;
}
</style>
