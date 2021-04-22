<template>
	<view class="container">
		<view class="box1">
			<view class="content">
				<view class="name">{{name}}</view>
				<view class="description">
					<text class="text">{{desciption}}</text>
				</view>
				<view class="user">
					<text class="title">预约人：</text>
					<text class="text">{{user}}</text>
				</view>
				<view class="phone">
					<text class="title">联系电话：</text>
					<text class="text">{{phone}}</text>
				</view>
				<view class="note">
					<text class="title">备注信息：</text>
					<text class="text">{{note}}</text>
				</view>
				<view class="time">
					<text class="text">{{time}}</text>
				</view>
				<view class="button">会议室ID {{roomID}}</view>
			</view>
		</view>
		<view class="box2">
			<view class="equipment">
				<view class="computer" v-if="isComputer">
					<image class="computerImg" src="../../static/detail/computer.png"></image><br>
					<text class="text">电脑</text>
				</view>
				<view class="sound" v-if="isSound">
					<image class="soundImg" src="../../static/detail/sound.png"></image><br>
					<text class="text">音响</text>
				</view>
				<view class="projector" v-if="isProjector">
					<image class="projectorImg" src="../../static/detail/projector.png"></image><br>
					<text class="text">投影仪</text>
				</view>
				<view class="water" v-if="isWater">
					<image class="waterImg" src="../../static/detail/water.png"></image><br>
					<text class="text">饮水机</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isComputer:false,
				isSound:false,
				isProjector:false,
				isWater:false,
				name:'',
				desciption:'',
				user:'',
				phone:'',
				note:'',
				time:'',
				roomID:'',
				facility:'',
				text:''
			}
		},
		onLoad:function(option){
			console.log(option)
			this.id = option.id
			this.name = option.meetingName
			this.desciption = option.content
			this.user = option.name
			this.note = option.remark
			this.roomID = option.RoomId
			this.phone = option.phone
			var facility = option.facility
			let facilityArr = facility.split(',');
			var i;
			for(i=0;i<facilityArr.length;i++){
				if(facilityArr[i] == '电脑'){
					this.isComputer = true
					console.log("显示电脑")
				}
				if (facilityArr[i] == '音响'){
					this.isSound = true
					console.log("显示音响")
				}
				if (facilityArr[i] == '投影仪'){
					this.isProjector = true
					console.log("显示投影仪")
				}
				if (facilityArr[i] == '饮水机'){
					this.isWater = true
					console.log("显示饮水机")
				}
			}
			this.time = option.startTime +'~'+option.endTime
		},
		methods: {
			
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
		.box1{
			display: flex;
			justify-content: center;
		}
		.box2{
			display: flex;
		}
		.content{
			background-color: #FFFFFF;
			width: 600rpx;
			height: 600rpx;
			.name{
				text-align: center;
				padding: 40rpx;
				font-size: 40rpx;
			}
			.description{
				text-align: center;
				font-size: 28rpx;
				color: #505050;
				margin-bottom: 25rpx;
			}
			.user,.phone,.note,.time{
				display: flex;
				padding: 25rpx;
				color: #505050;
				font-size: 28rpx;
				margin-left: 30rpx;
			}
			.button{
				background-color: #fad3dd;
				height: 80rpx;
				margin-top: 50rpx;
				border-bottom-left-radius: 20rpx;
				border-bottom-right-radius: 20rpx;
				color: #6d6668;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 28rpx;
			}
		}
		.equipment{
			display: flex;
			background-color: #FFFFFF;
			margin-top: 200rpx;
			margin-left: 75rpx;
			width: 600rpx;
			image{
				width: 70rpx;
				height: 70rpx;
			}
			.computer,.sound,.projector,.water{
				padding: 32rpx;
			}
		}
	}
</style>
