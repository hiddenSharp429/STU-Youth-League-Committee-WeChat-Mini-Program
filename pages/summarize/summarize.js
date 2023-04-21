//把活动总结名称 和 活动人数 变成全局变量
const db = wx.cloud.database()
let  atvname=''
let atvmember=''
let atvmoney1=''
let atvmoney2=''
let atvmoney3=''
let url =""
var id = ''
Page({
       data: {
       type:"",
       lists:[{
              link:''
       }],
       lists1:[{
              link:''
       }],
       },

       getData(){
              DB.get({
                    
                     success(res){
                            console.log(res)
                            }
                     
                     })
       },
       onLoad(option){
              console.log("列表所携带的信息",option)
              id = option.id
              wx.cloud.database().collection("summaries")
             
              },
//console面板获取活动总结的活动名称（定义事件处理函数）
       atvnameInput1(e){
                     atvname=e.detail.value
                     console.log('活动总结的活动名称',atvname)
              },
//获取活动总结的活动参与人数
       atvmemberInput1(e){
                     atvmember=e.detail.value
                     console.log('活动总结的参与人数',atvmember)
              },
//获取活动总价的支出
       atvmoneyInput1(e){
              atvmoney1=e.detail.value
              console.log('活动总结的总额支出',atvmoney1)
         },
//实际赞助金额
         atvmoneyInput2(e){
              atvmoney2=e.detail.value
              console.log('活动总结的总额支出',atvmoney2)
       },
//实际申请拨款金额
       atvmoneyInput3(e){
              atvmoney3=e.detail.value
              console.log('活动总结的总额支出',atvmoney3)
       },

         addImagePath(fileId){
                     console.log(fileId)
                     wx.cloud.getTempFileURL({
                       fileList:[fileId],
                       success:res => {
                              console.log("获取的数据",res)
                              url= res.fileList[0].tempFileURL
                            console.log("url",res.fileList[0].tempFileURL)

                              
                       },
                       fail:console.error
                })
         },
         //获取宣传报道链接数组
       bindlinkInput(event){
              var  id  =  event.target.dataset.id //当前组件的id
              var name = event.target.dataset.name//需要接收的属性
              var  index  =  "lists["  +  id  +  "]."  +  name;
              console.log(index)
              console.log(event)
              this.setData({        
              [index]: event.detail.value         //这里进行赋值   
              }) 
       },
       //获取oa的input数组
       bindlinkInput1(event){
              var  id  =  event.target.dataset.id //当前组件的id
              var name = event.target.dataset.name//需要接收的属性
              var  index  =  "lists1["  +  id  +  "]."  +  name;
              console.log(index)
              console.log(event)
              this.setData({        
              [index]: event.detail.value         //这里进行赋值   
              }) 
       },
       
       sever(e){  
       let that = this 
       //判断提交的活动总结是否合理
              //启用数据库中的活动集合（为了到时候提交把新的数据更新到huoDong里）
              wx.requestSubscribeMessage({
                     tmplIds: ['KSfQkKmnbmBt6KhiRrKKQMXf5yK6nuQTVt8JbdxmLHk'],
                     success (res) { 
                            
                     },
                     complete(){
                            db.collection("huoDong")
                     .doc(id)
                     .update({
                            data:{
                            practicalMember:atvmember, 
                            practicalTotalMoney:atvmoney1,
                            practicalSponsorship:atvmoney2,
                            practicalApMoney:atvmoney3,
                            publicityLink:that.data.lists,
                            oaLink:that.data.lists1,
                            state: 3
                            }
                     })
                     .then(res => {
                            if(atvmember ==''||atvmoney1 ==''){
                                   wx.showToast({
                                          title:"漏填信息",
                                          icon:'none',
                                          duration:1500
                                   })
                                   
                            }
                            else{
                            wx.showModal({
                                   title:'提交成功！',
                                   content:'',
                                   showCancel:false,
                                   confirmText:'确定',
                                   cancelText:'取消',
                                   confirmColor:'#36D5DD',
                            })
                            //上传数据成功后跳转到“我的”界面
                            wx.switchTab({
                                   url: '../index/index',
                            })
                            .then(()=>{
                                   wx.startPullDownRefresh()
                            })
                            }
                     })
                     .catch(err=>{
                            console.log("添加失败",err);
                            wx.showToast({
                                   title:"提交失败",
                                   icon:'none',
                                   duration:1500
                            })
                     })
              }
              })
       },

      //第一步：选择文件
       chooseFile(e){
       console.log("需要上传的文件类型是",e.currentTarget.dataset.type)
       this.setData({
              type:e.currentTarget.dataset.type
       })
       let that = this
       wx.chooseMessageFile({
         count: 1,
         type: 'all',
         success (res) {
           // tempFilePath可以作为img标签的src属性显示图片
           const tempFilePaths = res.tempFiles
           let tempFile = tempFilePaths[0]
           that.uploadFile(tempFile.name,tempFile.path)
         }
       })
     },
     //第二步：通过uploadFile上传选中的文件
       uploadFile(fileName,tempFile){
       if(this.data.type == "sati"){
              console.log("将要执行sati代码")
              wx.cloud.uploadFile({
                     cloudPath:"satifactionSurvey/"+fileName,
                     filePath:tempFile,
                   })
              .then(res=>{
              console.log("上传成功啦",res);
              wx.showToast({
                     title: '文件上传成功',
                     icon:"success",
                     duration:2000
              })
              })
              .catch(err=>{
              console.log("上传失败啦",err);
              })
       }
       if(this.data.type == "fund"){
              console.log("将要执行fund代码")
              wx.cloud.uploadFile({
                     cloudPath:"fund/"+fileName,
                     filePath:tempFile,
                   })
              .then(res=>{
              console.log("上传成功啦",res);
              wx.showToast({
                     title: '文件上传成功',
                     icon:"success",
                     duration:2000
              })
              })
              .catch(err=>{
              console.log("上传失败啦",err);
              })
       }
       if(this.data.type == "acti"){
              console.log("将要执行acti代码")
              wx.cloud.uploadFile({
                     cloudPath:"activity's file/"+fileName,
                     filePath:tempFile,
                   })
              .then(res=>{
              console.log("上传成功啦",res);
              wx.showToast({
                     title: '文件上传成功',
                     icon:"success",
                     duration:2000
              })
              })
              .catch(err=>{
              console.log("上传失败啦",err);
              })
       }
     },

     uploadImage(fileURL){
       var that = this
       wx.cloud.uploadFile({
              cloudPath:'活动调查表/'+new Date().getTime()+'.png',
              filePath:fileURL,
              success:res => {
                     //获取图片路径
                     that.addImagePath(res.fileID)
              },
              fail:console.error
       })
     },
//      添加选项
       addList: function(){
              var  lists = this.data.lists;
              var newData = {};
              lists.push(newData);//实质是添加lists数组内容，使for循环多一次
              this.setData({
              lists: lists,
              })  
     },
//     删除选项
        delList: function () {
              var lists = this.data.lists;
              lists.pop();      //实质是删除lists数组内容，使for循环少一次
              this.setData({
              lists: lists,
              })
     }, 
//这里后面的add和del是oa部分的
//      添加选项
       addList1: function(){
              var  lists1 = this.data.lists1;
              var newData = {};
              lists1.push(newData);//实质是添加lists1数组内容，使for循环多一次
              this.setData({
              lists1: lists1,
              })  
     },
//     删除选项
       delList1: function () {
              var lists1 = this.data.lists1;
              lists1.pop();      //实质是删除lists1数组内容，使for循环少一次
              this.setData({
              lists1: lists1,
              })
       }, 
   })