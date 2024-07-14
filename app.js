// app.js
App({
  onLaunch() {
    wx.cloud.init({
      env: 'cloud1-0glmim4o153108f5'
    })
    //登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
})