// pages/eligibility/eligibility.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 0,

    userList: [],
    unregisteredUserList: [],
    vipUserList: [],
    unregisteredVipUserList: [],
    eventAdminList: [],
    unregisteredEventAdminList: [],
    appoAdminList: [],
    unregisteredAppoAdminList: [],

    userTotal: 0,
    unregisteredUserTotal: 0,
    eventAdminTotal: 0,
    unregisteredEventAdminTotal: 0,
    appoAdminTotal: 0,
    unregisteredAppoAdminTotal: 0,
    vipUserTotal: 0,
    unregisteredVipUserTotal: 0,
  },
  /**
   * 查询用户端的所有账号
   */
  getStuUser() {
    wx.cloud.database().collection("studentUser")
      .count()
      .then(res => {
        this.setData({
          userTotal: res.total
        })
      })
      .then(res => {
        var array = [];
        for (var i = 0; i < this.data.userTotal; i = i + 20) {
          wx.cloud.database().collection("studentUser")
            .skip(i)
            .get()
            .then(res => {
              array = array.concat(res.data)
            })
            .catch(res => {
              console.log("查询数据库失败", res)
            })
            .then(res => {
              this.setData({
                userList: array
              })
            })
        }

      })
  },

  /**
   * 查询未注册的用户端账号
   */
  getUnregisteredStuUser() {
    wx.cloud.database().collection("studentUserList")
      .count()
      .then(res => {
        this.setData({
          unregisteredUserTotal: res.total
        })
      })
      .then(res => {
        var array = [];
        for (var i = 0; i < this.data.unregisteredUserTotal; i = i + 20) {
          wx.cloud.database().collection("studentUserList")
            .skip(i)
            .get()
            .then(res => {
              array = array.concat(res.data)
            })
            .catch(res => {
              console.log("查询数据库失败", res)
            })
            .then(res => {
              this.setData({
                unregisteredUserList: array
              })
            })
        }

      })
  },

  /**
   * 查询不受限预约端的所有账号
   */
  getVipUser() {
    wx.cloud.database().collection("vipUser")
      .count()
      .then(res => {
        this.setData({
          vipUserTotal: res.total
        })
      })
      .then(res => {
        var array = [];
        for (var i = 0; i < this.data.vipUserTotal; i = i + 20) {
          wx.cloud.database().collection("vipUser")
            .skip(i)
            .get()
            .then(res => {
              array = array.concat(res.data)
            })
            .catch(res => {
              console.log("查询数据库失败", res)
            })
            .then(res => {
              this.setData({
                vipUserList: array
              })
            })
        }

      })
  },

  /**
   * 查询未注册的不受限预约端账号
   */
  getUnregisteredVipUser() {
    wx.cloud.database().collection("vipUserList")
      .count()
      .then(res => {
        this.setData({
          unregisteredVipUserTotal: res.total
        })
      })
      .then(res => {
        var array = [];
        for (var i = 0; i < this.data.unregisteredVipUserTotal; i = i + 20) {
          wx.cloud.database().collection("vipUserList")
            .skip(i)
            .get()
            .then(res => {
              array = array.concat(res.data)
            })
            .catch(res => {
              console.log("查询数据库失败", res)
            })
            .then(res => {
              this.setData({
                unregisteredVipUserList: array
              })
            })
        }

      })
  },

  /**
   * 查询审批活动端的所有账号
   */
  getEventAdmin() {
    wx.cloud.database().collection("user")
      .count()
      .then(res => {
        this.setData({
          eventAdminTotal: res.total
        })
      })
      .then(res => {
        var array = [];
        for (var i = 0; i < this.data.eventAdminTotal; i = i + 20) {
          wx.cloud.database().collection("user")
            .skip(i)
            .get()
            .then(res => {
              array = array.concat(res.data)
            })
            .catch(res => {
              console.log("查询数据库失败", res)
            })
            .then(res => {
              this.setData({
                eventAdminList: array
              })
            })
        }

      })
  },

  /**
   * 查询审批预约端的所有账号
   */
  getAppoAdmin() {
    wx.cloud.database().collection("user1")
      .count()
      .then(res => {
        this.setData({
          appoAdminTotal: res.total
        })
      })
      .then(res => {
        var array = [];
        for (var i = 0; i < this.data.appoAdminTotal; i = i + 20) {
          wx.cloud.database().collection("user1")
            .skip(i)
            .get()
            .then(res => {
              array = array.concat(res.data)
            })
            .catch(res => {
              console.log("查询数据库失败", res)
            })
            .then(res => {
              this.setData({
                appoAdminList: array
              })
            })
        }

      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var type = options.type //定义请求的集合是否为现有成员还是注册成员，0是现有，1是注册
    this.setData({
      type: type
    })
    this.getStuUser()
    this.getEventAdmin()
    this.getAppoAdmin()
    this.getVipUser()
    this.getUnregisteredStuUser()
    this.getUnregisteredVipUser()
  },

  /**
   * 删除账号
   */
  delete(event) {
    var collection = event.currentTarget.dataset.collection;
    var openid = event.currentTarget.dataset.openid;
    let that = this
    console.log("event", event)
    console.log("openid", openid)

    async function removeDataFromCollection(collection, openid) {
      try {
        if (collection === "studentUser" && openid) {
          const res = await wx.cloud.database().collection("studentUser").where({
            _openid: openid
          }).remove();
          console.log(res);
          that.getStuUser()
        } else if (collection === "user" && openid) {
          const res = await wx.cloud.database().collection("user").where({
            _openid: openid
          }).remove();
          console.log(res);
          that.getEventAdmin()
        } else if (openid) {
          const res = await wx.cloud.database().collection("user1").where({
            _openid: openid
          }).remove();
          console.log(res);
          that.getAppoAdmin()
        } else {
          console.log("无效的 collection 或 openid 为空");
        }
      } catch (error) {
        console.error("发生错误", error);
      }
    }
    removeDataFromCollection(collection, openid);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})