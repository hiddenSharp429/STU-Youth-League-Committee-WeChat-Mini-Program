const db  = wx.cloud.database()
Page({
       data: {
              password :'',
              account :'',
              name:''

       },
       onLoad(options) {
              wx.cloud.callFunction({
                     name:'getData'
              })
                     .then(res=>{
                            console.log("用户openid",res.result.openid)
                     })
                     .catch(err=>{
                            console.log("请求云函数失败",err)
                     })
       },
       //点击注册
       enterApproval(){
              if (!this.data.account) {
                     wx.showToast({
                       title: "请输入账号",
                       icon: "none",
                     });
                     return false;
                   }
              if (!this.data.password) {
              wx.showToast({
                     title: "请输入密码",
                     icon: "none",
              });
              return false;
              }if (!this.data.name) {
              wx.showToast({
                     title: "请输入姓名",
                     icon: "none",
              });
              return false;
              }
              db.collection("user")
              .add({
                     data:{
                            account:this.data.account,
                            password:this.data.password,
                            name:this.data.name,
                     }
              })
              .then(res=>{
                     console.log('注册成功')
                     console.log("账号是",this.data.account)
                     console.log("密码是",this.data.password)
                     console.log("姓名是",this.data.name)
                     wx.showToast({
                            title: '已注册成功',
                          })

              })
              .catch(res=>{
                     wx.showToast({
                            title: '注册失败',
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
       //获取输入的名字
       getName(e){
              this.setData({
                     name :e.detail.value
              })
       },

})