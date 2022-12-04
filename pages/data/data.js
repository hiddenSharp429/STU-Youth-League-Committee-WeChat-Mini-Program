// pages/data/data.js
Page({
       onLoad(){
              wx.cloud.database().collection('').get()
              .then(res=>{

              })
              .catch(res=>{

              })
       },
})