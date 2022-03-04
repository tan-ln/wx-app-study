// pages/scanCode/scanCode.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  // 扫码
  scanCode: function (event) {
    wx.scanCode({
      onlyFromCamera: true,
      scanType: ['barCode'],
      success: res => {
        wx.cloud.callFunction({
          // 要调用的云函数名称
          name: 'bookinfo',
          // 传递给云函数的参数
          data: {
            isbn: res.result
          },
          success: res => {
            let bookString = res.result
            // 初始化 数据库 和集合
            const db = wx.cloud.database()
            const bookCollection = db.collection('myBook')
            // 添加集合
            db.collection('myBook').add({
              // data 字段表示需新增的 JSON 数据
              data: JSON.parse(bookString)
            })
              .then(res => {
                console.log(res)
              })
              .catch(console.error)
            console.log(res)
          },
          fail: err => {
            console.log(err)
          }
        })
      },
      fail: err => {
        console.log(err)
      }
    })
  }
})