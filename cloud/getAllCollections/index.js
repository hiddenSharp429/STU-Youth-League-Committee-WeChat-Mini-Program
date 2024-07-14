// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

const db = cloud.database()

exports.main = async (event, context) => {
  try {
    const collections = await db.getCollection()
    return collections
  } catch (err) {
    return err
  }
}
