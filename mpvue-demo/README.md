# mpvue-demo

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


## 安装和初始化
### 安装 vue-cli
```bash
yarn global vue-cli | npm install -g vue-cli
```
### 初始化一个项目
```bash
vue init mpvue/mpvue-quickstart projName
```
输出
```bash
$ vue init mpvue/mpvue-quickstart projName

? Project name projName
? wxmp appid wxfc097****b431e
? Project description A Mpvue project
? Author tanglin <2196****5@qq.com>
? Vue build runtime
? Use Vuex? No
? Use ESLint to lint your code? No
? 小程序测试，敬请关注最新微信开发者工具的“测试报告”功能

   vue-cli · Generated "mpvue-demo".

   To get started:

     cd mpvue-demo
     npm install
     npm run dev

   Documentation can be found at http://mpvue.com
```
### package.json
scripts 可运行脚本, 可以发出的命令
dependencies (上线、整个项目)依赖
devDependencies (运行、开发时)依赖
babel
px2rpx
webpack

### npm run 输出当前可运行脚本   
`npm run dev `
运行 dev 脚本
"dev": "node build/dev-server.js"

打开开发者
main.js 是入口文件

## 几个简单的 mpvue 操作
- `v-modules` 数据绑定  
```html
<input type="text" v-model="myTodo" placeholder="点我" />
```
- @click 事件绑定   
```html
<button @click="addTodo">按钮</button>
```
- v-for 循环
```html
<li v-key="i" v-for="(todo, i) in todos" :class="{'done': todo.done}" @click="toggle(i)">{{todo.text}} ？ {{todo.done}}</li>
```
  `v-for` 中是一个类似 `for..in` 的循环结构，指定`( key, index )`   
  `: ` 动态绑定属性，标签或组件的属性是跟data相关   
  `:class="{'done': todo.done}"` 表示后面为 `true` 则赋给前面的类名   
  `@click()` 函数可以传参   
  一个 {} 表示js 运行区域
- computed: {} 计算属性
Vue里面，就像所有的方法都在methods中一样，所有的计算属性都写在 vue 实例的 computed 属性中，这个计算属性就是一个函数，返回值为最后属性的值。   
定义完成之后，我们就可以像用普通属性一样去用计算属性。    
计算属性的方法可以包含很多繁重的逻辑，最终返回我们需要的值