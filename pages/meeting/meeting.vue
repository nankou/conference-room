<template>
	<view class="container">
		<view class="conference">
			<view class="meetingList" v-for="item in meetingList" :key="item.id">
				<view class="roomID">会议室ID：{{item.meetingRoomId}}</view>
				<view class="name">{{item.meetingName}}</view>
				<view class="time">
					<text class="text">会议时间</text>
					<text class="roomTime">{{item.startTime}}-{{item.endTime}}</text>
				</view>
				<view class="button" @click="toDetail(item.id,item)">查看详情</view>
			</view>
			<view class="isOver" v-if="isOver">---我已经到底啦---</view>
		</view>
		<view class="no" v-if="!hasMe">--没有我的会议--</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				meetingList:[],
				hasMe:true,
				pageIndex:0,
				isOver:false
			}
		},
		onShow() {
			this.getToken()
		},
		onReachBottom() {
			var that = this
			if(this.meetingList.length < this.pageIndex*5){
				this.isOver = true
			}
			console.log(this.meetingList.length)
			this.pageIndex++
			this.getmeetingList()
		},
		methods: {
			//获取token
			getToken(){
				var that = this
				uni.getStorage({
					key:'token',	
					success: function (res) {
					that.token = res.data.token
					that.getmeetingList()
					},
				})
			},
			// 获取空闲会议室列表
			getmeetingList(){
				var that = this;
				var page = this.current -1
				var startTime = this.date+" "+this.time
				uni.request({
					url:'http://112.74.86.165:8082/meetingsMine',
					method:'GET',
					data:{
						pagination:this.pageIndex,
						size:'5',
					},
					header:{
						Authorization:that.token
					},
					success(res) {
						that.meetingList = [...that.meetingList,...res.data.data.list]
						if(that.meetingList.length > 5){
							that.flag = true
						}else if (that.meetingList.length == 0){
							that.hasMe = false
						}
					}
				})
			},
			//会议详情
			toDetail(id,item){
				this.meetingName = item.meetingName
				this.content = item.content
				this.name = item.name
				this.phone = item.phone
				this.remark = item.remark
				this.startTime = item.startTime
				this.endTime = item.endTime
				this.RoomId = item.meetingRoomId
				this.facility = item.facility
				uni.navigateTo({
					url:'../detail/detail?id='+id+'&'+'RoomId='+this.RoomId+'&'+'meetingName='+this.meetingName+'&'+'content='+this.content+'&'+'name='+this.name+'&'+'phone='+this.phone+'&'+'remark='+this.remark+'&'+'endTime='+this.endTime+'&'+'startTime='+this.startTime+'&'+'facility='+this.facility
				})
			},
			
		}
	}
</script>

<style lang="scss">
	.container{
		.no{
			height: 1200rpx;
			padding: 30rpx;
			color: #808080;
		}
		background-color: #e1efff;
		display: flex;
		justify-content: center;
		padding-bottom: 40rpx;
		.conference{
			.isOver{
				text-align: center;
				color: #999999;
				margin-bottom: 20rpx;
			}
			margin-left: 10rpx;
			.meetingList{
				width: 645rpx;
				height: 355rpx;
				background-color: #FFFFFF;
				margin-top: 40rpx;
				border-radius: 15rpx;
				.roomID{
					padding: 40rpx;
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
						margin-left: 20rpx;
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
		
	}
	
</style>
