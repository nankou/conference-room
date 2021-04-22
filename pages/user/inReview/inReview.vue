<template>
	<view class="container">
		<view class="review" v-if="flag">
			<view class="reviewList" v-for="item in reviewList" :key="item.id">
				<view class="roomID">会议室ID{{item.meetingRoomId}}</view>
				<view class="name">{{item.meetingName}}</view>
				<view class="time">{{item.startTime}}~{{item.endTime}}</view>
				<view class="buttons">
					<view class="undo" @click="undo(item.id)">撤销预约</view>
					<view class="update" @click="update(item.startTime,item.id,item.meetingName,item.meetingRoomId,item.name,item.phone)">修改预约时间</view>
				</view>
			</view>
			<view class="isOver" v-if="isOver">---我已经到底啦---</view>
		</view>
		<view class="no" v-if="!flag">--没有审核中的预约--</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				reviewList:[],
				flag:true,
				pageIndex:0,
				isOver:false
			}
		},
		onShow() {
			this.getToken()
		},
		onReachBottom() {
			var that = this
			if(this.reviewList.length < this.pageIndex*5){
				this.isOver = true
			}
			console.log(this.reviewList.length)
			this.pageIndex++
			this.getreviewList()
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
					that.getreviewList()
					},
				})
			},
			//撤销预约时间
			undo(id){
				var that = this;				
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
			//修改预约
			update(time,id,meetingName,meetingRoomId,name,phone){
				uni.navigateTo({
					url:'../update/update?id='+id+'&'+'meetingName='+meetingName+'&'+'meetingRoomId='+meetingRoomId+'&'+'phone='+phone+'&'+'name='+name+'&'+'time='+time
				})
			},
			//获取审核中列表
			getreviewList(){
				var that = this;
				uni.request({
					url:'http://112.74.86.165:8082/audit',
					method:'GET',
					data:{
						pagination:this.pageIndex,
						size:'5'
					},
					header:{
						Authorization:that.token
					},
					success(res) {
						that.reviewList = [...that.reviewList,...res.data.data.list]
						if(that.reviewList.length == 0){
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
		.no{
			height: 1200rpx;
			padding: 30rpx;
			color: #808080;
		}
		background-color: #e1efff;
		display: flex;
		justify-content: center;
		.reviewList{
			background-color: #FFFFFF;
			margin:50rpx;
			width: 645rpx;
			border-bottom-left-radius: 15rpx;
			border-bottom-right-radius: 15rpx;
			.roomID{
				padding: 20rpx;
				padding-left: 30rpx;
			}
			.name{
				padding: 20rpx;
				padding-left: 30rpx;
				color: #808080;
			}
			.time{
				margin-left: 170rpx;
				color: #C0C0C0;
				font-size: 26rpx;
				margin-top: 60rpx;
			}
			.buttons{
				height: 80rpx;
				display: flex;
				margin-top: 20rpx;
				.undo{
					height: 80rpx;
					width: 322.5rpx;
					background-color: #fad3dd;
					display: flex;
					justify-content: center;
					align-items: center;
					border-bottom-left-radius: 15rpx;
				}
				.update{
					height: 80rpx;
					width: 322.5rpx;
					background-color: #cef8f5;
					display: flex;
					justify-content: center;
					align-items: center;
					border-bottom-right-radius: 15rpx;
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
