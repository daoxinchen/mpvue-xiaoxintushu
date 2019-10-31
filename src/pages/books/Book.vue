<template>
    <div>
        书列表
        <button open-type="getUserInfo" lang="zh_CN" @getuserinfo="doLogin">获取用户信息</button>
    </div>
</template>

<script>
  import qcloud from 'wafer2-client-sdk'
  import config from '@/config.js'
  export default {
    methods: {
      doLogin: function (e) {
        qcloud.setLoginUrl(config.loginUrl)
        qcloud.login({
          success: function (userInfo) {
            console.log('登录成功', userInfo)
          },
          fail: function (err) {
            console.log('登录失败', err)
          }
        })
      }
    }
  }
</script>