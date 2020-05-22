<template>
	<view class="container">
		<view class="box">
			<view class="meeting" v-for="item in remind" :key="item">
				<image class="meetingImg" src="../../static/message/meeting.png"></image>
				<view class="content">
					<text class="title">开会提醒</text><br>
					<text class="text">您申请的{{item.StartTime}}~{{item.endTime}}时间段的{{item.meetingName}} {{item.distance}}小时后即将开会</text>
				</view>
			</view>
			<view class="adopt" v-for="titem in pass" :key="titem">
				<image class="adoptImg" src="../../static/message/adopt.png"></image>
				<view class="content">
					<text class="title">申请通过</text><br>
					<text class="text">您申请的{{titem.StartTime}}~{{titem.endTime}}时间段的{{titem.meetingName}}已经通过</text>
				</view>
			</view>
			<view class="sign" v-for="litem in signIn" :key="litem" @click="toSign(litem.meetingId)">
				<image class="signImg" src="../../static/message/sign.png"></image>
				<view class="content">
					<text class="title">签到提醒</text><br>
					<text class="text">{{litem.meetingName}}会议即将开始 请尽快完成签到</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				remind:[],
				pass:[],
				signIn:[]
			}
		},
		onShow() {
			this.getToken()
		},
		methods: {
			//跳转签到
			toSign(meetingId){
				uni.navigateTo({
					url:'./sign/sign?meetingId='+meetingId
				})
			},
			//获取token
			getToken(){
				var that = this
				uni.getStorage({
					key:'token',	
					success: function (res) {
					that.token = res.data.token
					that.getDetail()
					},
				})
			},
			//获取消息列表
			getDetail(){
				var that = this;
				uni.request({
					url:'http://112.74.86.165:8082/message',
					method:'GET',
					header:{
						Authorization:that.token
					},
					success(res) {
						console.log(res)
						that.remind = res.data.data.remind
						that.pass = res.data.data.pass
						that.signIn = res.data.data.signIn
					},		
				})
			}
		}
	}
</script>

<style lang="scss">
	.container{
		background-color: #e1efff;
		height: 1150rpx;
		image{
			width: 50rpx;
			height: 50rpx;
			padding: 30rpx;
		}
		.meeting,.adopt,.sign{
			display: flex;
			align-items: center;
			background-color: #FFFFFF;
			border-bottom: 1rpx #C0C0C0 solid;
			padding: 10rpx;
			.content{
				width: 600rpx;
			}
			.text{
				font-size: 25rpx;
				color: #808080;
			}
		} 
		.sign{
			border-bottom: 1rpx #FFFFFF solid;
		}
	}
</style>
