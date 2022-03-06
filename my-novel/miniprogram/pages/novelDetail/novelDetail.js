import { zhui_book, quan_chapt, coverUrl, zhui_chapt } from '../../config/api.js'

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    novel: {},
    showDesc: true,
    coverUrl,
    chaptNum: 0,
    chaptList: [],
    showChapter: false,
    updated: '',
    reverse: false,
    id: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })

    let curNovel = JSON.parse(wx.getStorageSync('curNovel'))

    this.requestGetBook(options.id).then(res => {
      if (res.ok !== false) {
        console.log(res)
        this.setData({
          novel: res,
          updated: this.formatDate(res.updated)
        })
      } else {
        let curNovel = wx.getStorageSync('curNovel')
        this.setData({
          novel: JSON.parse(curNovel).novel,
          updated: this.formatDate(JSON.parse(curNovel).novel.updated)
        })
      }
    })

    this.requestGetChapters(options.id).then(res => {
      if (res) {
        this.setData({
          chaptNum: res.length,
          chaptList: res
        })
        let temp = Object.assign(curNovel, {
          chaptList: res
        })
        wx.setStorageSync('curNovel', JSON.stringify(temp))
      }
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

  onShowDesc: function () {
    this.setData({
      showDesc: !this.data.showDesc
    })
  },

  // 跳转阅读
  toReading: function () {
    if (!this.data.chaptList || this.data.chaptList.length === 0) return

    wx.navigateTo({
      url: '../reading/reading?id=' + this.data.id
    })
  },

  // 书籍详情
  requestGetBook: id => new Promise((resolve) => {
    wx.request({
      url: zhui_book + id,
      success: res => {
        resolve(res.data)
      }
    })
  }),

  // 获取目录
  requestGetChapters: (id) => new Promise((resolve) => {
    wx.request({
      url: quan_chapt + id,   
      success: res => {
        if (res.data.chapters) {
          resolve(res.data.chapters)
        } else {
          wx.request({
            url: zhui_chapt(id),
            success: res => {
              // console.log(res.data)
              if (res.data) {
                resolve(res.data.mixToc.chapters)
              }
            }
          })
        }
      }
    })
  }),

  onShowChapt: function () {
    if (!this.data.chaptList || this.data.chaptList.length === 0) return
    this.setData({
      showChapter: true
    })
  },

  formatDate: function (date) {
    return date.split('T')[0]
  },

  hideChaptList: function () {
    this.setData({
      showChapter: false
    })
  },

  reverseChapList: function () {
    this.setData({
      chaptList: this.data.chaptList.reverse(),
      reverse: !this.data.reverse
    })
  }
})