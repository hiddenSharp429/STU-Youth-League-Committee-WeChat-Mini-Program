const DB = wx.cloud.database().collection("huoDong")
var a = 0
var huodong =new Array();
var fzr = new Array();
let jkr = new Array();
var myDate = new Date();
var ddate = 0
let eventName=''

Page({
  onLoad(){
    this.setData({
      liststart:this.data.startDates,
      listend:this.data.startDates,
      listyuyue1:this.data.startDates,
      listyuyue2:this.data.startDates,
      date1:this.data.startDates,
      date2:this.data.startDates,
      date3:this.data.startDates,
      date4:this.data.startDates,
      date5:this.data.startDates
    })
  },
  data:{
    array: ['','桑浦山校区', '东海岸校区'],
    objectArray: [
       {
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
    listend:'',
    listyuyue1:'',
    listyuyue2:'',
    huodongna :'',
    huodongpl:"",
    fzrna:"",
    fzrgr:"",
    fzrte:"",
    fzrma:"",

    jkrna:"",
    jkrgr:"",
    jkrag:"",
    jkrte:"",
    jkrmo:"",

    ystal:"",
    ysstal:"",
    ysbtal:"",

    money:"",
    company:"",
    form:"",
    contract:"",
    src:"",
    xingming:"Hello World!",

    userInfo:"",
    hasUserInfo:"true",

    openid:"",

    xieyi:"",

    cyrs:"",

    briefContent:"",

    items: [
      {value: '需要借款', name: '是'},
      {value: '不需要借款', name: '否'},
    ],

    // 这个是是否需要借款
    item:'',

    huodongbeizhu:'',
    display:true,
    itens: [
      {value: '有赞助', name: '是'},
      {value: '没有赞助', name: '否'},
    ],
    contractItens:[
       {value: '已提交', name: '是'},
       {value: '未提交', name: '否'},
    ],

    
    iten:'',
    displays:true,
    multiArray: [['','校团委', '学生会','校青协','汕大青年','踹网','研会']
//      ['教师1', '教师2', '教师3', '教师4','教师5']
],
//这里修补了一下bug，1为校团委，往后依次，0为校团委的废除了
    objectMultiArray: [
      [
        {id: 0,  name: '未选择'},
        {id: 1,  name: '校团委'},
        {id: 2,  name: '学生会'},
        {id: 3,  name: '校青协'},
        {id: 4,  name: '汕大青年'},
        {id: 5,  name: '踹网'},
        {id: 6,  name: '研会'},
      ], 
    ],
    multiIndex: [0],
    newins:'',
    newtea:'',
    area:'',
    select1: false,
        changdi1: false,
        accountIndex: 0,
        indoor:"",
        accounts: [ // value传给后台的值 ， label页面上显示的文字
          {
            value: 'kebaoting',
            label: '科报厅'
          },
          {
            value: 'wudaoshi',
            label: '舞蹈室'
          },
          {
            value: 'dalitang',
            label: '大礼堂'
          },
        ],
        date1: " ",
        select2: false,
        changdi2: false,
        accountIndex1: 0,
        outdoor:"",
        accounts1: [ // value传给后台的值 ， label页面上显示的文字
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
        itemslwf: [
              {value: '需要发放劳务费', name: '是'},
              {value: '不需要发放劳务费', name: '否'},
           ],
           itemlwf:"",
           lwfduixiang:"",
           lwfmoney:"",
           displaylwf:true,
       
           itemsoa:[
              {value: '需要上传OA', name: '是'},
              {value: '不需要上传OA', name: '否'},
           ],
           itemoa:"",
       itemxc: [
      {value: true, name: '是'},
      {value: false, name: '否'},
    ],

  },

    // 活动名称
    huodongName(res){
      console.log(res.detail.value,"活动名称")
      let huodongna = "活动名称："+res.detail.value
      this.setData({
        huodongna
      })
    console.log(huodongna)
    },
    // 起始时间选择
    bindDatechangeStart(e){
    // console.log(e)
      let obj = e.detail.value
      this.setData({
        liststart:obj
      })
      console.log("活动开始时间为", obj,this.data.liststart)
    },
    // 截止时间选择
    bindDatechangeEnd(e){
      console.log(e.detail.value)
      let objb =e.detail.value
      this.setData({
        listend:objb
      })
      console.log("活动截止时间为",objb,this.data.listend)
    },
    //活动地点 
    huodongPlace(res){
      console.log(res.detail.value,"活动地点")
      let huodongpl = "活动地点："+res.detail.value
      this.setData({
        huodongpl
      })
    console.log(huodongpl)
    },
    //选择校区
    bindPickerChange: function(e) {
       console.log('选择校区的picker发送选择改变，携带值为', e.detail.value)
       this.setData({
         index: e.detail.value
       })
       var area0 = "桑浦山校区"
         if(e.detail.value==1){
                this.setData({
                     area: area0
                })
         }
         var area1 = "东海岸校区"
         if(e.detail.value==2){
                this.setData({
                     area: area1
                })
         }
         console.log('校区:',this.data.area)
     },
    // 负责人信息
    fzrName(res){
      console.log(res.detail.value,"负责人姓名")
      let fzrna = "负责人姓名："+res.detail.value
      this.setData({
        fzrna
      })
      console.log(fzrna,"fzrna")
    },

    fzrGrade(res){
      console.log(res.detail.value,"负责人专业")
      let fzrgr = "负责人专业："+res.detail.value
      this.setData({
        fzrgr
      })
      console.log(fzrgr,"fzrgr")
    },

    fzrTelephone(res){
      console.log(res.detail.value,"负责人联系方式")
      let fzrte = "负责人联系方式："+res.detail.value
      this.setData({
        fzrte
      })
      console.log(fzrte,"fzrte")
    },

    fzrMail(res){
      console.log(res.detail.value,"负责人电子邮箱")
      let fzrma = "负责人邮箱："+res.detail.value
      this.setData({
        fzrma
      })
      console.log(fzrma,"fzrma")
    },

    //活动经费预算
    //合计数
    ysTotal(res){
           console.log(res.detail.value,"合计总额")
           let ystal ="合计总额："+res.detail.value
           this.setData({
                  ystal:res.detail.value
           })
           console.log(ystal,"ystal")
    },
    //自筹数
    yssTotal(res){
       console.log(res.detail.value,"自筹金额")
       let ysstal ="自筹金额："+res.detail.value
       this.setData({
              ysstal:res.detail.value
       })
       console.log(ysstal,"ysstal")
    },

    //申请拨款数
    ysbTotal(res){
       console.log(res.detail.value,"拨款金额")
       let ysbtal ="拨款金额："+res.detail.value
       this.setData({
              ysbtal:res.detail.value
       })
       console.log(ysbtal,"ysbtal")
    },
    // 预约起始时间选择
    bindDatechangeYuyue1(e){
      console.log(e.detail.value)
      let listyuyue1 =e.detail.value
      this.setData({
        listyuyue1
      })
      console.log("预约开始时间为", listyuyue1,this.data.listyuyue1)
    },
    // 预约截止时间选择
    bindDatechangeYuyue2(e){
      console.log(e.detail.value)
      let listyuyue2 =e.detail.value
      this.setData({
        listyuyue2
      })
      console.log("预约截止时间为", listyuyue2,this.data.listyuyue2)
      },
    // 是否需要借款单项选择
    radioChange(e) {
      console.log('radio发生change事件，携带value值为：', e.detail.value)
  
      const items = this.data.items
      let item = e.detail.value
      // for (let i = 0, len = items.length; i < len; ++i) {
      //   items[i].checked = items[i].value === e.detail.value
      // }
  
      this.setData({
        items,
        item
      })
      if(item == "不需要借款"){
        this.setData({
          display:true
        })
      }else{
        this.setData({
          display:false
        })
      }
      console.log(item, this.data.display+"借款")
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
       if(iten == "没有赞助"){
         this.setData({
           displays:true
         })
       }else{
         this.setData({
           displays:false
         })
       }
       console.log(iten, this.data.displays)
     },

    // 是否有提交赞助合同单项选择
    radioChange2plus(e) {
       console.log('radio发生change事件，携带value值为：', e.detail.value)
       this.setData({
              contract:e.detail.value
       })
   

     },
    // 是否需要申请发放劳务费
    radioChange3(e) {
       console.log('radio发生change事件，携带value值为', e.detail.value)
          
       const itemslwf = this.data.itemslwf
       let itemlwf = e.detail.value  
       this.setData({
         itemslwf,
         itemlwf
       })
       if(itemlwf == "不需要发放劳务费"){
              this.setData({
                  displaylwf:true
                })
       }else{
              this.setData({
              displaylwf:false
                })
              }
              console.log(this.data.itemlwf)
            },
    // 是否需要上传oa
   radioChange4(e) {
              console.log('radio发生change事件，携带value值为：', e.detail.value)
          
              const itemsoa = this.data.itemsoa
              let itemoa = e.detail.value
        
              this.setData({
                itemsoa,
                itemoa
              })
              console.log(this.data.itemoa)
            },

    // 所归属的组织选择
    bindMultiPickerChange: function (e) {
      console.log('picker发送选择改变，携带值为', e.detail.value)
      this.setData({
        multiIndex: e.detail.value
      })
      var newins0 = "校团委"
         if(this.data.multiIndex[0]==1){
                this.setData({
                     newins: newins0
                })
         }
         var newins1 = "学生会"
         if(this.data.multiIndex[0]==2){
                this.setData({
                     newins: newins1
                })
         }
         var newins2 = "校青年志愿者"
         if(this.data.multiIndex[0]==3){
                this.setData({
                     newins: newins2
                })
         }
         var newins3 = "汕大青年"
         if(this.data.multiIndex[0]==4){
                this.setData({
                     newins: newins3
                })
         }
         var newins4 = "踹网"
         if(this.data.multiIndex[0]==5){
                this.setData({
                     newins: newins4
                })
         }
         var newins5 = "研会"
         if(this.data.multiIndex[0]==6){
                this.setData({
                     newins: newins5
                })
         }

    },
    bindMultiPickerColumnChange: function (e) {
      console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
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
              data.multiArray[1] = ['教师6', '教师7','教师8','教师9','教师10',];
              break;
            case 2:
              data.multiArray[1] = ['教师11', '教师12','教师13','教师14','教师15',];
              break;
            case 3:
              data.multiArray[1] = ['教师16', '教师17','教师18','教师19','教师20',];
              break;
            case 4:
              data.multiArray[1] = ['教师21', '教师22','教师23','教师24','教师25',];
              break;
          }
          data.multiIndex[1] = 0;
          break;
      }
      console.log(data.multiIndex);
      this.setData({
       data,
       newins:this.data.multiArray[0],
       newtea:this.data.multiArray[1],
      });
//       0是校团委，1是学生会，2是校青年志愿者，3是汕大青年，4是踹网
    },
    // 获取用户信息
    getUserProfile(e){
      wx.getUserProfile({
        desc: '展示用户信息',
      
        success:(res) =>{
        console.log(res)
        this.setData({
          userInfo:res.userInfo,
          hasUserInfo:true
        })
        },
      })
      console.log(this.data.src, this.data.xingming)
    },
    // 借款人信息
    // 借款人姓名
    jkrName(res){
      console.log(res.detail.value,"借款人姓名")
      let jkrna = "借款人姓名："+res.detail.value
      this.setData({
        jkrna
      })
    console.log(jkrna)
    },
    // 借款人专业
    jkrGrade(res){
      console.log(res.detail.value,"借款人专业")
      let jkrgr = "借款人专业："+res.detail.value
      this.setData({
        jkrgr
      })
    console.log(jkrgr)
    },
    // 借款人年龄
    jkrAge(res){
      console.log(res.detail.value,"借款人年龄")
      let jkrag = "借款人年龄："+res.detail.value
      this.setData({
        jkrag
      })
    console.log(jkrag)
    },
    // 借款人电话
    jkrTelephone(res){
      console.log(res.detail.value,"借款人联系电话")
      let jkrte = "借款人联系电话："+res.detail.value
      this.setData({
        jkrte
      })
    console.log(jkrte)
    },
    // 借款金额
    jkrMoney(res){
      console.log(res.detail.value,"借款金额")
      let jkrmo = "借款金额："+res.detail.value
      this.setData({
        jkrmo
      })
    console.log(jkrmo)
    },
    // 赞助金额
    Money(res){
      console.log(res.detail.value,"赞助金额")
      let money = "赞助金额："+res.detail.value
      this.setData({
        money
      })
    console.log(money)
    },
    //赞助公司
    Company(res){
       console.log(res.detail.value,"赞助公司")
       let company = "赞助公司："+res.detail.value
       this.setData({
              company
       })
     console.log(company)
     },
     //赞助形式
     Form(res){
       console.log(res.detail.value,"赞助形式")
       let form = "赞助形式："+res.detail.value
       this.setData({
              form
       })
     console.log(form)
     },


       lwfDuix(res){
       console.log(res.detail.value,"劳务费对象")
       let lwfduixiang = "劳务费对象："+res.detail.value
       this.setData({
              lwfduixiang
       })
     console.log(this.data.lwfduixiang)
     },

     lwfMoney(res){
       console.log(res.detail.value,"劳务费金额")
       let lwfmoney = "申请劳务费金额："+res.detail.value
       this.setData({
              lwfmoney
       })
     console.log(this.data.lwfmoney)
     },

    // 活动备注获取
    huodongBeizhu(res){
      console.log(res.detail.value,"活动地点")
      let huodongbeizhu = "预约事项备注："+res.detail.value
      this.setData({
        huodongbeizhu
      })
    console.log(huodongbeizhu)
    },

    //预计参与人数填写
    amount(res){
                  console.log(res.detail.value,"预计参与人数")
                  let cyrs = "预计参与人数有"+res.detail.value+"人"
                  this.setData({
                         cyrs
                  })
                  console.log(cyrs)
           },
   // 项目内容阐述填写
   briefContent(res){
              console.log(res.detail.value,"项目内容阐述是")
              let briefContent = "项目内容阐述是："+res.detail.value
               this.setData({
                         briefContent
                         })
                      console.log(briefContent)
                  },     

    // 提交按钮提交信息
    Tijiao(e){
      if(this.data.huodongna ==''){
        wx.showToast({
          icon:"none",
          title: '活动名称尚未填写',
        })
      }
      else if(this.data.huodongpl ==''){
        wx.showToast({
          icon:"none",
          title: '活动地点尚未填写',
        })
      }
      else if(this.data.fzrma =='' || this.data.fzrgr =='' || this.data.fzrte =='' || this.data.fzrma ==''){
        wx.showToast({
          icon:"none",
          title: '负责人信息尚未填写完整',
        })
      }
      else if(this.data.item == ''){
        wx.showToast({
          icon:"none",
          title: '活动经费部分尚未填写完整',
        })
      }
      else if(this.data.iten == ''){
        wx.showToast({
          icon:"none",
          title: '是否有赞助尚未勾选',
        })
      }
      else{
        switch(this.data.item){
          case "不需要借款":
            switch(this.data.iten){
              case "没有赞助":
                this.final()
                break;
              case "有赞助":
                if(this.data.money == ''){
                  wx.showToast({
                    icon:"none",
                    title: '赞助金额未填写',
                  })
                }
                else if(this.data.xieyi == ''){
                  wx.showToast({
                    icon:"none",
                    title: '赞助协议未上传',
                  })
                }
                else{
                  this.final()
                }
                break;    
              }
              break;
          case '需要借款':
            if(this.data.jkrna =='' || this.data.jkrgr =='' || this.data.jkrag =='' || this.data.jkrte =='' ||this.data.jkrmo ==''){
              wx.showToast({
                icon:"none",
                title: '借款人信息尚未填写完整',
              })
            }
            else{
              switch(this.data.iten){
                case "没有赞助":
                  // final后面有定义
                  this.final()
                  break;
                case "有赞助":
                  if(this.data.money == ''){
                    wx.showToast({
                      icon:"none",
                      title: '赞助金额未填写',
                    })
                  }
                  else if(this.data.xieyi == ''){
                    wx.showToast({
                      icon:"none",
                      title: '赞助协议未上传',
                    })
                  }
                  else{
                    this.final()
                  }
                 break;    
              }
          break;
            }
        }
        
      }
     
    },

//     getopenid(){
//       // let that = this
//       wx.cloud.callFunction({
//         name:"getOpenid",
//         success:(res) =>{
//           // 用success:(res) =>{}这种方法表示函数可以不怕易位的影响，可以不需要使用 let that= this来转换方向
//           console.log( "获取id成功",res.result.openid)
//           this.setData({
//             openid:res.result.openid
//           })
//           console.log(this.data.openid, "这是this.data.openid")

//         },
//         fail(res){
//           console.log("获取id失败",res)
//         }
//       })
//     },

    upLoad(){
      let that =this
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success (res) {
          // tempFilePath可以作为 img 标签的 src 属性显示图片
          // const tempFilePaths = res.tempFilePaths
          console.log("选择成功",res)
          console.log(res.tempFilePaths[0])
          that.upLoadImg(res.tempFilePaths[0]);

        }
      })
    },
    upLoadImg(fileUrl){
      wx.cloud.uploadFile({
        cloudPath: 'qqq.png', // 上传至云端的路径
        filePath: fileUrl, // 小程序临时文件路径
        success: res => {
          // 返回文件 ID
          console.log("上传成功",res)
        },
        fail: console.error
      })
    },
    // 用于上传所有数据到数据库
    final(){
      
      wx.cloud.callFunction({
        name:"getOpenid",
        success:(res) =>{
          // 用success:(res) =>{}这种方法表示函数可以不怕易位的影响，可以不需要使用 let that= this来转换方向
          console.log( "获取id成功",res.result.openid)
          this.setData({
            openid:res.result.openid
          })
          console.log(this.data.openid, "这是this.data.openid")

        },
        fail(res){
          console.log("获取id失败",res)
        }
      })      
      let yhuodongna =this.data.huodongna
      let newins = this.data.multiArray[0]
      let newtea = this.data.multiArray[1]

    },

    changeyes1() {
       this.setData({
         changdi1: true,
       })
     },
     changeno1() {
       this.setData({
         changdi1: false,
       })
     },
     changeyes2() {
       this.setData({
         changdi2: true,
       })
     },
     changeno2() {
       this.setData({
         changdi2: false,
       })
     },
     changeyes3() {
       this.setData({
         wuzi: true,
       })
     },
     changeno3() {
       this.setData({
         wuzi: false,
       })
     },
     changeyes4() {
       this.setData({
         banyun: true,
       })
     },
     changeno4() {
       this.setData({
         banyun: false,
       })
     },
     changeyes5() {
       this.setData({
         xc: true,
       })
     },
     changeno5() {
       this.setData({
         xc: false,
       })
     },
     bindShowMsg1() {
       this.setData({
         select1: !this.data.select1
       })
     },
     bindShowMsg2() {
       this.setData({
         select2: !this.data.select2
       })
     },

     // 下拉切换
     bindAccountChange(e) {
       console.log('切换改变的值', e.detail.value);
       this.setData({
         accountIndex: e.detail.value,
         indoor:this.data.accounts[this.data.accountIndex].label
       })
       // console.log(this.data.accounts[this.data.accountIndex].label)
       console.log(this.data.indoor+"这是室内")
     },
     bindAccountChange1(e) {
       console.log('切换改变的值', e.detail.value);
       this.setData({
         accountIndex1: e.detail.value,
         outdoor:this.data.accounts1[this.data.accountIndex1].label
       })
       console.log(this.data.accounts1[this.data.accountIndex1].label)
       console.log(this.data.outdoor+"这是户外")

     },
     mySelect1(e) {
       var name = e.currentTarget.dataset.name
       this.setData({
              // 缺
         shinei: name,
         select1: false,
       })
     },
     mySelect2(e) {
       var name2 = e.currentTarget.dataset.name
       this.setData({
         huwai: name2,
         select2: false,
       })
     },
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
     bindDateChange3: function (e) {
       console.log(e.detail.value)
       this.setData({
         date3: e.detail.value
       })
     },
     bindDateChange4: function (e) {
       console.log(e.detail.value)
       this.setData({
         date4: e.detail.value
       })
     },
     bindDateChange5: function (e) {
       console.log(e.detail.value)
       this.setData({
         date5: e.detail.value
       })
     },
     addList: function () {
       var lists = this.data.lists;
       var newData = {
         "reward": "",
         "num": 0
       };
       lists.push(newData); //实质是添加lists数组内容，使for循环多一次
       this.setData({
         lists: lists,
       })
     },
     delList: function (e) {
       var lists = this.data.lists;
       let index = e.currentTarget.dataset.index // 获取数据的索引
       lists.splice(index, 1)
       //lists.pop();      //实质是删除lists数组内容，使for循环少一次
       this.setData({
         lists: lists,
       })
     },
     bindRewrdInput: function (e) {
       let that = this
       var val = e.detail.value;
       let index = e.currentTarget.dataset.index // 获取数据的索引
       let reward = 'lists[' + index + '].reward' // 获取lists[index].reward
       // var lists = that.data.lists;
       that.setData({
         [reward]: val
       })
       //console.log(lists)
     },
     bindNumInput: function (e) {
       let that = this
       var val = e.detail.value;
       let index = e.currentTarget.dataset.index // 获取数据的索引
       let num = 'lists[' + index + '].num' // 获取lists[index].num
       // var lists = that.data.lists;
       that.setData({
         [num]: val
       })
       //console.log(lists)
     },
     addList1: function () {
       var lists1 = this.data.lists1;
       var newData1 = {
         "sth": "",
         "mon": 0
       };
       lists1.push(newData1); //实质是添加lists数组内容，使for循环多一次
       this.setData({
         lists1: lists1,
       })
     },
     delList1: function (res) {
       var lists1 = this.data.lists1;
       let index1 = res.currentTarget.dataset.index // 获取数据的索引
       lists1.splice(index1, 1)
       //lists.pop();      //实质是删除lists数组内容，使for循环少一次
       this.setData({
         lists1: lists1,
       })
     },
     bindRewrdInput1: function (e) {
       let that = this
       var val = e.detail.value;
       let index = e.currentTarget.dataset.index // 获取数据的索引
       let sth = 'lists1[' + index + '].sth' // 获取lists[index].reward
       // var lists = that.data.lists;
       that.setData({
         [sth]: val
       })
       //console.log(lists)
     },
     bindNumInput1: function (e) {
       let that = this
       var val = e.detail.value;
       let index1 = e.currentTarget.dataset.index // 获取数据的索引
       let mon = 'lists1[' + index1 + '].mon' // 获取lists1[index].mon
       that.setData({
         [mon]: val
       })
     },
     uploaddoc() {
       wx.chooseMessageFile({
         count: 3,
         type: 'all',
         success(res) {
           console.log("选择excel成功", res)
           wx.cloud.uploadFile({
             cloudPath: '搬运附件.xlsx',
             filePath: res.tempFiles[0].path, // 文件路径
           }).then(res => {
             // get resource ID
             console.log("上传成功", res)
           }).catch(error => {
             // handle error
           })
         }
       })
     },
     checkboxChange: function (e) {
       var item = e.detail.value //选中的数组
       var id = []; //选中的ID
       var name = []; //选中的NAME

       //循环选中的数组，取出对应的数据进行数组拼接
       for (var i = 0; i < item.length; i++) {
         var row = item[i].split(",") //将数组进行分割
         id = id.concat(row[0]) //数组下表的第一个为id
         name = name.concat(row[1]) //数组下表的第二个为name
       }
       console.log(id)
       console.log(name)
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
       
       if(this.data.iten == "有赞助" || !this.data.iten){
              if(!this.data.company || !this.data.form || !this.data.money){
                     wx.showToast({
                            title: "请填写完整赞助相关信息",
                            icon: "none",
                     });
                     return false;
              }
       }
       if(this.data.item == "需要借款" || !this.data.item){
              if(!this.data.jkrna || !this.data.jkrgr || !this.data.jkrag || !this.data.jkrte || !this.data.jkrmo){
                     wx.showToast({
                            title: "请填写完整借款人相关信息",
                            icon: "none",
                     });
                     return false;
              }
       }
       if(this.data.itemlwf == "需要发放劳务费" || !this.data.itemlwf){
              if(!this.data.lwfduixiang || !this.data.lwfmoney){
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

       wx.showLoading({
         title: '正在上传中……',
         mask:true
       })
       this.final()
       DB.add({ // add指 插入数据库中的userlist表；
         //将我们获取到的新值代入
           data: { // data 字段表示需新增的 JSON 数据       
              a1_huodongName:this.data.huodongna,
              a2_startTime:"活动起始时间："+this.data.liststart,
              a3_endTime:"活动截止时间："+this.data.listend,
              a4_huodongPlace:this.data.huodongpl,
              a5_area:this.data.area,


              b1_fzrName:this.data.fzrna,
              b2_fzrGrade:this.data.fzrgr,
              b3_fzrTelephone:this.data.fzrte,
              b4_fzrMail:this.data.fzrma,

              c1_jingfeiTotal: "活动经费预算合计："+this.data.ystal,
              c2_jingfeiSelf: "活动经费自筹："+this.data.ysstal,
              c3_jingfeiApply: "活动申请拨款数："+this.data.ysbtal,

              d1_sponsor:this.data.iten,
              d2_sponsorCompany:this.data.company,
              d3_sponsorForm:this.data.form,
              d4_sponsorMoney:this.data.money,
              d5_sponsorContract:this.data.contract+"赞助合同",

              e1_borrow:this.data.item,
              e2_jkrName:this.data.jkrna,
              e3_jkrGrade:this.data.jkrgr,
              e4_jkrAge:this.data.jkrag,
              e5_jkrTelephone:this.data.jkrte,
              e6_jkrMoney:this.data.jkrmo,

              f1_serviceFee:this.data.itemlwf,
              f2_serviceObject:this.data.lwfduixiang,
              f3_serviceMoney:this.data.lwfmoney,
              // 上传所归属的组织的信息 g1 是组织的中文名称， g2是 组织的id值
              //其中 g2的值为0是校团委，1是学生会，2是青协，3是汕青，4是踹网
              g1_orderInstitute: this.data.newins,
              g2_organizationId: this.data.multiIndex[0],
              // g2_orderTeacher: "预约指导老师："+this.data.newtea[this.data.multiIndex[1]],
              // g3_orderStartTime: "预约开始时间："+this.data.listyuyue1,
              // g4_orderEndTime: "预约截止时间："+this.data.listyuyue2,

              h1_remark:this.data.huodongbeizhu,
              h2_participant:this.data.cyrs,
              h3_uploadOA:this.data.itemoa,
              h4_briefContent:this.data.briefContent,

              state:0,
           },
         }).then(res => {
           console.log("上传成功", res)
           wx.showToast({
             title: '成功',
           })
           wx.switchTab({
             url: '../index/index',
           })
           .then(()=>{
              wx.startPullDownRefresh()
           })
         })
         .catch(err => {
           console.log("上传失败", err)
           wx.showToast({
             title: '失败',
             icon:"none"
           })
         })
       }

})