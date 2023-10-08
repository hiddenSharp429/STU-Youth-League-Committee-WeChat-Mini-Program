const DB = wx.cloud.database().collection("huoDong")
var a = 0
var huodong = new Array();
var fzr = new Array();
let jkr = new Array();
var myDate = new Date();
var ddate = 0
let eventName = ''

Page({
  onLoad() {
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
    this.setData({
      liststart: this.data.startDates,
      listend: this.data.startDates,
      listyuyue1: this.data.startDates,
      listyuyue2: this.data.startDates,
      date1: this.data.startDates,
      date2: this.data.startDates,
      date3: this.data.startDates,
      date4: this.data.startDates,
      date5: this.data.startDates
    })
  },
  data: {
    canIUseGetUserProfile: false,
    array: ['', '桑浦山校区', '东海岸校区'],
    objectArray: [{
        id: 0,
        name: ''
      },
      {
        id: 1,
        name: '桑浦山校区'
      },
      {
        id: 2,
        name: '东海岸校区'
      },
    ],
    index: 0,
    startDates: myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + '-' + myDate.getDate(),
    // 活动时间
    liststart: '',
    listend: '',
    listyuyue1: '',
    listyuyue2: '',
    huodongna: '',
    huodongpl: "",
    fzrna: "",
    fzrgr: "",
    fzrte: "",
    fzrma: "",

    jkrna: "",
    jkrgr: "",
    jkrag: "",
    jkrte: "",
    jkrmo: "",

    ystal: "",
    ysstal: "",
    ysbtal: "",

    money: "",
    company: "",
    form: "",
    contract: "",
    src: "",
    xingming: "Hello World!",

    userInfo: "",
    hasUserInfo: "true",

    openid: "",

    xieyi: "",

    cyrs: "",

    briefContent: "",

    items: [{
        value: '需要借款',
        name: '是'
      },
      {
        value: '不需要借款',
        name: '否'
      },
    ],

    // 这个是是否需要借款
    item: '',

    huodongbeizhu: '',
    display: true,
    itens: [{
        value: '有赞助',
        name: '是'
      },
      {
        value: '没有赞助',
        name: '否'
      },
    ],
    contractItens: [{
        value: '已提交',
        name: '是'
      },
      {
        value: '未提交',
        name: '否'
      },
    ],


    iten: '',
    displays: true,
    multiArray: [
      ['', '校团委', '学生会', '校青协', '汕大青年', '踹网', '社团中心', '研会']
      //      ['教师1', '教师2', '教师3', '教师4','教师5']
    ],
    multiIndex: [0],
    newins: '',
    newtea: '',
    area: '',
    select1: false,
    changdi1: false,
    accountIndex: 0,
    indoor: "",
    date1: " ",
    select2: false,
    changdi2: false,
    accountIndex1: 0,
    outdoor: "",
    date2: "请选择日期",
    date3: "请选择日期",
    wuzi: false,
    lists: [{
      "reward": "",
      "num": 0
    }, ],
    banyun: false,
    lists1: [{
      "sth": "",
      "mon": 0
    }, ],
    xc: false,
    lists2: [{
      "name": "横幅",
      "name": "海报"
    }, ],
    date5: "",
    itemslwf: [{
        value: '需要发放劳务费',
        name: '是'
      },
      {
        value: '不需要发放劳务费',
        name: '否'
      },
    ],
    itemlwf: "",
    lwfduixiang: "",
    lwfmoney: "",
    displaylwf: true,

    itemsoa: [{
        value: '需要上传OA',
        name: '是'
      },
      {
        value: '不需要上传OA',
        name: '否'
      },
    ],
    itemoa: "",
    itemxc: [{
        value: true,
        name: '是'
      },
      {
        value: false,
        name: '否'
      },
    ],

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
  // 活动名称
  huodongName(res) {
    let huodongna = res.detail.value
    this.setData({
      huodongna
    })
  },
  // 起始时间选择
  bindDatechangeStart(e) {
    // console.log(e)
    let obj = e.detail.value
    this.setData({
      liststart: obj
    })
    console.log("活动开始时间为", obj, this.data.liststart)
  },
  // 截止时间选择
  bindDatechangeEnd(e) {
    console.log(e.detail.value)
    let objb = e.detail.value
    this.setData({
      listend: objb
    })
    console.log("活动截止时间为", objb, this.data.listend)
  },
  //选择校区
  bindPickerChange: function (e) {
    console.log('选择校区的picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
    var area0 = "桑浦山校区"
    if (e.detail.value == 1) {
      this.setData({
        area: area0
      })
    }
    var area1 = "东海岸校区"
    if (e.detail.value == 2) {
      this.setData({
        area: area1
      })
    }
    console.log('校区:', this.data.area)
    if (this.data.area != '') {
      this.setData({
        num3: 100 / 16
      })
    }
  },

  // 是否需要借款单项选择
  radioChange(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)

    const items = this.data.items
    let item = e.detail.value

    this.setData({
      items,
      item
    })
    if (item == "不需要借款") {
      this.setData({
        display: true,
      })
    } else {
      this.setData({
        display: false,
      })
    }
    console.log(item, this.data.display + "借款")
  },

  //是否有赞助
  radioChange2(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    const itens = this.data.itens
    let iten = e.detail.value
    this.setData({
      itens,
      iten
    })
    if (iten == "没有赞助") {
      this.setData({
        displays: true,
      })
    } else {
      this.setData({
        displays: false,
      })
    }
    console.log(iten, this.data.displays)
  },

  // 是否有提交赞助合同单项选择
  radioChange2plus(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.setData({
      contract: e.detail.value
    })
  },
  // 是否需要申请发放劳务费
  radioChange3(e) {
    const itemslwf = this.data.itemslwf
    let itemlwf = e.detail.value
    this.setData({
      itemslwf,
      itemlwf
    })
    if (itemlwf == "不需要发放劳务费") {
      this.setData({
        displaylwf: true,
      })
    } else {
      this.setData({
        displaylwf: false,
      })
    }
    console.log(this.data.itemlwf)
  },
  // 是否需要上传oa
  radioChange4(e) {
    const itemsoa = this.data.itemsoa
    let itemoa = e.detail.value

    this.setData({
      itemsoa,
      itemoa
    })
  },

  // 所归属的组织选择
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
    var newins0 = "校团委"
    if (this.data.multiIndex[0] == 1) {
      this.setData({
        newins: newins0
      })
    }
    var newins1 = "学生会"
    if (this.data.multiIndex[0] == 2) {
      this.setData({
        newins: newins1
      })
    }
    var newins2 = "校青年志愿者"
    if (this.data.multiIndex[0] == 3) {
      this.setData({
        newins: newins2
      })
    }
    var newins3 = "汕大青年"
    if (this.data.multiIndex[0] == 4) {
      this.setData({
        newins: newins3
      })
    }
    var newins4 = "踹网"
    if (this.data.multiIndex[0] == 5) {
      this.setData({
        newins: newins4
      })
    }
    var newins5 = "社团中心"
    if (this.data.multiIndex[0] == 6) {
      this.setData({
        newins: newins5
      })
    }
    var newins6 = "研会"
    if (this.data.multiIndex[0] == 7) {
      this.setData({
        newins: newins6
      })
    }
  },
  bindMultiPickerColumnChange: function (e) {
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = ['教师1', '教师2', '教师3', '教师4', '教师5'];
            break;
          case 1:
            data.multiArray[1] = ['教师6', '教师7', '教师8', '教师9', '教师10', ];
            break;
          case 2:
            data.multiArray[1] = ['教师11', '教师12', '教师13', '教师14', '教师15', ];
            break;
          case 3:
            data.multiArray[1] = ['教师16', '教师17', '教师18', '教师19', '教师20', ];
            break;
          case 4:
            data.multiArray[1] = ['教师21', '教师22', '教师23', '教师24', '教师25', ];
            break;
        }
        data.multiIndex[1] = 0;
        break;
    }
    console.log(data.multiIndex);
    this.setData({
      data,
      newins: this.data.multiArray[0],
      newtea: this.data.multiArray[1],
    });
    //       0是校团委，1是学生会，2是校青年志愿者，3是汕大青年，4是踹网
  },
  // 提交按钮提交信息
  CheckInfo() {
    if (this.data.huodongna == '') {
      wx.showToast({
        icon: "none",
        title: '活动名称尚未填写',
      })
    } else if (this.data.huodongpl == '') {
      wx.showToast({
        icon: "none",
        title: '活动地点尚未填写',
      })
    } else if (this.data.fzrma == '' || this.data.fzrgr == '' || this.data.fzrte == '' || this.data.fzrma == '') {
      wx.showToast({
        icon: "none",
        title: '负责人信息尚未填写完整',
      })
    } else if (this.data.item == '') {
      wx.showToast({
        icon: "none",
        title: '活动经费部分尚未填写完整',
      })
    } else if (this.data.iten == '') {
      wx.showToast({
        icon: "none",
        title: '是否有赞助尚未勾选',
      })
    } else {
      switch (this.data.item) {
        case "不需要借款":
          switch (this.data.iten) {
            case "没有赞助":
              this.final()
              break;
            case "有赞助":
              if (this.data.money == '') {
                wx.showToast({
                  icon: "none",
                  title: '赞助金额未填写',
                })
              } else if (this.data.xieyi == '') {
                wx.showToast({
                  icon: "none",
                  title: '赞助协议未上传',
                })
              } else {
                this.final()
              }
              break;
          }
          break;
        case '需要借款':
          if (this.data.jkrna == '' || this.data.jkrgr == '' || this.data.jkrag == '' || this.data.jkrte == '' || this.data.jkrmo == '') {
            wx.showToast({
              icon: "none",
              title: '借款人信息尚未填写完整',
            })
          } else {
            switch (this.data.iten) {
              case "没有赞助":
                // final后面有定义
                this.final()
                break;
              case "有赞助":
                if (this.data.money == '') {
                  wx.showToast({
                    icon: "none",
                    title: '赞助金额未填写',
                  })
                } else if (this.data.xieyi == '') {
                  wx.showToast({
                    icon: "none",
                    title: '赞助协议未上传',
                  })
                } else {
                  this.final()
                }
                break;
            }
            break;
          }
      }

    }

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
  sumbitForm(e) {
    let that = this;
    const formData = e.detail.value;
    console.log(formData)
    if (!this.data.huodongna) {
      wx.showToast({
        title: "请填写活动名称",
        icon: "none",
      });
      return false;
    }
    if (!this.data.huodongpl) {
      wx.showToast({
        title: "请填写活动地点",
        icon: "none",
      });
      return false;
    }
    if (!this.data.fzrna || !this.data.fzrgr || !this.data.fzrte) {
      wx.showToast({
        title: "请填写完整负责人信息",
        icon: "none",
      });
      return false;
    }
    if (!this.data.ystal || !this.data.ysstal || !this.data.ysbtal) {
      wx.showToast({
        title: "请填写完整活动经费预算",
        icon: "none",
      });
      return false;
    }
    if (this.data.iten == "有赞助" || !this.data.iten) {
      if (!this.data.company || !this.data.form || !this.data.money) {
        wx.showToast({
          title: "请填写完整赞助相关信息",
          icon: "none",
        });
        return false;
      }
    }
    if (this.data.item == "需要借款" || !this.data.item) {
      if (!this.data.jkrna || !this.data.jkrgr || !this.data.jkrag || !this.data.jkrte || !this.data.jkrmo) {
        wx.showToast({
          title: "请填写完整借款人相关信息",
          icon: "none",
        });
        return false;
      }
    }
    if (this.data.itemlwf == "需要发放劳务费" || !this.data.itemlwf) {
      if (!this.data.lwfduixiang || !this.data.lwfmoney) {
        wx.showToast({
          title: "请填写完整劳务费申请相关信息",
          icon: "none",
        });
        return false;
      }
    }
    if (!this.data.cyrs) {
      wx.showToast({
        title: "请填写预计参与人数",
        icon: "none",
      });
      return false;
    }
    if (!this.data.itemoa) {
      wx.showToast({
        title: "请选择是否上传OA",
        icon: "none",
      });
      return false;
    }
    // this.final()
    wx.requestSubscribeMessage({
      tmplIds: ['KSfQkKmnbmBt6KhiRrKKQMXf5yK6nuQTVt8JbdxmLHk'],
      success(res) {

      },
      complete() {
        DB.add({ // add指 插入数据库中的userlist表；
            //将我们获取到的新值代入
            data: { // data 字段表示需新增的 JSON 数据       
              a1_huodongName: that.data.huodongna,
              a2_startTime: that.data.liststart,
              a3_endTime: that.data.listend,
              a4_huodongPlace: that.data.huodongpl,
              a5_area: that.data.area,


              b1_fzrName: that.data.fzrna,
              b2_fzrGrade: that.data.fzrgr,
              b3_fzrTelephone: that.data.fzrte,
              b4_fzrMail: that.data.fzrma,

              c1_jingfeiTotal: that.data.ystal,
              c2_jingfeiSelf: that.data.ysstal,
              c3_jingfeiApply: that.data.ysbtal,

              d1_sponsor: that.data.iten,
              d2_sponsorCompany: that.data.company,
              d3_sponsorForm: that.data.form,
              d4_sponsorMoney: that.data.money,
              d5_sponsorContract: that.data.contract,

              e1_borrow: that.data.item,
              e2_jkrName: that.data.jkrna,
              e3_jkrGrade: that.data.jkrgr,
              e4_jkrAge: that.data.jkrag,
              e5_jkrTelephone: that.data.jkrte,
              e6_jkrMoney: that.data.jkrmo,

              f1_serviceFee: that.data.itemlwf,
              f2_serviceObject: that.data.lwfduixiang,
              f3_serviceMoney: that.data.lwfmoney,
              // 上传所归属的组织的信息 g1 是组织的中文名称， g2是 组织的id值
              //其中 g2的值为0是校团委，1是学生会，2是青协，3是汕青，4是踹网
              g1_orderInstitute: that.data.newins,
              g2_organizationId: that.data.multiIndex[0],
              h1_remark: that.data.huodongbeizhu,
              h2_participant: that.data.cyrs,
              h3_uploadOA: that.data.itemoa,
              h4_briefContent: that.data.briefContent,

              state: 0,
            },
          }).then(res => {
            console.log("上传成功", res)
            wx.switchTab({
                url: '../index/index',
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
      }
    })

  },
})