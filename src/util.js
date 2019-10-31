import config from './config'

// 工具函数

//http get工具函数 获取数据
export function get (url,data) {
  return request(url,'GET',data);
}
export function post (url,data) {
    return request(url,'POST',data)
}


function request(url,method,data,header={}){
    return new Promise((resolve, reject) => {
        wx.request({
            data,
            method,
            url: config.host + url,
            success: function (res) {
                if(res.data.error_code === 0 || res.data.code === 0){
                    console.log(res)
                    resolve(res.data)
                } else {
                    showModal('失败',res.data.errMsg)
                    reject(res.data)
                }
            }

        })
    })
}


export function showSuccess (text) {
  wx.showToast({
    title: text,
    icon: 'success'
  })
}

export function showModal(title,content){
    wx.showModal({
        title,
        content,
        showCancel:false
    })
}