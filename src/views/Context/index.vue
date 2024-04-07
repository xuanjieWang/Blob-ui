<!--页面-->
<template>
  <div class="main flex flex-col">
    <div class="article">
      <div class="item flex flex-col rounded" v-for="item in blogList">
        <div class="image" @click="checkBlog(item)">
          <img :src="item.image" alt="Your Image" />
        </div>
        <div class="text">
          <p @click="checkBlog(item)">&nbsp;&nbsp;{{ item.title }}</p>
        </div>
        <div class="info flex justify-around items-center">
          <span>浏览量: 5799</span>
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
import { list } from '../../api/blog'
import { onMounted, ref, toRefs, reactive, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
import useBlogStore from '../../stores/blog'
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
<style scoped>
.main {
  height: 100%;
  min-height: 100vh;
  width: 1240px;
}
.article {
  display: flex;
  flex-wrap: wrap;
}
.p {
  color: aliceblue;
}
.item {
  height: 240px;
  min-width: 270px;
  margin: 5px 10px 5px 5px;
}
.image {
  height: 150px;
  width: 270px;
  transition: transform 0.3s;
  cursor: pointer;
  overflow: hidden; /* 隐藏超出部分 */
  position: relative;
}
img {
  width: 100%; /* 图片宽度占满容器 */
  height: 100%; /* 图片高度占满容器 */
  transition: transform 0.3s; /* 添加过渡效果 */

  /* 默认缩放效果 */
  transform-origin: 0 0 0 0;
  transform: scale(1);
}

img:hover {
  transform: scale(1.05); /* 鼠标悬停时放大图片 */
}
.text {
  padding: 8px;
  width: 270px;
  height: 60px;
  background: #27272a;
  color: #cbd5e1;
  font-size: 14px;
}
.info {
  background: #27272a;
  height: 30px;
  margin-top: -10px;
}

p {
  display: -webkit-box; /* 使用flexbox布局 */
  -webkit-box-orient: vertical; /* 垂直排列 */
  -webkit-line-clamp: 2; /* 显示两行 */
  overflow: hidden; /* 隐藏溢出内容 */
  text-overflow: ellipsis; /* 显示省略号 */
  cursor: pointer;
}
span {
  font-size: 12px;
  color: #785d2a;
}
</style>
