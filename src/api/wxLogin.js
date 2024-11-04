import request from '@/utils/request'

export function getQrCode() {
  return request({
    url: '/wx/qrCode',
    method: 'get'
  })
}

export function checkLogin(eventKey) {
  return request({
    url: '/wx/checkLogin/' + eventKey,
    method: 'get'
  })
}
