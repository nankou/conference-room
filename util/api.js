const base_url = '12.74.86.165'

export const myRequest = (options) =>{
	return new Promise((resolve,reject)=>{
		uni.request({
			url:base_url + options.url,
			method:options.method || 'GET',
			data:options.data || {},
			success: (res) => {
				if(res.data.status !== 0){
					return uni.showToast({
						title:'获取数据失败'
					})
				}
				resolve(res)
			},
			fail: (err) => {
				uni.showToast({
					title:'请求接口失败'
				})
				reject(err)
			}
		})
	})
}