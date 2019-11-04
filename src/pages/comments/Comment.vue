<template>
    <div>
        <CommentList v-if="userinfo.nickName" type='user' :comments="comments"></CommentList>   
        <div v-if="userinfo.nickName">
            <Card v-for="book in books" :key="book.id" :book='book'></Card>
        </div>     
    </div>
</template>

<script>
import CommentList from '@/components/CommentList'
import Card from '@/components/Card'
import {get} from '@/util'
export default {
    components: {
        CommentList,
        Card
    },
    data() {
        return {
            comments: [],
            userinfo: {},
            books: []
        }
    },
    methods: {
        init(){
            wx.showNavigationBarLoading()
            this.getComments()
            this.getBooks()
            wx.hideNavigationBarLoading()
        },
        async getBooks(){
            const books =await get('/weapp/booklist',{
                openid: this.userinfo.nickName
            })
            this.books = books.data.list
        },
        async getComments(){
            const comments = await get('/weapp/commentlist',{
                openid:this.userinfo.nickName
            })
            this.comments = comments.data.list
        }
    },
    onPullDownRefresh(){
        this.init()
        wx.setPullDownRefresh()
    },
    onShow(){
        console.log('进入评论模块')
        if(!this.userinfo.nickName){
            let userinfo = wx.getStorageSync('userinfo')
            if(userinfo){
                console.log('进入获取userinfo')
                this.userinfo = userinfo
                this.init()
            }
        }
    }
}
</script>
<style lang="scss" scoped>

</style>