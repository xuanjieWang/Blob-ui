<!--页面-->
<template>
  <div class="flex w-full h-full">
    <Sidebar @choseMenu="choseMenu" />
    <div class="flex flex-col w-full h-full">
      <allBlog @choseMenuId="choseMenuId" v-if="check === 'allBlog'" />
      <editBlog v-if="check === 'editBlog'" :id="editId" @choseMenu="choseMenu" />
      <addBlog v-if="check === 'addBlog'" />
    </div>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance, onMounted, onUnmounted } from 'vue'
import settingStore from '@/stores/setting.js'
import Sidebar from './Sidebar/index.vue'
import allBlog from './Blog/AllBlog/index.vue'
import addBlog from './Blog/AddBlog/index.vue'
import editBlog from './Blog/EditBlog/index.vue'

const check = ref('index')

const { proxy } = getCurrentInstance()

const setting = settingStore()
onMounted(() => {
  setting.setHeaderShow(false)
})

function choseMenu(data) {
  check.value = data
}

const editId = ref(0)
function choseMenuId(id) {
  editId.value = id
  check.value = 'editBlog'
}
</script>
<style lang="scss" scoped></style>
