<template>
	<view class="container">
		<view class="Box">
			<view class="box">
				<image class="img" src="../../static/result/sApponitment.png"></image>
			</view><br>
			<view class="box">
				<text class="text1">等待处理</text>
			</view><br>
			<view class="box2">
				<text class="text2">已提交申请，等待后台审核处理</text>
			</view><br>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss">
	.container{
		background-color: #e1efff;
		height: 1230rpx;
		.box{
			background-color: #FFFFFF;
			text-align: center;
			line-height: 70rpx;
		}
		.box2{
			border-bottom: 1rpx #C0C0C0 solid;
			padding-bottom: 25rpx;
			background-color: #FFFFFF;
			text-align: center;
			line-height: 70rpx;
		}
		.img{
			width: 130rpx;
			height: 130rpx;
			padding-top: 100rpx;
			padding-bottom: 20rpx;
		}
		.text1{
			font-size: 32rpx;
			padding: 10rpx;
		}
		.text2{
			color: #6c6c6c;
			padding: 10rpx;
			font-size: 26rpx;
		}
	}
</style>
