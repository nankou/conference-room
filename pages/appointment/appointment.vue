<template>
	<view class="container">
		<view class="content">
			<view class="title">会议室：{{number}}</view>
			<view class="time">
				<text class="text">预约时间</text>
				<text class="timeValue">{{fulltime}}</text>
			</view>
			<view class="name">
				<text class="text">会议名称</text>
				<input class="nameValue" @input="nameInput" placeholder="请输入内容" placeholder-style="margin-left:10rpx"/>
			</view>
			<view class="phone">
				<text class="text">联系电话</text>
				<input class="phoneValue" @input="phoneInput" type="number"/>
			</view>
			<view class="description">
				<text class="text">会议内容</text>
				<input class="descriptionValue" @input="descriptionInput"/>
			</view>
			<view class="button" @click="toAppointment()">立刻预约</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:'',
				fulltime:'',
				number:''
			}
		},
		onLoad:function(option){//option为object类型，会序列化上页面传递的参数
			this.id = option.id
			this.number = option.number
			this.time = option.time
			this.endtime = option.endtime
			this.date = option.date
			this.fulltime = option.fulltime
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
					},
				})
			},
			//获取输入框输入框值
			nameInput:function(event){
				this.name = event.target.value
			},
			phoneInput:function(event){
				this.phone = event.target.value
			},
			descriptionInput:function(event){
				this.desciption = event.target.value
			},
			//点击预约按钮
			toAppointment(){
					if(this.name == undefined  || this.phone == undefined || this.desciption == undefined){
					uni.showToast({
					    title: '输入内容不能为空',
					    icon:"none"
					});
				}
				else{
					var that = this;
					var startTime = this.date +" "+this.time
					var endTime = this.date +" "+this.endtime
					uni.request({
						url:'http://112.74.86.165:8082/meeting',
						method:'POST',
						data:{
							content: this.desciption,
							endTime: endTime,
							meetingName: this.name,
							meetingRoomId: this.id,
							phone: this.phone,
							startTime: startTime
						},
						header:{
							Authorization:that.token
						},
						success(res) {
							console.log(res.data.code)
							if(res.data.code == 200){
								uni.navigateTo({
									url:'../results/sAppointment'
								})
							}else{
								uni.showToast({
									title:res.data.message,
									icon:'none'
								})
							}
							
						},
						fail() {
							uni.navigateTo({
								url:'../results/fAppointment'
							})
						}
					})
					
				}
			}
		}
	}
</script>

<style lang="scss">
	input{
		border: 1rpx #e0e0e0 solid;
		border-radius: 5rpx;
		margin: 10rpx;
	}
	.container{
		background-color: #e1efff;
		height: 1200rpx;
		margin: 0;
		padding-top: 50rpx;
		display: flex;
		justify-content: center;
		.content{
			background-color: #FFFFFF;
			width: 600rpx;
			height: 600rpx;
			.title{
				text-align: center;
				padding: 40rpx;
				font-size: 40rpx;
			}
			.name,.user,.phone,.description,.time{
				display: flex;
				align-items: center;
				font-size: 25rpx;
				color: #7b7b7b;
				margin-top: 15rpx;
			}
			.text{
				margin-left: 50rpx;
			}
			.timeValue,.nameValue,.userValue,.phoneValue,.descriptionValue{
				margin-left: 70rpx;
			}
			.descriptionValue{
				height: 200rpx;
				margin-bottom: 25rpx;
			}
			.button{
				background-color: #fad3dd;
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
</style>
