//这个函数是用来获取活动集合里面的数据的，并没有存储到excel里
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
       env:'cloud1-0glmim4o153108f5'
})

// 云函数入口函数
exports.main = async (event, context) => {
       console.log(event.type)
       if(event.type == 0){
              return await cloud.database().collection('huoDong')
              .where({
                     state:0,
                })
              .get()
       }
       if(event.type == 1){
              return await cloud.database().collection('huoDong')
              .where({
                     state:1,
                })
              .get()
       }
       if(event.type == 2){
              return await cloud.database().collection('huoDong')
              .where({
                     state:2,
                })
              .get()
       }
       if(event.type == 3){
              return await cloud.database().collection('huoDong')
              .where({
                     state:3,
                })
              .get()
       }
}