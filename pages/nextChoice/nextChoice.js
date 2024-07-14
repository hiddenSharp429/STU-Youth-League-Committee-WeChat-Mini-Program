const db = wx.cloud.database()
Page({
  data: {
    openid: '',
    activityLoginShow: false,
    appointmentLoginShow: false,
    activityAccount: '',
    activityPassword: '',
    appointmentAccount: '',
    appointmentPassword: '',
  },
  //使用缓存来达到用户自动登录的目的，除非用户主动删除或因存储空间原因被系统清理，否则可以自动登录
  onLoad() {
    let that = this
    //调用云函数来获取用户openid
    wx.cloud.callFunction({
        name: 'getData'
      })
      .then(res => {
        console.log("用户openid", res.result.openid)
        wx.setStorage({
          key: "key",
          data: res.result.openid,
          encrypt: true, // 若开启加密存储，setStorage 和 getStorage 需要同时声明 encrypt 的值为 true
          success() {
            wx.getStorage({
              key: "key",
              encrypt: true, // 若开启加密存储，setStorage 和 getStorage 需要同时声明 encrypt 的值为 true
              success(res) {
                console.log("缓存的加密数据", res.data)
                that.setData({
                  openid: res.data
                })
              }
            })
          }
        })
      })
      .catch(err => {
        console.log("请求云函数失败", err)
      })
  },
  //返回choicePage页面
  back() {
    wx.navigateBack()
  },
  //点击活动端登录的时候判断是否数据库有对应缓存openid的账号，若有则自动登录
  goApprovalLogin(e) {
    const Loading = this.selectComponent('#my-loading')
    console.log('点击了审批活动')
    let that = this
    //显示活动端登录的遮罩层
    this.setData({
      activityLoginShow: true
    })
    console.log('点击了用户登录')
    db.collection("user")
      .where({
        _openid: this.data.openid
      })
      .get({})
      .then(res => {
        console.log("请求数据库成功", res.data)
        //若数据库请求到的数据长度不为0则证明数据库中有该openid对应的账号，实现自动登录
        if (res.data.length != 0) {
          Loading.OnStart();
          wx.showLoading({
            title: '正在自动登录中',
            mask: true
          })
          setTimeout(() => {
            wx.navigateTo({
              url: '../approval/approval',
              success() {
                Loading.OnClose();
              }
            })
          }, 2000);
        }
      })
      .catch(res => {
        console.log("请求数据库失败")
      })
  },
  // 隐藏活动登录遮罩层
  onClickHideActivity() {
    this.setData({
      activityLoginShow: false
    });
  },
  //点击活动登录
  enterApproval() {
    const Loading = this.selectComponent('#my-loading')
    let activityAccount = this.data.activityAccount
    let activityPassword = this.data.activityPassword
    db.collection("user")
      .where({
        account: activityAccount
      })
      .get({})
      .then(res => {
        console.log("查询数据库成功", res.data)
        if (activityPassword == res.data[0].password) {
          Loading.OnStart();
          setTimeout(() => {
            console.log("开始运行")
            wx.navigateTo({
              url: '../approval/approval',
              success() {
                Loading.OnClose();
              }
            })
          }, 1000);
        } else {
          console.log("登录失败")
          wx.showToast({
            title: '登录失败，账号或密码不正确',
            icon: "none"
          })
        }
      })
      .catch(res => {
        wx.showToast({
          title: '登录失败，账号或密码不正确',
          icon: "none"
        })
      })




  },
  //获取活动的账号
  getActivityAccount(e) {
    this.setData({
      activityAccount: e.detail.value
    })
  },
  //获取活动的密码
  getActivityPassWord(e) {
    this.setData({
      activityPassword: e.detail.value
    })
  },
  goAppointmentLogin(e) {
    console.log('点击了审批预约')
    //显示活动端登录的遮罩层
    this.setData({
      appointmentLoginShow: true
    })
  },
  // 隐藏预约登录遮罩层
  onClickHideAppointment() {
    this.setData({
      appointmentLoginShow: false
    });
  },
  //点击预约登录
  enterAppointment() {
    const Loading = this.selectComponent('#my-loading')
    let appointmentAccount = this.data.appointmentAccount
    let appointmentPassword = this.data.appointmentPassword
    db.collection("user1")
      .where({
        account: appointmentAccount
      })
      .get({})
      .then(res => {
        console.log("查询数据库成功", res.data)
        if (appointmentPassword == res.data[0].password) {
          Loading.OnStart();
          setTimeout(() => {
            wx.navigateTo({
              url: '../appointmentApproval/appointmentApproval',
              success() {
                Loading.OnClose();
              }
            })
          }, 1000);
        } else {
          console.log("登录失败")
          wx.showToast({
            title: '登录失败，账号或密码不正确',
            icon: "none"
          })
        }
      })
      .catch(res => {
        wx.showToast({
          title: '登录失败，账号或密码不正确',
          icon: "none"
        })
      })




  },
  //获取预约的账号
  getAppointmentAccount(e) {
    this.setData({
      appointmentAccount: e.detail.value
    })
  },
  //获取活动的密码
  getAppointmentPassWord(e) {
    this.setData({
      appointmentPassword: e.detail.value
    })
  },
  // 跟goApprovalLogin同理根据缓存内容来进行自动登录
  goAppointmentLogin(e) {
    const Loading = this.selectComponent('#my-loading')
    console.log('点击了审批预约')
    //显示活动端登录的遮罩层
    this.setData({
      appointmentLoginShow: true
    })
    db.collection("user1")
      .where({
        _openid: this.data.openid
      })
      .get({})
      .then(res => {
        console.log("请求数据库成功", res.data)
        //若数据库请求到的数据长度不为0则证明数据库中有该openid对应的账号，实现自动登录
        if (res.data.length != 0) {
          Loading.OnStart();
          wx.showLoading({
            title: '正在自动登录中',
            mask: true
          })
          setTimeout(() => {
            wx.navigateTo({
              url: '../appointmentApproval/appointmentApproval',
              success() {
                Loading.OnClose();
              }
            })
          }, 2000);
        }
      })
      .catch(res => {
        console.log("请求数据库失败")
      })
  },
  //进入注册界面
  goRegister(options) {
    const type = options.currentTarget.dataset.type
    if (type == 1) {
      wx.navigateTo({
        url: '../register/register?type=1',
      })
    }
    else{
      if (type == 2) {
        wx.navigateTo({
          url: '../register/register?type=2',
        })
      }
    }

  },
  //进入找回账号密码页面
  goRetrieve() {
    wx.navigateTo({
      url: '../retrieve/retrieve',
    })
  }
})