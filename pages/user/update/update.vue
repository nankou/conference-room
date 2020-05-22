<template>
	<view class="container">
		<view class="update">
			<view class="roomID">会议室ID</view>
			<view class="time">
				<text class="title">请选择预约时间</text>
				<view class="option">
					<ms-dropdown-item v-model="value1" :list="list"></ms-dropdown-item>
				</view>
			</view>
			<view class="name">
				<text class="title">会议名称</text>
				<input class="nameValue" @input="nameInput" placeholder="请输入内容" placeholder-style="margin-left:10rpx"/>
			</view>
			<view class="content">
				<text class="title">会议内容</text>
				<input class="contentValue" @input="contentInput" placeholder="请输入内容" placeholder-style="margin-left:10rpx"/>
			</view>
			<view class="button" @click="update()">确认修改</view>
		</view>
	</view>
</template>

<script>
	import msDropdownMenu from '../../../components/ms-dropdown/dropdown-menu.vue'
	import msDropdownItem from '../../../components/ms-dropdown/dropdown-item.vue'
	
	export default {
		components: {
			msDropdownMenu,
			msDropdownItem
		},
		watch: {
		  value1() {
			  console.log(this.value1)
		  }
		},
		data() {
			return {
				 list: [
					{
						text: '09:00-11:00',
						value: 0
					},
					{
						text: '13:00-15:00',
						value: 1
					},
					{
						text: '15:30-17:30',
						value: 2
					}
					,
					{
						text: '19:00-21:00',
						value: 3
					}
				],
				 value1: 0,
				 date:'',
			}
		},
		onLoad:function(option){//opthin为object类型，会序列化上页面传递的参数
			console.log(option);//打印出上页面传递的参数
			var that = this
			var id = option.id
			var meetingRoomId = option.meetingRoomId
			var phone = option.phone
			var starttime = option.time
			let timeArr = starttime.split(' ');
			var date = timeArr[0]
			console.log(date)
			
			uni.setStorage({
				key:'date',
				data:{
					date:date,
					id:id,
					meetingRoomId:meetingRoomId,
					phone:phone,
				}
			})
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
			contentInput:function(event){
				this.content = event.target.value
			},
			//提交修改
			update(){
				var that = this
				if(this.name == undefined || this.content == undefined){
					uni.showToast({
						title:'内容不能为空，请重新输入!',
						icon:'none'
					})
				}else{
					uni.getStorage({
						key:'date',
						success(res) {
							var time = res.data.date
							var id = res.data.id
							var meetingRoomId = res.data.meetingRoomId
							var phone = res.data.phone
							that.toUp(time,id,meetingRoomId,phone)
						}
					})
				}
			},
			//请求接口
			toUp(time,id,meetingRoomId,phone){
				console.log(time)
				var that = this;
				console.log(time,id,meetingRoomId,phone,this.name ,this.content )
				if(this.value1 == 0){
					this.starttime = '09:00'
					this.endtime = '11:30'
					this.fulltime = '09:00-11:30'
				}
				else if(this.value1 == 1){
					this.starttime = '13:00'
					this.endtime = '15:00'
					this.fulltime = '13:00-15:00'
				}
				else if(this.value1 == 2){
					this.starttime = '15:30'
					this.endtime = '17:30'
					this.fulltime = '15:30-17:30'
				}else if(this.value1 == 3)
				{
					this.starttime = '19:00'
					this.endtime = '21:00'
					this.fulltime = '19:00-21:00'
				}
				var startTime = time+" "+this.starttime
				var endTime = time +" "+this.endtime
				uni.request({
					url:'http://112.74.86.165:8082/meeting',
					method:'POST',
					data:{
						content: this.content,
						endTime: endTime,
						id: id,
						meetingName: this.name,
						meetingRoomId: meetingRoomId,
						phone: phone,
						startTime: startTime,
					},
					header:{
						Authorization:that.token
					},
					success(res) {
						var title = res.data.message
						if(title == '请求成功'){
							uni.navigateTo({
								url:'../../results/sModify'
							})
						}else{
							uni.showToast({
								title:title,
								icon:'none'
							})
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
		display: flex;
		justify-content: center;
		padding-top: 50rpx;
		height: 1200rpx;
		.update{
			background-color: #FFFFFF;
			width: 645rpx;
			height: 600rpx;
			.roomID{
				padding: 25rpx;
				text-align: center;
				font-size: 40rpx;
			}
			.time{
				display: flex;
				align-items: center;
				margin-left: 50rpx;
				font-size: 25rpx;
				.option{
					margin-left: 80rpx;
				}
			}
			.name,.content{
				display: flex;
				align-items: center;
				margin-left: 50rpx;
				font-size: 25rpx;
				margin-bottom: 25rpx;
				input{
					border: 1rpx #999999 solid;
					margin-left: 175rpx;
					width: 200rpx;
				}
				.contentValue{
					height: 200rpx;
				}
			}
			.button{
				background-color: #fad3dd;
				height: 80rpx;
				margin-top: 70rpx;
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
