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
              db.collection("vipUser")
              .where({
                     account:account
              })
              .get({})
              .then(res=>{
                     console.log("账号是",this.data.account)
                     console.log("密码是",this.data.password)
                     console.log("查询数据库成功",res.data)
                     if(password == res.data[0].password){
                            console.log('登录成功')
                            wx.showToast({
                              title: '登录成功',
                            })
                            wx.redirectTo({
                                   url: '../vip/vip',
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
       //进入不受限预约的注册界面
       goRegister(){
              wx.navigateTo({
                     url: '../register4/register4',
              })
       }

})