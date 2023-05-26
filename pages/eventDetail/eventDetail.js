Page({
  data: {
    list: [],
    huoDongRejectReason: "",
    yuYueRejectReason: "",
    id: "",
    user: "",
    type: 0,
    huoDongTeac: false,
    appointmentTeac: false
  },
  onLoad(option) {
    let that = this
    //查看传入该页面的参数
    console.log("列表所携带的值", option.id)
    // 创建一个变量使其等于参数
    var parameters = option.id
    //创建一个type变量用来存储详情的类型截取参数的最后一位，1指的是活动，2指的是预约
    var type = parameters.substr(parameters.length - 1)
    //创建一个user变量用来存储用户类型截取参数的最后三位
    var user = parameters.slice(-4, -1)
    // 创建id变量来存放活动的_id字段所需要的值
    var id = parameters.slice(0, -4)
    this.setData({
      user: user,
      type: type,
      id: id
    })
    console.log("user是", this.data.user)
    console.log("id是", id)
    console.log("type是", this.data.type)
    //在“我的”、“历史活动”点击跳转则会申请活动数据库
    if (this.data.type == 1) {
      console.log("将执行HD代码")
      wx.cloud.database().collection("huoDong")
        .doc(id)
        .get()
        .then(res => {
          this.setData({
            list: res.data,
          })
          //若是老师则设为true（为了显示wxml中的块）
          if (that.data.user == "Tea") {
            this.setData({
              huoDongTeac: true
            })
          }
          console.log("这是list", this.data.list)
        })
        .catch(res => {
          console.log("活动详情页请求失败", res)
        })
    }
    if (this.data.type == 2) {
      console.log("将执行YY代码")
      wx.cloud.database().collection("appointment")
        .doc(id)
        .get()
        .then(res => {
          this.setData({
            list: res.data,
          })
          //若是老师则设为true（为了显示wxml中的块）
          if (that.data.user == "Tea") {
            this.setData({
              appointmentTeac: true
            })
          }
          console.log("这是list", this.data.list)
        })
        .catch(res => {
          console.log("预约详情页请求失败", res)
        })
    }
  },
  //活动的通过以及驳回
  huoDongPass() {
    let that = this;
    wx.showLoading({
      title: '正在上传中……',
      mask: true
    })
    wx.cloud.database().collection("huoDong").doc(this.data.id)
      .update({ // updata指 插入数据库中的userlist表；
        //将我们获取到的新值代入
        data: {
          state: 1,
          h5_currentTime: wx.cloud.database().serverDate()
        },
      })
      .then(res => {
        console.log("上传成功", res)
        wx.showToast({
          title: '成功',
        })
        wx.redirectTo({
            url: '../approval/approval',
          })
          .then(() => {
            wx.startPullDownRefresh()
          })
      })
      .catch(err => {
        console.log("上传失败", err)
        wx.showToast({
          title: '失败',
          icon: "none"
        })
      })
    wx.cloud.database().collection("huoDong")
      .doc(this.data.id)
      .get()
      .then(res => {
        console.log("这是该活动相关信息", res.data)
        let openid = res.data._openid
        let activityName = res.data.a1_huodongName
        let activityTime = res.data.a2_startTime
        let userName = res.data.b1_fzrName
        //发送订阅消息给用户
        wx.cloud.callFunction({
            name: 'sendMessage',
            data: {
              openid: openid,
              activityName: activityName,
              activityTime: activityTime,
              userName: userName,
              state: "通过"
            },
          })
          .then(res => {
            console.log("调用成功", res)
          })
          .catch(err => {
            console.log("请求云函数失败", err)
          })
      })


  },
  huoDongPass2() {
    let dataTime = this.getCurrentTime
    let that = this;
    wx.showLoading({
      title: '正在上传中……',
      mask: true
    })
    wx.cloud.database().collection("huoDong").doc(this.data.id)
      .update({ // updata指 插入数据库中的userlist表；
        //将我们获取到的新值代入
        data: {
          state: 4,
          h5_currentTime: wx.cloud.database().serverDate()
        },
      })
      .then(res => {
        console.log("上传成功", res)
        wx.showToast({
          title: '成功',
        })
        wx.navigateTo({
            url: '../approval/approval',
          })
          .then(() => {
            wx.startPullDownRefresh()
          })
      })
      .catch(err => {
        console.log("上传失败", err)
        wx.showToast({
          title: '失败',
          icon: "none"
        })
      })
    wx.cloud.database().collection("huoDong")
      .doc(this.data.id)
      .get()
      .then(res => {
        console.log("这是该活动相关信息", res.data)
        let openid = res.data._openid
        let activityName = res.data.a1_huodongName
        let activityTime = res.data.a2_startTime
        let userName = res.data.b1_fzrName
        //发送订阅消息给用户
        wx.cloud.callFunction({
            name: 'sendMessage',
            data: {
              openid: openid,
              activityName: activityName,
              activityTime: activityTime,
              userName: userName,
              state: "通过"
            },
          })
          .then(res => {
            console.log("调用成功", res)
          })
          .catch(err => {
            console.log("请求云函数失败", err)
          })
      })
  },
  huoDongReject() {
    let that = this;
    wx.showLoading({
      title: '正在上传中……',
      mask: true
    })
    wx.cloud.database().collection("huoDong").doc(this.data.id)
      .update({ // updata指 插入数据库中的userlist表；
        //将我们获取到的新值代入
        data: {
          state: 2,
          rejectReason: this.data.huoDongRejectReason
        },
      })
      .then(res => {
        console.log("上传成功", res)
        wx.showToast({
          title: '成功',
        })
        wx.redirectTo({
            url: '../approval/approval',
          })
          .then(() => {
            wx.startPullDownRefresh()
          })
      })
      .catch(err => {
        console.log("上传失败", err)
        wx.showToast({
          title: '失败',
          icon: "none"
        })
      })
    wx.cloud.database().collection("huoDong")
      .doc(this.data.id)
      .get()
      .then(res => {
        console.log("这是该活动相关信息", res.data)
        let openid = res.data._openid
        let activityName = res.data.a1_huodongName
        let activityTime = res.data.a2_startTime
        let userName = res.data.b1_fzrName
        //发送订阅消息给用户
        wx.cloud.callFunction({
            name: 'sendMessage',
            data: {
              openid: openid,
              activityName: activityName,
              activityTime: activityTime,
              userName: userName,
              state: "驳回"
            },
          })
          .then(res => {
            console.log("调用成功", res)
          })
          .catch(err => {
            console.log("请求云函数失败", err)
          })
      })

  },
  huoDongRejectReason(event) {
    console.log("这是驳回输入框里的信息", event.detail.value)
    this.setData({
      huoDongRejectReason: event.detail.value
    })
  },

  //预约的通过以及驳回
  yuYuePass() {
    let that = this;
    wx.showLoading({
      title: '正在上传中……',
      mask: true
    })
    wx.cloud.database().collection("appointment").doc(this.data.id)
      .update({ // updata指 插入数据库中的userlist表；
        //将我们获取到的新值代入
        data: {
          state: 1
        },
      }).then(res => {
        console.log("上传成功", res)
        wx.showToast({
          title: '成功',
        })
        wx.navigateTo({
            url: '../appointmentApproval/appointmentApproval',
          })
          .then(() => {
            wx.startPullDownRefresh()
          })
      })
      .catch(err => {
        console.log("上传失败", err)
        wx.showToast({
          title: '失败',
          icon: "none"
        })
      })
    wx.cloud.database().collection("appointment").doc(this.data.id)
      .get()
      .then(res => {
        console.log("这是该预约相关信息", res.data)
        let openid = res.data._openid
        let appointmentName = res.data.content
        let appointmentTime = res.data.appointment
        let teacher = res.data.g1_orderTeacher
        appointmentTime = appointmentTime.slice(5)
        console.log("appointment是", appointmentTime)
        let userName = res.data.subscriber
        //发送订阅消息给用户
        wx.cloud.callFunction({
            name: 'sendMessage',
            data: {
              openid: openid,
              appointmentName: appointmentName,
              appointmentTime: appointmentTime,
              userName: userName,
              state: "通过",
              teacher: teacher,
              type: "appointment"
            },
          })
          .then(res => {
            console.log("调用成功", res)
          })
          .catch(err => {
            console.log("请求云函数失败", err)
          })
      })

  },

  yuYueReject() {
    let that = this;
    wx.showLoading({
      title: '正在上传中……',
      mask: true
    })
    wx.cloud.database().collection("appointment").doc(this.data.id)
      .update({ // updata指 插入数据库中的userlist表；
        //将我们获取到的新值代入
        data: {
          state: 2,
          rejectReason: this.data.yuYueRejectReason
        },
      })
      .then(res => {
        console.log("上传成功", res)
        wx.showToast({
          title: '成功',
        })
        wx.navigateTo({
            url: '../appointmentApproval/appointmentApproval',
          })
          .then(() => {
            wx.startPullDownRefresh()
          })
      })
      .catch(err => {
        console.log("上传失败", err)
        wx.showToast({
          title: '失败',
          icon: "none"
        })
      })
    wx.cloud.database().collection("appointment").doc(this.data.id)
      .get()
      .then(res => {
        console.log("这是该预约相关信息", res.data)
        let openid = res.data._openid
        let appointmentName = res.data.content
        let appointmentTime = res.data.appointment
        let teacher = res.data.g1_orderTeacher
        appointmentTime = appointmentTime.slice(5)
        console.log("appointment是", appointmentTime)
        let userName = res.data.subscriber
        //发送订阅消息给用户
        wx.cloud.callFunction({
            name: 'sendMessage',
            data: {
              openid: openid,
              appointmentName: appointmentName,
              appointmentTime: appointmentTime,
              userName: userName,
              state: "驳回",
              teacher: teacher,
              type: "appointment"
            },
          })
          .then(res => {
            console.log("调用成功", res)
          })
          .catch(err => {
            console.log("请求云函数失败", err)
          })
      })


  },
  yuYueRejectReason(event) {
    console.log("这是驳回输入框里的信息", event.detail.value)
    this.setData({
      yuYueRejectReason: event.detail.value
    })
  },
  //撤销
  withdraw(e) {
    let type = e.currentTarget.dataset.type // 接收点击函数传递的参数
    let state
    let collectionName
    /*
      判断接收的state值和请求的集合名称
      // console.log(state)
      // console.log(typeof(state))
      // console.log(collectionName)
    */
    if (type == "H") {
      collectionName = "huoDong"
    } else {
      collectionName = "appointment"
    }

    if (e.currentTarget.dataset.state == "1") {
      state = 1
    } else {
      state = 2
    }
    wx.cloud.database().collection(collectionName)
    .doc(this.data.id)
    .update({
      data:{
        state:0
      }})
    .then(res=>{
      wx.showToast({
        title: '撤销成功',
        success(){
          console.log(collectionName)
          if (collectionName == "appointment") {
            wx.redirectTo({
              url: '../appointmentApproval/appointmentApproval',
            }) 
          }
          else{
            wx.redirectTo({
              url: '../approval/approval',
            })
          }
        }
      })
    })
  }
})