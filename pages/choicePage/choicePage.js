const db = wx.cloud.database()
Page({
  data: {
    show: false,
    password: '',
    account: '',
    openid: ''
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
  goNext(e) {
    console.log('点击了审批端登录')
    wx.navigateTo({
      url: '../nextChoice/nextChoice',
    })
  },
  //点击用户端登录的时候判断是否数据库有对应缓存openid的账号，若有则自动登录
  goIndex(e) {
    const Loading = this.selectComponent('#my-loading')
    let that = this
    //显示用户端的遮罩层
    this.setData({
      show: true,
    })
    console.log('点击了用户登录')
    db.collection("studentUser")
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
            wx.switchTab({
              url: '../index/index',
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
  // 隐藏遮罩层
  onClickHide() {
    this.setData({
      show: false
    });
  },
  lookGuide() {
    wx.showActionSheet({
      itemList: ['团团活动管理操作手册', '团团活动管理更新日志'],
      success (res) {
        console.log(res.tapIndex)
        if (res.tapIndex == 0) {
          wx.showModal({
            title: '团团活动管理操作手册',
            content: "https://docs.qq.com/doc/DYlpRa096eEFXemVU",
            showCancel: true,
            confirmText: '复制地址',
            success(res) {
              if (res.confirm) {
                wx.setClipboardData({
                  data: "https://docs.qq.com/doc/DYlpRa096eEFXemVU",
                  success(res) {
                    wx.getClipboardData({
                      success(res) {
                        console.log(res.data) // data
                      }
                    })
                  }
                })
              }
            }
      
          })
        }
        else{
          wx.showModal({
            title: '团团活动管理更新日志',
            content: "https://docs.qq.com/pdf/DYkhBdU9IWkNZSGdX?",
            showCancel: true,
            confirmText: '复制地址',
            success(res) {
              if (res.confirm) {
                wx.setClipboardData({
                  data: "https://docs.qq.com/pdf/DYkhBdU9IWkNZSGdX?",
                  success(res) {
                    wx.getClipboardData({
                      success(res) {
                        console.log(res.data) // data
                      }
                    })
                  }
                })
              }
            }
      
          })
        }
      },
      fail (res) {
        console.log(res.errMsg)
      }
    })
  },
  //点击登录
  enterIndex() {
    const Loading = this.selectComponent('#my-loading')
    let that = this
    let account = this.data.account
    let password = this.data.password
    db.collection("studentUser")
      .where({
        account: account
      })
      .get({})
      .then(res => {
        console.log("查询数据库成功", res.data)
        if (password == res.data[0].password) {
          console.log('登录成功')
          Loading.OnStart();
          setTimeout(() => {
            wx.switchTab({
              url: '../index/index',
              success() {
                Loading.onClose();
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
  //获取输入的账号
  getAccount(e) {
    this.setData({
      account: e.detail.value
    })
  },
  //获取输入的密码
  getPassWord: function (e) {
    var password = e.detail.value;
    this.setData({
      password: password
    })
  },
  //进入注册界面
  goRegister() {
    wx.navigateTo({
      url: '../closeRegister/closeRegister',
    })
  },
  //进入找回账号密码页面
  goRetrieve() {
    wx.navigateTo({
      url: '../retrieve/retrieve',
    })
  }
})