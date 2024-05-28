<!--页面-->
<template>
  <div class="blog">
    <div v-if="blogList.length > 0">
      <div class="flex flex-col" v-for="(item, index) in blogList" :key="index">
        <div v-if="index % 2 == 0" class="flex">
          <div class="items rounded">
            <div class="image" @click="checkBlog(item)" v-if="item.image">
              <img :src="item.image" alt="Your Image" />
            </div>
            <div class="image" @click="checkBlog(item)" v-if="!item.image">
              <div class="text">{{ item.text }}</div>
            </div>
            <div class="textTitle">
              <p @click="checkBlog(item)">&nbsp;&nbsp;{{ item.title }}</p>
            </div>
            <div class="info flex items-center">
              <span>{{ item.createTime }}</span>
            </div>
          </div>
          <div v-if="index + 1 < blogList.length" class="items rounded" style="margin-left: 10px">
            <div class="image" @click="checkBlog(blogList[index + 1])" v-if="blogList[index + 1].image">
              <img :src="blogList[index + 1].image" alt="Your Image" />
            </div>
            <div class="image" @click="checkBlog(blogList[index + 1])" v-if="!blogList[index + 1].image">
              <div class="text">{{ blogList[index + 1].text }}</div>
            </div>

            <div class="textTitle">
              <p @click="checkBlog(blogList[index + 1])">&nbsp;&nbsp;{{ blogList[index + 1].title }}</p>
            </div>
            <div class="info flex items-center">
              <span>{{ blogList[index + 1].createTime }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { list } from '../../../api/blog'
import { onMounted, ref, toRefs, reactive, getCurrentInstance, nextTick } from 'vue'
const { proxy } = getCurrentInstance()
import useBlogStore from '../../../stores/blog'
const blogStore = useBlogStore()
const blogList = ref([])

const data = reactive({
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    timeRange: ''
  }
})
const { queryParams } = toRefs(data)

onMounted(async () => {
  const res = await list(queryParams)
  console.log(res.rows)
  blogList.value = res.rows || []
})

const current = ref(2)
const checkBlog = (data) => {
  proxy.$router.push('/blog' + data.id) // 编程式导航
}
</script>
<style scoped src="./index.scss"></style>
