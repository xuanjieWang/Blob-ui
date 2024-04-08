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
    <div class="common">
      显示评论区域

      {{ commonList }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, defineProps, getCurrentInstance, reactive } from 'vue'
import useBlogStore from '../../../stores/blog'
import { listComm, addComm } from '../../../api/comm'
import { message } from 'ant-design-vue'
import { RotateLeftOutlined } from '@ant-design/icons-vue'
const blogStore = useBlogStore()
const { proxy } = getCurrentInstance()

const iconLoading = ref(false)
const value = ref('')
const blogId = ref(0)
const commonList = ref([])
// 计算属性，是否登录
const isLogin = computed(() => {
  return blogStore.login
})

const props = defineProps({
  blogId: {
    type: Number,
    require: true
  }
})

//先判断是否登录
function enterIconLoading() {
  if (!isLogin) {
    message.success('请先进行登录！')
    // proxy.$router.push('/login') // 编程式导航
    // 登录的逻辑
    return
  }
  iconLoading.value = true
  setTimeout(async () => {
    if (value.value) {
      // 发布评论信息
      await addComm({
        content: value.value,
        blogId: id.value,
        userId: 1
      })
    }
    iconLoading.value = false
    message.success('发布成功！')
  }, 1000)
}

watch(
  () => props.blogId,
  async (value) => {
    blogId.value = value
    const res = await listComm(blogId.value)
    commonList.value = Object.assign({}, res.rows)
    console.log(commonList.value)
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
