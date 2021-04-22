<template>
	<view class="container">
		<view class="personal">
			<button @click="toadress()">点击跳转</button>
			<view class="wxBox" v-if="flag">
				<view class="imgBox">
						<open-data type="userAvatarUrl" class="avatarUrl"></open-data>
				</view>
				<view class="nameBox">
						<open-data class="nickName" type="userNickName"></open-data>
				</view>
			</view>
			<view class="getSetting" v-else>
					<button
					class="sys_btn" 
					open-type="getUserInfo" 
					lang="zh_CN" @getuserinfo="appLoginWx">
					{{loginInfo.openid != "" 
					&& loginInfo.openid != undefined ? "已授权" : "登录"}}</button>
			</view>
			<view class="id" v-if ="flag">
				<image class="setImg" src="../../static/user/setting.png" @click="edit"></image><br>
			</view>
		</view>
		<view class="myAppointment">
			<text class="title">我的会议室预约</text>
			<view class="myapp">
				<view class="Box">
					<view class="box" @click="toReview">
						<image class="img" src="../../static/user/examine.png"></image><br>
						<text class="text">审核中</text>
					</view>
					<view class="box" @click="toMetting">
						<image class="img" src="../../static/user/meeting.png"></image><br>
						<text class="text">待开会</text>
					</view>
					<view class="box" @click="toHistory">
						<image class="img1" src="../../static/user/history.png"></image><br>
						<text class="text">历史记录</text>
					</view>
				</view>
			</view>
		</view>
		<view class="Feedback">
			<view class="box" @click="toSfeedback">
				<image class="img" src="../../static/user/opinion.png"></image>
				<text class="text">意见反馈</text>
			</view>
		</view>
	</view>
	
</template>

<script>
	import WXAPI from '../../wxapi/wxapi.js'
	import AUTH from '../../wxapi/auth.js'
	
	export default {
		data() {
			return {
				avatarUrl:'',
				nickName:'',
				id:'',
				flag:false
			}
		},
		onLoad() {
			
			//判断登录态是否过期
			AUTH.checkHasLogined().then(isLogined => {
				this.flag = isLogined
			      if (isLogined) {
					  console.log(isLogined)
			      }
				  else{
					  console.log("未登录")
				  }
			})	
			//判断用户是否授权
			AUTH.checkAndAuthorize().then(isAuthor => {})
		},
		methods: {
			//测试跳转
			toadress(){
				uni.navigateTo({
					url:'../adress_add/adress_add'
				})
			},
			//微信授权登录获取
			appLoginWx(){
				// #ifdef MP-WEIXIN
				var _this = this
				_this.flag = true
					uni.getProvider({
					  service: 'oauth',
					  success: function (res) {
					  if (~res.provider.indexOf('weixin')) {
						  AUTH.wxaCode().then(code =>{
							  AUTH.getUserInfo().then(info =>{
							      var that = this
								  console.log(info)
								  var nickName = info.userInfo.nickName
								  var icon = info.userInfo.avatarUrl
									var data = {
										code:code,
										nickName: nickName,
										icon:icon 
									}
									console.log(data)
									 WXAPI.wxlogin(data).then(function (result) {
										console.log(result.data)
										 if(result.data.companyId == ''){
											 uni.showToast({
												title:'登录成功，请先编辑个人信息',
												icon:'none'
											 })
											 uni.navigateTo({
												url:'./edit'
											 })
										 }else{
											 var that = this
											 uni.setStorage({
												key:'token',
												data:{
													token: result.data.token,
													nickName:nickName,
													icon:icon,
													name: result.data.name,
													sex: result.data.sex,
													phone: result.data.phone,
													companyId: result.data.companyId,
												},
											 })
										 }
									})
									
								})
						  })
						  }
						else{
							uni.showToast({
								title: '请先安装微信或升级版本',
								icon:"none"
							});
						}
					  }
					});
					//#endif
				},
			
			//编辑个人资料
			edit(){
				uni.navigateTo({
					url:'./edit'
				})
			},
			//跳转到审核中
			toReview(){
				uni.navigateTo({
					url:'./inReview/inReview'
				})
			},
			//跳转到待开会
			toMetting(){
				uni.navigateTo({
					url:'./toBeHold/toBeHold'
				})
			},
			//跳转到历史记录
			toHistory(){
				uni.navigateTo({
					url:'./history/history'
				})
			},
			//提交反馈
			toSfeedback(){
				uni.navigateTo({
					url:'./feedback/feedback'
				})
			}
		}
	}
</script>

<style lang="scss">
	.container{
		background-color: #e1efff;
		height: 1140rpx;
		.personal{
			display: flex;
			height: 250rpx;
			background-color: #FFFFFF;
			border-bottom-left-radius: 60rpx;
			border-bottom-right-radius: 60rpx;
			margin-bottom: 40rpx;
			.wxBox{
				display: flex;
				align-items: center;
				padding: 20rpx;
				padding-left: 40rpx;
				.imgBox{
					width: 140rpx;
					height: 140rpx;
					border-radius: 70rpx;
					overflow:hidden;
				}
				.avatarUrl{
					width: 140rpx;
					height: 140rpx;
					border-radius: 70rpx;
				}
				open-data{
					 width: 140rpx;
					 height: 140rpx;
					 border-radius: 70rpx;
				}
				.nameBox{
					padding: 10rpx;
				}
				.nickName{
					padding: 10rpx;
				}
			}
			.getSetting{
				button{
					background-color: #e1efff;
					color: #999999;
					height: 80rpx;
					width: 200rpx;
				}
				margin-left: 100rpx;
				margin-top:80rpx
				
				
			}
			.id{
				.setImg{
					width: 45rpx;
					height: 45rpx;
					padding-top: 50rpx;
					padding-left: 250rpx;
					padding-bottom: 50rpx;
				}
				.enterprise{
					padding-left: 200rpx;
					color: #808080;
					font-size: 27rpx;
					padding-top: 25rpx;
				}
			}
			
		}
		.myAppointment{
			.title{
				padding: 35rpx;
				font-size: 29rpx;
				font-weight: 500;
			}
			.myapp{
				width: 700rpx;
				height: 150rpx;
				background-color: #FFFFFF;
				display: flex;
				margin-left: 20rpx;
				margin-top: 20rpx;
				.Box{
					display: flex;
					align-items: center;
					.box{
						padding: 71rpx;
						justify-content: center;
						.img{
							width: 60rpx;
							height: 60rpx;
							padding-left: 15rpx;
						}
						.img1{
							width: 60rpx;
							height: 60rpx;
							padding-left: 22rpx;
						}
						.text{
							font-size: 28rpx;
							color: #808080;
						}
					}
				}
				
			}
		
			
		}
		.Feedback{
			margin-left: 20rpx;
			margin-top: 30rpx;
			.box{
				width: 700rpx;
				height: 100rpx;
				background-color: #FFFFFF;
				display: flex;
				align-items: center;
				.img{
					width: 40rpx;
					height: 40rpx;
					padding: 20rpx;
					margin-left: 30rpx;
				}
				.text{
					font-size: 28rpx;
					color: #808080;
				}
			}
		}
	}
</style>
