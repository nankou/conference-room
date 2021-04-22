<script>
	import WXAPI from './wxapi/wxapi.js'
	import AUTH from './wxapi/auth.js'
	
	export default {
		onLaunch: function() {
			console.log('App Launch')
			   /**
				 * 初次加载判断网络情况
				 * 无网络状态下根据实际情况进行调整
				 */
				wx.getNetworkType({
					success(res) {
						const networkType = res.networkType
						console.log("当前网络为"+networkType)
						if (networkType === 'none') {
							that.globalData.isConnected = false
							wx.showToast({
								title: '当前无网络',
								icon: 'loading',
								duration: 2000
							})
						}
					}
				});
				  /**
				 * 监听网络状态变化
				 * 可根据业务需求进行调整
				 */
				wx.onNetworkStatusChange(function(res) {
					console.log(res.isConnected)
					if (!res.isConnected) {
						that.globalData.isConnected = false
						wx.showToast({
							title: '网络已断开',
							icon: 'loading',
							duration: 2000
						})
					} else {
						that.globalData.isConnected = true
						wx.hideToast()
					}
				})
		},
		onShow: function() {
			console.log('App Show')
			// 自动登录
			// AUTH.checkHasLogined().then(async isLogined => {
			// 	if (!isLogined) {
			// 		AUTH.login()
			// 	} else {
			// 		AUTH.getUserInfo().then((res) => {
			// 			const { userInfo } = res
			// 			// 更新用户信息
			// 			WXAPI.modifyUserInfo({
			// 				avatarUrl: userInfo.avatarUrl,
			// 				city: userInfo.city,
			// 				nick: userInfo.nickName,
			// 				province: userInfo.province,
			// 				token: wx.getStorageSync('token')
			// 			})
			// 		})
			// 	}
			// })
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
