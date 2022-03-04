---
title: 'wepy 进阶之用户信息获取和用户登录'
subtitle: 'async、await、promise、模块化、集中管理';
tags: [wepy, async, await, promise, getUserInfo, 模块化, 集中管理]
---
# wepy 之用户信息获取与 async 同步

## 获取用户信息与登录操作
> `open-type` 显示用户信息，    
`bindgetuserinfo` 点击返回获取到的用户信息，    
`wxpy.login()` 登录，       
`async` 对于函数内部有异步操作变同步的声明，        
```html
<button type="primary" open-type="getUserInfo" lang="zh_CN" bindgetuserinfo="onGotUserInfo">授权</button>
```
```js
// async: 对于函数内部有异步操作变同步的声明
async onGotUserInfo(e) {
    console.log(e);
    if (e.detail.errMsg == 'getUserInfo:ok') {
      // api wx.login wxpy.login 通过用户信息登录微信服务器 拿到 用户code 标识符
      // 然而这是异步的   回调地狱写法 success: res => {}
      // await 异步的代码变成同步的写法，执行login完成再接下去执行
      // 异步函数前需要声明 使用 async

      let res = await wepy.login();     // 登录 api
      console.log(res);
      // 需要在 app.wpy construct 启用 promise
    }
}
```
## setStorageSync
> wxpy 同步保存到本地
```js
wepy.setStorageSync(USER_INFO, e.detail.userInfo)
```
## 用户授权
```js
wepy.getSetting()
if ((res.authSetting)['scope.userInfo'])
```
## 模块化集中管理
> 在大型项目中通常使用模块化集中管理，便于查询、修改和维护，如：常量、数据请求等。
```js
// 设置为一个常量，在外部设置这个常量
wepy.setStorageSync(USER_INFO, e.detail.userInfo)
```
```js
// 实质是解构
import {
	USER_INFO,
	USER_SPECIAL_INFO,
	SYSTEM_INFO
} from '@/utils/constant'		// 文件用于保存所有常量名，可以直接看到有多少，实现集中管理
```
/utils/constant.js
```js
// 在这里管理项目中的常量
// export default 
// export *
// export 不跟 表示输出一堆，引用时解构 {}
export const USER_INFO = 'userInfo'
export const USER_SPECIAL_INFO = 'user_special_info'
export const SYSTEM_INFO = 'systemInfo'
```

## 架构思想

## 安全操作
- 在请求的过程中带上时间戳是一个常用的做法  
```js
const TIMESTAMP = util.getCurrentTime()
data.time = TIMESTAMP
```
- md5 加密
> 生成一个 32 位的字符串
```js
// API_SECRET_KEY 自定义一个，不能告诉别人
const SIGN = md5.hex_md5((TIMESTAMP + API_SECRET_KEY).toLowerCase())
data.sign = SIGN
```