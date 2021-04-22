<template>
	<view class="container">
		<view class="imgBox">
			<view class="img">
				<open-data type="userAvatarUrl" class="avatarUrl"></open-data>
			</view>
		</view>
		<view class="nickName">
			<text class="title">昵称</text>
			<open-data class="text" type="userNickName"></open-data>
		</view>
		<view class="edit">
			<view class="name">
				<text class="title">姓名</text>
				<input class="input"  v-model="name" @input="nameInput" placeholder="输入姓名"/>
			</view>
			<view class="phone">
				<text class="title">电话</text>
				<input class="input" v-model="phone" @input="phoneInput" placeholder="输入电话"/>
			</view>
			<view class="gender">
				<text class="title">性别</text>
				<input class="input" v-model="gender" @input="genderInput" placeholder="输入性别"/>
			</view>
			<view class="ID">
				<text class="title">绑定企业ID</text>
				<input class="input" v-model="ID" @input="IDInput" placeholder="输入企业ID"/>
			</view>
		</view>
		<view class="buttonBox">
			<view class="button" @click="toEdit">立即保存</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				avatarUrl:'',
				nickName:'',
				icon:'',
				name:'',
				phone:'',
				gender:'',
				ID:''
				
			}
		},
		onLoad() {
			var that = this
			uni.getStorage({
				key:'token',
				success(res) {
					that.name = res.data.name
					that.phone = res.data.phone
					if(res.data.sex == true){
						that.gender = '女'
					}else{
						that.gender = '男'
					}
					that.ID = res.data.companyId
				}
			})
		},
		methods: {
			//获取输入框输入框值
			nameInput:function(event){
				this.name = event.target.value
			},
			genderInput:function(event){
				this.gender = event.target.value
				if(this.gender == "男"){
					this.sex = false
				}
				else{
					this.sex = true
				}
			},
			phoneInput:function(event){
				this.phone = event.target.value
			},
			IDInput:function(event){
				this.ID = event.target.value
			},
			//保存个人信息
			toEdit(){
				var that = this
				uni.getStorage({
					key:'token',	
				   success: function (res) {
					   that.icon = res.data.icon,
					   that.nickName = res.data.nickName
					   that.token = res.data.token
					  that.toUp(that.nickName,that.icon)
					},
					fail() {
						that.toUp()
					}
				})
			
			},
			//上传个人信息
			toUp(nickName,icon){
				var that = this
				if(this.name == undefined || this.gender == undefined || this.phone == undefined || this.ID == undefined){
					uni.showToast({
					    title: '输入内容不能为空',
					    icon:"none"
					});
				}else{
				   uni.request({
					url:'http://112.74.86.165:8082/wechatUserinfo',
					method:'PUT',
					data:{
						companyId: this.ID,
						icon: this.icon,
						name: this.name,
						nickname: this.nickName,
						phone: this.phone,
						sex: this.sex
					},
					header:{
						Authorization:that.token
					},
					success(res) {
						wx.setStorage({
							key:'companyId',
							data:{	
								companyId: that.ID,
								nickname: res.data.data.nickname,
								name: res.data.data.name,
								phone: res.data.data.phone,
								sex: res.data.data.sex,
								icon:res.data.data.icon
							},
						})
						uni.showToast({
							title:'保存成功',
						})
						uni.switchTab({
							url:'./user'
						});
					}
				   })
				   }
			}
		}
	}
</script>

<style lang="scss">
	.container{
		.imgBox{
			display: flex;
			justify-content: center;
			border-bottom:  1rpx #C0C0C0 solid;
			padding-bottom: 70rpx;
		}
		 .img{
			
			 width: 140rpx;
			 height: 140rpx;
			 border-radius:50%;
			 margin-top: 80rpx;
			 overflow:hidden; 
			 .avatarUrl{
			 	width: 140rpx;
			 	height: 140rpx;
			 	border-radius: 70rpx;
				margin-top: 80rpx;
			 }
			 open-data{
				 width: 140rpx;
				 height: 140rpx;
				 border-radius: 70rpx;
				 margin-top: 80rpx;
			 }
		 }
		 .nickName{
			 color: #717171;
			 padding: 20rpx;
			 border-bottom:  1rpx #C0C0C0 solid;
			 .text{
				 margin-left: 200rpx;
			 }
		 }
		 .edit{
			 .name,.phone,.gender{
				 color: #555555;
				 padding: 20rpx;
				 border-bottom:  1rpx #C0C0C0 solid;
				 display: flex;
				 .input{
				 		 margin-left: 200rpx;
				 }
			 }
			 .ID{
				 color: #555555;
				 padding: 20rpx;
				 border-bottom:  1rpx #C0C0C0 solid;
				 display: flex;
				 .input{
				 		 margin-left: 110rpx;
				 }
			 }
		 }
		 .buttonBox{
			 display: flex;
			 justify-content: center;
			 .button{
			 	background-color: #fad3dd;
			 	width: 500rpx;
			 	height: 80rpx;
			 	margin-top: 80rpx;
			 	border-radius: 15rpx;
			 	color: #6d6668;
			 	display: flex;
			 	align-items: center;
			 	justify-content: center;
			 	font-size: 28rpx;
			 }
		 }
		 
	}
</style>
