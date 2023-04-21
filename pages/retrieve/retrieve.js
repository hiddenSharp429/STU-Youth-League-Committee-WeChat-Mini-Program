const db  = wx.cloud.database()
Page({
       data: {
              password :'',
              account :'',
              radio:'1'
       },
       onLoad(options) {
              
       },
       onChange(event) {
              this.setData({
                radio: event.detail,
              });
              console.log(this.data.radio)
       },
       //找回密码
       retrieve(){
              let account = this.data.account
              if(this.data.radio == 1){
                     db.collection("studentUser")
                     .where({
                            account:account
                     })
                     .get({})
                     .then(res=>{
                            console.log("账号是",this.data.account)
                            console.log("查询数据库成功",res.data)
                            if(account == res.data[0].account){
                                   this.setData({
                                          password : res.data[0].password
                                   })
                                   wx.showModal({
                                          title:'查询密码成功',
                                          content:"您的密码是："+this.data.password,
                                          showCancel:true,
                                          confirmText:'确认',
                                   })
                                          
                            }
                            else{
                                   console.log("登录失败")
                                   wx.showToast({
                                     title: '查询失败，请确认您输入的账号是否有误',
                                     icon : "none"
                                   })
                            }
                     })
                     .catch(res=>{
                            wx.showToast({
                                   title: '查询失败，请确认您输入的账号是否有误',
                                   icon : "none"
                                 })
                     })
              }
              if(this.data.radio == 2){
                     db.collection("user")
                     .where({
                            account:account
                     })
                     .get({})
                     .then(res=>{
                            console.log("账号是",this.data.account)
                            console.log("查询数据库成功",res.data)
                            if(account == res.data[0].account){
                                   this.setData({
                                          password : res.data[0].password
                                   })
                                   wx.showModal({
                                          title:'查询密码成功',
                                          content:"您的密码是："+this.data.password,
                                          showCancel:true,
                                          confirmText:'确认',
                                   })
                                          
                            }
                            else{
                                   console.log("登录失败")
                                   wx.showToast({
                                     title: '查询失败，请确认您输入的账号是否有误',
                                     icon : "none"
                                   })
                            }
                     })
                     .catch(res=>{
                            wx.showToast({
                                   title: '查询失败，请确认您输入的账号是否有误',
                                   icon : "none"
                                 })
                     })
              }
              if(this.data.radio == 3){
                     db.collection("user1")
                     .where({
                            account:account
                     })
                     .get({})
                     .then(res=>{
                            console.log("账号是",this.data.account)
                            console.log("查询数据库成功",res.data)
                            if(account == res.data[0].account){
                                   this.setData({
                                          password : res.data[0].password
                                   })
                                   wx.showModal({
                                          title:'查询密码成功',
                                          content:"您的密码是："+this.data.password,
                                          showCancel:true,
                                          confirmText:'确认',
                                   })
                                          
                            }
                            else{
                                   console.log("登录失败")
                                   wx.showToast({
                                     title: '查询失败，请确认您输入的账号是否有误',
                                     icon : "none"
                                   })
                            }
                     })
                     .catch(res=>{
                            wx.showToast({
                                   title: '查询失败，请确认您输入的账号是否有误',
                                   icon : "none"
                                 })
                     })
              }
             
       },
       //获取输入的账号
       getAccount(e){
              this.setData({
                     account : e.detail.value
              })
       },
})