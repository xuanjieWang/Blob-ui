<!--页面-->
<template>
  <div class="page p-5 flex flex-col">
    <p style="font-size: 46px; font-weight: 600">关于</p>
    <div>
      <p class="title"><p>Hello! 我是王玄杰, 一名全栈开发工程师, 2023年本科毕业, 喜欢Coding 和记录生活.</p></p>
    </div>
    <div class="mt-5">
      <p class="title ">我的技能</p>
      <p class="p-2">前端</p>
      <ui class="p-2">
        <li>Html + Css+javaScript, 熟练使用</li>
        <li>Vue + TypeScript, TailWind Css, BootStrap 熟练使用</li>
        <li>ElementPlus + Echarts + antDesign 熟练使用</li>
        <li>React + Cesium 了解使用</li>
      </ui>
      <p class="p-2">后端</p>
      <ui>
        <li>Java SpringBoot SpringCloud</li>
        <li>了解使用，持续学习： Python Django Go</li>
      </ui>
      <p class="p-2">其他</p>
      <ui>
        <li>熟悉使用Centos, Ubuntu 服务器系统</li>
        <li>熟悉使用Nginx, Docker, DockerCompose ,DockerFile, Jenkins部署服务</li>
        <li>熟悉使用Google, GitHub, Start OverFlow, 以及Chat GPT解决问题</li>
        <li>熟悉Ipv6, DDNS, OpenVpn搭建通信网络</li>
      </ui>
    </div>
    <div>
      <p class="p-2">联系方式</p>
     <ui>
        <li>Github: </li>
        <li>Google Mail: </li>
        <li>VX: </li>
      </ui>
    </div>
  </div>
</template>

<script setup></script>
<style lang="scss" scoped>
.page {
  color: #fff;
  background-image: url('@/assets/img/background-night.png');
  background-size: cover;
  width: 100%;
  min-height: 100vh;
  margin: 5% auto;

}
.title {
  font-size: 1.1rem;
  color: #fff;
}
</style>
