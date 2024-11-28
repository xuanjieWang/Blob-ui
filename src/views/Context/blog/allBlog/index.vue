<!--页面-->
<template>
  <div class="blog flex flex-col items-center">
    <div class="page flex flex-col">
      <span style="margin-top: 100px" class="text-white font-bold text-5xl">分类-博客</span>
      <span class="mt-10 text-white font-bold text-4xl">当前共有 {{ total || '-' }} 篇文章</span>
      <div v-for="(item, index) in blogList" :key="index">
        <div class="w-full text-2xl mt-10 text-white flex" @click="checkBlog(item.id)">
          <div class="w-2/3 ml-5 hover:underline">{{ item.title }}</div>
          <div class="w-1/3">{{ item.createTime }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, reactive, toRefs, getCurrentInstance } from 'vue'
import { list } from '@/api/blog'
import { useRoute } from 'vue-router'

const { proxy } = getCurrentInstance()

const route = useRoute()

// 查询参数
const data = reactive({
  queryParams: {
    pageNum: 1,
    pageSize: 20
  }
})
const { queryParams } = toRefs(data)

var blogList = reactive([])
const total = ref()

onMounted(async () => {
  const res = await list(queryParams.value) // 获取全部的设备信息
  if (res.rows) Object.assign(blogList, res.rows)
  total.value = res.total
})

const checkBlog = (id) => {
  proxy.$router.push('/blog' + id) // 编程式导航
}
</script>
<style lang="scss" scoped>
.blog {
  background-image: url('../../../assets/img/background-night.png');
  background-size: cover;
  min-height: 100vh;
  color: #aba8a8;
  font-size: 1rem;
}
.page {
}
</style>
