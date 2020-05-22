<template>
	<view class="container">
		<view class="feedback">
			<view class="input">
				<textarea class="content" @input="Input"  placeholder-style="color:#C0C0C0;margin-left:20rpx" placeholder="请输入内容"/>
			</view><br>
		</view>
		<view class="toSfeedback">
			<view class="button" @click="toSfeedback">提交反馈</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isRoom:true
			}
		},
		onShow() {
			this.getToken()
		},
		onLoad:function(option){
			if(option.isRoom){
				this.isRoom = false
			}
		},
			
		methods: {
			//输入框
			Input:function(event){
				this.content = event.target.value
			},
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
			//提交反馈
			toSfeedback(){
				var that = this;
				if(this.content == undefined){
					uni.showToast({
						title:'输入内容不能为空！',
						icon:'none'
					})
				}else{
					uni.request({
						url:'http://112.74.86.165:8082/feedback',
						method:'POST',
						data:{
							"content": this.content,
							"type": this.isRoom
						},
						header:{
							Authorization:that.token
						},
						success(res) {
						console.log(res)
							uni.showToast({
								title:'提交成功',
							})
						setTimeout(function() {
						       uni.switchTab({
						       	url:'../user'
						       })
						    },1000);
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.container{
		background-color: #e1efff;
		height: 1220rpx;
		.feedback{
			display: flex;
			justify-content: center;
			.input{
				background-color: #FFFFFF;
				margin-top: 40rpx;
				.content{
					padding: 20rpx;
					height: 400rpx;
					width: 600rpx;
					border: 1rpx #C0C0C0 solid;
				}
			}
		}
		.toSfeedback{
			display: flex;
			justify-content: center;
		}
		.button{
			background-color: #fad3dd;
			margin-top: 44rpx;
			height: 80rpx;
			width: 640rpx;
			border-radius: 15rpx;
			color: #6d6668;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 28rpx;
		}
	}
</style>
