<template>
  <div class="body container mx-auto px-4 flex flex-col">
    <Header v-if="headerShow" />
    <router-view :key="$route.path" />
    <Footer v-if="headerShow" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'

import Header from './views/Header/index.vue'
import Footer from './views/Footer/index.vue'
import settingStore from '@/stores/setting.js'

const setting = settingStore()
const headerShow = ref(true)

onMounted(() => {
  headerShow.value = setting.setHeaderShow(true)
})

watch(
  () => setting.headerShow,
  (val) => (headerShow.value = val)
)
</script>

<style lang="scss" scoped>
.body {
  background: #000;
  overflow: hidden;
  color: #fff;
}
::selection {
  background-color: #1f8f93; /* 选中文本的背景颜色 */
  color: #000000; /* 选中文本的颜色 */
}
</style>
