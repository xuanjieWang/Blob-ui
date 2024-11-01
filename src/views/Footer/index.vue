<!--页面-->
<template>
  <div class="footerStyle">
    <span>02023by 夜雨炊烟</span>
    <span>豫ICP备2022022169号-1</span>
  </div>
</template>

<script setup>
import { getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()

function go(path) {
  proxy.$router.push(path) // 编程式导航
}
</script>
<style lang="scss" scoped>
.footerStyle {
  width: 100%;
  height: 80px;
  color: #fff;
  background: #000;
  text-align: center;
}
p {
  margin-left: 10px;
  font-size: 16px;
  width: 400px;
  color: #000;
}
</style>
