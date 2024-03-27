<!--页面-->
<template>
  <div class="item flex flex-col rounded">
    <div class="image"></div>
    <div class="text">
      <p>&nbsp;&nbsp;如何拥有真实的美国手机号 | 从免费到超贵，三种实用方案推荐 | VLOG32</p>
    </div>
    <div class="info flex justify-around items-center">
      <span>时间: 2024-03-25</span>
      <span>浏览量: 5799</span>
    </div>
  </div>
</template>

<script setup></script>
<style scoped lang="scss">
.item {
  height: 240px;
  min-width: 270px;
  margin: 10px 20px 10px 20px;
}
.image {
  height: 150px;
  width: 270px;
  background-image: url('../../../assets/img/bg.jpg');
  background-size: 100% 100%;
  background-size: cover; /* 可选，根据需要设置背景大小 */
  background-position: center; /* 可选，根据需要设置背景位置 */
  transition: transform 0.3s;
  cursor: pointer;
  overflow: hidden;
}
.image:hover {
  transform: scale(1.15);
  overflow: hidden;
}
.text {
  padding: 10px;
  width: 270px;
  height: 60px;
  background: #27272a;
  color: #cbd5e1;
}
.info {
  background: #27272a;
  line-height: 30px;
  height: 30px;
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
  font-size: 14px;
  color: #785d2a;
}
</style>
