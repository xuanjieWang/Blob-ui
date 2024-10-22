<template>
  <div class="body container mx-auto px-4 flex flex-col">
    <Header />
    <router-view :key="$route.path" />
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

import Header from './views/Header/index.vue'
import Footer from './views/Footer/index.vue'
</script>

<style lang="scss" scoped>
.body {
  // background: radial-gradient(ellipse at bottom, #1b2745 0%, #090a0f 100%);
  background: #000;
  overflow: hidden;
  color: #fff;
}
::selection {
  background-color: #1f8f93; /* 选中文本的背景颜色 */
  color: #000000; /* 选中文本的颜色 */
}
</style>
