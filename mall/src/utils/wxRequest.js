// 请求封装 统一小程序 wx.request 请求
// url, params, get?post

import wepy from 'wepy'

// @params json 
    // query 传查询参数
    // metho 查询方法 get/POST

    // 匿名函数 async修饰符 直接写在前面
const wxRequest = async (params = {}, url) => {
    let data = params.query || {}
    // await 执行完毕异步 返回并赋给左边
    let res = await wepy.request({
        url,
        method: params.method || 'GET',
        data,
        header: {'Content-type': 'application/json',},
    })
    return res
}

module.exports = {
    wxRequest
}