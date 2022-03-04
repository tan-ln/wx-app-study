//  { wxRequest } 将 module.exports 中的对象解构出来
import { wxRequest } from '@/utils/wxRequest';
// 请求头
const apiMall = 'http://sujiefs.com/'

// 高阶函数 函数调用函数
const wxJsCode2Session = (params) => wxRequest(params, `${apiMall}/api/wechat/jscode2session`)

export default {
    wxJsCode2Session
}