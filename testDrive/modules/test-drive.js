// es6 模块化语法 module
// 默认向外部输出 testDrive
// js 变量或常量 它的值的类型由值决定
// var => let
// let b = 132
// b = '123'
const testDrive = () => {
    // 用微信内置的 api  是原生的 api
    // 大部分的小程序是 html5
    // webview  nativeview 
    // 性能上比原生的慢一些
    // showToast 弹出提示
    wx.showToast({
        title: '暂不支持'
    })
}
export default testDrive