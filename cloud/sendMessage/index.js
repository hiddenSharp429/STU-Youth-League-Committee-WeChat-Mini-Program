const cloud = require('wx-server-sdk')
cloud.init({
  env: 'cloud1-0glmim4o153108f5',
})
exports.main = async (event, context) => {
  const sd = require('silly-datetime');
  const time = sd.format(new Date(), 'YYYY-MM-DD HH:mm');
  console.log("time是",time)
  let openid = event.openid
  let activityName = event.activityName
  let activityTime = event.activityTime
  let appointmentName = event.appointmentName
  let appointmentTime = event.appointmentTime
  let userName = event.userName
  let teacher = event.teacher
  let state = event.state
  let type = event.type

  console.log("type is",type)
  if(type == "appointment"){
         console.log("执行预约代码")
       try {
              const result = await cloud.openapi.subscribeMessage.send({
              "touser": openid,
              "page": 'index',
              "lang": 'zh_CN',
              "data": {
              "phrase9": {
                     "value": state
              },
              "thing5": {
                     "value": appointmentName
              },
              "name1": {
                     "value": userName
              },
              "name10": {
                     "value": teacher
              },
              "time22":{
                     "value": appointmentTime
              }
              },
              "templateId": 'ITKk6SuK7iPtD5iCqMLVFkm0B4sVq_3iFNyXq9cKwRM',
              "miniprogramState": 'developer'
              })
              return JSON.parse(JSON.stringify(result))
       } 
       catch (err) {
              return err
       }
}
  else{
         console.log("执行活动代码")
       try {
              const result = await cloud.openapi.subscribeMessage.send({
              "touser": openid,
              "page": 'index',
              "lang": 'zh_CN',
              "data": {
              "phrase1": {
                     "value": state
              },
              "thing2": {
                     "value": activityName
              },
              "time3": {
                     "value": activityTime
              },
              "name4": {
                     "value": userName
              },
              "time11":{
                     "value": time
              }
              },
              "templateId": 'KSfQkKmnbmBt6KhiRrKKQMXf5yK6nuQTVt8JbdxmLHk',
              "miniprogramState": 'developer'
              })
              return JSON.parse(JSON.stringify(result))
       } 
       catch (err) {
              return err
       }
  }
}