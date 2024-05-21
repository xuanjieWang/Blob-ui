<!--页面-->
<template>
  <div class="blog flex flex-col">
    <div class="article">
      <div class="item flex flex-col rounded" v-for="item in blogList">
        <div class="image" @click="checkBlog(item)">
          <img :src="item.image" alt="Your Image" />
        </div>
        <div class="text">
          <p @click="checkBlog(item)">&nbsp;&nbsp;{{ item.title }}</p>
        </div>
        <div class="info flex items-center">
          <!-- <span>浏览量: 5799</span> -->
          <span>{{ item.createTime }}</span>
        </div>
      </div>
    </div>
    <div class="flex justify-center items-center" style="margin-top: 90vh">
      <a-pagination v-model:current="queryParams.pageNum" :total="total" />
      <span>共: {{ total }}条</span>
    </div>
  </div>
</template>

<script setup>
// import Card from './card/index.vue'
import { list } from '../../../api/blog'
import { onMounted, ref, toRefs, reactive, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
import useBlogStore from '../../../stores/blog'
const blogStore = useBlogStore()

const total = ref(0)
const data = reactive({
  queryParams: {
    pageNum: 1,
    pageSize: 12,
    timeRange: ''
  }
})
const { queryParams } = toRefs(data)
const blogList = ref([])

onMounted(async () => {
  const res = await list(queryParams)
  blogList.value = Object.assign({}, res.rows)
  total.value = res.total
})

const current = ref(2)
const checkBlog = (data) => {
  proxy.$router.push('/blog' + data.id) // 编程式导航
}
</script>
<style scoped src="./index.scss"></style>
