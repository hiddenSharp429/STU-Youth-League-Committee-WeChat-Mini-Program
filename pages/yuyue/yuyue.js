const db= wx.cloud.database().collection("changdi")
Page({
  // 页面的初始数据
  data: {
    select1: false,
    items1: [{
        value: '不需要室内场地',
        name: '否'
      },
      {
        value: '需要室内场地',
        name: '是'
      },
    ],
    displays1: true,
    items2: [{
        value: '不需要户外场地',
        name: '否'
      },
      {
        value: '需要户外场地',
        name: '是'
      },
    ],
    displays2: true,
    accountIndex1: 0,
    accounts1: [ // value传给后台的值 ， label页面上显示的文字
      {
        value: '请选择场地',
        label: '请选择场地'
      },
      {
        value: '科报厅',
        label: '科报厅'
      },
      {
        value: '舞蹈室',
        label: '舞蹈室'
      },
      {
        value: '大礼堂',
        label: '大礼堂'
      },
    ],
    date1: "请选择日期",
    accountIndex2: 0,
    accounts2: [ // value传给后台的值 ， label页面上显示的文字
      {
        value: '请选择场地',
        label: '请选择场地'
      },
      {
        value: '户外运动场',
        label: '户外运动场'
      },
      {
        value: '户外篮球场',
        label: '户外篮球场'
      },
      {
        value: '户外足球场',
        label: '户外足球场'
      },
    ],
    date2: "请选择日期",
  },
  //是否需要选项
  radioChange1(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)

    const items1 = this.data.items1
    let item1 = e.detail.value
    this.setData({
      items1,
      item1
    })
    if (item1 == "不需要室内场地") {
      this.setData({
        displays1: true
      })
    } else {
      this.setData({
        displays1: false
      })
    }
  },
  radioChange2(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    const items2 = this.data.items2
    let item2 = e.detail.value
    this.setData({
      items2,
      item2
    })
    if (item2 == "不需要户外场地") {
      this.setData({
        displays2: true
      })
    } else {
      this.setData({
        displays2: false
      })
    }
  },
  // 下拉切换
  bindAccountChange1(e) {
    console.log('切换改变的值', e.detail.value);
    this.setData({
      accountIndex1: e.detail.value,
    })
  },
  bindAccountChange2(e) {
    console.log('切换改变的值', e.detail.value);
    this.setData({
      accountIndex2: e.detail.value,
    })
  },
  //更新数据库的数据
  bindDateChange1: function (e) {
    console.log(e.detail.value)
    this.setData({
      date1: e.detail.value
    })
  },
  bindDateChange2: function (e) {
    console.log(e.detail.value)
    this.setData({
      date2: e.detail.value
    })
  },
  //刷新页面
  onPullDownRefresh: function () {
    console.log('用户刷新了页面')
    //刷新页面数据
    this.getList()
  },
   //获取openid
   getList() {
    wx.cloud.callFunction({
        name: 'getData'
      })
      .then(res => {
        console.log("用户openid", res.result.openid)
      })
      .catch(err => {
        console.log("请求云函数失败", err)
      })
  },
  //提交信息到数据库
  submit: function (e) {
    let that = this;
    if(this.data.item1 == "需要室内场地"){
      if(!this.data.accountIndex1 || !this.data.data1=="请选择日期"){
             wx.showToast({
                    title: "请填写完整室内场地相关信息",
                    icon: "none",
             });
      }
}
if(this.data.item2 == "需要户外场地"){
  if(!this.data.accountIndex2 || !this.data.data2=="请选择日期"){
         wx.showToast({
                title: "请填写完整户外场地相关信息",
                icon: "none",
         });
         return false;
  }
}
    wx.showLoading({
      title: '正在上传中……',
      mask: true
    })
    db.add({ // add指 插入数据库中的userlist表；
        //将我们获取到的新值代入
        data: { // data 字段表示需新增的 JSON 数据       
          是否需要室内场地: this.data.item1,
          预约室内场地: this.data.accountIndex1,
          室内使用日期: this.data.date1,  
          是否需要室外场地: this.data.item2,
          预约室外场地: this.data.accountIndex2,
          室外使用日期: this.data.date2,
        },
      }).then(res => {
        console.log("上传成功", res)
        wx.showToast({
          title: '上传成功',
        })
      })
      .catch(err => {
        console.log("上传失败", err)
        wx.showToast({
          title: '上传失败',
        })
      })
  }
})