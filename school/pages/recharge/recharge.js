// pages/recharge/recharge.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btn_disabled: true,
    // items: [
    //   {name: '50', value: '￥50', },
    //   {name: '100', value: '￥100'},
    //   {name: '150', value: '￥150'},
    //   {name: '200', value: '￥200'},
    //   {name: '250', value: '￥250'},
    // ]

    dorm: {
      name: '默认寝室',
      tip: {
        content: '研一930',
        color: 'green'
      }
    },
    amounts: [
      { value: 50, checked: false, },
      { value: 100, checked: false, },
      { value: 150, checked: false, },
      { value: 200, checked: false, },
      { value: 250, checked: false, },
    ]
  },
  bindAmountChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    let amounts =this.data.amounts
    let strVal = e.detail.value

    for (let amount of amounts) {
      amount.checked = amount.value == strVal
    }
    this.setData({
      amounts,
      btn_disabled: false
    })
  }
})