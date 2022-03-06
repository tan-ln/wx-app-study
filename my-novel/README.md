# 我的小说

## API
追书神器(https://github.com/xiadd/zhuishushenqi) + 快读全本内容
https://github.com/zimplexing/vue-nReader/blob/master/doc/zhuishushenqi.md

### 排行榜分类
> [http://api.zhuishushenqi.com/ranking/gender](http://api.zhuishushenqi.com/ranking/gender)
```js
// 结果示例
{
  "_id": "54d42d92321052167dfb75e3",
  "title": "追书最热榜 Top100",
  "cover": "/ranking-cover/142319144267827",
  "collapse": false,
  "monthRank": "564d820bc319238a644fb408",
  "totalRank": "564d8494fe996c25652644d2",
  "shortTitle": "最热榜"
},
```

### 排行榜
> (http://api.zhuishushenqi.com/ranking/分类id)

> 如：追书最热榜 [http://api.zhuishushenqi.com/ranking/54d42d92321052167dfb75e3](http://api.zhuishushenqi.com/ranking/54d42d92321052167dfb75e3)


### 书籍信息搜索
> (http://api.zhuishushenqi.com/book/fuzzy-search?query=书名) 

> 如：盗墓笔记 [http://api.zhuishushenqi.com/book/fuzzy-search?query=%E7%9B%97%E5%A2%93%E7%AC%94%E8%AE%B0](http://api.zhuishushenqi.com/book/fuzzy-search?query=%E7%9B%97%E5%A2%93%E7%AC%94%E8%AE%B0)

### 图片
> (http://statics.zhuishushenqi.com/加上书籍的 cover)

> [http://statics.zhuishushenqi.com/agent/http%3A%2F%2Fimg.1391.com%2Fapi%2Fv1%2Fbookcenter%2Fcover%2F1%2F48075%2F48075_a58cb22af5e14449b734fdd2ed7bf90f.jpg%2F](http://statics.zhuishushenqi.com/agent/http%3A%2F%2Fimg.1391.com%2Fapi%2Fv1%2Fbookcenter%2Fcover%2F1%2F48075%2F48075_a58cb22af5e14449b734fdd2ed7bf90f.jpg%2F)

### 书籍内容搜索
- 获取 id
> http://lunbo.gdugm.cn/search/suggest?key=间客
```js
{
  "ok": true,
  "keywords": [
    {
      "text": "间客",
      "tag": "bookname",
      "id": "50874442abf1ced53c00002c",
      "author": "猫腻"
    },
    {
      "text": "间客回档",
      "tag": "bookname",
      "id": "582da9670ca8e6e7153c6517",
      "author": "中分的帅锅"
    }
  ]
}
```

- 获取目录
> http://lunbo.gdugm.cn/toc/mix?bookId=上面获取的id
```js
  // 部分
  "chapters": [
    {
      "title": "第一卷   第1章   钟楼街的游行",
      "link": "http://book.kdqb.cc/getBooks.aspx?method=content&bookId=41735&chapterFile=U_41735_201801301657554645_2069_1.txt"
    },

  ...
```

- 章节内容
> http://chapter.xmxingheju.com/chapter/上面获取的link

### 追书神器源
https://novel.juhe.im/booklists

https://novel.juhe.im/categories

https://novel.juhe.im/sub-categories

### 宜搜源
http://api.easou.com/api/bookapp/searchdzh.m?word=斗罗大陆&page_id=1&count=20&cid=eef_&os=ios&appverion=1049

## axios 小程序不能用

## scroll-view && scrollTop
```html
<scroll-view scroll-y='true' scroll-top='{{ scrollTop }}' id='theId'></scroll-view>
```
```js
    let query = wx.createSelectorQuery().in(this)
    query.select('#reading-container').boundingClientRect((res) => {
      console.log('res: ', res)
      // res.top // 这个组件内 #id 节点的上边界坐标
    }).exec()
```