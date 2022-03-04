# 知识点：WEUI 的使用、wxml template 微信小程序模板、picker 日历组件

## [github.weui.wxss](https://github.com/Tencent/weui-wxss)

## [wxapp 组件(actionsheet、button、list...)](https://github.com/Tencent/weui-wxss/tree/master/dist/example)

## WXML提供模板（template），可以在模板中定义代码片段，然后在不同的地方调用。

> 项目需要多次使用同一个布局和样式的时候，您就可以考虑使用template（模板）来减少冗余代码。

> 使用方法
1. 在根目录下新建文件夹 template，里面存放 template 的 wxml、wxss 等
2. template.wxml并 設計樣式 template.wxss  
```wxml
<template name="dormInfo">
    <view class="dorm-info weui-flex weui-select">
        <text class="content">{{name}}</text>
        <text class="tip {{tip.color}}">{{tip.content}}</text>
    </view>
</template>
```

3. 在需要使用模板的文件下
- 引入模板 `<import src="../../templates/template.wxml" />`
- 使用is属性，声明需要的使用的模板，然后将模板所需要的data传入  
`<template is="dormInfo" data="{{...dorm}}"></template>`
> ps: data使用ES6 展开运算符‘...’，则模板里面绑定数据就不需要在前面加入item了
```js
Page({
  data: {
    dorm: {
        name: '默认寝室',
        tip: {
            content: '研一930',
            color: 'green'
        }
    },
  }
})
```
4. 在需要使用的wxss文件导入 template.wxss   
`@import '../../templates/template.wxss';`

## 日历组件 
```wxml
<!-- 日历组件 -->
<picker data-type="startPicker" mode="date" value="2018-05-25" start="2018-05-24" end="2018-05-30" bindchange="bindDateChange">
    <view class="weui-input">{{startDate}}</view>
</picker>
```
```wxml
<picker data-type="endPicker" mode="date" value="{{endDate}}" start="{{endPickerStart}}" end="2018-05-31" bindchange="bindDateChange">
    <view class="weui-input">{{endDate}}</view>
</picker>
```
```js
  data: {
    startDate: '2018-05-25',
    endDate: ''
  },
  bindDateChange(e) {
    console.log(e)
    const type = e.currentTarget.dataset.type
    if (type == 'startPicker') {
      this.setData({
        startDate: e.detail.value,
        endPickerStart: e.detail.value
      })
    } else {
      this.setData({
        endDate: e.detail.value,
      
      })
    }
  },
```