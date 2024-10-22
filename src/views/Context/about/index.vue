<!--页面-->
<template>
  <div class="p-3 mt-5 flex flex-col">
    <div class="flex justify-between items-center">
      <div class="articleItem w-[160px] h-[40px] shadow-md rounded-lg flex gap-3 items-center">
        <HighlightOutlined :style="{ fontSize: '30px', color: '#08c' }" class="flex ml-4" />
        <p>关于</p>
      </div>
    </div>
    <!---下面部分的文章显示-->
    <div class="flex justify-center items-center mt-3">
      <div class="grid lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-2 gap-4">
        <div v-for="(item, index) in blogList" :key="index">
          <img :src="item.image" class="shadow-md bg-cover bg-center bg-no-repeat rounded-lg w-[200px] h-[120px]" />
          <div class="rounded-lg w-full h-[40px] -mt-3 text-white bg-gradient-to-b from-green-100 to-green-300 flex flex-col justify-end items-center">
            <span class="hover:text-black">{{ item.title }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { HighlightOutlined, RightOutlined } from '@ant-design/icons-vue'
import { ref, onMounted, onUnmounted, reactive, toRefs, computed } from 'vue'
import { list } from '@/api/blog'
import { useRoute } from 'vue-router'

const route = useRoute()

// 查询参数
const data = reactive({
  queryParams: {
    pageNum: 1,
    pageSize: 6,
    type: 'life'
  }
})
const { queryParams } = toRefs(data)

var blogList = reactive([])

onMounted(async () => {
  // 这是一个获取到后端数据
  const res = await list(queryParams.value) // 获取全部的设备信息
  if (res.rows) Object.assign(blogList, res.rows)
})
</script>
<style lang="scss" scoped>
.articleItem {
  background: #920e32;
}
</style>
