<!--页面-->
<template>
  <div class="p-3 mt-3 flex flex-col">
    <!---上面部分的图标和按钮-->
    <div class="w-full flex justify-between items-center">
      <div class="articleItem w-[120px] h-[40px] shadow-md rounded-lg flex gap-3 items-center">
        <WalletOutlined :style="{ fontSize: '30px', color: '#08c' }" class="ml-4" />
        <p class="text-[16px]">文章</p>
      </div>
      <div class="articleItem shadow-md rounded-lg items-center cursor-pointer">
        <a-tooltip placement="bottom" color="#000">
          <template #title>查看更多</template>
          <RightOutlined :style="{ fontSize: '30px', color: '#fff' }" class="ml-4" />
        </a-tooltip>
      </div>
    </div>
    <!---下面部分的文章显示-->
    <div class="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 gap-4 mt-3">
      <div v-for="(item, index) in blogList" :key="index">
        <div class="imageBorder" @click="checkBlog(item.id)">
          <img :src="item.image" class="cursor-pointer shadow-md bg-cover bg-center bg-no-repeat w-[250px] h-[140px]" />
          <div class="w-full h-[40px] -mt-3 text-white flex flex-col justify-end items-center">
            <span class="hover:text-black cursor-pointer">{{ item.title }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { WalletOutlined, RightOutlined } from '@ant-design/icons-vue'
import { ref, onMounted, onUnmounted, reactive, toRefs, getCurrentInstance, computed } from 'vue'
import { list } from '@/api/blog'
import { useRoute } from 'vue-router'

const { proxy } = getCurrentInstance()

const route = useRoute()

// 查询参数
const data = reactive({
  queryParams: {
    pageNum: 1,
    pageSize: 6,
    type: 'notLife'
  }
})
const { queryParams } = toRefs(data)
var blogList = reactive([0])

onMounted(async () => {
  // blogList[0].image = 'http://xuanjie22.oss-cn-beijing.aliyuncs.com/blog/back316.png'
  const res = await list(queryParams.value) // 获取全部的设备信息
  let length = 0
  length = res.rows.length < 4 ? res.rows.length : 4
  for (let i = 0; i < length; i++) {
    blogList[i] = res.rows[i]
  }
})

const checkBlog = (id) => {
  proxy.$router.push('/blog' + id) // 编程式导航
}

//     return item.image || "http://xuanjie22.oss-cn-beijing.aliyuncs.com/blog/back316.png"
//   }
// }
const imageSrc = computed(() => item.image || defaultImage)
</script>
<style lang="scss" scoped>
.articleItem {
  background: #3a0a78;
}
.imageBorder > img {
  border-top-left-radius: 10px; /* 设置左上角圆角 */
  border-top-right-radius: 10px; /* 设置右上角圆角 */
}
</style>
