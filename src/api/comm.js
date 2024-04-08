import request from '@/utils/request'

export function listComm(id) {
  return request({
    url: '/comm/data/' + id,
    method: 'get'
  })
}

export function addComm(data) {
  return request({
    url: '/comm/data/addComm',
    method: 'put',
    data: data
  })
}
