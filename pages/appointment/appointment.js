const DB = wx.cloud.database().collection("appointment")
const db = wx.cloud.database()
const _ = wx.cloud.database().command
// 在一开始加了个时间段数集
var hourLists = ["9:00", "9:30", "10:00", "10:30", "11:00", "11:30", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"];
//引用util里的时间工具获取当前时间
var util = require('../../utils/util.js')
var presentDayTime = util.formatTime(new Date())
Page({
  data: {
    openid: "",
    show: false,
    password: '',
    account: '',
    canIUseGetUserProfile: false,
    // 组织
    multiArray: [
      ['校团委', '学生会', '校青协', '汕大青年', '踹网', '社团中心', '研会', '主持队']
    ],
    //老师
    multiArray1: [
      ['姚溱', '陈益纯', '林煜', '林蔷', '罗列', '黄嘉曼']
    ],
    multiIndex: [0],
    multiIndex1: [0],
    newins: '校团委',
    newtea: '姚溱',
    occupyTime: [],
    content: '',
    subscriber: '',
    subscriberPhone: '',

    //日期
    timeList: [],
    //可预约天数
    yyDay: 2,
    //预约时间段 默认都不可选
    hourList: [{
        hour: "9:00",
        n: 9,
        isShow: false
      },
      {
        hour: "9:30",
        n: 9.5,
        isShow: false
      },
      {
        hour: "10:00",
        n: 10,
        isShow: false
      },
      {
        hour: "10:30",
        n: 10.5,
        isShow: false
      },
      {
        hour: "11:00",
        n: 11,
        isShow: false
      },
      {
        hour: "11:30",
        n: 11.5,
        isShow: false
      },
      {
        hour: "14:30",
        n: 14.5,
        isShow: false
      },
      {
        hour: "15:00",
        n: 15,
        isShow: false
      },
      {
        hour: "15:30",
        n: 15.5,
        isShow: false
      },
      {
        hour: "16:00",
        n: 16,
        isShow: false
      },
      {
        hour: "16:30",
        n: 16.5,
        isShow: false
      },
      {
        hour: "17:00",
        n: 17,
        isShow: false
      }
    ],
    //是否显示
    timeShow: false,
    currentTab: 0,
    //选择时间
    chooseHour: "",
    rankDay: "",
    rank: "",
    //选择日期
    chooseTime: "",
    hourIndex: -1,
    //预约时间
    yyTime: '',
    day: '',
    sumbit_button: false,
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
  // 隐藏遮罩层
  onClickHide() {
    this.setData({
      show: false
    });
  },
  onLoad(options) {
    let that = this
    wx.showModal({
      title: '温馨提示',
      content: '为了确保活动能顺利进行，该页面将获取您相关的个人信息，点击确认同意方可填写相关信息',
      success(res) {
        if (res.confirm) {
          that.setData({
            canIUseGetUserProfile: true
          })
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
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    Date.prototype.Format = function (format) {
      var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(), //day
        "h+": this.getHours(), //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
        "S": this.getMilliseconds() //millisecond
      }
      if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
      }
      for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
          format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
      }
      return format;
    }
    Date.prototype.DateAdd = function (interval, number) {
      number = parseInt(number);
      var date = new Date(this.getTime());
      switch (interval) {
        case "y":
          date.setFullYear(this.getFullYear() + number);
          break;
        case "m":
          date.setMonth(this.getMonth() + number);
          break;
        case "d":
          date.setDate(this.getDate() + number);
          break;
        case "w":
          date.setDate(this.getDate() + 7 * number);
          break;
        case "h":
          date.setHours(this.getHours() + number);
          break;
        case "n":
          date.setMinutes(this.getMinutes() + number);
          break;
        case "s":
          date.setSeconds(this.getSeconds() + number);
          break;
        case "l":
          date.setMilliseconds(this.getMilliseconds() + number);
          break;
      }
      return date;
    }

    var dateList = [];
    var now = new Date();
    for (var i = 0; i < this.data.yyDay; i++) {
      var d = {};
      var day = new Date().DateAdd('d', i).getDay();
      if (day == 1) {
        var w = "周一"
      }
      if (day == 2) {
        var w = "周二"
      }
      if (day == 3) {
        var w = "周三"
      }
      if (day == 4) {
        var w = "周四"
      }
      if (day == 5) {
        var w = "周五"
      }
      if (day == 6) {
        var w = "周六"
      }
      if (day == 0) {
        var w = "周日"
      }
      d.name = w;
      d.date = new Date().DateAdd('d', i).Format("MM-dd");
      //用小数点形式来表示日期
      d.rank = new Date().DateAdd('d', i).Format("MM.dd");
      dateList.push(d)
    }
    this.setData({
      timeList: dateList
    });
    //初始化判断
    //当前时间
    var hour = new Date().getHours();

    for (var i = 0; i < this.data.hourList.length; i++) {
      var list = this.data.hourList;
      //过时不可选
      if (this.data.hourList[i].n <= hour) {
        list[i].isShow = false;
        this.setData({
          hourList: list
        })
      }
    }
  },
  //获取用户同意
  canIUseGetUserProfile() {
    let that = this
    wx.showModal({
      title: '温馨提示',
      content: '为了确保活动能顺利进行，该页面将获取您相关的个人信息，点击确认同意方可填写相关信息',
      success(res) {
        if (res.confirm) {
          that.setData({
            canIUseGetUserProfile: true
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  //弹出按钮
  showTimeModel: function () {
    console.log("当前时间", presentDayTime)
    console.log("当前日期-形式", this.data.timeList[0].date)
    console.log("当前日期.形式", this.data.timeList[0].rank)
    this.setData({
      timeShow: !this.data.timeShow,
      //  chooseTime: this.data.timeList[0].date,
    });
  },
  //点击外部取消
  modelCancel: function () {
    this.setData({
      timeShow: !this.data.timeShow,
      //  chooseTime: this.data.timeList[0].date,
    });
  },
  //日期选择
  timeClick: function (e) {
    const Loading = this.selectComponent('#my-loading');
    console.log('当前日期的标识，0为当日，1为明日', e.currentTarget.dataset.index)
    //如果选择的日期是明天则执行以下命令
    if (e.currentTarget.dataset.index != 0) {
      var hour = new Date().getHours();
      console.log('当前小时时刻是', hour)
      //如果今天的时间超过了十八点整，则不允许预约明天的老师
      if (hour < 18) {
        var list = this.data.hourList;
        for (var i = 0; i < list.length; i++) {
          list[i].isShow = true;
        }
        this.setData({
          hourList: list
        })
      } else {
        var list = this.data.hourList;
        for (var i = 0; i < list.length; i++) {
          list[i].isShow = false;
        }
        this.setData({
          hourList: list
        })
      }

    }
    //如果选择的日期是今天则全部不可选
    else {
      var list = this.data.hourList;
      for (var i = 0; i < list.length; i++) {
        list[i].isShow = false;
      }
      Loading.OnClose();
    }
    console.log("选择日期.形式", this.data.timeList[e.currentTarget.dataset.index].rank)
    this.setData({
      currentTab: e.currentTarget.dataset.index,
      chooseTime: this.data.timeList[e.currentTarget.dataset.index].date,
      yyTime: '',
      chooseHour: "",
      hourIndex: -1,
      rankDay: this.data.timeList[e.currentTarget.dataset.index].rank * 10000,
    });
    Loading.OnStart();
    console.log("这个是choosetime", this.data.chooseTime)
    console.log("这个是rankDay整数形式", this.data.rankDay)
    //同一个老师同一个时段占用不可选
    // 前提是选择完老师然后点击预约时间后会在数据里面搜索该老师当天已经预约的时间段
    DB.where({
        g2_organTeacherId: this.data.multiIndex1[0],
        state: _.or(0, 1),
        //！这里修改了一下 功能是当用户点击了日期的时候会筛查 选择的老师 和 老师的时间是否被占用，用了一个第一个day是指数据库里的属性day，后面的this.data.chooseTime是指用户点击的日期
        day: this.data.chooseTime,
      })
      .get()
      .then(res => {
        // 搜索到了以后（也许有多条数据），在后面将每条数据里面的hour值提取出来
        console.log('查询数据库成功', res.data)
        console.log(res.data.length, '长度')
        let lengths = res.data.length
        console.log(hourLists)
        for (let a = 0; a < lengths; a++) {
          console.log(lengths, 'lengths')
          var Chour = res.data[a].hour
          console.log(res.data[a].hour, "它的时间是")
          for (let b = 0; b <= 11; b++) {
            if (Chour == hourLists[b]) {
              list[b].isShow = false
              this.setData({
                hourList: list
              })
            }
          }
          //用了两层的循环，c循环是用来筛选数据库里的符合条件的记录的，b循环是用来将第c条数据里面的hour的数组一一与时间段匹配，如果存在则令其不可选
          for (let c = 0; c <= res.data[a].hour.length; c++) {
            for (let b = 0; b <= 11; b++) {
              if (Chour[c] == hourLists[b]) {
                console.log(b + 1)
                console.log(this.data.hourList, "这是")
                list[b].isShow = false
                this.setData({
                  hourList: list,
                })
              }
            }
          }

        }
        Loading.OnClose();
      })

  },
  // 时间选择
  hourClick: function (e) {
    var that = this;
    // 时间不可选择
    if (!e.currentTarget.dataset.isshow) {
      return false;
    }
    this.setData({
      hourIndex: e.currentTarget.dataset.index,
      chooseHour: this.data.hourList[e.currentTarget.dataset.index].hour,
    });
    var choiceDay = this.data.chooseTime
    this.setData({
      day: choiceDay
    })
    var chooseTime = new Date().getFullYear() + "-" + this.data.chooseTime + " " + this.data.chooseHour
    this.setData({
      yyTime: chooseTime
    })
    console.log('这是选择时间的-形式', chooseTime)
    console.log("这是选择时间的.形式", this.data.rankDay + e.currentTarget.dataset.index)
    this.setData({
      rank: this.data.rankDay + e.currentTarget.dataset.index
    })
    //下面第一个是string类型，第二个是float类型
    console.log("这个是rank", this.data.rank)
    console.log(parseFloat(this.data.rank))
  },
  // onLoad: function (options) {
  // },    

  // 选择归属的组织
  //       0是校团委，1是学生会，2是校青协，3是汕大青年，4是踹网，5是社联，6是研会，7是主持队
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带组织的值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value,
    })
    var newins0 = "校团委"
    if (this.data.multiIndex[0] == 0) {
      this.setData({
        newins: newins0
      })
    }
    var newins1 = "学生会"
    if (this.data.multiIndex[0] == 1) {
      this.setData({
        newins: newins1
      })
    }
    var newins2 = "校青协"
    if (this.data.multiIndex[0] == 2) {
      this.setData({
        newins: newins2
      })
    }
    var newins3 = "汕大青年"
    if (this.data.multiIndex[0] == 3) {
      this.setData({
        newins: newins3
      })
    }
    var newins4 = "踹网"
    if (this.data.multiIndex[0] == 4) {
      this.setData({
        newins: newins4
      })
    }
    var newins5 = "社团中心"
    if (this.data.multiIndex[0] == 5) {
      this.setData({
        newins: newins5
      })
    }
    var newins6 = "研会"
    if (this.data.multiIndex[0] == 6) {
      this.setData({
        newins: newins6
      })
    }
    var newins7 = "主持队"
    if (this.data.multiIndex[0] == 7) {
      this.setData({
        newins: newins7
      })
    }
  },

  //选择预约的老师
  //     0是姚溱  1是陈益纯  2是林煜  3是林蔷  4是罗列  5是黄嘉曼
  bindMultiPickerChange1: function (e) {
    console.log('picker发送选择改变，携带老师的名字为', e.detail.value)
    this.setData({
      multiIndex1: e.detail.value,
    })
    var newtea0 = "姚溱"
    if (this.data.multiIndex1[0] == 0) {
      this.setData({
        newtea: newtea0
      })
    }
    var newtea1 = "陈益纯"
    if (this.data.multiIndex1[0] == 1) {
      this.setData({
        newtea: newtea1
      })
    }
    var newtea2 = "林煜"
    if (this.data.multiIndex1[0] == 2) {
      this.setData({
        newtea: newtea2
      })
    }
    var newtea3 = "林蔷"
    if (this.data.multiIndex1[0] == 3) {
      this.setData({
        newtea: newtea3
      })
    }
    var newtea4 = "罗列"
    if (this.data.multiIndex1[0] == 4) {
      this.setData({
        newtea: newtea4
      })
    }
    var newtea5 = "黄嘉曼"
    if (this.data.multiIndex1[0] == 5) {
      this.setData({
        newtea: newtea5
      })
    }
    //当用户每调整选择的老师一次就将日期和可选时间段重新渲染一遍
    var list = this.data.hourList;
    for (var i = 0; i < list.length; i++) {
      list[i].isShow = false;
    }
    this.setData({
      hourList: list,
      yyTime: '',
      currentTab: 0,
      chooseHour: "",
      hourIndex: -1,
    })
  },

  // 预约事项
  content(res) {
    console.log(res.detail.value, "预约事项")
    let content = res.detail.value
    this.setData({
      content: content
    })
    console.log(content)
  },

  // 预约人
  subscriber(res) {
    console.log(res.detail.value, "预约人")
    let subscriber = res.detail.value
    this.setData({
      subscriber: subscriber
    })
    console.log(subscriber)
  },

  // 预约人手机号
  subscriberPhone(res) {
    console.log(res.detail.value, "预约人手机号")
    let subscriberPhone = res.detail.value
    this.setData({
      subscriberPhone: subscriberPhone
    })
    console.log(subscriberPhone)
  },
  //超级用户登录
  goVip() {
    const Loading = this.selectComponent('#my-loading')
    let that = this
    console.log("点击了不受限预约登录")
    wx.showModal({
      title: '预约不受限用户登录系统',
      content: '您确定要登录不受限预约系统吗',
      success(res) {
        if (res.confirm) {
          //显示不受限预约端的遮罩层
          that.setData({
            show: true
          })
          db.collection("vipUser")
            .where({
              _openid: that.data.openid
            })
            .get({})
            .then(res => {
              console.log("请求数据库成功", res.data)
              //若数据库请求到的数据长度不为0则证明数据库中有该openid对应的账号，实现自动登录
              if (res.data.length != 0) {
                Loading.OnStart();
                setTimeout(() => {
                  wx.navigateTo({
                    url: '../vip/vip',
                    success() {
                      Loading.OnClose();
                    }
                  })
                }, 2000);
              }
              else{
                wx.showToast({
                  icon:"error",
                  title: '您的账号无权限',
                })
                return
              }
            })
            .catch(res => {
              console.log("请求数据库失败")
            })

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
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
  },
  //点击登录
  enterVipAppointment() {
    let account = this.data.account
    let password = this.data.password
    db.collection("vipUser")
      .where({
        account: account
      })
      .get({})
      .then(res => {
        console.log("账号是", this.data.account)
        console.log("密码是", this.data.password)
        console.log("查询数据库成功", res.data)
        if (password == res.data[0].password) {
          console.log('登录成功')
          wx.showToast({
            title: '登录成功',
          })
          wx.redirectTo({
            url: '../vip/vip',
          })
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
  //提交预约
  submit: function (e) {
    this.setData({
      sumbit_button: true
    })
    let that = this;
    //这个在showTimeModel/submit里面有用到，为了提交预约的时候把提交的时间给一起提交到数据库
    var TimeOfSubmission = util.SubmitTime(new Date())
    if (!this.data.yyTime) {
      wx.showToast({
        title: "请选择预约时间",
        icon: "none",
      });
      this.setData({
        sumbit_button: false
      })
      return false;
    }
    wx.requestSubscribeMessage({
      tmplIds: ['ITKk6SuK7iPtD5iCqMLVFkm0B4sVq_3iFNyXq9cKwRM'],
      success(res) {

      },
      complete() {
        DB.add({ // add指 插入数据库中的appointment表；
            //将我们获取到的新值代入
            data: { // data 字段表示需新增的 JSON 数据       
              // 上传所归属的组织的信息 g1 是组织的中文名称， g2是 组织的id值
              //其中 g2的值为0是校团委，1是学生会，2是青协，3是汕青，4是踹网
              //同理预约老师
              g1_orderInstitute: that.data.newins,
              g2_organizationId: that.data.multiIndex[0],
              g1_orderTeacher: that.data.newtea,
              g2_organTeacherId: that.data.multiIndex1[0],
              appointment: that.data.yyTime,
              time: presentDayTime,
              TimeOfSubmission: TimeOfSubmission,
              subscriber: that.data.subscriber,
              subscriberPhone: that.data.subscriberPhone,
              state: 0,
              //上传了选择的日期和选择的小时
              day: that.data.day,
              hour: that.data.chooseHour,
              content: that.data.content,
              //上传了选择的日期和时间段的值（用于排位）
              rank: that.data.rank
            },

          })
          .then(res => {
            console.log("上传成功", res)
            wx.showModal({
              title: '您已提交成功',
              content: "",
              showCancel: false,
              confirmText: '确定',
              confirmColor: "#D43C33",
              success(res) {
                //卸载所有页面，加载进历史预约界面
                wx.reLaunch({
                  url: '/pages/appointment/appointment',
                })
              }
            })
          })
          .catch(err => {
            console.log("上传失败", err)
            wx.showToast({
              title: '失败',
              icon: "none"
            })
          })
      }
    })
  }

})