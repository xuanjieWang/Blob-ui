import request from '@/utils/request'

export function list(params) {
  return request({
    url: '/ossImage/data/list',
    method: 'get',
    params: params
  })
}
