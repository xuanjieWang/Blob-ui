<!--页面-->
<template>
  <div class="p-3 mt-5 flex flex-col">
    <div class="flex justify-between items-center">
      <div class="articleItem w-[120px] h-[40px] shadow-md rounded-lg flex gap-3 items-center">
        <HighlightOutlined :style="{ fontSize: '30px', color: '#08c' }" class="flex ml-4" />
        <p>生活</p>
      </div>
      <div class="articleItem shadow-md rounded-lg items-center cursor-pointer">
        <a-tooltip placement="bottom" color="#000">
          <template #title>查看更多</template>
          <RightOutlined :style="{ fontSize: '30px', color: '#fff' }" class="ml-4" />
        </a-tooltip>
      </div>
    </div>
    <!---下面部分的文章显示-->
    <div class="grid lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-2 gap-4 mt-5">
      <div v-for="(item, index) in blogList" :key="index">
        <div @click="checkBlog(item.id)">
          <img :src="item.image" class="cursor-pointer shadow-md bg-cover bg-center bg-no-repeat rounded-lg w-[200px] h-[120px]" />
          <div class="rounded-lg w-full h-[40px] -mt-3 text-white bg-gradient-to-b from-green-100 to-green-300 flex flex-col justify-end items-center">
            <span class="hover:text-black cursor-pointer">{{ item.title }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { HighlightOutlined, RightOutlined } from '@ant-design/icons-vue'
import { onMounted, reactive, toRefs, getCurrentInstance } from 'vue'
import { list } from '@/api/blog'
import { useRoute } from 'vue-router'

const { proxy } = getCurrentInstance()

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

var blogList = reactive([0])

onMounted(async () => {
  // 这是一个获取到后端数据
  const res = await list(queryParams.value) // 获取全部的设备信息
  if (res.rows) Object.assign(blogList, res.rows)
})

const checkBlog = (id) => {
  proxy.$router.push('/blog' + id) // 编程式导航
}
</script>
<style lang="scss" scoped>
.articleItem {
  background: #179609;
}
</style>
