// pages/textDetail/textDetail.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isModalShow1: false,
    isModalShow2: false,
    commentsTxt: '', // 添加评论
    rpTxt: '', // 回复
    discuss: '',
    discusss: '',
    params: null,
    textDetail: null,
    uuid: {},
    headimg: '',
    index:''
  },
  showMoadl1() {  // 添加评论
    if (app.globalData.isLogin == false) {
      wx:wx.navigateTo({
        url: '/pages/user/register/register',
        
      })
    }else{
      this.setData({
        "isModalShow1": true
      })
    }
    

  },
  hideMoadl() {
    this.setData({
      "isModalShow1": false,
      "isModalShow2": false
    })
  },
  showMoadl(e) {
    
    if (app.globalData.isLogin == false) {
      wx: wx.navigateTo({
        url: '/pages/user/register/register',

      })
    } else {
      var then =this
      this.setData({
        "isModalShow2": true,
        "index": e.currentTarget.dataset.index,
        
      })
      console.log(this.data.discuss[this.data.index])
      this.setData({
        'discusss': this.data.discuss[this.data.index]

      })
      console.log(this.data.discusss)
    }
    
  },
  commentsTxt(e){
    this.setData({
      'commentsTxt': e.detail.value
    })
  },
  rpTxt(e){
    this.setData({
      'rpTxt': e.detail.value
    })
  },
  addComment() {  // 添加评论
    const _this = this
    if (this.data.commentsTxt==''){
      wx.showToast({
        title: '请输入评论内容',
        icon: 'none'
      })
      return
    }else{
      // console.log(this.data.commentsTxt)
      // console.log(this.data.textDetail.postUUID)
      // console.log(app.globalData.user.stuUUID)
      // console.log(this.data.textDetail.stuUUID)
      // console.log(this.data.commentsTxt)
      const commentObj = {
        api: '/post/discuss/add',
        data: {
          postUUID: this.data.textDetail.postUUID,
          stuA: app.globalData.user.stuUUID,
          stuB: this.data.textDetail.stuUUID,
          discussContent: this.data.commentsTxt
        },
        method: 'POST',
      }
      app.req.httpApi(commentObj.api, commentObj.data, commentObj.method).then((res) => {
        _this.getDiscuss(_this.data.params)
        _this.clearInputEvent()
      })
      this.setData({
        "isModalShow1":false,
        "commentsTxt": '', 
        "rpTxt": '',
        "discuss": '',
        "discusss": '',
      })
      wx.showToast({
        title: '发送成功',
        icon: 'none'
      })
     
    }
  },
  reply() {  // 回复
    const _this = this
    if (this.data.rpTxt == '') {
      wx.showToast({
        title: '请输入评论内容',
        icon: 'none'
      })
      return
    }else{
      const commentObj = {
        api: '/post/discuss/add',
        data: {
          postUUID: this.data.textDetail.postUUID,
          stuA: app.globalData.user.stuUUID,
          stuB: this.data.discusss.stuA,
          discussContent: this.data.rpTxt
        },
        method: 'POST',
      }
      app.req.httpApi(commentObj.api, commentObj.data, commentObj.method).then((res) => {
        _this.getDiscuss(_this.data.params)
        _this.clearInputEvent()
        
      })
      this.setData({
        "isModalShow2": false,
        "rpTxt": ""
      })
      wx.showToast({
        title: '发送成功',
        icon: 'none'
      })
      // 
      
    }
  },
  lookover () {  // 点击用户头像
    wx.navigateTo({
      url: '/pages/lookover/lookover?stuUUID=' + this.data.textDetail.stuUUID + '&stuHeadImg=' + this.data.textDetail.stuHeadImg + '',

    })
  },
  clearInputEvent (res) {  // 清空val
    this.setData({
      "discuss": '',
      "discusss": ''
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    var _this = this
    // wx.showLoading({
    //   title: '加载中',
    // })
    console.log('*** 获取参数 ***')
    this.data.params = options.postUUID
    console.log(this.data.params)
    const textDetailObj = {
      api: '/post/get/' + this.data.params + '',
      data: {

      },
      method: "GET",
    }
    app.req.httpApi(textDetailObj.api, textDetailObj.data, textDetailObj.method).then((res) => {
      console.log('****文章详情******')

      _this.setData({
        'textDetail': res,
        'headimg': "http://192.168.22.46:8001/" + res.stuHeadImg + ""
      })
      // _this.headimg = "http://192.168.22.46/" + _this.textDetail.stuHeadImg + ""
      console.log(_this.data.textDetail)
      console.log(_this.data.headimg)

      // 获取评论
      _this.getDiscuss(_this.data.params)

      
    })
  },
  getDiscuss(params) {  // 获取评论
    const _this = this
    const discussObj = {
      api: '/post/discuss/get/' + params + '',
      data: {

      },
      method: "GET",
    }
    app.req.httpApi(discussObj.api, discussObj.data, discussObj.method).then((res) => {
      console.log(res)
      if (res.length == 0) {
        _this.data.discuss = ''
      }
      _this.setData({
        'discuss': res
      })
    })
  }

})