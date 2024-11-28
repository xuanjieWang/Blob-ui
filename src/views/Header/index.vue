<!--页面-->
<template>
  <div class="py-2 headerStyle">
    <div class="flex flex-col md:flex-row justify-between">
      <div class="text-xl font-bold ml-5 text-center" @click="go('/index')">
        <p>{{ $t('name') }}</p>
      </div>
      <nav>
        <ul class="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
          <li>
            <TextButton text="博客" :items="blogList"></TextButton>
          </li>
          <li>
            <TextButton text="功能" :items="functionList"></TextButton>
          </li>
          <li>
            <TextButton text="关于我" @click="go('/aboutMe')"></TextButton>
          </li>
          <li>
            <TextButton text="后台" @click="go('/login')"></TextButton>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { getCurrentInstance } from 'vue'
import { blogList, functionList } from './HeadleTable.js'
const { proxy } = getCurrentInstance()

function go(path) {
  proxy.$router.push(path) // 编程式导航
}
</script>
<style lang="scss">
.headerStyle {
  z-index: 999;
  position: fixed;
  width: 100%;
  color: #fff;
  height: 60px;
  line-height: 60px;
  background: rgba(0, 0, 0, 0.75); /* 半透明黑色背景 */
  backdrop-filter: blur(20px); /* 背景模糊效果 */
  -webkit-backdrop-filter: blur(20px); /* Safari支持 */
  border-top: 0.5px solid #818080; /* 上方添加白色边框 */
  border-bottom: 0.5px solid #818080; /* 下方添加白色边框 */
}
@media screen and (max-width: 766px) {
  .headerStyle {
    position: absolute;
  }
}
</style>
