import request from '@/utils/request'

export function listComm(params) {
  return request({
    url: '/comm/data/listComm',
    method: 'get',
    params: params
  })
}

export function addComm(data) {
  return request({
    url: '/comm/data/addComm',
    method: 'post',
    data: data
  })
}
