# ToDoList

**wxapp 切换类名**
- DOM 编程：
    ```js
	.classList.remove('active')
    .classList.add('active')
    ```
- MVVM 编程 (Model-View-ViewModel)     
    MVVM Model(数据模型data) View VM(视图模型层)    
    wxml 是一个模板         
	{{ 数据状态 }} 进行数据绑定 数据直接输出到页面    
	动态的 可编译   
	data 活动的数据 setData 改变状态    
	状态一旦改变 界面立即改变   
	这就是单项数据绑定

    数据驱动界面 数据改变界面自动更新   
    
- 小程序 数据属性
```
    class="{{status=='1'?'active':''}}"     
                        数据决定状态，直接从data获取数据并改变状态  
    bindtap=""              事件绑定    
    data-demo="id"          数据属性,以区分事件target       
    wx:for="{{}}"           for 指令 循环输出模板   
    wx:key="index"          和 for 同时出现，   
    {{item.id}}             获取动态数据，默认每一项为一个 item(item.title、item.id。。。)
```

- 弹出层表单 移动端屏幕小 层的概念 z-index
```css
display: none;
position: absolute;
```


- 消息提示框  
```  js
wx.showToast({
    title: '请输入',
    icon: 'loading',    // icon 只支持 success 、loading
    duration: 1000
})
```
```js
wx.showModal({
    title: '提示',
    content: '模态弹窗',
    success: function (res) {
        if (res.confirm) {
            console.log('用户点击确定')
        } else {
            console.log('用户点击取消')
        }
    }
})
```
```js
wx.showActionSheet({
    itemList: ['A', 'B', 'C'],
    success: function(res) {
        console.log(res.tapIndex)
    },
    fail: function(res) {
        console.log(res.errMsg)
    }
})
```

- 数据缓存
```js
wx.setStorage(OBJECT) 
wx.setStorageSync(KEY,DATA) //同步缓存
// 获取
wx.getStorage(OBJECT) 
// 移除
wx.removeStorage(OBJECT) 
// 清空
wx.clearStorage() 
```
```js
    // 本地保存lists 
    wx.setStorageSync('todo_list', this.data.lists)
    const lists = wx.getStorageSync('todo_list')
```

- 获取系统时间日期
```js
    //在小程序中，新建项目时，就会有一个utils.js文件，就是获取日期和时间的    
    const util = require('../../utils/util.js'); 
    const time = util.formatTime(new Date());  
    // 格式为： 2018/05/14 13:59:19
```

- 触摸事件  
touchstart  
touchmove   
touchend    
