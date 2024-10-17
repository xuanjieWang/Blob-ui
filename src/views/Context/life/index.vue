<!--页面-->
<template>
  <div class="page flex flex-col">
    <div class="flex justify-between items-center">
      <div class="articleItem flex gap-1 items-center">
        <HighlightOutlined :style="{ fontSize: '30px', color: '#08c' }" class="flex ml-4" />
        <p>生活</p>
      </div>
      <div class="articleChange flex gap-1 items-center">
        <RightOutlined :style="{ fontSize: '30px', color: '#08c' }" class="flex ml-4" />
      </div>
    </div>
    <div class="list flex">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div class="bg-white rounded-lg shadow-md p-4">
          <h2 class="text-xl font-bold">特性一</h2>
          <p>这是特性一的描述。</p>
        </div>
        <div class="bg-white rounded-lg shadow-md p-4">
          <h2 class="text-xl font-bold">特性二</h2>
          <p>这是特性二的描述。</p>
        </div>
        <div class="bg-white rounded-lg shadow-md p-4">
          <h2 class="text-xl font-bold">特性三</h2>
          <p>这是特性三的描述。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { HighlightOutlined, RightOutlined } from '@ant-design/icons-vue'
import card from '../card/index.vue'
</script>
<style lang="scss" scoped>
.page {
  position: relative;
  width: 100%;
  height: 100px;
  padding: 10px;
  margin-top: 30px;
}
.articleItem {
  width: 160px;
  height: 40px;
  background: #013827;
  border-radius: 20px;
}
.articleItem > p {
  font-size: 20px;
}
.articleChange {
  width: 60px;
  height: 40px;
  background: #013827;
  border-radius: 20px;
}
.list {
  margin-top: 20px;
}
</style>
