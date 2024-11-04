<!-- 添加或修改设备数据对话框 -->
<template>
  <div class="body">
    <div class="items flex">
      <span>文章标题: &nbsp;</span>
      <a-input v-model:value="form.title" placeholder="请输入文章标题" style="width: 300px" />
    </div>
    <div class="items flex">
      <span>文章封面: &nbsp;</span>
      <a-upload v-model:file-list="fileList" :customRequest="requestUpload" :before-upload="beforeUpload">
        <a-button>
          <upload-outlined></upload-outlined>
          点击上传
        </a-button>
      </a-upload>
    </div>
    <div class="items flex">
      <span>文章类型: &nbsp;</span>
      <a-input v-model:value="form.type" placeholder="请输入文章类型" style="width: 300px" />
    </div>
    <div id="vditor" style="height: 600px; width: 90%" name="description"></div>
    <a-button type="primary" @click="submit" style="width: 100px; margin: 20px">发布文章</a-button>
  </div>
</template>

<script setup>
import Vditor from 'vditor'
import 'vditor/dist/index.css'
import { reactive, watch, ref, toRefs, computed, onMounted, getCurrentInstance, h } from 'vue'
const { proxy } = getCurrentInstance()
import { notification } from 'ant-design-vue'
import { SmileOutlined } from '@ant-design/icons-vue'

// const { the_blog_type } = proxy.useDict('the_blog_type')
import { addBlog } from '@/api/blog'
const rule = {
  title: [{ required: true, message: '文章标题不能为空' }],
  image: [{ required: true, message: '文章图片不能为空' }],
  type: [{ required: true, message: '文章类型不能为空' }]
}

const data = reactive({
  form: {}
})
const { form } = toRefs(data)

const vditor = ref('')
const value = ref('')
const unwatch = ref(null)
onMounted(() => {
  vditor.value = new Vditor('vditor', {
    height: 350,
    toolbarConfig: {
      pin: true
    },
    cache: {
      enable: false
    },
    after: () => {
      vditor.value.setValue(value.value)
    }
  })
  unwatch.value = proxy.$watch('value', (val) => {
    if (vditor.value && getValue() !== val) {
      vditor.value.setValue(val)
    }
  })
})
const getValue = () => {
  return vditor.value.getValue()
}

const openNotification = (placement, message) => {
  notification.open({
    message: message,
    icon: () => h(SmileOutlined, { style: 'color: #108ee9' }),
    placement
  })
}

const submit = async () => {
  form.value.text = getValue()
  if (!form.value.title || !form.value.type) {
    openNotification('top', '文章不能为空')
    return
  }
  await addBlog(form.value).then(openNotification('top', '文章发布成功'))
  form.value = {}
}

/** 覆盖默认上传行为 */
function requestUpload() {}

/** 上传预处理 */
function beforeUpload(file) {
  if (file.type.indexOf('image/') == -1) {
    openNotification('top', '文件格式错误，请上传图片类型,如：JPG，PNG后缀的文件。')
  } else {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      form.value.image = reader.result
      form.value.imageUrl = file.name
    }
  }
}
</script>

<style lang="scss" scoped>
.body {
  margin: 3% auto;
  display: flex;
  flex-direction: column;
  align-items: left;
  min-height: 100vh;
  font-size: 20px;
  color: #fff;
  margin-left: 5%;
}
.items {
  margin: 10px 0 10px 0;
}
</style>
