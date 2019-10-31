<script>
import {get} from './util'
import qcloud from 'wafer2-client-sdk'
import config from './config'

export default {
  async created () {
    let user = wx.getStorageSync('userinfo')
    console.log(wx.getStorageSync('userinfo'))
    if(!user){
      qcloud.setLoginUrl(config.loginUrl);
      qcloud.login({
        success: function (userInfo){
          console.log('登录成功',userInfo);
        },
        fail: function (err) {
          console.log('登录失败',err)
        }
      })
    }

    // let res = get('/weapp/demo')
    // console.log(123,res)
    console.log('小程序开始了')
  }
}
</script>

<style>
.btn {
  color: white;
  background: #ea5a49;
  margin-bottom: 10px;
  padding-left: 15px;
  padding-right: 15px;
  border-radius: 2px;
  font-size: 16px;
  line-height: 40px;
  height: 40px;
  width: 100%;
}
.btn:active{
  background: #ea9a00;
}
</style>
