const db = wx.cloud.database()
Page({
  data: {
    wxId: '',
    radio: '1'
  },
  onLoad(options) {

  },
  onChange(event) {
    this.setData({
      radio: event.detail,
    });
    console.log(this.data.radio)
  },
  // 添加用户
  addUser() {
    let wxId = this.data.wxId
    if (this.data.radio == 1) {
      db.collection("studentUserList")
        .add({
          data: {
            wxId: wxId
          },
        }).then(res => {
          wx.showToast({
            title: '成功'
          })
        })
        .catch(err => {
          wx.showToast({
            title: '失败',
            icon: "none"
          })
        })
    }
    if (this.data.radio == 2) {
      db.collection("userList")
        .add({
          data: {
            wxId: wxId
          },
        }).then(res => {
          wx.showToast({
            title: '成功'
          })
        })
        .catch(err => {
          wx.showToast({
            title: '失败',
            icon: "none"
          })
        })
    }
    if (this.data.radio == 3) {
      db.collection("user1List")
        .add({
          data: {
            wxId: wxId
          },
        }).then(res => {
          wx.showToast({
            title: '成功'
          })
        })
        .catch(err => {
          wx.showToast({
            title: '失败',
            icon: "none"
          })
        })
    }
    if (this.data.radio == 4) {
      db.collection("vipUserList")
        .add({
          data: {
            wxId: wxId
          },
        }).then(res => {
          wx.showToast({
            title: '成功'
          })
        })
        .catch(err => {
          wx.showToast({
            title: '失败',
            icon: "none"
          })
        })
    }
  },
  //获取输入的账号
  getWxId(e) {
    this.setData({
      wxId: e.detail.value
    })
  },
})