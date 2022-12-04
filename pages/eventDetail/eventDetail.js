Page({
       data:{
              list:[]
       },
       onLoad(option){
              console.log("列表所携带的值",option)
              var id = option.id
              wx.cloud.database().collection("huoDong")
              .doc(id)
              .get()
              .then(res=>{
                     this.setData({
                            list:res.data
                     })
                     console.log("这是list",this.data.list)
              })
              .catch(res=>{
                     console.log("活动详情页请求失败",res)
              })
       }

})