<template>
  <div class="app-container" style="display: flex; flex-direction: column; height: 100%">
    <TopContent />
    <div class="view-main">
      <div class="box-A">
        <div class="topA">
          <span style="margin-top: 10px; color: #ccccdce6; font-size: 0.95em; font-weight: bold">基本参数</span>
          <div class="yqlist">
            <div>
              <span class="yqtitle" style="color: #ccccdce6; font-size: 0.95em; font-weight: bold">当前设备</span>
              <div class="yq" style="width: 100%">
                <el-select
                  placeholder="选择设备"
                  v-model="selectedDevice"
                  @change="handleDeviceChange"
                  :value-key="'id'">
                  <el-option v-for="device in equipmentList" :key="device.id" :label="device.name" :value="device">
                  </el-option>
                </el-select>
              </div>
            </div>
          </div>
          <TempParams :temp="equipmentTemp" :equipment="selectedDevice" />
        </div>
        <div class="tableTitle">
          <span style="color: #ccccdce6; font-size: 0.95em; font-weight: bold">点测温</span>
          <el-switch v-model="pointModeEnabled" @change="togglePointMode"></el-switch>
          <span class="switch-label">报警显示</span>
          <el-switch v-model="isRightTopVisible" @change="handleSwitchChange"></el-switch>
        </div>
        <div class="bottomA">
          <table class="pointDataTable">
            <thead>
              <tr>
                <th>序号</th>
                <th>点测温度</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in pointDataList" :key="index" class="pointDataItem">
                <td>{{ item.regionIndex }}</td>
                <td class="highlighted-text">{{ item.max }}℃</td>
                <td style="color: rgba(231, 108, 17)">
                  <!-- 删除按钮，只有 regionIndex 不等于 1 才能点击 -->
                  <span
                    v-if="item.regionIndex !== 1"
                    @click="handleDeletePoint(item.regionIndex)"
                    style="cursor: pointer">
                    删除
                  </span>
                  <span v-else style="cursor: not-allowed"> 删除 </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="box-B">
        <div class="topB">
          <div :class="{ 'left-topB-full': !isRightTopVisible, 'left-topB': isRightTopVisible }">
            <div style="position: relative; height: 100%">
              <video
                ref="videoRef"
                class="video2"
                style="margin: 0"
                muted="muted"
                preload="none"
                autoplay="autoplay"></video>
              <!-- 根据isLoading的状态显示不同的内容 -->
              <LoadingVideo v-if="isLoading == 1" />
              <div v-else-if="isLoading == 5" class="offLineloading">{{ netStatusText }}</div>
              <canvas ref="canvasRef" v-show="pointModeEnabled" class="canvasPoint1"></canvas>
            </div>
          </div>
          <div class="right-topB" v-if="shouldShowRightTop">
            <AlarmData />
          </div>
        </div>
        <div class="bottomB">
          <div class="echarts">
            <div ref="chartContainer" class="chartContainer"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import * as echarts from 'echarts'
import { EquipData, getAllEquInfo, configData, setPointArea, delPoint, getPointData,listData } from '@/api/equipment/data'
import { getTemp, getChartTempData } from '@/api/temp/data'
import { options, tempOptions } from '../option'
import { ref, reactive, onMounted, nextTick, shallowRef, onUnmounted, watch } from 'vue'
import '@/assets/styles/video/base.scss'
const { proxy } = getCurrentInstance()
import Video from '@/utils/video/index.js'
import bus from '@/utils/video/EventEmitter.js'
import { ElNotification } from 'element-plus'
import useSettingsStore from '@/store/modules/settings'
import AlarmData from '@/views/alarm/data/alarmtest.vue'

const pointList = [
  { regionIndex: 1, max: 28 },
  { regionIndex: 2, max: 30 },
  { regionIndex: 3, max: 32 },
  { regionIndex: 4, max: 29 },
  { regionIndex: 5, max: 31 },
  { regionIndex: 6, max: 27 }
]

