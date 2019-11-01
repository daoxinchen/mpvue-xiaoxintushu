const {mysql} = require('../qcloud')

module.exports = async (ctx)=>{
    const {bookid} = ctx.request.query
    const comments = await mysql('comments')
                            .select()
                            .where('bookid',bookid)
    ctx.state.data = {
        list: comments
    }
}
