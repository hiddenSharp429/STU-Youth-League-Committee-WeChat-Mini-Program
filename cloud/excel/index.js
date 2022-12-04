//这个函数是用来获取预约集合里面的数据的，并没有存储到excel里
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
       env:'cloud1-0glmim4o153108f5'
})

// 云函数入口函数
exports.main = async (event, context) => {
       return await cloud.database().collection('appointment')
       .where({
              state:1,
         })
       .get()
}