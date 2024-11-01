<!--页面-->
<template>
  <div class="flex flex-col h-screen w-full">
    <div>这是管理页面</div>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance, onMounted, onUnmounted } from 'vue'
import settingStore from '@/stores/setting.js'
const { proxy } = getCurrentInstance()

const setting = settingStore()
onMounted(() => {
  //将最上面的导航栏隐藏起来
  setting.setHeaderShow(false)
  setInterval(() => {
    proxy.$router.push('/admin') // 编程式导航
  }, 2000)
})
</script>
<style lang="scss" scoped></style>
