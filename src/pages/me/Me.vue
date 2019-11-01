<template>
    <div class="container">
        <div class="userinfo" @click="login">
            <img :src="userinfo.avatarUrl" alt="">
            <p>{{userinfo.nickName}}</p>
        </div>
        <YearProgress></YearProgress>
        <button class='btn' @click="scanBook">添加图书</button>
        <button open-type="getUserInfo" lang="zh_CN" withCredentials="true" bindgetuserinfo="onGotUserInfo">获取用户信息</button>
    </div>
</template>
<script>
import YearProgress from '@/components/YearProgress'
import imgUrl from '../../../static/img/unlogin.png'
import {showSuccess,post,showModal} from '@/util'
// import qcloud from 'wafer2-client-sdk'
// import config from '../../config'

export default {
  components: {
    YearProgress
  },
  data () {
    return {
      userinfo: {
        avatarUrl: imgUrl,
        nickName: '点击登录'
      }
    }
  },
  created () {
    // wx.getUserInfo({
    //     success: res=>{
    //         console.log(res.userInfo)
    //         console.log(res.userInfo.avatarUrl)
    //         this.userinfo = res.userInfo
    //     }
    // })

  },
  methods: {
    async addBook(isbn){
        const res = await post('/weapp/addbook',{
            isbn,
            openid: this.userinfo.nickName
        })
        console.log(res,"+++++++++++++++++++")
        showModal("添加成功",res.result.title+'添加成功');  
    },
    scanBook () {
      wx.scanCode({
        success: res=>{
            console.log(res)
            if(res.result){
                this.addBook(res.result)
            }
        }
      })
    },
    login () {
      // 真正的登录操作
      // let user = wx.getStorageSync('userinfo')
      // console.log(wx.getStorageSync('userinfo'))
      // if(!user){
      //     qcloud.setLoginUrl(config.loginUrl);
      //     qcloud.login({
      //         success: function (userInfo){
      //             console.log('登录成功',userInfo);
      //             showSuccess('登录成功')
      //             wx.setStorageSync('userinfo',userinfo)
      //         },
      //         fail: function (err) {
      //             showSuccess('登录失败')
      //             console.log('登录失败',err)
      //         }
      //     })
      // }
      this.getUserInfo()
    },
    getUserInfo () {
      console.log(wx.canIUse('button.open-type.getUserInfo'))
      let user = wx.getStorageSync('userinfo')
      if (!user) {
        wx.getUserInfo({
          success: res => {
            console.log(res,'res')
            console.log(res.userInfo)
            this.userinfo = res.userInfo
            wx.setStorageSync('userinfo', this.userinfo)
          }
        })

        showSuccess('登录成功')
      }
    },
    onGotUserInfo: function (e) {
      console.log(e)
      // console.log(e.detail.errMsg)
      // console.log(e.detail.userInfo)
      // console.log(e.detail.rawData)
    },
    
  },
  onShow () {
    if (wx.getStorageSync('userinfo')) {
      this.userinfo = wx.getStorageSync('userinfo')
    }
  },
  
}
</script>
<style lang='scss'>
.container{
  padding: 0 30rpx;
}
.userinfo {
    margin-top: 100rpx;
    text-align: center;
    img {
        display: inline-block;
        width: 128rpx;
        height: 128rpx;
        border-radius: 80rpx;
    }
}
</style>