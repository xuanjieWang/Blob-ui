<!--页面-->
<template>
  <div class="main flex flex-col gap-5">
    <div class="article">
      <Card v-for="(item, index) in 12" />
    </div>
    <div class="flex justify-center items-center">
      <a-button type="primary">上一页</a-button>
      <p>1/23</p>
      <a-button type="primary">下一页</a-button>
    </div>
  </div>
</template>

<script setup>
import Card from './card/index.vue'
import { test, list } from '@/api/blog'
import { onMounted } from 'vue'

onMounted(async () => {
  const res = await test()
  console.log(res)
  const res2 = await list()
  console.log(res2)
})
</script>
<style scoped>
.main {
  height: 100%;
  width: 1240px;
}
.article {
  display: flex;
  flex-wrap: wrap;
}
.p {
  color: aliceblue;
}
</style>
