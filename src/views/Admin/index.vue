<!--页面-->
<template>
  <div class="flex h-screen">
    <Sidebar />
    <div class="">首页</div>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance, onMounted, onUnmounted } from 'vue'
import settingStore from '@/stores/setting.js'
import Sidebar from './Sidebar/index.vue'
const { proxy } = getCurrentInstance()

const setting = settingStore()
onMounted(() => {
  //将最上面的导航栏隐藏起来
  setting.setHeaderShow(false)
  // proxy.$router.push('/addBlog') // 编程式导航
})
</script>
<style lang="scss" scoped></style>
