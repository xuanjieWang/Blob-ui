import request from '@/utils/request'

export function list(params) {
  return request({
    url: '/blog/data/list',
    method: 'get',
    params: params
  })
}
