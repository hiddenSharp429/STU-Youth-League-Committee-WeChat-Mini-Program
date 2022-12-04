const cloud = require('wx-server-sdk')
cloud.init({
  env: "cloud1-0glmim4o153108f5"
})
//操作excel用的类库
const xlsx = require('node-xlsx');

// 云函数入口函数
exports.main = async(event, context) => {
  try {
    let {userdata} = event
    
    //1,定义excel表格名
    let dataCVS = '预约.xlsx'
    //2，定义存储数据的
    let alldata = [];
    let row = ['日期','时间段', '组织', '预约老师','预约事项','预约人','手机号']; //表属性
    alldata.push(row);

    for (let key in userdata) {
      let arr = [];
      arr.push(userdata[key].day);
      arr.push(userdata[key].hour);
      arr.push(userdata[key].g1_orderInstitute);
      arr.push(userdata[key].g1_orderTeacher);
      arr.push(userdata[key].content);
      arr.push(userdata[key].subscriber);
      arr.push(userdata[key].subscriberPhone);
      alldata.push(arr)
    }
    //3，把数据保存到excel里
    var buffer = await xlsx.build([{
      name: "mySheetName",
      data: alldata
    }]);
    //4，把excel文件保存到云存储里
    return await cloud.uploadFile({
      cloudPath: dataCVS,
      fileContent: buffer, //excel二进制文件
    })

  } catch (e) {
    console.error(e)
    return e
  }
}