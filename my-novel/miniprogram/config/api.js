const autoCompleteSearch = 'https://novel.juhe.im/auto-complete?query='

// 追书搜索 ?keyword=盗墓笔记
const zhui_search = 'http://api.zhuishushenqi.com/book/fuzzy-search?query='
// 全本阅读 
const quan_search = 'http://lunbo.gdugm.cn/search/suggest?key='

// 书籍封面 静态资源
const coverUrl = 'http://statics.zhuishushenqi.com'

const yisou_search = keyword => {
  // http://api.easou.com/api/bookapp/searchdzh.m?word=%E6%96%97%E7%BD%97%E5%A4%A7%E9%99%86&page_id=1&count=20&cid=eef_&os=ios&appverion=1049

  let url = 'http://api.easou.com/api/bookapp/searchdzh.m?word='
  let param = '&page_id=1&count=20&cid=eef_&os=ios&appverion=1049'

  return url + keyword + param
}

// 书籍详情
const zhui_book = 'http://api.zhuishushenqi.com/book/'

// 目录
const quan_chapt = 'http://lunbo.gdugm.cn/toc/mix?bookId='
// http://api.zhuishushenqi.com/mix-atoc/5cb86416de93840de4dc4a0c?view=chapters
const zhui_chapt = id => {
  let url = 'http://api.zhuishushenqi.com/mix-atoc/'
  let query = '?view=chapters'
  return url + id + query
}

const openChapt = 'http://chapter.xmxingheju.com/chapter/'

export {
  autoCompleteSearch,
  zhui_search,
  quan_search,
  coverUrl,
  yisou_search,
  zhui_book,
  quan_chapt,
  zhui_chapt,
  openChapt
}