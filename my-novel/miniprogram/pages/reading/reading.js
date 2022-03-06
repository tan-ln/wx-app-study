import { openChapt } from '../../config/api.js'
const app = getApp()

// pages/reading/reading.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    articles: [],
    title: '',
    showBar: false,
    chaptList: [],
    showContList: false,
    novel: {},
    scrollTop: 0.01
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id
    let unParseData = wx.getStorageSync('bookStore')
    let bookStore = unParseData ? JSON.parse(unParseData) : null
    let curNovel = JSON.parse(wx.getStorageSync('curNovel'))
    let chaptList = curNovel.chaptList
    let novel = curNovel.novel

    // 书架中
    if (bookStore && bookStore.length > 0 && (id === bookStore.novel.id || id === bookStore.novel._id)) {
    
    } else if ((id === curNovel.novel.id || id === curNovel.novel._id) && curNovel.curChapter) {
      // 最近一次看过，保留在 当前阅读的
      let scrollTop = curNovel.scrollTop
      let articles = curNovel.curChapter

      this.setData({
        articles
      })

      // 设置 scrollTop
      this.setScrollTop(scrollTop)

    } else {
      // 首次
      let curChapter = chaptList[0]

      // get 小说内容
      this.getNovelContent(curChapter, this).then(res => {
        this.setData({
          articles: res
        })
        // 保存 当前章节
        this.saveCurChapt(res)
      })

      this.setScrollTop(0)
    }

    this.setData({
      chaptList,
      novel
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
    let curNovel = JSON.parse(wx.getStorageSync('curNovel'))

    let query = wx.createSelectorQuery().in(this)
    query.select('#reading-container').boundingClientRect((res) => {
      console.log('res: ', res)
      let scrollTop = -1 * res.top
      let temp = {
        ...curNovel,
        scrollTop
      }
      wx.setStorageSync('curNovel', JSON.stringify(temp))
    }).exec()
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

  showBar: function () {
    this.setData({
      showBar: !this.data.showBar,
      showContList: false
    })
  },

  onShowContList: function () {
    this.setData({
      showContList: true,
      showBar: false
    })
  },

  formatText: function (text) {
    let toArr = text.split('\n')
    for (let i in toArr) {
      toArr[i] = toArr[i].replace(/\s+/g, '')
    }

    return toArr
  },

  // 请求 获取小说 内容
  getNovelContent: ({ title, link }, ctx) => new Promise((resolve) => {
    wx.request({
      url: openChapt + link,
      success: res => {
        let body = res.data.chapter.body
        let content = ctx.formatText(body)

        let article = [{
          title,
          content
        }]

        resolve(article)
      }
    })
  }),

  openCurChapt: function (event) {
    this.setData({
      showContList: false
    })
    let chapter = event.currentTarget.dataset.chapter
    this.getNovelContent(chapter, this).then(res => {
      this.setData({
        articles: res
      })

      // 保存当前阅读定位
      this.saveCurChapt(res)
    })

    this.setScrollTop(0)
  },

  saveCurChapt: function (chapter, scrollTop = 0) {
    let curNovel = JSON.parse(wx.getStorageSync('curNovel'))
    let temp = {
      ...curNovel,
      curChapter: chapter,
      scrollTop
    }
    wx.setStorageSync('curNovel', JSON.stringify(temp))
  },

  // 设置 scrollTop
  setScrollTop: function (scrollTop) {
    let query = wx.createSelectorQuery().in(this)
    query.select('#reading-container').boundingClientRect((res) => {
      wx.pageScrollTo({
        scrollTop,
        duration: 0
      })
    }).exec()
  }

})
