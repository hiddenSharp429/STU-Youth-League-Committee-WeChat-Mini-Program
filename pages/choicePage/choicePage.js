Page({

       goNext(e){
              console.log('点击了审批端登录')
              wx.navigateTo({
                url: '../nextChoice/nextChoice',
              })
       },
       goIndex(e){
              console.log('点击了用户登录')
              wx.navigateTo({
                url: '../indexLogin/indexLogin',
              })
       },

})