var app = getApp();
var WebIM = require("../../utils/WebIM.js")["default"];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stuUUID: '',//stuUUID
    lookover: '',
    stuHeadImg: "",//头像
    myName: wx.getStorageSync("myUsername")
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var _this = this
    this.setData({
      stuUUID: options.stuUUID,
      stuHeadImg: 'http://192.168.22.46:8001/' + options.stuHeadImg + ''
    });
    console.log(options)
    const lookObj = {
      api: '/student/get/' + this.data.stuUUID + '',
      data: {

      },
      method: "GET",
    }
    app.req.httpApi(lookObj.api, lookObj.data, lookObj.method).then((res) => {

      _this.setData({
        'lookover': res
      })
      wx.setStorage({
        key: 'to',
        data: res,
      })
      console.log(_this.data.lookover)
    })
  },
  sendMessage () {  // 发信息
    var _this = this
    var to = wx.getStorageSync("to")
    if (app.globalData.isLogin) { // 已经登陆
      console.log('into chatroom')
      // 添加好友
      console.log(_this.data.lookover)
      // WebIM.conn.subscribed({
      //   to: JSON.stringify(_this.data.myName),
      //   message: '[resp:true]'
      // });
      WebIM.conn.subscribe({
        to: to.stuNO,
      });
      

      var nameList = {
        myName: this.data.myName,
        your: to.stuNO
      };
      wx.navigateTo({
        url: "../chatroom/chatroom?username=" + JSON.stringify(nameList)
      });

    } else {
      wx:wx.showToast({
        title: '请先登陆',
        icon: 'none',
      })
      setTimeout(() => {
        wx.navigateTo({
          url: '/pages/user/register/register',
        })
      }, 500)
    }
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
  
})