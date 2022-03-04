- 目录架构 
    ```
	assets/     静态资源文件
	        icons/
	        images/
	        *.js       
            *.json	提供默认数据

    modules/    开发功能模块化 多人协作 可读性高    
    ```

- 小程序的本质是 `web html5` 开发，但是依赖于微信的高性能界面组件(view...)    
    `wx.api` 来自于微信的原生体验 让我们快速扩平台开发，又能得到性能上的保证

    `webview` 是原生的 iOS、android 显示 html5 页面的容器

- es6 模块化语法 module   
    封装 `export default ModuleName`    
    引入 `import ModuleName from ModulePath`

- 小程序页面跳转  
    ```js
    wx.navigateTo({
        url: `/asd/asd?id=?{id}`
        // 支持 字符串模板 和 携带参数(?id=)
    })
    ```

- `wx:for & wx:key `  
    循环输出模板，为了性能问题，我们要添加 `wx:key `  
    用一个唯一的 `key` 来标识一行     
    如果在 `sliders` 里面有值变化的时候，并不是重新生成整个循环的 html     
    而是可以根据变化的相应的 `key` 和 `item` 进行替换，从而提高性能和效率   
    因为 `for` 在页面上非常多，所以这种做法非常重要

- App.js 获取数据   
    ```js
    // 导入本地 数据
    import db from './assets/db'
    // 拷贝赋值
    Object.assign(this.globalData, db)
    ```
    ```js
    // 获取外部数据     
    wx.request({
		url: 'https://resources.ninghao.net/wxapp-case/db.json',
		success: (response) => {
			console.log(response)
			//   赋值
			Object.assign(this.globalData, response.data)
			console.log(this.globalData)
		},
		fail: (error) => {
			console.log(error)
		}
	})
    ```
- 显示动态数据
    ```js
    // 从 Page 里得到 App
    const app = getApp()
    // app.gloabalData.sliders

    onLoad() {
        this.setData({
            sliders: app.globalData.slides
        })
    }
    ```

- 微信图片预览  
    图片预览接口 `wx.previewImage`
```js
    wx.previewImage({
        // 当前图片路径
        current: curImg,
        // 预览图片列表
        urls: imgList,
        fail: function () {
        	console.log('fail')
        },
        complete: function () {
        	console.info("点击图片预览")
        },
    })
```

- 视频播放
```html
    <video src="{{item.video}}" binderror="listenerVideo" autoplay="{{autoplay}}" custom-cache="{{false}}" poster="{{item.image}}" controls>
        <!-- <cover-view class="controls">
            <cover-image class="img" src="{{item.image}}" />
        </cover-view> -->
    </video>
```
poster 视频封面图片     
cove-view 由于层级原因，部分手机看不到播放控件