const isLoading = ref(1) // 0：视频播放 1: 加载中 5：离线

var allequipmentInfo = reactive({}) //所有设备的温度数据
var equipmentList = ref([]) //所有的设备信息
const selectedDevice = ref(null) //选中的设备
const equipmentTemp = ref({}) //设备温度

const allEquInfoTimer = ref(null)
const tempTimer = ref(null) //温度定时器
const timer = ref(null) //echart定时赋值

const pointTimer = ref(null) // 测温定时器
const pointModeEnabled = ref(false) //点测温开关

const tempRegionVo = reactive({
  equipmentId: null,
  startPosX: null,
  startPosY: null,
  regionIndex: 1 // 初始设为1，因为index从1开始
})

const activeNames = ref(['1', '2'])
const pointDataList = ref([])

var video = reactive({})

const isRightTopVisible = ref(true)

// 定义响应式变量 netStatus
const netStatus = ref('')

onMounted(async () => {
  await intSetting()
  
  const res = await EquipData() //获取在线设备信息
  const data = res.data || []

  if (!getSelectedDevice(data)) return
  
  await getEquTemp() //获取温度

  await getCharTemp()

  await getAllInfo() // 获取设备总数
  allEquInfoTimer.value = setInterval(async () => {
    await getAllInfo()
  }, 5000)

  startPointDataTimer()

  // 加载视频
  video = Video(proxy.$refs.videoRef, selectedDevice.value)
  bus.on('isLoading', (data) => {
    isLoading.value = data.isLoading
  })
  bus.emit('selectedDevice', selectedDevice.value)
})


const intSetting = async () => {
  // 检测是否是小屏幕设备（例如手机）  // 如果是小屏幕设备，则关闭导航栏
  const isSmallScreen = window.innerWidth <= 768 // 768px 是一个常见的小屏幕断点
  useSettingsStore().changeNavbarOpen(isSmallScreen)

  chart = echarts.init(chartContainer.value)
  window.addEventListener('resize', () => {
    chart.resize()
  })

  const savedVisibility = localStorage.getItem('isRightTopVisible')
  if (savedVisibility !== null) {
    isRightTopVisible.value = JSON.parse(savedVisibility)
  }
}

// 获取设备实时温度信息
const isFetching = ref(false)
const getEquTemp = async () => {
  if (isFetching.value) return
  isFetching.value = true
  const res = await getTemp(selectedDevice.value)

  if (selectedDevice.value.groupName == res.data.groupName) {
    equipmentTemp.value = res.data
    // 在这里对 tempMin 加上 5
    // equipmentTemp.value.tempMin = (equipmentTemp.value.tempMin || 0) + 10
  }
  isFetching.value = false
}

//获取温度曲线20条数值
const initTempDataList = ref([])
const initEnvDataList = ref([])
const getCharTemp = async () => {
  try {
    const response = await getChartTempData(selectedDevice.value.id)
    initTempDataList.value = response.data.tempData // 根据实际数据结构调整
    initEnvDataList.value = response.data.envData // 根据实际数据结构调整

    showChart()
  } catch (error) {
    console.error('Error fetching character temperature:', error)
  }
}

