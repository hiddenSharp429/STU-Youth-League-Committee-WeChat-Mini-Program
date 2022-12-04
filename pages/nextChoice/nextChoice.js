Page({

       goApprovalLogin(e){
              console.log('点击了审批活动')
              wx.navigateTo({
                url: '../approvalLogin/approvalLogin',
              })
       },
       goAppointmentLogin(e){
              console.log('点击了审批预约')
              wx.navigateTo({
                url: '../appointmentApprovalLogin/appointmentApprovalLogin',
              })
       },

})