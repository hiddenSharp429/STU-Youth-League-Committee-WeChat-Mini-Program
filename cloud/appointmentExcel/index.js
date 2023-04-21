//这个函数是用来获取预约集合里面的数据的，并没有存储到excel里
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'cloud1-0glmim4o153108f5'
})

// 云函数入口函数
exports.main = async (event, context) => {
  //会传进来两个参数，分别是state的值（id）和选择导出数据时间的范围（time）
  let id = event.id
  let time = event.time
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const formattedDate = `${year}-${month}-${day}`
  //如果想导出的是全部时间的则执行下部分函数
  if (time == "allDates") {
    return await cloud.database().collection('appointment')
      .where({
        state: id,
      })
      .orderBy('rank', 'asc')
      .get()
  }
  //如果想导出的是今天的则执行这部分函数
  if (time == "today") {
    console.log(formattedDate)
    console.log(id)
    console.log(typeof(id))
    console.log(typeof(formattedDate))
    return await cloud.database().collection('appointment')
      .where({
        state: id,
        TimeOfSubmission: formattedDate
      })
      .orderBy('rank', 'asc')
      .get()
  }
}