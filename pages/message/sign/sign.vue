<template>
	<view class="container">
		<view class="sign" @click="getToken()" v-if="flag">
			<view class="text">签到</view>
		</view>
		<view class="success" v-if="!flag">
			<image src="../../../static/result/sModify.png"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				flag:true
			}
		},
		onLoad:function(option){
			this.meetingId = option.meetingId
			
		},
		methods: {
			//获取token
			getToken(){
				var that = this
				uni.getStorage({
					key:'token',	
					success: function (res) {
					that.token = res.data.token
					console.log(that.token)
					that.sign(that.token)
					},
				})
			},
			//签到
			sign(token){
				var that = this
				console.log(this.meetingId)
				uni.request({
					url:'http://112.74.86.165:8082/signIn',
					method:'PUT',
					data:{
						"meetingId": this.meetingId
						
					},
					header:{
						Authorization:token,
						'content-type':"application/x-www-form-urlencoded"
					},
					success(res) {
					console.log(res)
					if(res.data.isok == true){
						uni.showToast({
							title:'签到成功',
							icon:'none'
						})
						that.flag = false
					}
					}
				})
				
				
			}
		}
	}
</script>

<style lang="scss">
	.container{
		background-color: #e1efff;
		padding: 200rpx;
		height: 1200rpx;
		display: flex;
		justify-content: center;
		.sign{
			background-color: #e75776;
			color: #fff;
			width: 180rpx;
			height: 180rpx;
			border-radius: 90rpx;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		image{
			width: 180rpx;
			height: 180rpx;
		}
	}
</style>
