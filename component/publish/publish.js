// component/publish/publish.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    propArray: [

    ],
    selectShow: false,
    nowText: '请选择类型',
    animationData: {},
    nowIdx: null,

    title: '',
    text: '',
    pushmodal: false,
    cardinfo: [{
      title: '',
      text: ''
    }],
  },

  publish() {
    var then =this
    if (app.globalData.lsLogin==false){
      wx: wx.navigateTo({
        url: '/pages/user/register/register',

      })
    }else{
      this.setData({
        'pushmodal': true
      })
      const pushObj = {
        api: '/post/tab/list',
        data: {

        },
        method: "GET",
      }
      app.req.httpApi(pushObj.api, pushObj.data, pushObj.method).then((res) => {
        console.log(res)
        then.setData({
          'propArray': res
        })
      })
    }
    
  },
  hideModal(){
    this.setData({
      'pushmodal': false
    })
  },
  inputValue(e){
    this.setData({
      'title': e.detail.value
    })
  },
  textValue(e) {
    this.setData({
      'text': e.detail.value
    })
  },
  selectToggle(){
    this.setData({
      'selectShow' : true
    })
    var nowShow = this.data.selectShow;//获取当前option显示的状态
    //创建动画
    var animation = wx.createAnimation({
      timingFunction: "ease"
    })
    this.data.animation = animation;
    if (nowShow) {
      animation.rotate(0).step();

      this.data.animationData = animation.export()

    } else {
      animation.rotate(180).step();

      this.data.animationData = animation.export()

    }
  },
  setText(e) {
    this.setData({
      "nowIdx": e.currentTarget.dataset.index,
      "selectShow":false
    })
    
    
    this.setData({
      "nowText": this.data.propArray[this.data.nowIdx].tabName
    })
    
    // this.nowText = this.propArray[this.nowIdx].tabName
     console.log(this.data.propArray[this.data.nowIdx].tabID)
  },
  pushinfo() {
    this.setData({
      'cardinfo.title': this.data.title,
      'cardinfo.text': this.data.text
    })
    if (this.data.title == '') {
      wx.showToast({
        title: '标题不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;

    }
    if (this.data.text == '') {
      wx.showToast({
        title: '内容不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;

    }
    if (this.data.nowIdx == null) {
      wx.showToast({
        title: '请选择类型',
        icon: 'none',
        duration: 1000
      })
      return false;
    }else{
      console.log(this.data.cardinfo)
      const publishObj = {
        api: '/post/add',
        data: {
          "postTitle": this.data.cardinfo.title,
          "postTab": this.data.propArray[this.data.nowIdx].tabID,
          "stuUUID": app.globalData.user.stuUUID ,
          "postContent": this.data.cardinfo.text 
        },
        method: "POST",
      }
      app.req.httpApi(publishObj.api, publishObj.data, publishObj.method).then((res) => {
        console.log(res)
        
      })
      this.setData({
        'pushmodal': false
      })
      console.log(this.data.cardinfo)
      wx.showToast({
        title: '发布成功',
        icon: 'succes',
        mask: true
      })
    }
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