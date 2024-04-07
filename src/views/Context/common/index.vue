<!--页面-->
<template>
  <div>
    <div class="body flex flex-col">
      <h1 style="font-size: 20px; margin: 10px">发布评论</h1>
      <a-textarea v-model:value="value" placeholder="评论" :rows="5" />
      <a-button class="button" type="primary" :loading="iconLoading" @click="enterIconLoading">
        {{ isLogin ? '点击发布' : '请先登录' }}
      </a-button>
    </div>
    <div class="common">显示评论区域</div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, defineProps } from 'vue'
import useBlogStore from '../../../stores/blog'
import { listComm, addComm } from '../../../api/comm'
const blogStore = useBlogStore()

const iconLoading = ref(false)
const value = ref('')
const id = ref('')

/****
 * 添加评论。只需要添加出
 *
 */

// 计算属性，是否登录
const isLogin = computed(() => {
  return blogStore.login
})

const props = defineProps({
  blogId: {
    type: Number
  }
})

//设置文章id
onMounted(async () => {
  id.value = props.blogId
  getComment()
})

//根据文章id获取到信息
async function getComment(id) {
  const res = await listComm()
  console.log(id, res)
}
//先判断是否登录
function enterIconLoading() {
  if (!isLogin) return
  iconLoading.value = true
  setTimeout(() => {
    if (value.value) {
      console.log(id.value)
    }
    iconLoading.value = false
  }, 500)
}

watch(
  () => props.blogId,
  (value) => {
    id.value = value
  }
)
</script>
<style lang="scss" scoped>
.body {
  margin-top: 10px;
  padding: 10px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.5);
}
.button {
  margin-top: 10px;
  width: 100px;
  height: 40px;
  background: green;
  margin: 10px auto;
}
</style>
