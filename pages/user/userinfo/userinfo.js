// pages/user/userinfo/userinfo.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userimg:'',
    userinfo: [{
        id: 1,
        name: '姓名:',
        text: '1'
      },
      {
        id: 1,
        name: '手机:',
        text: ''
      },
      
      {
        id: 1,
        name: '班级:',
        text: ''
      },
      {
        id: 1,
        name: '住址:',
        text: ''
      },
      {
        id: 1,
        name: '民族:',
        text: ''
      },
      {
        id: 1,
        name: '学号:',
        text: ''
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // this.data.userinfo = app.globalData.userinfo
    console.log(app.globalData.userinfo)
    console.log(app.globalData.user)
    console.log(this.data.userinfo)
    // this.data.userimg = 'http://192.168.22.46/' + app.globalData.user.stuHeadImg+''
    // this.setData({
    //   'userimg': 'http://192.168.22.46/' + app.globalData.user.stuHeadImg + ''
    // })
    console.log(this.data.userimg)
    
      this.setData({
        'userimg': 'http://192.168.22.46:8001/' + app.globalData.user.stuHeadImg + '',
        'userinfo[0].text': app.globalData.userinfo.stuName,
        'userinfo[1].text': app.globalData.userinfo.telePhone,
        'userinfo[2].text': app.globalData.userinfo.className,
        'userinfo[3].text': app.globalData.userinfo.familyAdd,
        'userinfo[4].text': app.globalData.userinfo.nationName,
        'userinfo[5].text': app.globalData.user.stuNO
     
      })
    
    console.log(this.data.userinfo)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})