// 云函数入口文件
//获取所有已结束的活动
const cloud = require('wx-server-sdk')
let id=0;
// 云开发环境初始化
cloud.init({env: 'cloud1-0glmim4o153108f5'})
const db = cloud.database()
const _ = db.command
exports.main = async (event, context) => {
try{
       return await db.collection('appointment')
       .where(
              {
              state:1
              }
       )
       .get({
              success: function (res) {
              this.setData({
                     id:res._id
              })
              return res
              }
       })
}
catch(e){
       console.error(e)
}
}
