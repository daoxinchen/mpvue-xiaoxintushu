<template>
    <div>
        <TopSwiper :tops="tops"></TopSwiper>
        <Card v-for="book in books" :key="book.id" :book='book'>{{book.title}}</Card>
        <p class="text-footer" v-if="!more">
          没有更多数据
        </p>
    </div>
</template>

<script>
  import {get} from '@/util'
  import Card from '@/components/Card'
  import TopSwiper from '@/components/TopSwiper'
  export default {
    components:{
      Card,
      TopSwiper
    },
    data(){
      return {
        books: [],
        page: 0,
        more: true,
        tops: []
      }
    },
    mounted(){
      this.getList(true)
      this.getTop()
    },
    methods: {
      async getList(init){
        if(init){
          this.page = 0
          this.more = true
        }
        wx.showNavigationBarLoading();
        const books = await get('/weapp/booklist',{page:this.page});
        if(books.data.list.length<5 && this.page>0){
          this.more = false
        }
        if(init){
          this.books = books.data.list
        } else {
          this.books = this.books.concat(books.data.list)
        }
        wx.stopPullDownRefresh();
        wx.hideNavigationBarLoading();
      },
      async getTop() {
        const tops = await get('/weapp/top')
        this.tops = tops.data.list
      }
    },
    onPullDownRefresh(){
      this.getList(true)
      this.getTop()
    },
    onReachBottom(){
      if(!this.more){
        //没有更多了
        return false
      }
      this.page = this.page + 1
      this.getList()
    }
  }
</script>