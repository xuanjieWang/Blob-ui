import request from '@/utils/request'

export function list() {
  return request({
    url: '/ossImage/data/list',
    method: 'get'
  })
}
