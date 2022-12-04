const db  = wx.cloud.database()
const app = getApp()
const _ = db.command
Page({
       data: {
         list:[],
         imfor:[],
         
       },
       //获取活动列表
       getList(){
              //调用云函数来获取用户openid
              wx.cloud.callFunction({
                     name:'getData'
              })
                     .then(res=>{
                            console.log("用户openid",res.result.openid)
                            db.collection("huoDong")
                            .where({
                                   //使用用户的openid来筛选活动
                                 _openid:res.result.openid,
                            //      使用state的值来筛选活动，过滤掉已结束的活动
                                   state: _.lt(3)
                            })
                            .get()
                            .then(res=>{
                                   console.log('查询数据库成功',res.data)
                                   //将返回的res.data里面的值赋值给list
                                   this.setData({
                                          imfor :res.data,
                                   })
                                   wx.stopPullDownRefresh()
                                   console.log("结束刷新")
                            })
                     })
                     .catch(err=>{
                            console.log("请求云函数失败",err)
                     })
       },
       onLoad() {
       // 启动的时候自动刷新页面
       wx.startPullDownRefresh()
       this.getList()
       },

       //跳转活动详情页面
       goDetail(e){
              console.log("点击了详情页面,将展示活动的id ",e)
              wx.navigateTo({
              // 跳转到活动详情页面并携带活动id
                url: '/pages/eventDetail/eventDetail?id=' +e.currentTarget.dataset.id 
              })
       },

       //跳转到yuyue界面
       goNext(e){
              console.log("111 ",e)
              wx.navigateTo({
              // 跳转到活动详情页面并携带活动id
                url: '/pages/yuyue/yuyue?id=' +e.currentTarget.dataset.id 
              })
       },

              //跳转活动总结报告页面
       goending(e){
              console.log("点击了活动总结,将展示活动的id ",e.currentTarget.dataset.id)
              wx.navigateTo({
              //跳转到活动详情页面并携带活动id
                     url: '/pages/summarize/summarize?id=' +e.currentTarget.dataset.id 
              })
       },
       
       //监听下拉刷新
       onPullDownRefresh:function(){
              console.log('用户刷新了页面')
              //刷新页面数据
              this.getList()
       },

       //返回首页并退出登录
       back(){
              console.log("点击了返回")
              wx.showModal({
                     title: '退出登录并返回主页',
                     content: '您确定退出用户端吗？',
                     success (res) {
                     if (res.confirm) {
                            wx.redirectTo({
                                   url: '../choicePage/choicePage',
                                 })
                     } else if (res.cancel) {
                     console.log('用户点击取消')
                     }
                     }
              })
       }
})

     
   