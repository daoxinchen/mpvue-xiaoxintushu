const {mysql} = require('../qcloud')

module.exports = async (ctx)=>{
    const {bookid,openid} = ctx.request.query
    const mysqlSelect = mysql('comments')
                            .select()
    if(bookid){
        //图书详情的评论列表
        comments = await mysqlSelect.where('bookid',bookid)
    } else if(openid){
        //根据个人的openid筛选
        comments = await mysqlSelect.where('openid',openid)
    }


    ctx.state.data = {
        list: comments
    }
}
