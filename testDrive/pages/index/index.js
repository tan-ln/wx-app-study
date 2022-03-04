//index.js
//获取应用实例

// 引入模块
import testDrive from '../../modules/test-drive'
// console.log(testDrive)

// 从 Page 里得到 App
// app.gloabalData
const app = getApp()
console.log(app.globalData)

Page({
	data: {
		autoplay: false,
		interval: 3000,
		duration: 1000,
		circular: true,
		slides: [],
		entities: null
	},
	onLoad() {
		this.setData({
			slides: app.globalData.slides,
			entities: app.globalData.vehicles
		})
	},
	//事件处理函数
	testDrive,
	
	readMore(event) {
		const id = event.currentTarget.dataset.id
		// console.log(id)
		// 跳转页面
		wx.navigateTo({
			url: `/pages/vehicles/show?id=${id}`
		})
	},
	showMeta(event) {
		const id = event.currentTarget.dataset.id
		wx.navigateTo({
			url: `/pages/vehicles/show?id=${id}`
		})

		console.log(id)
	}
})
