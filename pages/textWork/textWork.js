// pages/textDetail/textDetail.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    params: '',
    textWork: ''
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var _this = this
    // wx.showLoading({
    //   title: '加载中',
    // })
    console.log('*** 获取参数 ***')
    //http://192.168.22.46/student
    this.data.params = options.postUUID
    console.log(this.data.params)
    const textWorkObj = {
      api: '/post/job/get/job/post/' + this.data.params + '',
      data: {

      },
      method: "GET",
    }
    app.req.httpApi(textWorkObj.api, textWorkObj.data, textWorkObj.method).then((res) => {
      console.log(res)
      _this.setData({
        'textWork': res,

      })
    })


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})