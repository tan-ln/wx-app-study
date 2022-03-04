//app.js
// 应用启动 onLaunch
// APP -> page
// 负责全局的，应用级别的一些行为
// 还可以添加全局的数据

import db from './assets/db'

App({
	onLaunch: function () {
		// 拷贝赋值
		Object.assign(this.globalData, db)
		// wx.request({
		// 	url: 'https://resources.ninghao.net/wxapp-case/db.json',
		// 	success: (response) => {
		// 		console.log(response)
		// 		//   赋值
		// 		Object.assign(this.globalData, response.data)
		// 		console.log(this.globalData)
		// 	},
		// 	fail: (error) => {
		// 		console.log(error)
		// 	}
		// })
	},
	globalData: {}
})