import { zhui_search, quan_search, coverUrl, yisou_search } from '../../config/api.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchRes: [],
    value: '',
    coverUrl: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    let keyword = options.keyword
    this.setData({
      value: keyword,
      coverUrl
    })
    this.reqSearch(keyword).then(res => {
      this.setData({
        searchRes: res
      })
    })
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

  reqSearch: function (keyword) {
    // 全搜 主要源
    const p1 = new Promise((resolve, reject) => {
      wx.request({
        url: quan_search + keyword,
        success: res => {
          let quanRes = res.data.keywords
          resolve(quanRes)
        }
      })
    })
    // 追书神器
    const p2 = new Promise((resolve, reject) => {
      wx.request({
        url: zhui_search + keyword,
        success: rs => {
          let zhuiRes = rs.data.books
          resolve(zhuiRes)
        }
      })
    })
    // 宜搜 补充信息
    const p3 = this.autoSearch(keyword)

    return Promise.all([p1, p2, p3]).then(res => {
      // 数组中的每一个元素（还是数组，即二维数组的第二维）会被作为参数依次传入到concat中
      // 等同于[].concat([1,2], [3,4], [5,6])
      // return Array.prototype.concat.apply([], res)

      // let add = Array.prototype.concat.apply([], res)
      // 过滤 p1 p2 p3 信息合并
      // let a = JSON.parse(JSON.stringify(res[0]))
      this.mapFilter(res[0], res[1])
      this.mapFilter(res[0], res[2])

      // 过滤没有详细数据的
      let arr = res[0].filter(item => {
        if (item.cover || item.imgUrl) return item
      })
      return arr.concat(res[1])
    })

  },

  // 宜搜源 补充信息
  autoSearch: keyword => new Promise((resolve) => {
    wx.request({
      url: yisou_search(keyword),
      success: res => {
        resolve(res.data.all_book_items)
      }
    })
  }),

  // 过滤 + 补充
  mapFilter: (source, other) => {
    source.forEach((s, idx) => {
      other.forEach(o => {
        if ((o.name && s.text === o.name && s.author === o.author) || (o.title && s.text === o.title && s.author === o.author)) {
          source[idx] = Object.assign(s, o)
        }
      })
    })
    return source
  },

  onChange: function (e) {
    this.setData({
      value: e.detail
    })
  },

  onSearch: function () {
    let keyword = this.data.value
    this.reqSearch(keyword).then(res => {
      this.setData({
        searchRes: res
      })
    })
  },

  onNavToDetail: function (event) {
    let id = event.currentTarget.dataset.id
    let novel = event.currentTarget.dataset.novel
    let curNovel = {
      novel
    }
    // 保留当前阅读
    wx.setStorageSync('curNovel', JSON.stringify(curNovel))
    
    wx.navigateTo({
      url: '../novelDetail/novelDetail?id=' + id,
    })
  }
})
