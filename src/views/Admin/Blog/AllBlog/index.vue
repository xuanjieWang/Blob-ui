<!--页面-->
<template>
  <div class="flex flex-col items-center justify-center w-full p-2">
    <span class="mt-5 text-white font-bold">共有 {{ total }} 篇文章</span>
    <a-table class="mt-5 p-2" style="width: 95%" :dataSource="blogList" :columns="columns" bordered :pagination="{ pageSize: 10 }">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'image'">
          <img :src="record.image" class="h-[50px] w-[100px]" />
        </template>
        <template v-if="column.dataIndex === '编辑'">
          <div class="flex items-center justify-center p-2 cursor-pointer text-cyan-800" @click="editBlog(record.id)">
            <EditOutlined />
            <p>编辑</p>
          </div>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive, toRefs, defineEmits } from 'vue'
import { EditOutlined } from '@ant-design/icons-vue'
import columns from './table'
import { list } from '@/api/blog'

const emit = defineEmits(['choseMenu'])

// 查询参数
const data = reactive({
  queryParams: {}
})
const { queryParams } = toRefs(data)

var blogList = reactive([])
const total = ref(0)

onMounted(async () => {
  const res = await list(queryParams.value) // 获取全部的设备信息
  if (res.rows) Object.assign(blogList, res.rows)
  total.value = res.total
})

function editBlog(id) {
  emit('choseMenuId', id)
}
</script>
<style lang="scss" scoped></style>
