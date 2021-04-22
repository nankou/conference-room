const base_url = ''

export default function myReqeust(params) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: base_url+params.url,
      method: params.method || 'get',
      data: params.data || {},
      success: resolve,
      fail: reject
    })
  })
}