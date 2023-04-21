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
    let dataCVS = '已通过的活动.xlsx'
    //2，定义存储数据的
    let alldata = [];
    let row = ['活动名称','活动起始时间', '活动截止时间', '活动地点','活动校区','所归属的组织','负责人姓名','负责人专业','负责人联系方式','负责人邮箱','活动经费预算合计','活动经费自筹','活动申请拨款数','是否有赞助','赞助公司','赞助形式','赞助金额','是否已提交赞助合同','是否需要借款','借款人姓名','借款人专业','借款人年龄','借款人电话','借款金额','是否需要发放劳务费','劳务费对象','劳务费金额','预计参与人数','是否需要上传oa','项目内容阐述']; //表属性
    alldata.push(row);

    for (let key in userdata) {
      let arr = [];
      arr.push(userdata[key].a1_huodongName);
      arr.push(userdata[key].a2_startTime);
      arr.push(userdata[key].a3_endTime);
      arr.push(userdata[key].a4_huodongPlace);
      arr.push(userdata[key].a5_area);
      arr.push(userdata[key].g1_orderInstitute);
      arr.push(userdata[key].b1_fzrName);
      arr.push(userdata[key].b2_fzrGrade);
      arr.push(userdata[key].b3_fzrTelephone);
      arr.push(userdata[key].b4_fzrMail);
      arr.push(userdata[key].c1_jingfeiTotal);
      arr.push(userdata[key].c2_jingfeiSelf);
      arr.push(userdata[key].c3_jingfeiApply);
      arr.push(userdata[key].d1_sponsor);
      arr.push(userdata[key].d2_sponsorCompany);
      arr.push(userdata[key].d3_sponsorForm);
      arr.push(userdata[key].d4_sponsorMoney);
      arr.push(userdata[key].d5_sponsorContract);
      arr.push(userdata[key].e1_borrow);
      arr.push(userdata[key].e2_jkrName);
      arr.push(userdata[key].e3_jkrGrade);
      arr.push(userdata[key].e4_jkrAge);
      arr.push(userdata[key].e5_jkrTelephone);
      arr.push(userdata[key].e6_jkrMoney);
      arr.push(userdata[key].f1_serviceFee);
      arr.push(userdata[key].f2_serviceObject);
      arr.push(userdata[key].f3_serviceMoney);
      arr.push(userdata[key].h2_participant);
      arr.push(userdata[key].h3_uploadOA);
      arr.push(userdata[key].h4_briefContent);
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