<!--页面-->
<template>
  <div class="page">
    <p style="font-size: 46px; font-weight: 600">关于</p>
    <div>
      <p class="title">我是 <p>Hello! 我是王玄杰, 一名全栈开发工程师, 2023年本科毕业, 喜欢Coding 和记录生活.</p></p>
    </div>
    <div>
      <p class="title">我的技能</p>
      <p>前端</p>
      <ui>
        <li>Html + Css+javaScript, 熟练使用</li>
        <li>Vue + TypeScript, TailWind Css, BootStrap 熟练使用</li>
        <li>ElementPlus + Echarts + antDesign 熟练使用</li>
        <li>React + Cesium 了解使用</li>
      </ui>
      <p>后端</p>
      <ui>
        <li>Java SpringBoot SpringCloud</li>
        <li>了解使用，持续学习： Python Django Go</li>
      </ui>
      <p>其他</p>
      <ui>
        <li>熟悉使用Centos, Ubuntu 服务器系统</li>
        <li>熟悉使用Nginx, Docker, DockerCompose ,DockerFile, Jenkins部署服务</li>
        <li>熟悉使用Google, GitHub, Start OverFlow, 以及Chat GPT解决问题</li>
        <li>熟悉Ipv6, DDNS, OpenVpn搭建通信网络</li>
      </ui>
    </div>
    <div>
      <p class="title">联系方式</p>
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
  margin: 5% auto;
  display: flex;
  flex-direction: column;
  align-items: left;
  min-height: 100vh;
  margin-left: 20%;
  font-size: 40px;
  color: #fff;
}
.title {
  font-size: 35px;
  color: #fff;
  margin: 0px 0px 5px 0px;
}
p {
  text-align: left;
  margin-left: 10px;
}
</style>
