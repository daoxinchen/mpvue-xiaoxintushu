<template>
    <div class="bookinfo">
        <div class="thumb">
            <img class="back"
                :src="info.image"
                alt=""
                mode='aspectFill'
                >
        </div>
        <img 
            class="img"
            :src="info.image"
            mode='aspectFit'
            >
        <div class="info">
            <div class="title">{{info.title}}</div>
            <div class="author">{{info.author}}</div>
        </div>
        <div class="owner">
            添加人:{{info.openid}}
            <div class="right text-primary">
                {{info.rate}}分
                <Rate :value='info.rate'></Rate>
            </div>
        </div>
        <div class="detail">
            {{info.publisher}}
            <div class="right">
                {{info.price}}
            </div>
        </div>
        <div class="tags">
            <div class="badge" v-for="(tag,key) in info.tags" :key="key">{{tag}}</div>
        </div>
        <div class="summary">
            {{info.summary}}
        </div>
    </div>
</template>

<script>
import Rate from '@/components/Rate'
export default {
    components:{
        Rate
    },
    props:{
        info: Object,
        value: Number
    }
}
</script>

<style lang="scss" scoped>
.bookinfo {
    .badge {
        display: inline-block;
        margin: 5px;
        padding: 5px;
        border-radius: 10px;
        border: 1px #EA5a49 solid;
        color: #EA5a49;
    }
    .summary {
        margin-top: 10px;
        text-indent: 2em;
        font-size: 14px;
        padding: 15px;
    }
    .right {
        float: right; 
    }
    .owner {
        padding: 5px 10px;
    }
    .detail {
        padding: 5px 10px;
    }
    position: relative;
    .thumb {
        width:750prx;
        height: 500rpx;
        overflow: hidden;
        .back {
            filter: blur(15px);
            width: 100%;
        }
    }
    .img {
        position: absolute;
        width: 100%;
        height: 300rpx;
        left: 0;
        top: 30rpx;
    }
    .info {
        color: white;
        position: absolute;
        width: 100%;
        left: 0;
        top: 330rpx;
        text-align: center;
        .title {
            font-size: 20px;
        }
        .author {
            font-size: 14px;
        }

    }

}
</style>