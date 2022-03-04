// pages/vehicles/show.js
// 引入模块
import testDrive from '../../modules/test-drive'
const app = getApp()

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		circular: true,
		entities: []
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		const id = options.id;
		// const vehicles = app.globalData.vehicles
		console.log(id)
		// const id = 3
		const temp = app.globalData.vehicles.find(item => item.id == id)
		console.log(temp);

		this.setData({
			entities: temp
		})
	},
	testDrive,
	// 图片预览
	previewImage: function(index, target) {
		const source = this.data.entities.meta[target]
		const curImg = source[index].image
		const imgList = source.map(item => item.image)

		wx.previewImage({
			// 当前图片路径
			current: curImg,
			// 预览图片列表
			urls: imgList,
			fail: function () {
				console.log('fail')
			},
			complete: function () {
				console.info("点击图片预览");
			},
		})
	},
	show_ext_PreImg: function(e) {
		const index = e.target.dataset.index

		this.previewImage(index, 'exterior_design')
	},

	show_inte_PreImg: function (e) {
		const index = e.target.dataset.index

		this.previewImage(index, 'interior_design')
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

	}
})