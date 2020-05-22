<template>
	<view class="container">
		<view class="conference">
			<view class="meetingList" v-for="item in meetingList" :key="item.id">
				<view class="roomID">会议室ID：{{item.meetingRoomId}}</view>
				<view class="name">{{item.meetingName}}</view>
				<view class="toUpdate" @click="toUpdate(item.startTime,item.id,item.meetingName,item.meetingRoomId,item.name,item.phone)">修改></view>
				<view class="button" @click="toUndo(item.id)">撤销预约</view>
			</view>
			<view class="isOver" v-if="isOver">---我已经到底啦---</view>
		</view>
		<view class="no" v-if="!flag">--没有待开的会议--</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				meetingList:[],
				flag:true,
				pageIndex:0,
				isOver:false
			}
		},
		onLoad() {
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
			//获取待开会列表
			getmeetingList(){
				var that = this;
				uni.request({
					url:'http://112.74.86.165:8082/meetingsMine',
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
			//撤销预约时间
			toUndo(id){
				var that = this;				
				console.log(id)
				console.log(that.token)
				uni.request({
					url:'http://112.74.86.165:8082/revocation',
					method:'PUT',
					data:{
						meetingId:id,
					},
					
					header:{
						Authorization:that.token,
						'content-type':"application/x-www-form-urlencoded"
					},
					success(res) {
						uni.navigateTo({
							url:'../../results/sUndo'
						})
					}
				})
				
			},
			//修改
			toUpdate(time,id,meetingName,meetingRoomId,name,phone){
				uni.navigateTo({
					url:'../update/update?id='+id+'&'+'meetingName='+meetingName+'&'+'meetingRoomId='+meetingRoomId+'&'+'phone='+phone+'&'+'name='+name+'&'+'time='+time
				})
			}
			
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
			margin-left: 10rpx;
			.isOver{
				text-align: center;
				color: #999999;
				margin-bottom: 20rpx;
			}
			.meetingList{
				width: 645rpx;
				height: 295rpx;
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
						margin-left: 120rpx;
					}
				}
				.toUpdate{
					font-size: 25rpx;
					float: right;
					color: #555555;
					margin-right: 20rpx;
				}
				.button{
					background-color: #fad3dd;
					margin-top: 64rpx;
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
