---
title: 微信小程序组件化开发框架 WePY 初体验
date: 2018-06-04 15:32:12
tags: [wepy, 小程序, 组件化]
---

# 微信小程序组件化开发框架 WePY 初体验
> 写在前面：组件化开发的组价(`Component`)，说的不是小程序中的 `scroll-view` 这种页面组件，而是指一些设计为通用性的，用来构建较大型应用程序的软件，如 UI 组件。核心意义在于复用。WePY 就是基于 Vue、react 在 MVVM 基础上建立起来的组件开发框架。

## WePY项目的创建

### 全局安装或更新WePY命令行工具
```bash
npm install wepy-cli -g
```
### 初始化一个项目
```bash
wepy init standard myproject
```
> 输出，后面几个选择 `no` 暂时用不上
```bash
? Project name 项目名称
? AppId wxfc0******1e 你的AppId
? Project description A WePY 项目名称
? Author ta***in 2196****35@qq.com 
? Use ESLint to lint your code? (y/n) No
? Use Redux in your project? (y/n) No
? Use web transform feature in your project? (/n) No

   wepy-cli · Generated "try-wepy".

```
### 安装依赖
**首先要切换至项目目录**
`cd myproject`
```bash
yarn
```
或者 
```bash
npm install
```
推荐 `yarn`
> 根据 `package.json` 安装依赖文件，将会在 `node_modules` 文件中添加依赖包
### 开启实时编译
```bash
wepy build --watch
```
> 这会像 `stylus` 一样开始编译并监听文件改变，此时会生成 `dist` 目录（小程序目录，微信开发者工具从此处打开小程序），我们的开发目录在 `src/` 下

## WePY项目的目录结构
```
├── dist                   小程序运行代码目录（该目录由WePY的build指令自动编译生成，请不要直接修改该目录下的文件）
├── node_modules           
├── src                    代码编写的目录（该目录为使用WePY后的开发目录）
|   ├── components         WePY组件目录（组件不属于完整页面，仅供完整页面或其他组件引用）
|   |   ├── com_a.wpy      可复用的WePY组件a
|   |   └── com_b.wpy      可复用的WePY组件b
|   ├── pages              WePY页面目录（属于完整页面）
|   |   ├── index.wpy      index页面（经build后，会在dist目录下的pages目录生成index.js、index.json、index.wxml和index.wxss文件）
|   |   └── other.wpy      other页面（经build后，会在dist目录下的pages目录生成other.js、other.json、other.wxml和other.wxss文件）
|   └── app.wpy            小程序配置项（全局数据、样式、声明钩子等；经build后，会在dist目录下生成app.js、app.json和app.wxss文件）
└── package.json           项目的package配置
```

## 添加项目
- app.wpy   
    `app.wpy` 文件其实就是小程序中的 `app.json` 文件，我们在这个文件中注册 App 的页面，参照这一段
```wpy
export default class extends wepy.app {
    config = {
        pages: [
            'pages/home',
            'pages/classify',
            'pages/shop_cart',
            'pages/info',
            'pages/index'
        ],
```
- 新建文件  
在 `src/pages/` 目录下新建注册的页面，后缀名为 `.wpy`
- 基本格式
```wpy
<style lang="less"></style>
<template>
    <view></view>
</template>
<script>
    // wepy 在本地的 node_modules/ 下（其实也在全局，如果全局安装了 wepy）
    import wepy from 'wepy'

    // 单页面组件
    export default class Home extends wepy.page {
        // es6 class 内部，不是 json 不使用 : 
        data = {

        }
    }
</script>
```
- 微信开发者工具    
使用`微信开发者工具`-->`添加项目`，项目目录请选择 `dist` 目录，即可根据配置（`project.config.json`）完成项目信息自动配置。

- 打开你就能看到你的小程序了

## 其他
- 依赖管理  
何为依赖管理？ 依赖管理说白了就是构建一个有向无环图。项目A依赖项目B，项目B依赖项目C，那么当你的项目依赖A的时候，依赖管理工具会自动让你的项目依赖B和C。 要想构建有向无环图，最关键的是要将项目转化为有向无环图中的结点。所以对于项目往往有description，作者信息，版本信息等额外信息。 
- 全局样式
`app.wpy` 文件中 `<style></style>` 存放全局样式，我们通常在这里引入公共样式、基础样式等
- 组件 component 化开发
1. 在 component 文件夹内定义组件
export default class Card extends wepy.component
意思是说：基于wepy.component 类新生出一个组件类，将此组件以模块的方式向外输出
2. 页面引入组件，至此，页面开发不叫页面开发，而是组件开发，
页面由组件构成，将页面分为几个组件
就如飞机，全世界都在生产，组装在美国
3. 在页面的 script component 区域内 声明一下
```js
component = {
	组件名card: 类名Card,
}
```
组件式开发将类以 html 标签的形式在页面上显示
4. 除了小程序 的页面组件之外，我们可以定制，可以使用社区的组件，可以从 github...