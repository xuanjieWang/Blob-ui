import request from '@/utils/request'

// 查询设备数据列表
export function test() {
  return request({
    url: '/blog/data/test',
    method: 'get'
  })
}

export function list() {
  return request({
    url: '/system/config/list',
    method: 'get'
  })
}
