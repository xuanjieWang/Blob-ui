<!--页面-->
<template>
  <div class="flex">
    <span style="min-width: 120px; margin-left: 5%" @click="goHome">这里是王玄杰</span>
    <div style="width: 100px; margin-left: 50px">生活</div>
    <div style="width: 100px">前端</div>
    <div style="width: 100px">后端</div>
    <div style="width: 100px">服务器</div>
    <div style="width: 100px">关于我</div>
  </div>
</template>

<script setup>
import { onMounted, ref, toRefs, reactive, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
function goHome() {
  proxy.$router.push('index') // 编程式导航
}
</script>
<style scoped></style>
