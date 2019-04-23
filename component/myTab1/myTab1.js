Component({
  properties: {
    mytabdata:{
      type: Array
    },
  },
  data: { // 组件内部数据
    cardCur: 0,
    textContent: {name: 'aaaa'}
  },
  methods: { // 组件内部方法
    cardSwiper(e) {
      this.setData({
        cardCur: e.detail.current
      })
    },
  }
})