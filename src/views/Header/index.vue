<!--页面-->
<template>
  <div id="headerStyle" class="headerStyle" v-show="show">
    <div class="flex justify-items-center">
      <div class="name" @click="go('/index')">
        <p>{{ $t('name') }}</p>
      </div>
      <div class="items flex items-center justify-around">
        <TextButton text="博客" @click="go('/blog')"></TextButton>
        <TextButton text="添加博客" @click="go('/addBlog')"></TextButton>
        <TextButton text="下载抖音视频" @click="go('/dyVideo')"></TextButton>
        <TextButton text="留言"></TextButton>
        <TextButton text="关于" @click="go('/aboutMe')"></TextButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getCurrentInstance, nextTick, onMounted, ref } from 'vue'
const { proxy } = getCurrentInstance()

const list = ['前端', '后端', '运维', '生活']

const show = ref(true)
onMounted(() => {
  nextTick(() => {})
})

function go(path) {
  proxy.$router.push(path) // 编程式导航
}
</script>
<style scoped src="./index.scss"></style>
