<template>
    <div>
        <Card v-for="book in books" :key="book.id" :book='book'>{{book.title}}</Card>
    </div>
</template>

<script>
  import {get} from '@/util'
  import Card from '@/components/Card'
  export default {
    components:{
      Card
    },
    data(){
      return {
        books: []
      }
    },
    mounted(){
      this.getList()
    },
    methods: {
      async getList(){
        wx.showNavigationBarLoading();
        const books = await get('/weapp/booklist');
        this.books = books.data.list
        console.log(books,'books')
        wx.hideNavigationBarLoading();
      }
    },
    onPullDownRefresh(){
      console.log('下拉')
    }
  }
</script>