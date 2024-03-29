<!--页面-->
<template>
  <div class="item flex flex-col rounded">
    <div class="image">
      <img src="../../../assets/img/bg.jpg" alt="Your Image" />
    </div>
    <div class="text">
      <p>&nbsp;&nbsp;如何拥有真实的美国手机号 | 从免费到超贵，三种实用方案推荐 | VLOG32</p>
    </div>
    <div class="info flex justify-around items-center">
      <span>时间: 2024-03-25</span>
      <span>浏览量: 5799</span>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, getCurrentInstance, onMounted } from 'vue'
const { proxy } = getCurrentInstance()
import useBlogStore from '../../../stores/blog'

const blogStore = useBlogStore()

onMounted(() => {
  const data = blogStore.getData()
  console.log(data)
})

const data = ref({})
watch()
</script>
<style scoped lang="scss">
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
