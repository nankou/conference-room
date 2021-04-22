<template>
    <view>
        <!-- #ifdef MP-WEIXIN -->
       <button v-if="ishas" class="sys_btn" open-type="getUserInfo" lang="zh_CN" @getuserinfo="appLoginWx">{{loginInfo.openid != "" && loginInfo.openid != undefined ? "已授权" : "小程序授权"}}</button>
        <view class="wxBox" v-else>
        	<view class="imgBox">
        			<open-data type="userAvatarUrl" class="avatarUrl"></open-data>
        	</view>
        	<view class="nameBox">
        			<open-data class="nickName" type="userNickName"></open-data>
        	</view>
        </view>
		<!-- #endif -->
    </view>
</template>


<script>
    export default {
        data() {
            return {
				ishas:true
            };
        },
		onLoad() {
			//获取是否授权
			// #ifdef MP-WEIXIN
			 uni.getSetting({
			  success(res) {
			     console.log("授权：",res);
			    if (!res.authSetting['scope.userInfo']) {
			         //这里调用授权
			         console.log("当前未授权");
			    } else {
			         //用户已经授权过了
			         console.log("当前已授权");
			    }
			  }
			})
			 //#endif
		},
        methods: {
          
          appLoginWx(){
			  // #ifdef MP-WEIXIN
				  uni.getProvider({
					service: 'oauth',
					success: function (res) {
					  if (~res.provider.indexOf('weixin')) {
						  uni.login({
							  provider: 'weixin',
							  success: (res) => {
								  var code = res.code;
								  console.log(code)
								  uni.getUserInfo({
									  provider: 'weixin',
									  success: (info) => {//这里请求接口
										  console.log(info);
										var nickName = info.userInfo.nickName
										var icon = info.userInfo.avatarUrl
										
										uni.request({
											url:'http://112.74.86.165:8082/wechatLogin',
											method:'POST',
											data:{
												code:code,
												nickName:nickName,
												icon:icon
											},
											success(result) {
												console.log(result)
												 
												 // if(result.data.data.companyId == ''){
													//  uni.showToast({
													//  	title:'登录成功，请先编辑个人信息',
													//  	icon:'none'
													//  })
													//  uni.navigateTo({
													//  	url:'./edit'
													//  })
												 // }else{
													//  uni.setStorage({
													//  	key:'token',
													//  	data:{
													//  		token: result.data.data.token,
													//  		nickName:nickName,
													//  		icon:icon,
													//  		name: result.data.data.name,
													//  		sex: result.data.data.sex,
													//  		phone: result.data.data.phone,
													//  		companyId: result.data.data.companyId,
													//  	},
													//  })
												 // }
											},		
										})
									  },
									  fail: () => {
										  uni.showToast({title:"微信登录授权失败",icon:"none"});
									  }
								  })
						  
							  },
							  fail: () => {
								  uni.showToast({title:"微信登录授权失败",icon:"none"});
							  }
						  })
						  
					  }else{
						  uni.showToast({
							  title: '请先安装微信或升级版本',
							  icon:"none"
						  });
					  }
					}
				  });
				  }}}
				  //#endif
</script>


<style>
    .header {
        margin: 90rpx 0 90rpx 50rpx;
        border-bottom: 1px solid #ccc;
        text-align: center;
        width: 650rpx;
        height: 300rpx;
        line-height: 450rpx;
    }

    .header image {
        width: 200rpx;
        height: 200rpx;
    }

    .content {
        margin-left: 50rpx;
        margin-bottom: 90rpx;
    }

    .content text {
        display: block;
        color: #9d9d9d;
        margin-top: 40rpx;
    }

    .bottom {
        border-radius: 80rpx;
        margin: 70rpx 50rpx;
        font-size: 35rpx;
    }
</style>
