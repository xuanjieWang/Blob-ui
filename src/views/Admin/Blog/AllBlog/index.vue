<!--页面-->
<template>
  <div class="flex flex-col justify-center w-full p-5">
    <div class="flex items-center p-2">
      <span>数据筛选: &nbsp;</span>
      <a-tree-select
        v-model:value="typeValue"
        style="width: 35%"
        :tree-data="treeData"
        tree-checkable
        allow-clear
        :show-checked-strategy="SHOW_PARENT"
        placeholder="请选择博客类型"
        tree-node-filter-prop="label" />
    </div>
    <span class="mt-5 text-white font-bold">共有 {{ total }} 篇文章</span>
    <a-table class="mt-5 p-2" :dataSource="blogList" :columns="columns" bordered :pagination="{ pageSize: 10 }">
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

// 查询参数
const data = reactive({
  queryParams: {}
})
const { queryParams } = toRefs(data)

var blogList = reactive([])
const total = ref(0)
const typeList = reactive([])

const typeValue = ref()
var treeData = reactive([])

onMounted(async () => {
  const res = await list(queryParams.value) // 获取全部的设备信息
  if (res.rows) Object.assign(blogList, res.rows)
  total.value = res.total

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

function editBlog(id) {
  emit('choseMenuId', id)
}
const del = async (id) => {
  await delBlog(id)
  setTimeout(async () => {
    const res = await list(queryParams.value) // 获取全部的设备信息
    if (res.rows) Object.assign(blogList, res.rows)
    total.value = res.total
  }, 1000)
}
</script>
<style lang="scss" scoped></style>
