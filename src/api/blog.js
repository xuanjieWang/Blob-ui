import request from '@/utils/request'

export function list(params) {
  return request({
    url: '/blog/data/list',
    method: 'get',
    params: params
  })
}

export function getBlog(id) {
  return request({
    url: '/blog/data/' + id,
    method: 'get'
  })
}
