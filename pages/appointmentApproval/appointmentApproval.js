const db = wx.cloud.database()
Page({
       data: {
              list:[]

       },
       onLoad(options) {
              console.log("列表携带的值",options)
              db.collection("appointment")
                            .where({
                                 state:0,
                            })
                            .get()
                            .then(res=>{
                                   console.log('查询数据库成功',res.data)
                                   //将返回的res.data里面的值赋值给list
                                   this.setData({
                                          list :res.data,
                                   })
                                   console.log("这是list",this.data.list)
                            })

       },
       onPullDownRefresh() {

       },
       onReachBottom() {

       },
       goDetail(e){
              console.log("点击了详情页面,将展示活动的id ",e)
              wx.navigateTo({
              // 跳转到活动详情页面并携带活动id
                url: '/pages/appointmentDetail/appointmentDetail?id=' +e.currentTarget.dataset.id 
              })
       },

       // 前往待审批页面
       goApprovalPage(){
              wx.showToast({
                     title: '您已经在当前页面',
                     icon:'none'
                     })       
       },
       
       // 前往已通过页面
       goPassPage(){
              wx.redirectTo({
                     url: '../appointmentApproval3/appointmentApproval3',
                     })
       },

       // 前往已驳回页面
       goRejectPage(){
              wx.redirectTo({
                     url: '../appointmentApproval2/appointmentApproval2',
                     })
       },
})