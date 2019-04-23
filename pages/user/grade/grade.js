// pages/user/grade/grade.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    grade: [
      { id: 1, textbook: '', score: "分数" },

    ],
    picker: ['2017-2018', '2017-2020', '2017-2021', '2017-2019'],
    index: "",
    textbook: '',
    score: ''
  
  },
  PickerChange(e){
    var _this =this
    this.setData({
      'index' : e.detail.value
    })
    console.log(this.data.index)
    console.log(this.data.picker[this.data.index])
    console.log(app.globalData.userinfo.stuUUID)
    const gradeObj = {
      api: '/score/list/' + this.data.picker[this.data.index] + '/' + app.globalData.userinfo.stuUUID+'',
      data: {
       
      },
      method: "GET",
    }
    app.req.httpApi(gradeObj.api, gradeObj.data, gradeObj.method).then((res) => {
      console.log(res)
      if (res.length == 0) {
        _this.setData({
          'textbook': '',
          'score': '分数'
        })
        wx.showToast({
          title: '无此学期成绩',
          icon: 'none',
          duration: 1000
        })
      }else{
        _this.setData({
          'textbook': res[0].subject,
          'score': res[0].score
          

        })
        
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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