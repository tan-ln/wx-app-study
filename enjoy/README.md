# 书柜小程序云开发

## 豆瓣 API
> [https://douban.uieee.com/v2/book/isbn/9787506365437](https://douban.uieee.com/v2/book/isbn/9787506365437)

## 云函数
```js
wx.cloud.callFunction({
  // 要调用的云函数名称
  name: 'add',
  // 传递给云函数的参数
  data: {
    x: 1,
    y: 2,
  },
  success: res => {
    // output: res.result === 3
  },
  fail: err => {
    // handle error
  },
  complete: () => {
    // ...
  }
})
```

## 数据库
```
// 初始化 数据库
const db = wx.cloud.database()
const testDB = wx.cloud.database({
  env: 'test-123'
})
```
