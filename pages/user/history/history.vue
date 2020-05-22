<template>
	<view class="container">
		<view class="title">近一周的历史记录</view><br>
		<view class="historyList">
			<view class="conference">
				<view class="meetingList" v-for="item in meetingList" :key="item.id">
					<view class="roomID">
						会议室ID：{{item.meetingRoomId}}
						<view class="toApp" @click="toApp(item.meetingRoomId,item.startTime,item.endTime,item.meetingRoomNumber)">发起预约</view>
					</view>
					<view class="name">{{item.name}}</view>
					<view class="button" @click="toFeedback(item.meetingRoomId)">反馈意见</view>
				</view>
				<view class="isOver" v-if="isOver">---我已经到底啦---</view>
			</view>
		</view>
		<view class="no" v-if="!flag">--没有历史记录--</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				meetingList:[],
				flag:true,
				isRoom:false,
				pageIndex:0,
				isOver:false
			}
		},
		onReachBottom() {
			var that = this
			if(this.meetingList.length < this.pageIndex*5){
				this.isOver = true
			}
			console.log(this.meetingList.length)
			this.pageIndex++
			this.getHistory()
		},
		onLoad() {
			this.getToken()
		},
		methods: {
			//获取token
			getToken(){
				var that = this
				uni.getStorage({
					key:'token',	
					success: function (res) {
					that.token = res.data.token
					that.getHistory()
					},
				})
			},
			//获取历史记录
			getHistory(){
				var that = this;
				uni.request({
					url:'http://112.74.86.165:8082/history',
					method:'GET',
					data:{
						pagination:this.pageIndex,
						size:'5'
					},
					header:{
						Authorization:that.token 
					},
					success(res) {
						console.log(res.data.data.list)
						that.meetingList = [...that.meetingList,...res.data.data.list]
						if(that.meetingList.length == 0){
							that.flag = false
						}
					}
				})
			},
			//反馈
			toFeedback(roomId){
				console.log("会议室id为",roomId)
				console.log(this.isRoom)
				uni.navigateTo({
					url:'../feedback/feedback?isRoom='+this.isRoom
				})
			},
			//发起预约
			toApp(id,startTime,endTime,number){
				let timeArr = startTime.split(' ');
				let timeArray = endTime.split(' ');
				var date = timeArr[0]
				var starttime = timeArr[1]
				var endtime = timeArray[1]
				var fulltime = date+" "+starttime+"-"+endtime
				uni.navigateTo({
					url:'../../appointment/appointment?id='+id+'&'+'fulltime='+fulltime+'&'+'time='+starttime+'&'+'endtime='+endtime+'&'+'date='+date+'&'+'number='+number,
				})
			}
		}
	}
</script>

<style lang="scss">
	.container{
		.no{
			text-align: center;
			height: 1200rpx;
			padding: 30rpx;
			color: #808080;
		}
		background-color: #e1efff;
		.title{
			font-size: 25rpx;
			padding: 25rpx;
			margin-left: 40rpx;
			color: #808080;
		}
		.historyList{
			display: flex;
			justify-content: center;
		}
		.conference{
			margin-left: 10rpx;
			.meetingList{
				width: 645rpx;
				height: 255rpx;
				background-color: #FFFFFF;
				margin-top: 10rpx;
				margin-bottom: 60rpx;
				border-radius: 15rpx;
				.roomID{
					padding: 40rpx;
					display: flex;
					.toApp{
						font-size: 25rpx;
						color: #808080;
						margin-left: 200rpx;
					}
				}
				.name{
					padding-left: 40rpx;
					// padding-top: 15rpx;
					font-size: 29rpx;
					color: #696969;
				}
				.time{
					display: flex;
					font-size: 25rpx;
					color: #a1a1a1;
					padding-left: 40rpx;
					padding-top: 45rpx;
					.roomTime{
						margin-left: 120rpx;
					}
				}
				.button{
					background-color: #fad3dd;
					margin-top: 44rpx;
					height: 80rpx;
					border-bottom-left-radius: 15rpx;
					border-bottom-right-radius: 15rpx;
					color: #6d6668;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 28rpx;
				}
			}
		}
		.isOver{
			text-align: center;
			color: #999999;
			margin-bottom: 20rpx;
		}
	}
</style>
