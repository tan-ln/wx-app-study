# components
- 组件可以将一组功能封装一个 component 里，并且可以在页面上以自定义标签的形式引入
```html
<!-- 列表 -->
<discover></discover>
<!-- 底部加载更多提示 -->  
<bottomLoadMore :message='mes' :show.sync='showLoading'></bottomLoadMore>
<!-- 组件暂无数据的提示 -->
<placeholder></placeholder>
<!-- 弹出广告 -->
<bombscreen></bombscreen>
```
- 引入组件
```js
import Bomnbscreen from '@/components/bomb_screen'
import Placeholder from '@/components/placeholder'
import BottomLoadMore from '@/components/bottom_load_more'
import Discover from '@/components/discover'
```
- 在 components 声明页面地组件构成
```js
components = {
    // 标签名: 组件名
    bombscreen: Bomnbscreen,
    placeholder: Placeholder,
    bottomLoadMore: BottomLoadMore,
    discover: Discover
}
```
- 组件标签可以携带参数
```html
<bottomLoadMore :message='mes' :show.sync='showLoading'></bottomLoadMore>
```
> `message="load more ..."` 传参        
`:message='mes'` 则是把参数防止在 data 中
```js
data = {
    showLoading: false,
    mes: 'loading more'
}
```
**组件数据props动态更新**
使用 `.sync` => <bottomLoadMore :message='mes' :show.sync='showLoading'></bottomLoadMore>
- 在组件文件内 props 接收传递的数据
```js
props = {
    show: {
        type: Boolean,
        default: true,
    },
    message: {
        default: '正在加载中',
        type: String,
    }
}
```
组件内接收
```html
<view class="loadMoreGIF" wx:if="{{show}}">
    <image src="../images/loadding.gif"></image>
    <text>{{message}}</text>
</view>
```