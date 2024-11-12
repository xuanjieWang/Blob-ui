<!--个人生活页面-->
<template>
  <div class="p-3 mt-3 flex flex-col">
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
    <div class="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 gap-4 mt-3">
      <div v-for="(item, index) in blogList" :key="index">
        <div class="imageBorder" @click="checkBlog(item.id)">
          <img :src="item.image" class="cursor-pointer shadow-md bg-cover bg-center bg-no-repeat w-[250px] h-[140px]" />
          <div class="w-full h-[40px] -mt-3 text-white bg-gradient-to-b from-green-100 to-green-300 flex flex-col justify-end items-center">
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
const { proxy } = getCurrentInstance()

const data = reactive({
  queryParams: {
    pageNum: 1,
    pageSize: 6,
    type: '生活'
  }
})
const { queryParams } = toRefs(data)

var blogList = reactive([0])

onMounted(async () => {
  // 获取到所有生活数据，并只展示前4条
  const res = await list(queryParams.value)
  if (!res.rows) return
  let length = 0
  length = res.rows.length < 4 ? res.rows.length : 4
  for (let i = 0; i < length; i++) {
    blogList[i] = res.rows[i]
  }
})

const checkBlog = (id) => {
  proxy.$router.push('/blog' + id)
}
</script>
<style lang="scss" scoped>
.articleItem {
  background: #179609;
}
.imageBorder > img {
  border-top-left-radius: 10px; /* 设置左上角圆角 */
  border-top-right-radius: 10px; /* 设置右上角圆角 */
}
</style>
