<template>
    <div class="comment-list">
        <div class="page-title" v-if="comments.length">
            评论
        </div>
        <div class="comment"
            v-for="comment in comments"
            :key="comment.id"
            @click="handleClick(comment)"
        >
             <div class="user">
                 <div class="inline">
                     {{comment.openid}}
                 </div>
             </div>
             <div class="right">
                 {{comment.location || "未知地点"}}
                 {{comment.phone || '未知型号'}}
             </div>
             <div class="content">
                 {{comment.comment}}
             </div>
        </div>
        
    </div>
</template>

<script>
export default {
    props: ['comments','type'],
    methods: {
        handleClick(item){
            if(this.type == 'user'){
                wx.navigateTo({
                    url: '/pages/detail/main?id='+item.bookid
                })
            }
        }
    }

}
</script>

<style lang="scss" scope>
.comment-list {
    background: #eeeeee;
    font-size: 14px;
    .comment {
        background: white;
        margin-bottom: 10px;
        padding: 5px 20px;
        .content {
            margin: 10px 0;
        }
        .user {
            .inline {
                color: red;
            }
            .avatar {
                width: 20px;
                height: 20px;
                
            }
        }
    }
    
}
</style>