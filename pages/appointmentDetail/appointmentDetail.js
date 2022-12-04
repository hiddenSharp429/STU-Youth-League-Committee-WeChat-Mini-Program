let eventid = ''
const DB = wx.cloud.database().collection("appointment")
Page({
       data:{
              list:[],
              id:"",
              rejectReason:""
       },
       onLoad(option){
              console.log("列表所携带的值",option)
              var id = option.id
              this.setData({
                     id :option.id
              })
              
              DB
              .doc(id)
              .get()
              .then(res=>{
                     this.setData({
                            list:res.data
                     })
                     
              })
              .catch(res=>{
                     console.log("活动详情页请求失败",res)
              })
       },
       pass(){
              let that = this;
              wx.showLoading({
                title: '正在上传中……',
                mask:true
              })
              DB.doc(this.data.id)
              .update({ // updata指 插入数据库中的userlist表；
                //将我们获取到的新值代入
                  data: { 
                         state:1
                  },
                }).then(res => {
                  console.log("上传成功", res)
                  wx.showToast({
                    title: '成功',
                  })
                  wx.navigateTo({
                    url: '../appointmentApproval/appointmentApproval',
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
              

       },
       
       reject(){
              let that = this;
              wx.showLoading({
                title: '正在上传中……',
                mask:true
              })
              DB.doc(this.data.id)
              .update({ // updata指 插入数据库中的userlist表；
                //将我们获取到的新值代入
                  data: { 
                         state:2,
                         rejectReason: this.data.rejectReason
                  },
                }).then(res => {
                  console.log("上传成功", res)
                  wx.showToast({
                    title: '成功',
                  })
                  wx.navigateTo({
                    url: '../appointmentApproval/appointmentApproval',
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
              

       },
       rejectReason(event){
              console.log("这是驳回输入框里的信息",event.detail.value)
              this.setData({
                     rejectReason:event.detail.value
              })
       }
})