var chart = reactive({})
var chartOPtions = reactive({})
const chartContainer = shallowRef(null)
const showChart = async () => {
  // 复制初始配置
  chartOPtions = Object.assign({}, tempOptions)

  // 初始化数据
  const initialData = [...initTempDataList.value].reverse()

  // 提取温度和环境数据
  const tempData = initialData.map((data) => ({
    min: data.tempMin,
    avg: data.tempAvg,
    max: data.tempMax
  }))

  const envData = [...initEnvDataList.value].reverse().map((value) => parseFloat(value).toFixed(1))
  // const envData = [20, 30, 25, 30, 15, 20, 18, 19, 34, 15, 20, 20, 26, 18, 20, 20, 30, 28, 29, 30]
  const timeLabels = initialData.map((data) =>
    new Date(data.createTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  )

  // 一次性设置所有数据
  chartOPtions.series[0].data = envData
  chartOPtions.series[1].data = tempData.map((d) => d.min)
  chartOPtions.series[2].data = tempData.map((d) => d.avg)
  chartOPtions.series[3].data = tempData.map((d) => d.max)
  chartOPtions.xAxis.data = timeLabels

  // 更新图表
  if (chart && chart.setOption) {
    chart.setOption(chartOPtions)
  } else {
    console.warn('Chart is not initialized yet.')
  }

  // 启动定时更新数据的逻辑
  timer.value = setInterval(async () => {
    if (!isFetching.value) {
      await getEquTemp()
      // 直接生成随机值并更新 envTemp
      // equipmentTemp.value.envTemp = (Math.random() * (40 - 0) + 0).toFixed(1)

      const currentTime = equipmentTemp.value.createTime
      const newData = [
        equipmentTemp.value.envTemp,
        equipmentTemp.value.tempMin,
        equipmentTemp.value.tempAvg,
        equipmentTemp.value.tempMax
      ]

      // 检查条件
      const maxTemp = equipmentTemp.value.tempMax
      const isNewTime = !chartOPtions.xAxis.data.includes(equipmentTemp.value.createTime)

      if (maxTemp > -10 && currentTime !== undefined && isNewTime) {
        // 更新数据
        newData.forEach((value, index) => {
          chartOPtions.series[index].data.push(value)
        })
        chartOPtions.xAxis.data.push(currentTime)

        // 保持最新的 20 条数据
        if (chartOPtions.xAxis.data.length > 20) {
          chartOPtions.series.forEach((series) => series.data.shift())
          chartOPtions.xAxis.data.shift()
        }

        // 检查 chart 是否可用,在切换设备或页面时确保销毁旧的图表实例，避免内存泄漏或无效图表引用
        if (chart && chart.getOption) {
          const checkOptions = chart.getOption()
          if (checkOptions && checkOptions.legend && checkOptions.legend[0]) {
            chartOPtions.legend.selected = checkOptions.legend[0].selected
            chart.setOption(chartOPtions)
          } else {
            console.warn('Legend not available in chart options.')
          }
        } else {
          console.warn('Chart is not initialized.')
        }
      }
    }
  }, 5000) // 每 5 秒更新一次
}

let usePoint = []
let oldIndex = 0
// 调用接口设置点测温区域
const handleSetPoint = async () => {
  // 获取当前设备的点测温数据列表
  // 调用设置点测温区域的函数
  // 从 usePoint 中取出第一个未使用的 regionIndex
  let notificationMessage = ''
  if (usePoint.length > 0) {
    tempRegionVo.regionIndex = usePoint.shift()
    if (tempRegionVo.regionIndex != oldIndex) {
      oldIndex = tempRegionVo.regionIndex
      await setPointArea(tempRegionVo)
    } else {
      notificationMessage = '点击速度过快'
      console.error('点击速度过快')
    }
  } else {
    notificationMessage = '最多只能设置15个点测温'
    console.error('最多只能设置15个点测温')
  }
  if (notificationMessage) {
    ElNotification({
      message: notificationMessage,
      type: 'warning',
      position: 'bottom-right'
    })
  }
}

const handleVideoCanvasClick = (event) => {
  //------------》缺个判断
  if (!pointModeEnabled.value) return

  const videoCanvas = proxy.$refs.videoRef
  const canvas = proxy.$refs.canvasRef
  if (!videoCanvas || !canvas) return

  const rect = videoCanvas.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top

  // 获取video和canvas的尺寸
  const videoWidth = videoCanvas.clientWidth
  const videoHeight = videoCanvas.clientHeight
  const canvasWidth = canvas.clientWidth
  const canvasHeight = canvas.clientHeight

  // 计算比例
  const scaleX = canvasWidth / videoWidth
  const scaleY = canvasHeight / videoHeight

  // 转换坐标
  const canvasX = x * scaleX * 10
  const canvasY = y * scaleY * 10

  // 更新tempRegionVo中的坐标数据
  tempRegionVo.equipmentId = selectedDevice.value.id
  tempRegionVo.startPosX = Math.floor(canvasX)
  tempRegionVo.startPosY = Math.floor(canvasY)

  // 调用设置点测温区域的函数
  handleSetPoint()
}

//点测温功能
const togglePointMode = () => {
  if (pointModeEnabled.value) {
    proxy.$refs.videoRef.addEventListener('click', handleVideoCanvasClick)
  } else {
    proxy.$refs.videoRef.removeEventListener('click', handleVideoCanvasClick)
  }
}

const isFetchingPoint = ref(false) // 标志位，避免多次请求堆积

// 获取点测温数据
const getPointDataList = async () => {
  if (isFetchingPoint.value) return // 如果正在获取数据，则不再触发新的请求

  isFetchingPoint.value = true // 设置为正在请求状态
  const id = selectedDevice.value.id

  try {
    const res = await getPointData(id, 15) // 假设 `getPointData` 返回点测温数据

    // 排除第一条对象和最后一条对象
    const filteredData = res.slice(1, -1)

    // 筛选出 enable 为 true 的对象，并为每个对象添加 id 和 regionIndex 属性
    const updatedData = filteredData
      .map((item, index) => ({
        ...item,
        id: id, // 每个对象的 id
        regionIndex: index + 2, // 每个对象的 regionIndex 递增
        max: Number(item.max.toFixed(1)) // 保留 max 属性一位小数
      }))
      .filter((item) => item.enable === true) // 只保留 enable 为 true 的项

    // 如果需要在 regionIndex 为 0 的位置插入新对象 -- 添加区域的首个测温数
    const tempMax = equipmentTemp.value.tempMax // 获取 tempMax 值

    // 创建一个新对象，放在 regionIndex 为 0 的位置
    const newPointData = {
      id: id,
      regionIndex: 1, // 确保 regionIndex 是 0
      enable: true, // 设置为 enable 为 true
      max: tempMax // 设置 max 为 equipmentTemp.value.tempMax
    }

    // 在数据开头插入该新对象
    updatedData.unshift(newPointData) // 将新对象放在数据的开头

    // 更新 pointDataList
    pointDataList.value = updatedData // 确保这里将 updatedData 赋值给 pointDataList

    // 更新 usePoint 列表
    const usedRegionIndexes = pointDataList.value.map((item) => item.regionIndex)
    initializeUsePoint()
    usePoint = usePoint.filter((index) => !usedRegionIndexes.includes(index + 1))

    return res // 返回原始数据，如果需要
  } catch (error) {
    console.error('获取点测温数据失败', error)
  } finally {
    isFetchingPoint.value = false // 请求完成，重置标志位
  }
}

// 启动定时器，定时获取点测温数据
const startPointDataTimer = () => {
  if (pointTimer.value) {
    clearInterval(pointTimer.value) // 清理之前的定时器
  }

  pointTimer.value = setInterval(async () => {
    await getPointDataList() // 每秒调用一次获取数据的函数
  }, 1000)
}

// 停止定时器
const stopPointDataTimer = () => {
  if (pointTimer.value) {
    clearInterval(pointTimer.value)
    pointTimer.value = null
  }
}

const initializeUsePoint = () => {
  usePoint = []
  for (let i = 1; i <= 15; i++) {
    usePoint.push(i)
  }
}

// 删除点测温数据方法
const handleDeletePoint = async (regionIndex) => {
  const id = selectedDevice.value.id
  if (id == 0) return

  const confirmResult = await proxy.$confirm('是否确认删除"P' + regionIndex + '"的点测温?', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
  if (confirmResult === 'confirm') {
    const res = await delPoint(id, regionIndex)
    if (res.code === 200) {
      usePoint.push(regionIndex) // 将删除的 regionIndex 添加到 usePoint 列表中
      usePoint.sort((a, b) => a - b) // 确保 usePoint 列表有序
      proxy.$message.success('删除成功')
    }
  }
}

// 处理设备选择变化
const handleDeviceChange = () => {
  isLoading.value = 1

  pointDataList.value = []

  localStorage.setItem('selectedDevice', JSON.stringify(selectedDevice.value))
  video.closeVideo(video)
  video = Video(proxy.$refs.videoRef, selectedDevice.value)

  // 清除设备温度
  equipmentTemp.value = {}
  equipmentTemp.value.groupName = selectedDevice.value.groupName

  // 初始化图表
  resetChart()
  getCharTemp()
}

/****
 * 从缓存中获取选中设备，没有缓存使用全部设备中的第一个
 * 有缓存数据，判断缓存设备是不是在在线设备中
 */
function getSelectedDevice(data) {
  equipmentList.value = data

  if (equipmentList.value.length === 0) {
    isLoading.value = 5
    netStatusText.value = '暂无设备'
    
    return false
  }

  const cache = JSON.parse(localStorage.getItem('selectedDevice'))
  if (cache && equipmentList.value.some((item) => item.id == cache.id && item.groupName == cache.groupName)) {
    selectedDevice.value = cache
    return true
  }

  selectedDevice.value = equipmentList.value[0]
  localStorage.setItem('selectedDevice', JSON.stringify(selectedDevice.value))

  return true
}

const netStatusText = ref(''); // 用来保存设备状态
const getOfflineText = async () => {
  const netStatusName = selectedDevice.value.name; // 获取设备名称
  // 构造查询参数
  const queryParams = {
    name: netStatusName, // 假设 query 参数中需要设备名称
    pageSize: 6,
    pageNum: 1          // 你想传递的另外一个值
  }

  // 调用接口获取数据
  const resCurrentEquipDat = await listData(queryParams);

  // 如果 resCurrentEquipDat.rows 有数据，并且找到匹配的设备
  if (resCurrentEquipDat.rows && resCurrentEquipDat.rows.length > 0) {
    // 查找匹配设备
    const device = resCurrentEquipDat.rows.find(item => item.name === netStatusName);

    if (device) {
      // 获取该设备的 netStatus
      const netStatus = device.netStatus;
      console.log('设备状态11111111111111111111：', netStatus);

      // 根据 netStatus 的值返回对应的文本
      return netStatus;
    } else {
      console.log('设备未找到');
      return '暂无设备';
    }
  } else {
    console.log('返回的数据为空');
    return '暂无设备';
  }
};


// 报警模块是否展示
const handleSwitchChange = (newValue) => {
  isRightTopVisible.value = newValue // 直接将v-model的新值赋给isRightTopVisible
  localStorage.setItem('isRightTopVisible', JSON.stringify(newValue))
}

const shouldShowRightTop = computed(() => {
  return window.innerWidth > 1024 ? isRightTopVisible.value : true
})

const getAllInfo = async () => {
  const infoRes = await getAllEquInfo()
  if (infoRes) Object.assign(allequipmentInfo, infoRes.data)
}

function resetChart() {
  // 重置图表选项
  chartOPtions = Object.assign({}, tempOptions)

  // 清空数据
  chartOPtions.series.forEach((series) => (series.data = []))
  chartOPtions.xAxis.data = []

  // 更新图表
  chart.setOption(chartOPtions)
}

watchEffect(async () => {
  if (isLoading.value === 5) {
    netStatusText.value = await getOfflineText();
     if (netStatusText.value === '在线') {
       isLoading.value = 1
     }
  }
})

onUnmounted(() => {
  useSettingsStore().changeNavbarOpen(true)
  if (video && video.videoRef) {
    video.closeVideo(video)
  }
  if (equipmentList.value.length == 0) return
  clearInterval(timer.value)
  chart.dispose() // 清理图表实例
  clearInterval(tempTimer.value)
  clearInterval(allEquInfoTimer.value)
  clearInterval(pointTimer.value)
  stopPointDataTimer()
  resetChart()
  window.removeEventListener('resize', chart.resize())
  chart.dispose()
})
</script>

<style lang="scss" scoped>
.echarts {
  width: 100%;
  height: 22vh;
  .chartContainer {
    background-color: rgb(24, 27, 31);
    border-radius: 5px;
    border: 1px solid rgba(204, 204, 220, 0.12);
    height: 100%;
    width: 100%;
  }
}
.offLineloading {
  position: absolute;
  top: 0;
  left: 0;
  height: 99%; /* 与video高度一致 */
  width: 100%;
  background-color: rgb(24, 27, 31);
  color: #ccccdc;
  font-size: 18px;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #2f3338;
  border-radius: 5px;
  z-index: 10;
  animation-timing-function: cubic-bezier(0.68, -0.55, 0.27, 1.55); /* 贝塞尔曲线参数 */
}

.yqlist > div {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 5px;
  justify-content: left;
  background: rgba(67, 67, 69, 0.3);
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0.8, 0.5, 0.8, 0.5); /* 添加阴影效果 */
  font-size: 16px;
  font-family: 微软雅黑;
  // color: #fff;
  font-weight: bold;
}

.pointDataTable thead {
  position: sticky;
  top: 0; /* 固定在顶部 */
  z-index: 1; /* 确保在其他内容之上 */
}

.bottomA::-webkit-scrollbar {
  width: 2px; /* 滚动条宽度 */
  height: 5px; /* 滚动条高度 */
}

.bottomA::-webkit-scrollbar-thumb {
  background-color: rgba(116, 113, 113, 0.2); /* 滚动条滑块颜色 */
  border-radius: 4px; /* 滚动条滑块圆角 */
}

.bottomA::-webkit-scrollbar-track {
  background-color: rgba(0, 0, 0, 0.1); /* 滚动条轨道背景色 */
  border-radius: 4px; /* 滚动条轨道圆角 */
}

.pointDataTable {
  width: 100%;
  border-collapse: separate;
}

.pointDataTable th,
.pointDataTable td {
  border: 1px solid rgba(204, 204, 220, 0.12);
  padding: 2px;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
}

.pointDataTable .pointDataItem td span {
  cursor: pointer;
}
.pointDataTable th {
  background-color: #25272b;
  color: #ccccdce6;
}

.pointDataItem:hover {
  background-color: rgba(204, 204, 220, 0.12); /* 悬浮时的背景颜色 */
}

.pointDataTable td:hover {
  outline: 1px solid rgb(110, 159, 255); /* 边框样式 */
  background-color: #15171a; /* 背景色 */
}
.highlighted-text {
  color: rgb(110, 159, 255);
}

.view-main {
  display: flex;
  width: 100%;
}

.box-A {
  width: 25%;
  display: flex;
  flex-direction: column;
  background: rgb(24, 27, 31);
  border: 1px solid #303133;
  border-radius: 5px;
  // margin-left: 8px
}

.bottomA {
  flex: 1; /* 自适应高度 */
  // background-color: lightgreen;
  overflow: auto; /* 如果内容超出，显示滚动条 */
  margin-bottom: 5px;
}

.box-B {
  width: 75%;
  display: flex;
  flex-direction: column;
  margin-left: 8px;
}

.topB {
  flex: 80%; /* 占 B 高度的 80% */
  display: flex;
  // margin-left: 8px;
}

.left-topB {
  height: 100%;
  width: 60%; /* 占 topB 的 60% */
  // background-color: lightcoral;
}

.right-topB {
  width: 40%; /* 占 topB 的 40% */
  height: calc(100% - 7px);
  margin-left: 8px;
  border-radius: 5px;
  transition: opacity 0.3s;
  background: rgb(24, 27, 31);
  border: 1px solid #303133;
  padding: 5px;
  // overflow: auto; /* 添加这一行 */
  display: flex;
  flex-direction: column; /* 垂直排列子元素 */
  overflow: hidden;
}

.bottom-box {
  /* 可以根据需要添加表格样式 */
  border: 1px solid #ccc; /* 表格边框 */
}

table {
  width: 100%; /* 表格宽度占满容器 */
  border-collapse: collapse; /* 合并表格边框 */
}

th,
td {
  border: 1px solid #ddd; /* 单元格边框 */
  padding: 8px; /* 单元格内边距 */
  text-align: left; /* 左对齐 */
}

th {
  background-color: #f2f2f2; /* 表头背景色 */
}

.left-topB-full {
  height: 100%;
  width: 100%; /* 当右侧隐藏 */
  transition: width 0.3s;
}

.bottomB {
  // margin-left: 8px;
  flex: 20%; /* 占 B 高度的 20% */
}

.el-switch__label * {
  color: #ccccdc;
  font-weight: bold;
}

.el-switch__label.is-active {
  color: #6e9fff;
}

.tableTitle {
  display: flex;
  align-items: center; /* 垂直居中对齐 */
}

.switch-label {
  margin-left: 20px; /* 给标签留一些间距 */
  margin-right: 10px; /* 给开关留一些间距 */
  color: #ccccdce6;
  font-size: 0.95em;
  font-weight: bold;
}

/* 媒体查询: 屏幕小于等于 1024px */
@media (max-width: 1024px) {
  .view-main {
    flex-direction: column; /* 换行 */
  }

  .box-A,
  .box-B {
    width: 100%; /* 宽度变为 100% */
    margin-left: 0;
    margin-top: 8px;
  }

  .topB {
    flex-direction: column; /* 上部换行为垂直 */
    flex: none; /* 清除先前的 flex 设置 */
  }

  .left-topB,
  .right-topB {
    width: 100%; /* 宽度变为 100% */
  }
  .right-topB {
    margin-left: 0;
  }
  .bottomB {
    margin-top: 8px;
  }
}

@media (max-width: 2048px) {
  .echarts {
    height: 28vh;
  }
}
</style>



// 点击按钮显示曲线
const showChart = async () => {
  chartOPtions = Object.assign({}, options)

  if (
    equipmentTemp.value.tempMax > -10 &&
    equipmentTemp.value.currentTime != undefined &&
    !chartOPtions.xAxis.data.includes(equipmentTemp.value.createTime)
  ) {
    chartOPtions.series[0].data.push(equipmentTemp.value.tempMin)
    chartOPtions.series[1].data.push(equipmentTemp.value.tempAvg)
    chartOPtions.series[2].data.push(equipmentTemp.value.tempMax)
    chartOPtions.xAxis.data.push(equipmentTemp.value.createTime)
  }
  chart.setOption(chartOPtions)

  //3s一次更新曲线图chartContainer
  timer.value = setInterval(() => {
    // 如果温度数据为负数或者设备组名不匹配，则不更新图表
    if (
      equipmentTemp.value.tempMax < -10 ||
      equipmentTemp.value.createTime === undefined ||
      selectedDevice.value.groupName !== equipmentTemp.value.groupName
    ) {
      return
    }
    // if (!equipmentTemp.value.tempMin || selectedDevice.value.groupName !== equipmentTemp.value.groupName) return
    //检查 createTime 是否已经存在于 xAxis.data
    if (!chartOPtions.xAxis.data.includes(equipmentTemp.value.createTime)) {
      chartOPtions.series[0].data.push(equipmentTemp.value.tempMin)
      chartOPtions.series[1].data.push(equipmentTemp.value.tempAvg)
      chartOPtions.series[2].data.push(equipmentTemp.value.tempMax)
      chartOPtions.xAxis.data.push(equipmentTemp.value.createTime)
    }
    //保持最新的 20 个数据点显示在图表中
    if (chartOPtions.xAxis.data.length > 20) {
      chartOPtions.series[0].data.shift()
      chartOPtions.series[1].data.shift()
      chartOPtions.series[2].data.shift()
      chartOPtions.xAxis.data.shift()
    }

    chart.setOption(chartOPtions)
  }, 3000)
}