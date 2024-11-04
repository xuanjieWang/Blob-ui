<!--页面-->
<template>
  <div class="flex flex-col items-center justify-center w-full">
    <a-table class="mt-10 p-2" style="width: 90%" :dataSource="blogList" :columns="columns" bordered>
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === '编辑'">
          <div class="flex items-center justify-center p-2 cursor-pointer text-cyan-800" @click="editBlog(record.id)">
            <EditOutlined />
            <p>编辑</p>
          </div>
        </template>
      </template>
    </a-table>
    <span class="mt-2 text-white font-bold">当前共有 {{ total }} 篇文章</span>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive, toRefs, defineEmits } from 'vue'
import { EditOutlined } from '@ant-design/icons-vue'

import { list } from '@/api/blog'

const emit = defineEmits(['choseMenu'])

var columns = [
  {
    title: '序号',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title'
  },
  {
    title: '类别',
    dataIndex: 'type',
    key: 'type'
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime'
  },
  {
    title: '编辑',
    dataIndex: '编辑'
  }
]

// 查询参数
const data = reactive({
  queryParams: {
    pageNum: 1,
    pageSize: 10
  }
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
