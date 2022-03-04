//index.js
//获取应用实例
const util = require('../../utils/util.js')
const app = getApp()

Page({

	data: {
		status: 1,
		addFormShow: false,
		addText: '',
		lists: [],
	},

	resetMove() {
		this.data.lists.forEach(item => {
			item.todoStyle = ''
		})
		
	},

	// 删除
	deleteItem: function (e) {
		const id = e.currentTarget.dataset.id
		console.log(e)
		console.log(id)

		wx.showModal({
			title: '您确定要删除吗？',
			content: '',
			cancelText: '考虑一下',		
			success: res => {
				this.setData({
					status: 1
				})
				const temp = wx.getStorageSync('lists')

				if (res.confirm) {
					temp.forEach((item, index) => {
						if (item.id == id) {
							temp.splice(index, 1)
						}
					})
					console.log('删除成功')

					this.setData({
						lists: temp
					})
					wx.setStorage({
						key: 'lists',
						data: temp
					})
				} else {
					console.log('取消')
					this.resetMove()
					this.showLists()
				}

			},
			fail: err => {
				wx.showToast({
					title: '删除失败, 请重试',
					icon: 'loading',
					duration: 1000
				})
				this.resetMove()
				this.showLists()
			}
		})
	},

	// 触摸开始
	touchS: function (e) {
		// console.log('开始：' + JSON.stringify(e))
		// 是否只有一个触摸点
		if (e.touches.length === 1) {
			// console.log(e.touches[0].clientX)
			// return
			this.setData({
				// 触摸起始的X坐标
				startX: e.touches[0].clientX
			})
		}
	},
	// 触摸移动
	touchM: function (e) {
		// console.log('移动：' + JSON.stringify(e))
		let that = this
		if (e.touches.length === 1) {
			// 触摸点的X坐标
			let moveX = e.touches[0].clientX
			// 计算手指起始点的X坐标与当前触摸点的X坐标的差值
			let disX = that.data.startX - moveX

			let todoStyle = ''
			
			if (disX < 0) {
				todoStyle = 'moveRight'
			} else if (disX > 0) {
				todoStyle = 'moveLeft'
			}
			// 获取手指触摸的是哪一个item
			const index = e.currentTarget.dataset.index
			// console.log(index)

			let temp = that.data.lists

			// 将拼接好的样式设置到当前item中
			temp[index].todoStyle = todoStyle
			// 更新列表的状态
			this.setData({
				lists: temp,
				status: 1
			});
		}
	},

	onLoad: function () {
		this.resetMove()
		this.showLists()
		// console.log(this.data.lists)
	},

	showStatus(e) {
		const status = e.currentTarget.dataset.status
		this.setData({ status: status })
		this.showLists()
	},

	help(status, target) {
		// 全部
		if (status == '1') {
			return [...target]
		}
		// 未完成
		if (status == '2') {
			return target.filter(item => {
				return item.status == '0' ? item : ''
			})
		}
		// 已完成
		if (status == '3') {
			return target.filter(item => {
				return item.status == '1' ? item : ''
			})
		}
	},
	showLists(e) {
		const status = this.data.status
		wx.getStorage({
			key: 'lists',
			success: res => {
				console.log(res)
				this.setData({
					lists: this.help(status, res.data)
				})
			},
		})

	},

	addTodo (e) {
		if (!this.data.addText.trim()) {
			wx.showToast({
				title: '请输入',
				icon: 'loading',
				duration: 1000
			})
			return
		}

		// 获取输入框的内容
		let newDate = new Date()
		console.log(newDate)
		const task = {
			title: this.data.addText,
			status: '0',
			todoStyle: '',
			id: newDate.getTime(),
			time: util.formatTime(newDate)
		}

		const temp = [task, ...this.data.lists]
		// console.log(temp)

		this.setData({
			lists: temp,
			addFormShow: false,
			addText: '',
			status: 1
		})
		wx.setStorage({
			key: 'lists',
			data: temp
		})
		wx.showToast({
			title: '添加成功！',
			icon: 'success',
			duration: 1000
		})

		this.addTodoHide()

	},

	addTodoShow (e) {
		this.resetMove()
		this.showLists()
		this.setData({
			addFormShow: true
		})
	},

	addTodoHide() {
		this.setData({
			addFormShow: false,
			focus: false,
			addText: ''
		})
	},

	setInput (e) {
		// console.log(e.detail.value)
		this.setData({
			addText: e.detail.value
		})
	},

	changeTodo(e) {
		console.log(e)
		const id = e.currentTarget.dataset.id
		const temp = this.data.lists
		temp.forEach((item) => {
			if (item.id == id) {
				if (item.status == '0') {
					item.status = '1'
					wx.showToast({
						title: '已完成任务',
						icon: 'success',
						duration: 1000
					})
				} else {
					item.status = '0'
					wx.showToast({
						title: '任务打回重做',
						icon: 'loading',
						duration: 1000
					})
				}
			}
		})
		this.setData({
			lists: temp,
			status: 1
		})
		wx.setStorage({
			key: 'lists',
			data: temp
		})
	}
})
