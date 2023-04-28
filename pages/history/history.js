const db = wx.cloud.database()
const app = getApp()
const _ = db.command
Page({
  data: {
    list: [],
    item: '',
    currentPage: 1,
    totalPage: 0,
    totalRecord: 0,
    popShow: false,
  },
  //返回首页并退出登录
  back() {
    console.log("点击了返回")
    wx.showModal({
      title: '退出登录并返回主页',
      content: '您确定退出用户端吗？',
      success(res) {
        if (res.confirm) {
          wx.redirectTo({
            url: '../choicePage/choicePage',
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  //获取活动列表
  getList() {
    let that = this
    this.setData({
      popShow: true
    })
    //调用云函数来获取用户openid
    wx.cloud.callFunction({
        name: 'getData'
      })
      .then(res => {
        console.log("用户openid", res.result.openid)
        db.collection("huoDong")
          .where({
            //使用用户的openid来筛选活动
            _openid: res.result.openid,
            state: _.or(3, 4)
          })
          .limit(4)
          .skip(4 * ((that.data.currentPage) - 1))
          .get()
          .then(res => {
            console.log('查询数据库成功', res.data)
            //将返回的res.data里面的值赋值给list
            this.setData({
              list: res.data,
              item: res.data.length,
              popShow: false,
            })
          })
      })
      .catch(err => {
        console.log("请求云函数失败", err)
      })
  },
  onLoad() {
    let that = this
    wx.cloud.callFunction({
        name: 'getData'
      })
      .then(res => {
        db.collection("huoDong")
          .where({
            _openid: res.result.openid,
            state: _.or(3, 4),
          })
          .count()
          .then(e => {
            console.log(e.total)
            let totalPage
            if (e.total % 4 == 0) {
              totalPage = Math.floor(e.total / 4)
            } else {
              totalPage = Math.floor(e.total / 4) + 1
            }
            that.setData({
              totalRecord: e.total,
              totalPage: totalPage
            })
          })
      })
    this.getList()
  },

  //监听下拉刷新
  onPullDownRefresh: function () {
    console.log('用户刷新了页面')
    //刷新页面数据
    this.getList()
  },
  nextPage() {
    if (this.data.currentPage < this.data.totalPage) {
      this.setData({
        currentPage: this.data.currentPage + 1
      })
      this.getList()
    } else {
      wx.showToast({
        title: '已经到最后一页',
        icon: 'none',
        duration: 2000
      })
    }
  },
  lastPage() {
    console.log("tip")
    if (this.data.currentPage != 1) {
      this.setData({
        currentPage: this.data.currentPage - 1
      })
      this.getList()
    } else {
      wx.showToast({
        title: '已经是第一页了',
        icon: 'none',
        duration: 2000
      })
    }
  },
  //跳转到详情页面
  goDetail(e) {
    wx.navigateTo({
      //跳转到详情页面并携带活动id（包括记录id+用户类型+详情类型）
      url: '/pages/eventDetail/eventDetail?id=' + e.currentTarget.dataset.id + e.currentTarget.dataset.user + e.currentTarget.dataset.type
    })
  },
})