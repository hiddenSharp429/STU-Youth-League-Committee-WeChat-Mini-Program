const db = wx.cloud.database()
const _ = db.command
Page({
       data: {
              list:[]

       },
       onLoad(options) {
              //调用云函数来突破返回数据库的条数只有20条的限制
              wx.cloud.callFunction({
                     name:'getAll'
              })
              .then(res=>{
                     console.log('成功',res)
                     this.setData({
                      list :res.result.data,
                     })
              })
              .catch(res=>{
                     console.log("失败",res);
              })
              // db.collection("huoDong")
              //               .where({
              //                      // 使用command指令从而起到“或”的作用
              //                    state:_.or(3,4)
              //               })
              //               .get()
              //               .then(res=>{
              //                      console.log('查询数据库成功',res.data)
              //                      //将返回的res.data里面的值赋值给list
              //                      this.setData({
              //                             list :res.data,
              //                      })
              //                      console.log("这是list",this.data.list)
              //               })

       },
       onPullDownRefresh() {

       },
       onReachBottom() {

       },
       goDetail(e){
              console.log("点击了详情页面,将展示活动的id ",e)
              wx.navigateTo({
              // 跳转到活动详情页面并携带活动id
                url: '/pages/TeventDetail/TeventDetail?id=' +e.currentTarget.dataset.id 
              })
       },
       // 前往待审批页面
       goApprovalPage(){
              wx.redirectTo({
                     url: '../approval/approval',
                   })
       },
       // 前往已通过页面
       goPassPage(){
              wx.redirectTo({
                     url: '../approvalPass/approvaPass',
                   })
       },
       // 前往已驳回页面
       goRejectPage(){
              wx.redirectTo({
                     url: '../approvalReject/approvaReject',
                   })
       },
       // 前往已结束页面
       goEndingPage(){
              wx.showToast({
                     title: '您已经在当前页面',
                     icon:'none'
                   })
       }
})