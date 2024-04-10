<!--页面-->
<template>
  <div class="headerStyle flex items-center">
    <div class="name">王玄杰</div>
    <div>首页</div>
    <div>留言板</div>
    <div>博客</div>
    <div>关于我</div>
  </div>
</template>

<script setup></script>
<style scoped>
.headerStyle {
  height: 50px;
  color: #fff;
  font-size: 16px;
  width: 74%;
  margin-left: 16%;
  margin-right: 10%;
  z-index: 10000;
  position: fixed;
  top: 0;
}

.headerStyle > div {
  position: relative;
  cursor: pointer;
}

.headerStyle div:nth-of-type(1) {
  font-size: 18px;
  font-weight: 700;
}
.headerStyle div:nth-of-type(1):hover {
  text-decoration: underline;
}
.headerStyle div:nth-of-type(2) {
  left: 58%;
}
.headerStyle div:nth-of-type(3) {
  left: 62%;
}
.headerStyle div:nth-of-type(4) {
  left: 66%;
}
.headerStyle div:nth-of-type(5) {
  left: 72%;
}
.headerStyle div:nth-of-type(6) {
  left: 76%;
}
</style>
