<!--页面-->
<template>
  <div class="py-4 headerStyle">
    <div class="flex flex-col md:flex-row justify-between items-center">
      <div class="text-2xl font-bold ml-5" @click="go('/index')">
        <p>{{ $t('name') }}</p>
      </div>
      <nav>
        <ul class="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
          <li>
            <TextButton text="博客" @click="go('/allBlog')"></TextButton>
          </li>
          <li>
            <TextButton text="添加博客" @click="go('/addBlog')"></TextButton>
          </li>
          <li>
            <TextButton text="下载抖音视频" @click="go('/dyVideo')"></TextButton>
          </li>
          <li>
            <TextButton text="留言"></TextButton>
          </li>
          <li>
            <TextButton text="关于" @click="go('/aboutMe')"></TextButton>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()

function go(path) {
  proxy.$router.push(path) // 编程式导航
}
</script>
<style lang="scss">
.headerStyle {
  z-index: 999;
  position: fixed;
  width: 100%;
  color: #fff;
  opacity: 0.7;
  background: #000;
}
</style>
