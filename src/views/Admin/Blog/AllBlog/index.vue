<!--页面-->
<template>
  <div class="flex flex-col justify-center w-full p-5">
    <div class="flex items-center p-2 gap-3">
      <span>博客类型: &nbsp;</span>
      <a-tree-select
        v-model:value="blogType"
        style="width: 20%"
        :tree-data="treeData"
        tree-checkable
        allow-clear
        :show-checked-strategy="SHOW_PARENT"
        placeholder="请选择博客类型"
        tree-node-filter-prop="label" />
      <a-button type="primary" @click="getBlogByType" style="width: 100px">查询</a-button>
    </div>
    <span class="mt- text-white font-bold">共有 {{ pagination.total }} 篇文章</span>
    <a-table class="mt-5 p-2" :dataSource="blogList" :columns="columns" bordered :pagination="pagination">
      >
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'image'">
          <img :src="record.image" class="h-[50px] w-[100px]" />
        </template>
        <template v-if="column.dataIndex === '编辑'">
          <div class="flex items-center justify-center p-2 gap-3 cursor-pointer text-cyan-800">
            <div class="flex justify-center items-center gap-2" @click="editBlog(record.id)">
              <EditOutlined />
              <p>编辑</p>
            </div>
            <div class="flex justify-center items-center gap-2" @click="del(record.id)">
              <DeleteOutlined />
              <p style="color: red">删除</p>
            </div>
          </div>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive, toRefs, defineEmits } from 'vue'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons-vue'
import { TreeSelect } from 'ant-design-vue'
import columns from './table'
import { list, delBlog } from '@/api/blog'
import { listAll } from '@/api/blogType'

const SHOW_PARENT = TreeSelect.SHOW_PARENT
const emit = defineEmits(['choseMenu'])

var pagination = reactive({
  pageSize: 10, // 每页显示的条数
  showSizeChanger: true, // 是否可以改变每页显示的条数
  pageSizeOptions: ['10', '20', '30'], // 可选的每页显示条数
  showQuickJumper: true, // 是否可以快速跳转到指定页
  showTotal: (total) => `共 ${total} 条`, // 显示总条数和当前数据范围
  current: 1, // 当前页数
  total: 50, // 总条数
  onChange: handlePageChange // 页码改变时的回调函数
})
// 查询参数
const data = reactive({
  queryParams: {
    pageNum: 1,
    pageSize: 10
  }
})
const { queryParams } = toRefs(data)

const blogType = ref()
var treeData = reactive([])

onMounted(async () => {
  getData()

  const typeRes = await listAll({})
  if (typeRes.data) Object.assign(typeList, typeRes.data)
  typeList.forEach((item) => {
    if (!item.parentType) {
      treeData.push({
        label: item.type,
        value: item.type,
        children: []
      })
      typeList.forEach((child) => {
        if (child.parentType && child.parentType === item.type) {
          treeData[treeData.length - 1].children.push({
            label: child.type,
            value: child.type
          })
        }
      })
    }
  })
})

var blogList = reactive([])
const typeList = reactive([])
const getData = async () => {
  queryParams.pageNum = pagination.current
  queryParams.pageSize = pagination.pageSize
  const res = await list(queryParams) // 获取全部的设备信息
  Object.assign(blogList, res.rows)
  pagination.total = res.total
}

function handlePageChange(page, pageSize) {
  pagination.current = page
  pagination.pageSize = pageSize
  getData()
}

function editBlog(id) {
  emit('choseMenuId', id)
}
const del = async (id) => {
  await delBlog(id)
  setTimeout(async () => {
    const res = await list(queryParams.value) // 获取全部的设备信息
    blogList = res.rows
  }, 1000)
}

const getBlogByType = async () => {
  if (!blogType.value) return
  const res = await list({ blogType: blogType.value }) // 获取全部的设备信息
  blogList = res.rows
}
</script>
<style lang="scss" scoped></style>
