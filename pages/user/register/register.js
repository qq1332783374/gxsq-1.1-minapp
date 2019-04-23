// pages/user/register/register.js
var app = getApp();
var WebIM = require("../../../utils/WebIM")["default"];
Page({

  /**
   * 页面的初始数据
   */
  data: {

    stuNO: '',
    password: '',
    userInfo: '',

  },

  getNameValue: function(e) {
    this.setData({
      'stuNO': e.detail.value
    })
  },
  getPasswordValue: function(e) {
    this.setData({
      'password': e.detail.value
    })
  },
  register() {
    var _this = this
    if (this.data.stuNO == '') {
      wx.showToast({
        title: '账号不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    if (this.data.password == '') {
      wx.showToast({
        title: '密码不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else {
      console.log('学号'+this.data.stuNO)
      console.log('密码' + this.data.password)
      const registerObj = {
        api: '/student/login',
        data: {
          stuNO: this.data.stuNO,
          password: this.data.password
        },
        method: "POST",
      }

      app.req.httpApi(registerObj.api, registerObj.data, registerObj.method).then((res) => {
        console.log('登陆信息')
        console.log(res)
        if (res.statusCode == "err") {
          wx.showToast({
            title: '账号或密码错误',
            icon: 'none',
            duration: 1000
          })
        } else {
          wx.showToast({
            title: '登录成功',
            icon: 'none',
            duration: 1000
          })

          // 环信IM 注册
          let options = {
            username: _this.data.stuNO,
            password: '1',
            nickname: res.stuName,
            appKey: WebIM.config.appkey,
            success: function (res) {
              console.log(res)
              if (res.statusCode == 200) {
                let options = {
                  apiUrl: WebIM.config.apiURL,
                  user: _this.data.stuNO,
                  pwd: '1',
                  appKey: WebIM.config.appkey
                };
                WebIM.conn.open(options);
              }
            },
            error: function (err) {
              console.log('注册失败')
              console.log(err)
              if (err.statusCode == 400) {
                console.log('前往登录')
                let options = {
                  apiUrl: WebIM.config.apiURL,
                  user: _this.data.stuNO,
                  pwd: '1',
                  appKey: WebIM.config.appkey
                };
                WebIM.conn.open(options);
              }
            },
            apiUrl: WebIM.config.apiURL
          };
          WebIM.utils.registerUser(options);


          app.globalData.isLogin = true
          wx.setStorage({
            key: 'isLogin',
            data: true,
          })
          wx.setStorage({
            key: 'myUsername',
            data: res.stuNO,
          })

          app.globalData.user = res
          console.log(app.globalData.isLogin)
          console.log("***用户信息==app.globalData.userinfo***")
          console.log(app.globalData.user)

          const userinfoObj = {
            api: '/student/get/' + res.stuUUID + '',
            method: "GET",
            data: {},
          }
          app.req.httpApi(userinfoObj.api, userinfoObj.data, userinfoObj.method).then((res) => {
            console.log('****详细信息*****')
            console.log(res)
            app.globalData.userinfo = res
            
            console.log('***12***')
            console.log(app.globalData.userinfo)
          })
          
          wx.navigateBack({
            delta: 1
          })
        }
        // console.log(res)
      })
    }
    console.log(this.data.stuNO)
    console.log(this.data.password)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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