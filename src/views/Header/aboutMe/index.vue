<!--页面-->
<template>
  <div class="page p-5 flex flex-col">
    <div class="info">
    <p style="font-size: 38px; font-weight: 600; padding: 15px;">关于</p>
      <p class="title"><p>Hello! 我是王玄杰 2000, 一名全栈开发工程师, 2023年本科毕业, 喜欢Coding 和记录生活.</p></p>
      <p class="title mt-5">我的技能</p>
      <p class="p-2">前端</p>
      <ui class="p-2">
        <li>Html + Css+JavaScript, 熟练使用</li>
        <li>Vue + TypeScript, TailWind Css, BootStrap 熟练使用</li>
        <li>ElementPlus + Echarts + antDesign 熟练使用</li>
        <li>React + Cesium 持续学习</li>
      </ui>
      <p class="p-2">后端</p>
      <ui>
        <li>Java SpringBoot SpringCloud</li>
        <li>了解使用，持续学习： Python Django Go</li>
        <li>持续学习 Spark 大数据</li>
      </ui>
      <p class="p-2">其他</p>
      <ui>
        <li>熟悉使用Centos, Ubuntu 服务器系统</li>
        <li>熟悉使用Nginx, Docker, Jenkins部署服务, kubernetes, </li>
        <li>熟悉使用Google, GitHub, Start OverFlow, 以及Chat GPT解决问题</li>
        <li>熟悉Ipv6, DDNS, OpenVpn搭建通信网络</li>
      </ui>
    <div>
      <p class="p-2">联系方式</p>
     <ui>
        <li>Github: </li>
        <li>Google Mail: </li>
        <li>VX: </li>
      </ui>
    </div>
    </div>
  </div>
</template>

<script setup></script>
<style lang="scss" scoped>
.page {
  color: #fff;
  background-image: url('@/assets/img/background-night.png');
  width: 100%;
  min-height: 100%;
  margin: 5% auto;
  user-select: text;
  align-items: center;
}
.info{
  width: 50%;
}
.title {
  font-size: 1.1rem;
  color: #fff;
}
</style>
