// 时间转换
var times = require('../../utils/util.js')
// pages/home/home.js
var app = getApp();

Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    propArray: [
      
      {
        "tabID": 1,
        "tabName": "学习"
      },
      {
        "tabID": 2,
        "tabName": "校园热事"
      },
      {
        "tabID": 3,
        "tabName": "爱好"
      },
      {
        "tabID": 4,
        "tabName": "娱乐"
      },
      {
        "tabID": 5,
        "tabName": "岗位提供"
      },
      {
        "tabID": 0,
        "tabName": "全部贴子"
      },
    ],
    selectShow: false,
    nowText: '贴子类型',
    animationData: {},
    nowIdx: null,
    seekInput: '',
    jobinfo: '',

    page: 1,
    pages: 0,
    articles: [],
    current: 'tab2',
    myTabData: null,
    myTab:'',
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://image.weilanwl.com/img/4x3-1.jpg'
    }, {
      id: 1,
      type: 'image',
      url: 'https://image.weilanwl.com/img/4x3-2.jpg'
    }, {
      id: 2,
      type: 'image',
      url: 'https://image.weilanwl.com/img/4x3-3.jpg'
    }, {
      id: 3,
      type: 'image',
      url: 'https://image.weilanwl.com/img/4x3-4.jpg'
    }, {
      id: 4,
      type: 'image',
      url: 'https://image.weilanwl.com/img/4x3-2.jpg'
    }, {
      id: 5,
      type: 'image',
      url: 'https://image.weilanwl.com/img/4x3-4.jpg'
    }, {
      id: 6,
      type: 'image',
      url: 'https://image.weilanwl.com/img/4x3-2.jpg'
    }],
  },
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  selectToggle() {
    this.setData({
      'selectShow': !this.data.selectShow
    })
    
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
          'myTab': res.list
        })
        }
      })
    } else {
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
          'myTab': res.list
        })
        }
      })
    }
  },
  setText(e) {
    var _this =this
    
    this.setData({
      "nowIdx": e.currentTarget.dataset.index,
      "selectShow": !this.data.selectShow
      
    })


    this.setData({
      "nowText": this.data.propArray[this.data.nowIdx].tabName
    })
    if (this.data.propArray[this.data.nowIdx].tabID==0){
      wx.getStorage({
        key: 'paramsObj',//对应存储的key名
        success: function (res) {
          
          _this.setData({
            'myTabData': res.data
          })
        }
      })
    }else{
      const paramsObj = {
        api: '/post/list/' + this.data.propArray[this.data.nowIdx].tabID + '/1',
        data: {},
        method: 'GET'
      }
      app.req.httpApi(paramsObj.api, paramsObj.data, paramsObj.method).then((res) => {
        console.log(res.list)
        _this.setData({
          'myTabData': res.list
        })
        if (res.list==''){
          wx.showToast({
          title: '没有该类型的贴子哦',
          icon: 'none'
        })
        return
        }
      })
    }

    

    // this.nowText = this.propArray[this.nowIdx].tabName
    console.log(this.data.propArray[this.data.nowIdx].tabID)
  },
  /**
   * 获取文章列表
   */
  getData (params = {}) {
    let _this = this
    // wx.showLoading({
    //   title: '加载中',
    // })
    // 请求参数
    const paramsObj = {
      api: params.api + params.params || '/post/all/',
      data: {},
      method: 'GET'
    }
    app.req.httpApi(paramsObj.api, paramsObj.data, paramsObj.method).then((res) => {
      console.log(res)
      if (res.list) {
        wx.hideLoading()
        _this.setData({
          myTabData: res.list
        })
      } else {
        // wx.showToast({
        //   title: '加载失败',
        //   icon: 'none'
        // })
        // return
      }
    })
  },
  handleChange ({ detail }) {
    console.log(detail)
    this.setData({
        current: detail.key
    });
  },


  /**
   *  获取分类列表
   */
  // onLoad: function (options) {
  //   console.log(1)
  //   console.log(app)
  // },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  getTabData (key) {
    if (key == 'tab1') {  // 全查
      
      this.getData()

    } else if (key == 'tab2') {  // 校园热门
      
      const params = {
        api: '/post/list/1/',
        data: {},
        params: 1
      }
      this.getData(params)

    } else if (key == 'tab3') {  // 全查

      this.getData()

    }
  },

  /**
   * 获取全部数据
   */
  getData (params = {}) {
    let _this = this
    // wx.showLoading({
    //   title: '加载中',
    // })
    // 请求参数
    const parObj = {
      api: '/post/job/get/1',
      data: {

      },
      method: "GET",
    }
    app.req.httpApi(parObj.api, parObj.data, parObj.method).then((res) => {
      console.log(res)
      _this.setData({
        'myTab': res.list
      })
      if (res.list == '') {
        wx.showToast({
          title: '无发帖记录',
          icon: 'none'
        })
        return
      }
    })
    const paramsObj = {
      api: params.api + params.params || '/post/all/1',
      data: {},
      method: 'GET'
    }
    app.req.httpApi(paramsObj.api, paramsObj.data, paramsObj.method).then((res) => {
      console.log(res)
      if (res.list) {

        wx.hideLoading()
        _this.setData({
          myTabData: res.list
        })
        console.log('%c 文章列表', 'color: green')
        console.log(res)
        console.log(res.list)

      } else {

        // wx.showToast({
        //   title: '加载失败',
        //   icon: 'none'
        // })
        // return

      }
    })
  },

  handleChange ({ detail }) {
    
    this.setData({
        current: detail.key
    });
    this.getTabData(detail.key)

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
    wx.showLoading({
      title: '加载中',
    })
    // 请求参数
    const paramsObj = {
      api: '/post/all/1',
      data: {},
      method: 'GET'
    }
    app.req.httpApi(paramsObj.api, paramsObj.data, paramsObj.method).then((res) => {
      console.log(res)
      if (res.list) {

        wx.hideLoading()
        _this.setData({
          myTabData: res.list
        })
        console.log('%c 文章列表', 'color: green')
        console.log(res)
        console.log(res.list)
        wx.setStorage({
          key: 'paramsObj',
          data: res.list
        })

      } else {

        // wx.showToast({
        //   title: '加载失败',
        //   icon: 'none'
        // })
        // return

      }
    })
    // this.fetchArticleList(1)
    // 获取初始数据
    this.getData()
    // 默认不登录
    wx.setStorage({
      key: "isLogin",
      data: false
    })
  },
  onReachBottom() {
    // 下拉触底，先判断是否有请求正在进行中
    // 以及检查当前请求页数是不是小于数据总页数，如符合条件，则发送请求
    // if (!this.loading && this.data.page < this.data.pages) {
    //   this.fetchArticleList(this.data.page + 1)
    // }
    var that = this;
    wx.showLoading({
      title: '玩命加载中',
    })
    this.data.page = this.data.page + 1;
    wx.request({
      url: 'http://192.168.22.46/consumer/student/post/all/' + this.data.page+'',
      method: "GET",
      // 请求头部
      header: {
        'content-type': 'application/text'
      },
      success: function (res) {
        console.log(res)
        if (res.data.list==''){
          wx.showToast({
            title: '暂无更多',
            icon: 'none'
          })
          return false;
          
        }else{
          var moment_list = that.data.myTabData;

          for (var i = 0; i < res.data.list.length; i++) {
            moment_list.push(res.data.list[i]);
          }
          // // 设置数据
          that.setData({
            'myTabData': that.data.myTabData
          })
          // 隐藏加载框
          console.log(res)
          console.log(that.data.myTabData)
          wx.hideLoading();
        }
        // 回调函数
        
      }
    })



  },
  
})