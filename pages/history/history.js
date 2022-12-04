const db  = wx.cloud.database()
const app = getApp()
const _ = db.command
Page({
       data: {
         list:[],
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
                                 state:_.or(3,4)
                            })
                            .get()
                            .then(res=>{
                                   console.log('查询数据库成功',res.data)
                                   wx.stopPullDownRefresh()
                                   //将返回的res.data里面的值赋值给list
                                   this.setData({
                                          list:res.data
                                   })
                            })
                     })
                     .catch(err=>{
                            console.log("请求云函数失败",err)
                     })
       },
       onLoad() {
       wx.startPullDownRefresh()
       this.getList()
       },

       //监听下拉刷新
       onPullDownRefresh:function(){
              console.log('用户刷新了页面')
              //刷新页面数据
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
})