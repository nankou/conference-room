<template>
	<view class="container">
		<view class="title">会议室预约</view>
		<view class="content">
			<view class="searchBox">
				<view class="date">
					<picker class="picker" mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange" @cancel="cancelDateChange">
						<view class="uni-input">{{date}}
						<image src="../../static/index/date.png" class="dateImg"></image>
						</view>
					</picker>
				</view>
				<view class="time">
					<picker class="picker" @change="bindPickerChange" :value="index" :range="array">
						<view class="uni-input">{{array[index]}}
						<view class="imgBox"><image src="../../static/index/time.png" class="timeImg"></image></view>
						</view>
					</picker>
				</view>
				<view class="search" @click="getconferenceList">
					<image class="searchImg" src="../../static/index/search.png"></image>
				</view>
			</view>
			
			<text class="tagging">空闲会议室</text>
			<view class="conference">
				<view class="conferenceList" v-for="item in conferenceList" :key="item.id">
					<view class="roomID">会议室：{{item.number}}</view>
					<view class="text">该会议室空闲，可预约</view>
					<view class="button" @click="toAppointment(item.id,item.number)">立刻预约</view>
				</view>
			</view>
			<view class="isOver" v-if="isOver">---我已经到底啦---</view>
		</view>
		<view class="no" v-if="!hasMe">--该时间段没有空闲会议室--</view>
	</view>
</template>

<script>
	
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				date: currentDate,
				array: ['09:00-11:30', '13:00-15:00', '15:30-17:30', '19:00-21:00'],
				index: 0,
				conferenceList:[],
				current:'1',
				flag:false,
				time:'09:00',
				endtime:'11:30',
				fulltime:'09:00-11:30',
				token:'',
				hasMe:true,
				number:'',
				pageIndex:0,
				isOver:false
			}
		},
		onShow() {
			this.getToken()
			
		},
		onReachBottom() {
			var that = this
			if(this.conferenceList.length < this.pageIndex*5){
				this.isOver = true
			}
			console.log(this.conferenceList.length)
			this.pageIndex++
			this.getconferenceList()
		},
		//时间选择
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		    },
		methods: {
			//获取token
			getToken(){
				var that = this
				uni.getStorage({
					key:'token',	
					success: function (res) {
					that.token = res.data.token
					that.getconferenceList()
					},
				})
			},
			// 获取空闲会议室列表
			getconferenceList(){
				var that = this;
				var page = this.current -1
				var startTime = this.date+" "+this.time
				uni.request({
					url:'http://112.74.86.165:8082/meetingRoomSpare',
					method:'GET',
					data:{
						pagination:this.pageIndex,
						size:'5',
						startTime:startTime
					},
					header:{
						Authorization:that.token
					},
					success(res) {
						console.log(res)
						that.conferenceList = [...that.conferenceList,...res.data.data.list]
						if(that.conferenceList.length > 5){
							that.flag = true
						}else if (that.conferenceList.length == 0){
							that.hasMe = false
						}
					}
				})
			},
			//分页
			pagination:function(e){
				console.log(e)
			},
			//日期选择
			bindDateChange: function(e) {
				this.date = e.target.value
				console.log(this.date)
				
			},
			//取消日期选择
			cancelDateChange:function(e){
				console.log(e)
			},
			//时间段选择
			bindPickerChange: function(e) {
				this.index = e.target.value
				if(this.index == 0){
					this.time = '09:00'
					this.endtime = '11:30'
					this.fulltime = '09:00-11:30'
				}
				else if(this.index == 1){
					this.time = '13:00'
					this.endtime = '15:00'
					this.fulltime = '13:00-15:00'
				}
				else if(this.index == 2){
					this.time = '15:30'
					this.endtime = '17:30'
					this.fulltime = '15:30-17:30'
				}else 
				{
					this.time = '19:00'
					this.endtime = '21:00'
					this.fulltime = '19:00-21:00'
				}
				
			},
			//日期格式
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			//预约会议室
			toAppointment(id,number){
				var fullTime = this.date+" "+this.fulltime
				var time = this.time
				var endtime = this.endtime
				var date = this.date
				uni.navigateTo({	
					url:'../appointment/appointment?id='+id+'&'+'fulltime='+fullTime+'&'+'time='+time+'&'+'endtime='+endtime+'&'+'date='+date+'&'+'number='+number,
				})
			}
		}
	}
</script>

<style lang="scss">
	.container{
		.no{
			height: 800rpx;
			padding: 30rpx;
			text-align: center;
			color: #999999;
		}
		background-color: #e1efff;
		.title{
			background-color: #FFFFFF;
			font-size: 35rpx;
			font-weight: 600;
			padding: 25rpx;
			font-family:PingFangSC;
			font-style:normal;
			padding-left: 25rpx;
		}
		.content{
			padding-bottom: 30rpx;
			.tagging{
				font-size: 25rpx;
				padding: 15rpx;
				padding-left: 53rpx;
				color: #6b6b6b;
			}
			.searchBox{
				display: flex;
				align-items: center;
				padding-left: 20rpx;
				.searchImg{
					width: 35rpx;
					height:35rpx;
					margin-left: 10rpx;
				}	
			}
			.date,.time{
				width: 300rpx;
				height: 50rpx;
				background-color: #FFFFFF;
				margin: 10rpx;
				margin-top: 40rpx;
				margin-bottom: 40rpx;
				display: flex;
				align-items: center;
				border-radius: 10rpx;
				.picker{
					display: flex;
					.uni-input{
						display: flex;
						align-items: center;
						font-size: 22rpx;
						color: #6d6d6d;
						padding-left: 20rpx;
						.dateImg,{
							width: 23rpx;
							height: 23rpx;
							padding: 16rpx;
							margin-left: 90rpx;
						}
						.timeImg{
							width: 23rpx;
							height: 23rpx;
							padding: 16rpx;
							margin-left: 102rpx;
						}
					}
					
				}
				
			}
			
			.conference{
				margin-left: 10rpx;
				.conferenceList{
					width: 645rpx;
					height: 335rpx;
					background-color: #FFFFFF;
					margin: 40rpx;
					border-radius: 15rpx;
					.roomID{
						padding: 40rpx;
					}
					.text{
						padding-left: 40rpx;
						padding-top: 15rpx;
						font-size: 25rpx;
						color: #a1a1a1;
					}
					.button{
						background-color: #fad3dd;
						margin-top: 100rpx;
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
	}
</style>
