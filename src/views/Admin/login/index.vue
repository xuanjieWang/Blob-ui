<!--页面-->
<template>
  <div class="flex flex-col h-screen w-full items-center p-5">
    <img style="height: 150px" class="mt-10" src="http://xuanjie22.oss-cn-beijing.aliyuncs.com/blog/github/2024-11-04 13:53:41.801.png" alt="" />
    <p class="mt-5 p-5 text-2xl">Sign in to GitHub</p>

    <div class="mt-5 flex flex-col justify-center items-center rounded login-container" @click="go('login')">github 登录</div>
    <div class="mt-5 flex flex-col justify-center items-center rounded back-container" @click="go('back')">返回 首页</div>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance, onMounted, onUnmounted, reactive, toRefs } from 'vue'
import settingStore from '@/stores/setting.js'
const { proxy } = getCurrentInstance()
import { getQrCode, checkLogin } from '@/api/wxLogin'

const setting = settingStore()

onMounted(async () => {
  //将最上面的导航栏隐藏起来
  setting.setHeaderShow(false)
  // setInterval(() => {
  // proxy.$router.push('/admin') // 编程式导航
  // }, 2000)
})

function go(params) {
  if ('back' == params) {
    proxy.$router.push('/') // 编程式导航
  } else {
    window.location.href = 'https://github.com/login/oauth/authorize?scope=user:email&client_id=Ov23liVFg7d41DNFRhVY'
  }
}
</script>
<style lang="scss" scoped>
.login-container {
  height: 45px;
  width: 220px;
  background-color: #238636;
  font-size: 14px;
  font-weight: 800;
}
.login-container:hover {
  background-color: #29903b;
}
.back-container {
  height: 45px;
  width: 220px;
  background-color: #d50b0b;
  font-size: 14px;
  font-weight: 800;
}
.back-container:hover {
  background-color: #e63302;
}
</style>
