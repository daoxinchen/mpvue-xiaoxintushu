const https = require('https')
const http = require('http')
const { mysql } = require('../qcloud')

//新增图书
//1.获取豆瓣信息
//2.入库
//
module.exports = async (ctx)=>{
    const {isbn,openid} = ctx.request.body
    console.log('添加图书-----', isbn, openid)
    if(isbn && openid) {
        const findRes = await mysql('books').select().where('isbn',isbn)
        if(findRes.length){
            ctx.state = {
                code: -1,
                data: {
                    msg: '图书已存在'
                }
            }
            return 
        }


        let url = 'http://feedback.api.juhe.cn/ISBN?key=5aa0c4aa01148919475f041e8b5559c1&sub='+isbn
        console.log('-------------------------')
        const bookinfo = await getJSON(url)
        console.log(bookinfo.result)
        const rate = bookinfo.result.levelNum //评分

        const image = bookinfo.result.images_large
        const alt = bookinfo.result.images_medium
        const {title, publisher, summary, price, author } = bookinfo.result
        
        console.log({title, publisher, summary, price, author })
        try{
            await mysql('books').insert({
                isbn, openid, rate, title, image, alt, publisher, summary, price, author
            })
            ctx.state.data = {
                title,
                message: 'success'
            }
        }catch(e){
            ctx.state = {
                code:-1,
                data: {
                    msg: '新增失败：' + e.sqlMessage
                }
            }
        }
        ctx.body = bookinfo
    } else {
        ctx.body = '未找到图书'
    }
}

function getJSON(url){
    return new Promise((resolve,reject)=>{
        http.get(url,res => {
            let urlData = ''
            res.on('data',data => {
                urlData = data
            })
            res.on('end',data => {
                const bookinfo = JSON.parse(urlData)
                if(bookinfo.result){
                    resolve(bookinfo)
                }
                reject(bookinfo)
            })
        })
    })
}