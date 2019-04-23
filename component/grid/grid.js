
Component({
  properties: {
    mytabdata: {
      type: Array
    },
  },
  data: { // 组件内部数据
    gridList: [{
      id: 1,
      name: "学院信息",
      icon: "../../images/college.png",
      url: '/pages/gridNavPage/college/college'
    },
    {
      id: 2,
      name: "广现活动",
      icon: "../../images/party.png",
      url: '/pages/gridNavPage/party/party'
    },
    {
      id: 3,
      name: "就业查询",
      icon: "../../images/seek.png",
      url: '/pages/gridNavPage/seek/seek'
    },
    {
      id: 4,
      name: "学院新闻",
      icon: "../../images/new.png",
      url: '/pages/gridNavPage/new/new'
    },
    {
      id: 5,
      name: "学院公告",
      icon: "../../images/interest.png",
      url: '/pages/gridNavPage/interest/interest'
    },
    {
      id: 6,
      name: "其他",
      icon: "../../images/rests.png",
      url: '/pages/gridNavPage/rests/rests'
    }
    ],
  },
  methods: { // 组件内部方法

  }
})