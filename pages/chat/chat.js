let disp = require("../../utils/broadcast");
var WebIM = require("../../utils/WebIM")["default"];
let isfirstTime = true
var app = getApp();
Page({
  data: {
    search_btn: true,
    search_chats: false,
    show_mask: false,
    yourname: "",
    unReadSpotNum: 0,
    unReadNoticeNum: 0,
    messageNum: 0,
    unReadTotalNotNum: 0,
    arr: [],
    show_clear: false,
    isLogin: '',
  },

  onLoad() {
    let me = this;

    wx.getStorage({
      key: 'isLogin',
      success: function (res) {
        me.setData({
          isLogin: res.data
        })
      },
    })
    
    //监听加好友申请
    disp.on("em.xmpp.subscribe", function () {
      me.setData({
        messageNum: getApp().globalData.saveFriendList.length,
        unReadTotalNotNum: getApp().globalData.saveFriendList.length + getApp().globalData.saveGroupInvitedList.length
      });
    });

    //监听未读消息数
    disp.on("em.xmpp.unreadspot", function (message) {
      me.setData({
        arr: me.getChatList(),
        unReadSpotNum: getApp().globalData.unReadMessageNum > 99 ? '99+' : getApp().globalData.unReadMessageNum,
      });
    });

    //监听未读加群“通知”
    disp.on("em.xmpp.invite.joingroup", function () {
      me.setData({
        unReadNoticeNum: getApp().globalData.saveGroupInvitedList.length,
        unReadTotalNotNum: getApp().globalData.saveFriendList.length + getApp().globalData.saveGroupInvitedList.length
      });
    });

    this.getRoster();
  },

  listGroups() {
    var me = this;
    return WebIM.conn.listRooms({
      success: function (rooms) {
        wx.setStorage({
          key: "listGroup",
          data: rooms
        });
        me.getChatList()
      },
      error: function (err) {
        console.log(err)
      }
    });
  },

  getRoster() {
    let me = this;
    let rosters = {
      success(roster) {
        console.log('%c 好友列表', 'color: blue')
        console.log(roster)
        var member = [];
        for (let i = 0; i < roster.length; i++) {
          if (roster[i].subscription == "both") {
            member.push(roster[i]);
          }
        }

        wx.setStorage({
          key: "member",
          data: member
        });
        console.log('%c 好友里列表', 'color: green')
        console.log(member)
        me.setData({ member: member });
        me.listGroups()
      },
      error(err) {
        console.log(err);
      }
    };
    WebIM.conn.getRoster(rosters);
  },

  getChatList() {
    var array = [];
    var member = wx.getStorageSync("member");
    var myName = wx.getStorageSync("myUsername");
    var listGroups = wx.getStorageSync('listGroup') || [];
    for (let i = 0; i < member.length; i++) {
      let newChatMsgs = wx.getStorageSync(member[i].name + myName) || [];
      console.log('newChatMsgs')
      console.log(newChatMsgs)
      let historyChatMsgs = wx.getStorageSync("rendered_" + member[i].name + myName) || [];
      let curChatMsgs = historyChatMsgs.concat(newChatMsgs);
      if (curChatMsgs.length) {
        let lastChatMsg = curChatMsgs[curChatMsgs.length - 1];
        lastChatMsg.unReadCount = newChatMsgs.length;
        if (lastChatMsg.unReadCount > 99) {
          lastChatMsg.unReadCount = "99+";
        }
        let dateArr = lastChatMsg.time.split(' ')[0].split('-')
        let timeArr = lastChatMsg.time.split(' ')[1].split(':')
        lastChatMsg.dateTimeNum = `${dateArr[1]}${dateArr[2]}${timeArr[0]}${timeArr[1]}${timeArr[2]}`
        lastChatMsg.time = `${dateArr[1]}月${dateArr[2]}日 ${timeArr[0]}时${timeArr[1]}分`
        array.push(lastChatMsg);
      }
    }

    for (let i = 0; i < listGroups.length; i++) {
      let newChatMsgs = wx.getStorageSync(listGroups[i].roomId + myName) || [];
      let historyChatMsgs = wx.getStorageSync("rendered_" + listGroups[i].roomId + myName) || [];
      let curChatMsgs = historyChatMsgs.concat(newChatMsgs);
      if (curChatMsgs.length) {
        let lastChatMsg = curChatMsgs[curChatMsgs.length - 1];
        lastChatMsg.unReadCount = newChatMsgs.length;
        if (lastChatMsg.unReadCount > 99) {
          lastChatMsg.unReadCount = "99+";
        }
        let dateArr = lastChatMsg.time.split(' ')[0].split('-')
        let timeArr = lastChatMsg.time.split(' ')[1].split(':')

        lastChatMsg.time = `${dateArr[1]}月${dateArr[2]}日 ${timeArr[0]}时${timeArr[1]}分`
        lastChatMsg.dateTimeNum = `${dateArr[1]}${dateArr[2]}${timeArr[0]}${timeArr[1]}${timeArr[2]}`
        lastChatMsg.groupName = listGroups[i].name
        array.push(lastChatMsg);
      }
    }

    array.sort((a, b) => {
      return b.dateTimeNum - a.dateTimeNum
    })
    return array;
  },

  onShow: function () {
    let me = this
    console.log('app.globalData.isLogin')
    console.log(app.globalData.isLogin)
    wx.getStorage({
      key: 'isLogin',
      success: function(res) {
        me.setData({
          isLogin: res.data
        })
      },
    })

    this.setData({
      arr: this.getChatList(),
      unReadSpotNum: getApp().globalData.unReadMessageNum > 99 ? '99+' : getApp().globalData.unReadMessageNum,
      messageNum: getApp().globalData.saveFriendList.length,
      unReadNoticeNum: getApp().globalData.saveGroupInvitedList.length,
      unReadTotalNotNum: getApp().globalData.saveFriendList.length + getApp().globalData.saveGroupInvitedList.length
    });

    if (getApp().globalData.isIPX) {
      this.setData({
        isIPX: true
      })
    }
  },


  openSearch: function () {
    this.setData({
      search_btn: false,
      search_chats: true,
      gotop: true
    });
  },

  onSearch: function (val) {
    let searchValue = val.detail.value
    let chartList = this.getChatList();
    let serchList = [];
    chartList.forEach((item, index) => {
      if (String(item.username).indexOf(searchValue) != -1) {
        serchList.push(item)
      }
    })
    this.setData({
      arr: serchList,
    })
  },

  cancel: function () {
    this.setData({
      search_btn: true,
      search_chats: false,
      arr: this.getChatList(),
      unReadSpotNum: getApp().globalData.unReadMessageNum > 99 ? '99+' : getApp().globalData.unReadMessageNum,
      gotop: false
    });
  },

  clearInput: function () {
    this.setData({
      input_code: '',
      show_clear: false
    })
  },

  onInput: function (e) {
    let inputValue = e.detail.value
    if (inputValue) {
      this.setData({
        show_clear: true
      })
    } else {
      this.setData({
        show_clear: false
      })
    }
  },

  tab_contacts: function () {
    wx.redirectTo({
      url: "../main/main?myName=" + wx.getStorageSync("myUsername")
    });
  },

  close_mask: function () {
    this.setData({
      search_btn: true,
      search_chats: false,
      show_mask: false
    });
  },

  tab_setting: function () {
    wx.redirectTo({
      url: "../setting/setting"
    });
  },

  tab_notification: function () {
    wx.redirectTo({
      url: "../notification/notification"
    });
  },

  into_chatRoom: function (event) {
    let detail = event.currentTarget.dataset.item;
    if (detail.chatType == 'groupchat' || detail.chatType == 'chatRoom') {
      this.into_groupChatRoom(detail)
    } else {
      this.into_singleChatRoom(detail)
    }
  },

  //	单聊
  into_singleChatRoom: function (detail) {
    var my = wx.getStorageSync("myUsername");
    var nameList = {
      myName: my,
      your: detail.username
    };
    wx.navigateTo({
      url: "../chatroom/chatroom?username=" + JSON.stringify(nameList)
    });
  },

  //	群聊 和 聊天室 （两个概念）
  into_groupChatRoom: function (detail) {
    var my = wx.getStorageSync("myUsername");
    var nameList = {
      myName: my,
      your: detail.groupName,
      groupId: detail.info.to
    };
    wx.navigateTo({
      url: "../groupChatRoom/groupChatRoom?username=" + JSON.stringify(nameList)
    });
  },


  del_chat: function (event) {
    let detail = event.currentTarget.dataset.item;
    let nameList;
    if (detail.chatType == 'groupchat' || detail.chatType == 'chatRoom') {
      nameList = {
        your: detail.info.to
      };
    } else {
      nameList = {
        your: detail.username
      };
    }

    var myName = wx.getStorageSync("myUsername");
    var currentPage = getCurrentPages();

    wx.showModal({
      title: "删除该聊天记录",
      confirmText: "删除",
      success: function (res) {
        if (res.confirm) {
          wx.setStorageSync(nameList.your + myName, "");
          wx.setStorageSync("rendered_" + nameList.your + myName, "");
          if (currentPage[0]) {
            currentPage[0].onShow();
          }
          disp.fire("em.chat.session.remove");
        }
      },
      fail: function (err) {
      }
    });
  },

});
