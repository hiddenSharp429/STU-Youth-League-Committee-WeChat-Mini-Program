const DB = wx.cloud.database().collection("appointment")
const _ = wx.cloud.database().command
var yyTime = []
var yyHour = []
// 在一开始加了个时间段数集
var hourLists = ["9:00", "9:30", "10:00", "10:30", "11:00", "11:30", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"];
//引用util里的时间工具获取当前时间
var util = require('../../utils/util.js')
//这个在showTimeModel/submit里面有用到，为了提交预约的时候把提交的时间给一起提交到数据库
var presentDayTime = util.formatTime(new Date())
Page({
  data: {
    canIUseGetUserProfile: false,
    // 组织
    multiArray: [
      ['校团委', '学生会', '校青年志愿者', '汕大青年', '踹网']
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
    yyDay: 30,
    //预约时间段
    hourList: [{
        hour: "9:00",
        n: 9,
        isShow: true,
        isSelect: false
      },
      {
        hour: "9:30",
        n: 9.5,
        isShow: true,
        isSelect: false
      },
      {
        hour: "10:00",
        n: 10,
        isShow: true,
        isSelect: false
      },
      {
        hour: "10:30",
        n: 10.5,
        isShow: true,
        isSelect: false
      },
      {
        hour: "11:00",
        n: 11,
        isShow: true,
        isSelect: false
      },
      {
        hour: "11:30",
        n: 11.5,
        isShow: true,
        isSelect: false
      },
      {
        hour: "14:30",
        n: 14.5,
        isShow: true,
        isSelect: false
      },
      {
        hour: "15:00",
        n: 15,
        isShow: true,
        isSelect: false
      },
      {
        hour: "15:30",
        n: 15.5,
        isShow: true,
        isSelect: false
      },
      {
        hour: "16:00",
        n: 16,
        isShow: true,
        isSelect: false
      },
      {
        hour: "16:30",
        n: 16.5,
        isShow: true,
        isSelect: false
      },
      {
        hour: "17:00",
        n: 17,
        isShow: true,
        isSelect: false
      }
    ],
    //是否显示
    timeShow: false,
    currentTab: 0,
    //选择日期
    chooseTime: "",
    hourIndex: [],
    //预约时间
    yyTimes: [],
    //预约的时间段
    yyHours: [],
    day: ''
  },
  onLoad() {
    let that = this
    if (!this.data.canIUseGetUserProfile) {
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
    this.setData({
      timeShow: !this.data.timeShow,
      //  chooseTime: this.data.timeList[0].date,
    });

  },
  //点击外部取消
  modelCancel: function () {
    this.setData({
      timeShow: !this.data.timeShow,
    });
  },
  //日期选择
  timeClick: function (e) {
    const Loading = this.selectComponent('#my-loading');
    //非今天-不判断超过当前时间点(所有时间点都可选择)
    if (e.currentTarget.dataset.index != 0) {
      var list = this.data.hourList;
      for (var i = 0; i < list.length; i++) {
        list[i].isShow = true;
      }
      this.setData({
        hourList: list
      })
    } else {
      //今天-过时不可预约
      var hour = new Date().getHours();
      for (var i = 0; i < this.data.hourList.length; i++) {
        var list = this.data.hourList;
        if (this.data.hourList[i].n <= hour) {
          list[i].isShow = false;
          this.setData({
            hourList: list
          })
        }
      }
      Loading.OnClose();
    }
    this.setData({
      currentTab: e.currentTarget.dataset.index,
      chooseTime: this.data.timeList[e.currentTarget.dataset.index].date,
      //清空时间段和选择的时间
      yyTimes: [],
      yyHours: []
    });
    //所有选中状态置为false
    for (let index = 0; index < 12; index++) {
      this.setData({
        ['hourList[' + index + '].isSelect']: false
      })
    }
    //同一个老师同一个时段占用不可选
    // 前提是选择完老师然后点击预约时间后会在数据里面搜索该老师当天已经预约的时间段
    Loading.OnStart();
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
  hourClick(e) {
    const index = e.currentTarget.dataset.index;
    const hourIndex = this.data.hourIndex;
    // 时间不可选择
    if (!e.currentTarget.dataset.isshow) {
      return false;
    }
    if (hourIndex.indexOf(index) == -1) {
      hourIndex.push(index);
      yyHour.push(this.data.hourList[index].hour)
      this.setData({
        ['hourList[' + index + '].isSelect']: true
      })
    } else {
      // 如果选中的数据在数组中，则从数组中移除
      hourIndex.splice(hourIndex.indexOf(index), 1);
      yyHour.splice(yyHour.indexOf(this.data.hourList[e.currentTarget.dataset.index].hour), 1)
      this.setData({
        ['hourList[' + index + '].isSelect']: false
      })
    }
    // 更新数组
    this.setData({
      hourIndex: hourIndex,
      yyHours: yyHour
    });
    this.setData({
      chooseHour: this.data.hourList[e.currentTarget.dataset.index].hour,
    });
    var choiceDay = this.data.chooseTime
    this.setData({
      day: choiceDay
    })
    console.log('这个是选择的日期', choiceDay)
    var chooseTime = new Date().getFullYear() + "-" + this.data.chooseTime + " " + this.data.chooseHour
    if (yyTime.indexOf(chooseTime) == -1) {
      yyTime.push(chooseTime)
    } else {
      yyTime.splice(yyTime.indexOf(chooseTime), 1);
    }
    // 更新数组
    this.setData({
      yyTimes: yyTime
    })
    console.log('yyTime是', yyTime)
  },
  onLoad: function (options) {
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
      dateList.push(d)
    }
    this.setData({
      timeList: dateList
    });
    //初始化判断，当天所有的时间段均为不可选
    for (let index = 0; index < 12; index++) {
      this.setData({
        ['hourList[' + index + '].isShow']: false
      })
    }

  },

  // 选择归属的组织
  //       0是校团委，1是学生会，2是校青年志愿者，3是汕大青年，4是踹网
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
    var newins2 = "校青年志愿者"
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
  },

  //选择预约的老师
  //     0是姚溱  1是陈益纯  2是林煜  3是林蔷  4是罗列  5是黄嘉曼
  bindMultiPickerChange1: function (e) {
    console.log('picker发送选择改变，携带老师的名字为', e.detail.value)
    this.setData({
      multiIndex1: e.detail.value,
      currentTab:0
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
  },

  // 预约事项
  content(res) {
    console.log(res.detail.value, "预约事项")
    let content = res.detail.value
    this.setData({
      content: content
    })
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
  //提交预约
  submit: function (e) {
    if (!this.data.yyTimes) {
      wx.showToast({
        title: "请选择预约时间",
        icon: "none",
      });
      return false;
    }
    DB.add({ // add指 插入数据库中的appointment表；
        //将我们获取到的新值代入
        data: { // data 字段表示需新增的 JSON 数据       
          // 上传所归属的组织的信息 g1 是组织的中文名称， g2是 组织的id值
          //其中 g2的值为0是校团委，1是学生会，2是青协，3是汕青，4是踹网
          //同理预约老师
          g1_orderInstitute: this.data.newins,
          g2_organizationId: this.data.multiIndex[0],
          g1_orderTeacher: this.data.newtea,
          g2_organTeacherId: this.data.multiIndex1[0],
          appointment: "预约的时间" + this.data.yyTimes,
          time: "提交预约时间" + presentDayTime,
          subscriber: this.data.subscriber,
          subscriberPhone: this.data.subscriberPhone,
          state: 0,
          //上传了选择的日期和选择的小时
          day: this.data.day,
          hour: this.data.yyHours,
          content: this.data.content
        },

      }).then(res => {
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
              url: '/pages/vip/vip',
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
  },
  //刷新
  refresh() {
    this.setData({
      multiIndex: [0],
      multiIndex1: [0],
      content: "",
      yyHours: [],
      yyTimes: []
    })
    for (let index = 0; index < 12; index++) {
      this.setData({
        ['hourList[' + index + '].isSelect']: false
      })
    }
  }
})