<!--页面-->
<template>
  <div class="flex flex-col justify-center items-center w-full p-2">
    <div class="flex items-start w-full mt-3 ml-20">
      <a-button type="primary" :icon="h(PlusOutlined)" @click="openAdd = true"> 添加类型 </a-button>
    </div>

    <div class="flex justify-around w-full gap-5">
      <div>父节点</div>
      <div>所有节点</div>
    </div>

    <div class="flex w-full">
      <a-table class="mt-5 p-2 w-1/2" style="width: 90%" :dataSource="parentList" :columns="parentColumns" bordered :pagination="{ pageSize: 10 }">
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === '编辑'">
            <div class="flex items-center justify-center gap-10 cursor-pointer text-cyan-800">
              <div @click="editBlog(record.id)">
                <EditOutlined />
                <p>查看</p>
              </div>
              <div @click="del(record)">
                <EditOutlined />
                <p>删除</p>
              </div>
            </div>
          </template>
        </template>
      </a-table>
      <a-table class="mt-5 p-2 w-1/2" style="width: 90%" :dataSource="typeList" :columns="columns" bordered :pagination="{ pageSize: 10 }">
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === '编辑'">
            <div class="flex items-center justify-center gap-10 cursor-pointer text-cyan-800">
              <div @click="editBlog(record.id)">
                <EditOutlined />
                <p>编辑</p>
              </div>
              <div @click="del(record)">
                <EditOutlined />
                <p>删除</p>
              </div>
            </div>
          </template>
        </template>
      </a-table>
    </div>

    <a-modal v-model:open="open" title="警告" @ok="handleOk">
      <p>确定是否删除类型为： {{ delData.type }} 的数据</p>
    </a-modal>

    <a-modal v-model:open="openAdd" title="添加博客类型标签" @ok="handleAdd">
      <a-form :model="addData" name="basic" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }" autocomplete="off">
        <a-form-item label="博客类别" name="type" :rules="[{ required: true, message: '请输入博客类别' }]">
          <a-input v-model:value="addData.type" />
        </a-form-item>
        <a-form-item label="父级类别" name="父级类别">
          <a-select allowClear v-model:value="addData.parentType" style="width: 200px" :options="parentList.map((item) => ({ value: item.type }))"></a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive, toRefs, defineEmits, h } from 'vue'
import { EditOutlined, PlusOutlined } from '@ant-design/icons-vue'
import { columns, parentColumns } from './table'
import { listAll, addBlogType, delBlogType, updateMBlogType } from '@/api/blogType'

const emit = defineEmits(['choseMenu'])
// 查询参数
const data = reactive({
  queryParams: {
    parentType: 'allParent'
  }
})
const { queryParams } = toRefs(data)

var typeList = reactive([])
var parentList = reactive([])

onMounted(async () => {
  getBlog()
})

const getBlog = async () => {
  const res = await listAll({})
  if (res.data) Object.assign(typeList, res.data)

  const parentRes = await listAll(queryParams.value)
  if (res.data) Object.assign(parentList, parentRes.data)
}

function editBlog(id) {
  //   emit('choseMenuId', id)
}

const open = ref(false)
const delData = ref('')

const del = async (data) => {
  open.value = true
  delData.value = data
}

const handleOk = async () => {
  open.value = false
  await delBlogType(delData.value.id)
  typeList = []

  setTimeout(() => {
    getBlog()
  }, 500)
}

const openAdd = ref(false)
var addData = reactive({})
const handleAdd = async () => {
  openAdd.value = false
  await addBlogType(addData)
  setTimeout(() => {
    getBlog()
  }, 1000)
}
</script>
<style lang="scss" scoped></style>
