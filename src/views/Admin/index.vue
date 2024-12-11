<!--页面-->
<template>
  <div class="flex w-full h-full">
    <Sidebar @choseMenu="choseMenu" />
    <div class="flex flex-col w-full h-full bg-slate-700 min-h-screen">
      <index v-if="check == 'index'" />
      <allBlog @choseMenuId="choseMenuId" v-if="check == 'allBlog'" />
      <editBlog v-if="check == 'editBlog'" :id="editId" @choseMenu="choseMenu" />
      <addBlog v-if="check == 'addBlog'" />
      <blogType v-if="check == 'blogType'" />
      <ossImage v-if="check == 'ossImage'" />
      <busInfo v-if="check == 'bus'" />
      <logging v-if="check == 'logging'" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue'
import settingStore from '@/stores/setting.js'
import Sidebar from './Sidebar/index.vue'
import allBlog from './Blog/AllBlog/index.vue'
import addBlog from './Blog/AddBlog/index.vue'
import editBlog from './Blog/EditBlog/index.vue'
import blogType from './Blog/BlogType/index.vue'
import ossImage from './ossImage/index.vue'
import index from './index/index.vue'
import busInfo from './busInfo/index.vue' //bus
import logging from './logging/index.vue'
const { proxy } = getCurrentInstance()

const check = ref()
const setting = settingStore()
onMounted(() => {
  setting.setHeaderShow(false)

  const id = new URLSearchParams(window.location.search).get('id')
  if (id !== '8903670' && id !== '75986564') {
    proxy.$router.push('/')
  }
})

// 切换导航栏
function choseMenu(data) {
  check.value = data
  if (data != 'back') localStorage.setItem('choseMenu', JSON.stringify(data))
}

const editId = ref(0)
function choseMenuId(id) {
  editId.value = id
  check.value = 'editBlog'
}
</script>
<style lang="scss" scoped></style>
