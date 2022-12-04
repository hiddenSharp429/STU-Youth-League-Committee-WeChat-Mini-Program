const db  = wx.cloud.database()
const app = getApp()
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
                            db.collection("appointment")
                            .where({
                                   //使用用户的openid来筛选活动
                                 _openid:res.result.openid,
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
})