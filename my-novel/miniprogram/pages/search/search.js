import { autoCompleteSearch } from '../../config/api.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showSearch: false,
    searchKws: [],
    value: ''
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

  showSearch: function () {
    this.setData({
      showSearch: true
    })
  },

  onCancel: function () {
    this.setData({
      showSearch: false
    })
  },

  onChange: async function (event) {
    let keyword = event.detail
    if (!keyword) return
    await wx.request({
      url: autoCompleteSearch + keyword,
      success: res => {
        let kws = res.data.keywords
        this.setData({
          searchKws: kws
        })
      }
    })
  },

  onSearch: function (event) {
    let keyword = event.detail
    if (!keyword) return
    wx.navigateTo({
      url: `../searchRes/searchRes?keyword=${keyword}`,
    })
  }
})