<template>
    <div>
        <BookInfo :info='info'></BookInfo>
        <div class="comment">
            <textarea v-model="comment"
                    class="textarea"
                    :maxlength="100"
                    placeholder="请输入图书评论短评"
            ></textarea>
        </div>
        <div class="location">
            地理位置：
            <switch color="#EA5A49" :checked='location' @change="getGeo"></switch>
            <span class="text-primary">{{location}}</span>
        </div>
        <div class="phone">
            手机型号：
            <switch color="#EA5A49" :checked='phone' @change="getPhone"></switch>
            <span class="text-primary">{{phone}}</span>
        </div>
        <button class="btn" @click="addComment">
            评论
        </button>
    </div>
</template>

<script>
import {get,post,showModal} from '@/util'
import BookInfo from '@/components/BookInfo'
export default {
    components:{
        BookInfo
    },
    data(){
        return {
            userinfo: {},
            bookid: '',
            info:{},
            comment: '',
            location: '',
            phone: '',
            comments: ''
        }
    },
    methods: {
       async addComment(){
            if(!this.comment){
                return
            }
            //评论内容，手机型号，地理位置,图书id,openid
            const data = {
                openid: this.userinfo.nickName,
                bookid: this.bookid,
                comment: this.comment,
                phone: this.phone,
                location: this.location
            }
            try {
                await post('/weapp/addcomment',data)
                this.comment = ''
            } catch(e) {
                showModal('失败',e.message)
            }
            console.log(data)
        },
        async getDetail(){
            const info = await get('/weapp/bookdetail',{id:this.bookid})
            wx.setNavigationBarTitle({title:info.data.title})

            this.info = info.data
            console.log(info.data.title,"==============")
        },
        async getComments(){
            const comments = await get('/weapp/commentlist',{bookid:this.bookid})
            this.comments = comments
        },
        getGeo(e){
            //NZxcZYGj0j2IWCOVyozVAextOdrsEFDW 百度地图个人秘钥
            const ak = 'NZxcZYGj0j2IWCOVyozVAextOdrsEFDW'
            //http://api.map.baidu.com/geocoding/v3/?address=北京市海淀区上地十街10号&output=json&ak=您的ak&callback=showLocation //GET请求
            let url = 'http://api.map.baidu.com/reverse_geocoding/v3/'
            if(e.target.value){
                wx.getLocation({
                    success: geo=>{
                        wx.request({
                            url,
                            data: {
                                location: `${geo.latitude},${geo.longitude}`,
                                ak,
                                output: 'json',
                            },
                            success: res=>{
                                if(res.data.status == 0){
                                    this.location = res.data.result.addressComponent.city
                                }else {
                                    this.location = '位置地点'
                                }
                            }
                        })
                    }
                })
            }else {
                this.location=''
            }
        },
        getPhone(e){
            if(e.target.value){
                const phoneInfo = wx.getSystemInfoSync()
                console.log(phoneInfo)
                this.phone = phoneInfo.model
            } else {
                this.phone = ''
            }
        }
    },
    mounted(){
        this.bookid = this.$root.$mp.query.id
        this.getDetail()
        this.getComments()
        const userinfo = wx.getStorageSync('userinfo');
        if(userinfo){
            this.userinfo = userinfo
        }


    }   
}
</script>

<style lang="scss" scoped>
.comment {
    .textarea{
        width: 730rpx;
        height: 200rpx;
        background: #eeeeee;
        padding: 10rpx;
    }
}
.location {
    margin: 10rpx;
}
.phone {
    margin: 10rpx;
}
</style>