<template>
    <div class="container">
        <div class="userinfo">
            <img :src="userinfo.avatarUrl" alt="">
            <p>{{userinfo.nickName}}</p>
        </div>
        <YearProgress></YearProgress>
        <button class='btn' @click="scanBook">添加图书</button>
    </div>
</template>
<script>
import YearProgress from '../../components/YearProgress'

export default {
    components:{
        YearProgress
    },
    data() {
        return {
            userinfo: {}
        }
    },
    created(){
        wx.getUserInfo({
            success: res=>{
                console.log(res.userInfo)
                console.log(res.userInfo.avatarUrl)
                this.userinfo = res.userInfo
            }
        })
    },
    methods:{
        scanBook(){
            wx.scanCode({
                success (res) {
                    console.log(res)
                }
            })
        }
    }
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
        border-radius: 50rpx;
        border: 1px solid red
    }
}
</style>