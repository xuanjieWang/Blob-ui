<!--页面-->
<template>
  <div class="flex flex-col h-screen w-full items-center justify-center">
    <div class="login-container flex flex-col p-5">
      <div class="flex flex-col justify-start gap-1 p-2">
        <p class="text-2xl font-bold">后台登录</p>
        <span style="color: #cccccc">选择你喜欢的方式进行登录</span>
      </div>
      <div class="ml-3 mt-2 github gap-3 flex justify-center items-center" @click="go('github')">
        <img src="@/assets/icon/gitHub1.png" width="20" height="20" />
        <div>
          使用
          <span class="font-bold">Github</span>
          登录
        </div>
      </div>
      <div class="ml-3 mt-3 github flex gap-3 justify-center items-center" @click="go('gitee')">
        <img src="@/assets/icon/gitee.png" width="20" height="20" />
        <div>
          使用
          <span class="font-bold">&nbsp;Gitee&nbsp;</span>
          登录
        </div>
      </div>
      <div class="mt-3 flex justify-center items-center gap-3">
        <svg width="38%" height="2">
          <line x1="0" y1="1" x2="100%" y2="1" stroke="white" />
        </svg>
        <span>或者</span>
        <svg width="36%" height="2">
          <line x1="0" y1="1" x2="100%" y2="1" stroke="white" />
        </svg>
      </div>
      <div class="ml-3 mt-2 github flex justify-center items-center" @click="go('back')">
        <div>首页</div>
      </div>
    </div>
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
  } else if ('github' == params) {
    window.location.href = 'https://github.com/login/oauth/authorize?client_id=Ov23liVFg7d41DNFRhVY&redirect_uri=http://127.0.0.1:8091/giteeCheck'
  } else if ('gitee' == params) {
    window.location.href = `https://gitee.com/oauth/authorize?client_id=47b57fb8644aa3971c6f347b3facf56b79a2eaa2b657459c9fbba72df43900a5&redirect_uri=http://127.0.0.1:8091/giteeCheck&response_type=code&state=1`
  }
}
</script>
<style lang="scss" scoped>
.login-container {
  height: 300px;
  width: 400px;
  border-radius: 20px;
  border: 1px solid #cccccc54;
  font-size: 14px;
}
.github {
  width: 330px;
  height: 42px;
  background-color: #fafafa;
  color: #000;
  border-radius: 10px;
  border: 1px solid #cccccc54;
  font-size: 14px;
  cursor: pointer;
}
.github:hover {
  background-color: #fafafaf8;
}
</style>
