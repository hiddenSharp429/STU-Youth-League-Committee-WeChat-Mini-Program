const DB = wx.cloud.database().collection("appointment")
// 在一开始加了个时间段数集
var hourLists = ["9:00", "9:30", "10:00", "10:30","11:00", "11:30", "14:30", "15:00","15:30", "16:00", "16:30", "17:00"];
//引用util里的时间工具获取当前时间
var util = require('../../utils/util.js')
//这个在showTimeModel/submit里面有用到，为了提交预约的时候把提交的时间给一起提交到数据库
var presentDayTime = util.formatTime(new Date())
Page({
       data: {
              // 组织
           multiArray: [['校团委', '学生会','校青年志愿者','汕大青年','踹网']],
              //老师
           multiArray1: [['姚溱', '陈益纯','林煜','林蔷','罗列','黄嘉曼']],
           multiIndex: [0],
           multiIndex1: [0],
           newins:'校团委',
           newtea:'姚溱',
           occupyTime:[],
           content:'',
           subscriber:'',
           subscriberPhone:'',

           //日期
           timeList: [],
           //可预约天数
           yyDay:2,
           //预约时间段
           hourList: [ 
                       {hour: "9:00",n: 9,isShow: true},
                       {hour: "9:30",n: 9.5,isShow: true},
                       {hour: "10:00",n: 10,isShow: true},
                       {hour: "10:30",n: 10.5,isShow: true},
                       {hour: "11:00",n: 11,isShow: true}, 
                       {hour: "11:30",n: 11.5,isShow: true}, 
                       {hour: "14:30",n: 14.5,isShow: true}, 
                       {hour: "15:00",n: 15,isShow: true}, 
                       {hour: "15:30",n: 15.5,isShow: true}, 
                       {hour: "16:00",n: 16,isShow: true}, 
                       {hour: "16:30",n: 16.5,isShow: true}, 
                       {hour: "17:00",n: 17,isShow: true}
           ],
           //是否显示
           timeShow: false,
           currentTab: 0,
           //选择时间
           chooseHour: "",
           //选择日期
           chooseTime: "",
           hourIndex: -1,
           //预约时间
           yyTime:'',
           day:''
       },
       onLoad() {
              // 启动的时候自动刷新页面
              wx.startPullDownRefresh()
              },
       //弹出按钮
       showTimeModel: function () {
              console.log("当前时间",presentDayTime)
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
           }
           this.setData({
               currentTab: e.currentTarget.dataset.index,
               chooseTime: this.data.timeList[e.currentTarget.dataset.index].date,
               yyTime: '',
               chooseHour: "",
               hourIndex: -1
           });
           console.log("这个是choosetime",this.data.chooseTime)
           //同一个老师同一个时段占用不可选
              // 前提是选择完老师然后点击预约时间后会在数据里面搜索该老师当天已经预约的时间段
              let that = this;
              DB.where({
              g2_organTeacherId:this.data.multiIndex1[0],
              state:0,
              //！这里修改了一下 功能是当用户点击了日期的时候会筛查 选择的老师 和 老师的时间是否被占用，用了一个第一个day是指数据库里的属性day，后面的this.data.chooseTime是指用户点击的日期
              day:this.data.chooseTime,
                     })
                     .get()
                     .then(res=>{
                            // 搜索到了以后（也许有多条数据），在后面将每条数据里面的hour值提取出来
                            console.log('查询数据库成功',res.data)
                            console.log(res.data.length,'长度')
                            let lengths =res.data.length
                            console.log(hourLists)
                            // 每条数据单独处理，将其提取出的hour与开头建立的hourlists的各条时间段比对，配对成功的将该条isshow改掉
                            // 这里的hour之前报错的原因是在for里面，a<=lengths,这里错了不需要用=，比如，这里面有三条数据，如果你用了=，就会循环到第四条数据停下来，从而报“未定义”的错
                            let that =this;
                            for(let a =0;a<lengths;a++){
                                   console.log(lengths,'lengths')
                                   var Chour =res.data[a].hour
                                   console.log(res.data[a].hour)
                                   for(let b =0; b<=11;b++){
                                          if(Chour == hourLists[b]){
                                                 console.log(b+1)
                                                 console.log(this.data.hourList,"这是")
                                                 list[b].isShow =false
                                                 this.setData({
                                                        hourList: list
                                                    })
                                          }
                                   }
                            }
                            var arr =res.data       
                            for(var x=0 ; x<=arr.length-1;x++){
                                   let b =x
                                   console.log(arr[x].hour,666)                        
                            }
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
          console.log('这个是选择的日期',choiceDay)
           var chooseTime = new Date().getFullYear() + "-" + this.data.chooseTime + " " + this.data.chooseHour
           this.setData({
               yyTime: chooseTime
           })
           console.log('这是选择的时间',chooseTime)
       },
       onLoad: function (options) {
           Date.prototype.Format = function (format) {
               var o = {
                   "M+": this.getMonth() + 1,  //month
                   "d+": this.getDate(),     //day
                   "h+": this.getHours(),    //hour
                   "m+": this.getMinutes(),  //minute
                   "s+": this.getSeconds(), //second
                   "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter
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
                   case "y": date.setFullYear(this.getFullYear() + number); break;
                   case "m": date.setMonth(this.getMonth() + number); break;
                   case "d": date.setDate(this.getDate() + number); break;
                   case "w": date.setDate(this.getDate() + 7 * number); break;
                   case "h": date.setHours(this.getHours() + number); break;
                   case "n": date.setMinutes(this.getMinutes() + number); break;
                   case "s": date.setSeconds(this.getSeconds() + number); break;
                   case "l": date.setMilliseconds(this.getMilliseconds() + number); break;
               }
               return date;
           }
   
   
   
           var dateList = [];
           var now = new Date();
           for (var i = 0; i < this.data.yyDay; i++) {
               var d = {};
               var day = new Date().DateAdd('d', i).getDay();
               if (day == 1) { var w = "周一" }
               if (day == 2) { var w = "周二" }
               if (day == 3) { var w = "周三" }
               if (day == 4) { var w = "周四" }
               if (day == 5) { var w = "周五" }
               if (day == 6) { var w = "周六" }
               if (day == 0) { var w = "周日" }
               d.name = w;
               d.date = new Date().DateAdd('d', i).Format("MM-dd");
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
       
       // 选择归属的组织
        //       0是校团委，1是学生会，2是校青年志愿者，3是汕大青年，4是踹网
       bindMultiPickerChange: function (e) {
         console.log('picker发送选择改变，携带组织的值为', e.detail.value)
         this.setData({
           multiIndex: e.detail.value,
         })
         var newins0 = "校团委"
         if(this.data.multiIndex[0]==0){
                this.setData({
                     newins: newins0
                })
         }
         var newins1 = "学生会"
         if(this.data.multiIndex[0]==1){
                this.setData({
                     newins: newins1
                })
         }
         var newins2 = "校青年志愿者"
         if(this.data.multiIndex[0]==2){
                this.setData({
                     newins: newins2
                })
         }
         var newins3 = "汕大青年"
         if(this.data.multiIndex[0]==3){
                this.setData({
                     newins: newins3
                })
         }
         var newins4 = "踹网"
         if(this.data.multiIndex[0]==4){
                this.setData({
                     newins: newins4
                })
         }

         
       //   objectMultiArray: [
       //        [ {id: 0,  name: '校团委'},
       //          {id: 1,  name: '学生会'},
       //          {id: 2,  name: '校青年志愿者'},
       //          {id: 3,  name: '汕大青年'},
       //          {id: 4,  name: '踹网'},
       //        ], 
       },

       //选择预约的老师
       //     0是姚溱  1是陈益纯  2是林煜  3是林蔷  4是罗列  5是黄嘉曼
       bindMultiPickerChange1: function (e) {
              console.log('picker发送选择改变，携带老师的名字为', e.detail.value)
              this.setData({
                multiIndex1: e.detail.value
              })
              var newtea0 = "姚溱"
              if(this.data.multiIndex1[0]==0){
                     this.setData({
                            newtea: newtea0
                     })
              }
              var newtea1 = "陈益纯"
              if(this.data.multiIndex1[0]==1){
                     this.setData({
                            newtea: newtea1
                     })
              }
              var newtea2 = "林煜"
              if(this.data.multiIndex1[0]==2){
                     this.setData({
                            newtea: newtea2
                     })
              }
              var newtea3 = "林蔷"
              if(this.data.multiIndex1[0]==3){
                     this.setData({
                            newtea: newtea3
                     })
              }
              var newtea4 = "罗列"
              if(this.data.multiIndex1[0]==4){
                     this.setData({
                            newtea: newtea4
                     })
              }
              var newtea5 = "黄嘉曼"
              if(this.data.multiIndex1[0]==5){
                     this.setData({
                            newtea: newtea5
                     })
              }
            },
       //sumit里面的前置函数
       final(){
      
              // wx.cloud.callFunction({
              //   name:"getOpenid",
              //   success:(res) =>{
              //     // 用success:(res) =>{}这种方法表示函数可以不怕易位的影响，可以不需要使用 let that= this来转换方向
              //     console.log( "获取id成功",res.result.openid)
              //     this.setData({
              //       openid:res.result.openid
              //     })
              //     console.log(this.data.openid, "这是this.data.openid")
        
              //   },
              //   fail(res){
              //     console.log("获取id失败",res)
              //   }
              // })      
              let newins = this.data.multiArray[0]
              let newtea = this.data.multiArray[1]
        
            },
       
       // 预约事项
       content(res){
       console.log(res.detail.value,"预约事项")
       let content = res.detail.value
       this.setData({
         content:content
       })
     console.log(content)
     },

     // 预约人
     subscriber(res){
       console.log(res.detail.value,"预约人")
       let subscriber = res.detail.value
       this.setData({
              subscriber:subscriber
       })
     console.log(subscriber)
     },

     // 预约人手机号
     subscriberPhone(res){
       console.log(res.detail.value,"预约人手机号")
       let subscriberPhone = res.detail.value
       this.setData({
              subscriberPhone:subscriberPhone
       })
     console.log(subscriberPhone)
     },
     //超级用户登录
     goVip(){
       console.log("点击了超级用户登录s")
       wx.showModal({
              title: '预约不受限用户登录系统',
              content: '您确定要登录不受限预约系统吗',
              success (res) {
              if (res.confirm) {
                     wx.navigateTo({
                      url: '../vipLogin/vipLogin',
                      })
              } else if (res.cancel) {
              console.log('用户点击取消')
              }
              }
       })
      
     },
     
       //提交预约
       submit: function (e) {
       let that = this;
       if (!this.data.yyTime) {
              wx.showToast({
                     title: "请选择预约时间",
                     icon: "none",
              });
              return false;
              }
       this.final()
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
              appointment:"预约的时间"+this.data.yyTime,
              time:"提交预约时间"+presentDayTime,
              subscriber:this.data.subscriber,
              subscriberPhone:this.data.subscriberPhone,
              state:0,
              //上传了选择的日期和选择的小时
              day:this.data.day,
              hour:this.data.chooseHour,
              content:this.data.content
              },
              
              }).then(res => {
              console.log("上传成功", res)
              wx.showToast({
              title: '成功',
              })
              wx.startPullDownRefresh()
              wx.stopPullDownRefresh()
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