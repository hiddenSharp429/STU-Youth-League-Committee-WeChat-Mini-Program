const db = wx.cloud.database()
const _ = db.command
const t = new Date().getTime().toString().slice(0, -3);
Page({
       data: {
              list:[],
              // fileUrl:'',

       },
       onLoad(options) {
             //调用云函数来突破返回数据库的条数只有20条的限制
             wx.cloud.callFunction({
              name:'getAll2'
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
              wx.redirectTo({
                     url: '../appointmentApproval/appointmentApproval',
                     })
       },
       // 前往已通过页面
       goPassPage(){
              wx.showToast({
                     title: '您已经在当前页面',
                     icon:'none'
                     })     
       },
       // 前往已驳回页面
       goRejectPage(){
              wx.redirectTo({
                     url: '../appointmentApproval2/appointmentApproval2',
                     })
       },
       //一键导出excel表格
       download(){
              let that = this
              console.log('点击了一键导出excel')
              //引用了excel的云函数，调取了appointment里面的数据
              wx.cloud.callFunction({
                     name:'excel',
                     success(res) {
                            console.log("读取成功", res.result.data)
                            //将调取的数据存入函数里
                            that.savaExcel(res.result.data)
                          },
              })
       },
       //把数据保存到excel里，并把excel保存到云存储
       savaExcel(userdata) {
       let that = this
       //调取getExcel云函数（核心）
       wx.cloud.callFunction({
         name: "getExcel",
         data: {
           userdata: userdata
         },
         success(res) {
           console.log("保存成功", res)
           //调取获取地址的函数
           that.getFileUrl(res.result.fileID)
         },
         fail(res) {
           console.log("保存失败", res)
         }
       })
     },
     //获取云存储文件下载地址，这个地址有效期一天
       getFileUrl(fileID) {
       
       let that = this;
       wx.cloud.getTempFileURL({
         fileList: [fileID],
         success: res => {
              // 这里的文件下载链接延迟很高，不能实时更新excel里面的数据，故采用文件下载链接拼接时间字符串的形式来达到可下载实时文件的目的
           console.log("文件下载链接", res.fileList[0].tempFileURL)
          // 这里就是拼接，方法来自  https://blog.csdn.net/sjn0503/article/details/74936613
           const finalUrl = `${res.fileList[0].tempFileURL}?${t}`
           console.log("实时文件下载链接",finalUrl)
           that.setData({
             fileUrl: finalUrl
           })
           //获取到文件下载链接后，使用showModal和setClipboardData来达到给用户复制地址的目的
           wx.showModal({
              title:'一键导出excel成功',
              content:finalUrl,
              showCancel:true,
              confirmText:'复制地址',
                     success(res){
                      if (res.confirm) {
                             wx.setClipboardData({
                               data: that.data.fileUrl,
                               success(res) {
                                 wx.getClipboardData({
                                   success(res) {
                                     console.log(res.data) // data
                                   }
                                 })
                               }
                             })
                           }
                     }
                   
              })
            
         },
       })
     },
})