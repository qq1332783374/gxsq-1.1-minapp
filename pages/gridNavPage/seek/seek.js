// pages/gridNavPage/seek/seek.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    seekInput: '',
    jobinfo: ''
  },
  seekInput(e) {
    this.setData({
      'seekInput': e.detail.value
    })

  },
  seek() {
    var _this = this
    var reg = /^[0-9]+.?[0-9]*$/
    console.log(this.data.seekInput)
    if (!reg.test(this.data.seekInput)) {
      const indusObj = {
        api: '/post/job/get/like/job/post',
        data: {
          postName: this.data.seekInput,
          nextPage: 1
        },
        method: "POST",
      }
      app.req.httpApi(indusObj.api, indusObj.data, indusObj.method).then((res) => {
        console.log(res)
        if (res.list.length == 0) {
          wx.showToast({
            title: '暂无相关内容',
            icon: 'none',
            duration: 1000
          })
        } else {
        _this.setData({
          'jobinfo': res.list
        })
        }
      })
    }else{
      const industryObj = {
        api: '/post/job/get/industryID/job/post/' + this.data.seekInput + '/1',
        data: {

        },
        method: "GET",
      }
      app.req.httpApi(industryObj.api, industryObj.data, industryObj.method).then((res) => {
        console.log(res)
        if (res.list.length == 0) {
          wx.showToast({
            title: '暂无相关内容',
            icon: 'none',
            duration: 1000
          })
        } else {
        _this.setData({
          'jobinfo': res.list
        })
        }
      })
    }
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // const industryObj = {
    //   api: '',
    //   data: {

    //   },
    //   method: "GET",
    // }
    // app.req.httpApi(industryObj.api, industryObj.data, industryObj.method).then((res) => {
    //   console.log(res)

    // })
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