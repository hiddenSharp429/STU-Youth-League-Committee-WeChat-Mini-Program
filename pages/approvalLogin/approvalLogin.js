const db  = wx.cloud.database()
Page({
       data: {
              password :'',
              account :''

       },
       onLoad(options) {

       },
       //点击登录
       enterApproval(){
              let account = this.data.account
              let password = this.data.password
              db.collection("user")
              .where({
                     account:account
              })
              .get({})
              .then(res=>{
                     console.log("查询数据库成功",res.data)
                     if(password == res.data[0].password){
                            console.log('登录成功')
                            wx.showToast({
                              title: '登录成功',
                            })
                            wx.navigateTo({
                                   url: '../approval/approval',
                                 })
                     }
                     else{
                            console.log("登录失败")
                            wx.showToast({
                              title: '登录失败，账号或密码不正确',
                              icon : "none"
                            })
                     }
              })
              .catch(res=>{
                     wx.showToast({
                            title: '登录失败，账号或密码不正确',
                            icon : "none"
                          })
              })




       },
       //获取输入的账号
       getAccount(e){
              this.setData({
                     account : e.detail.value
              })
       },
       //获取输入的密码
       getPassword(e){
              this.setData({
                     password :e.detail.value
              })
       },
       //进入审批活动的注册界面
       goRegister(){
              wx.navigateTo({
                url: '../register3/register3',
              })
       }

})