const db = wx.cloud.database()
const _ = db.command
Page({
  data: {
    //动作面板的显示以及菜单选项
    show: false,
    actions: [{
        id: 0,
        name: '1.导出待审批的活动',
        className: 'actionList',
        loading: false,
      },
      {
        id: 1,
        name: '2.导出已通过的活动',
        className: 'actionList',
        loading: false
      },
      {
        id: 2,
        name: '3.导出已驳回的活动',
        className: 'actionList',
        loading: false
      },
      {
        id: 3,
        name: '4.导出已结束的活动',
        className: 'actionList',
        loading: false
      },
    ],
    popShow: true,
    list: [],
    approval: {
      normal: 'https://s2.loli.net/2023/02/13/Am8Y9LFgj5T4CNS.png',
      active: 'https://s2.loli.net/2023/02/13/fJgW8xVoIw56LjD.png',
    },
    pass: {
      normal: 'https://s2.loli.net/2023/02/13/zaeYGD4Mg5W1T8q.png',
      active: 'https://s2.loli.net/2023/02/13/OUgZo6qGWRNB8Ib.png',
    },
    reject: {
      normal: 'https://s2.loli.net/2023/02/13/BhgYDtPEwlbRq45.png',
      active: 'https://s2.loli.net/2023/02/13/RabTeAkgXUjGoPf.png',
    },
    end: {
      normal: 'https://s2.loli.net/2023/02/13/89GOxF7mbipH4eA.png',
      active: 'https://s2.loli.net/2023/02/13/1EmXdBWlijUQa5p.png',
    },
    //tabar的索引，0是待审批/1是已通过/2是已驳回/3是已结束
    active: 0,
    currentPage: 1,
    totalPage: 0,
    totalRecord: 0,
  },
  //点击“导出excel”后弹出动作面板
  Download() {
    this.setData({
      show: true
    })
  },
  //点击遮罩层关闭动作面板
  closeDownload() {
    this.setData({
      show: false
    })
  },
  onSelect(event) {
    //id是选择的菜单唯一标识
    let id = event.detail.id;
    if (id == 0) {
      this.waitDownload(id)
    }
    if (id == 1) {
      this.passDownload()
    }
    if (id == 2) {
      this.rejectDownload()
    }
    if (id == 3) {
      this.endDownload()
    }
  },
  //tabar改变函数
  onChange(event) {
    this.setData({
      active: event.detail,
      list: [],
      currentPage: 1
    });
    //改变页面后再次渲染
    this.onLoad()
  },
  nextPage(e) {
    let that = this
    //因为data-传入的是字符串类型，故修改为int类型
    let type = parseInt(e.currentTarget.dataset.next)
    if (this.data.currentPage < this.data.totalPage) {
      that.setData({
        currentPage: this.data.currentPage + 1,
        popShow: true
      })
      this.getList(type)
    } else {
      wx.showToast({
        title: '已经到最后一页',
        icon: 'none',
        duration: 2000
      })
    }
  },
  lastPage(e) {
    let that = this
    //因为data-传入的是字符串类型，故修改为int类型
    let type = parseInt(e.currentTarget.dataset.last)
    if (this.data.currentPage != 1) {
      that.setData({
        currentPage: this.data.currentPage - 1,
        popShow: true
      })
      this.getList(type)
    } else {
      wx.showToast({
        title: '已经是第一页了',
        icon: 'none',
        duration: 2000
      })
    }
  },
  getList(e) {
    db.collection("huoDong")
      .orderBy('rank', 'desc')
      .limit(4)
      .where({
        state: e,
      })
      .skip(4 * ((this.data.currentPage) - 1))
      .get()
      .then(res => {
        console.log('查询数据库成功', res.data)
        this.setData({
          list: res.data,
          popShow: false
        })
        console.log("这是list", this.data.list)
      })
  },
  onLoad(options) {
    let that = this
    this.setData({
      popShow: true
    })
    //当选中的是“待审批”执行代码
    if (this.data.active == 0) {
      db.collection("huoDong")
        .where({
          state: 0,
        })
        .count()
        .then(e => {
          console.log(e.total)
          let totalPage
          if (e.total % 4 == 0) {
            totalPage = Math.floor(e.total / 4)
          } else {
            totalPage = Math.floor(e.total / 4) + 1
          }
          that.setData({
            totalRecord: e.total,
            totalPage: totalPage
          })
        })
      this.getList(0)
    }
    //当选择的是“已通过”执行
    if (this.data.active == 1) {
      db.collection("huoDong")
        .where({
          state: 1,
        })
        .count()
        .then(e => {
          console.log(e.total)
          let totalPage
          if (e.total % 4 == 0) {
            totalPage = Math.floor(e.total / 4)
          } else {
            totalPage = Math.floor(e.total / 4) + 1
          }
          that.setData({
            totalRecord: e.total,
            totalPage: totalPage
          })
        })
      this.getList(1)
    }
    //当选择的是“已驳回”执行
    if (this.data.active == 2) {
      db.collection("huoDong")
        .where({
          state: 2,
        })
        .count()
        .then(e => {
          console.log(e.total)
          let totalPage
          if (e.total % 4 == 0) {
            totalPage = Math.floor(e.total / 4)
          } else {
            totalPage = Math.floor(e.total / 4) + 1
          }
          that.setData({
            totalRecord: e.total,
            totalPage: totalPage
          })
        })
      this.getList(2)
    }
    //当选择的是“已结束”执行
    if (this.data.active == 3) {
      db.collection("huoDong")
        .where({
          state: 3,
        })
        .count()
        .then(e => {
          console.log(e.total)
          let totalPage
          if (e.total % 4 == 0) {
            totalPage = Math.floor(e.total / 4)
          } else {
            totalPage = Math.floor(e.total / 4) + 1
          }
          that.setData({
            totalRecord: e.total,
            totalPage: totalPage
          })
        })
      this.getList(3)
    }
  },
  onPullDownRefresh() {

  },
  onReachBottom() {

  },
  goDetail(e) {
    console.log("点击了详情页面,将展示活动的id ", e)
    wx.navigateTo({
      // 跳转到活动详情页面并携带活动id
      url: '/pages/eventDetail/eventDetail?id=' + e.currentTarget.dataset.id + e.currentTarget.dataset.user + e.currentTarget.dataset.type
    })
  },
  //一键导出待审批excel表格
  waitDownload() {
    let that = this
    wx.showModal({
      title: '您是否导需要出待审批的活动',
      content: '注：进行到报告待审批的活动不会导出',
      success(res) {
        if (res.confirm) {
          console.log('点击了一键导出excel')
          that.setData({})
          //引用了huoDongEX的云函数，调取了huoDong里面的数据
          wx.cloud.callFunction({
            name: 'huoDongEx',
            data: {
              type: 0
            },
            success(res) {
              console.log("读取成功", res.result.data)
              //将调取的数据存入函数里
              that.SavaExcel(res.result.data)
            },
          })
        } else if (res.cancel) {
          //取消绑定的操作
        }
      }
    })

  },
  //一键导出已通过excel表格
  passDownload() {
    let that = this
    wx.showModal({
      title: '您是否需要导出已通过的活动',
      content: '',
      success(res) {
        if (res.confirm) {
          console.log('点击了一键导出excel')
          //引用了huoDongEX的云函数，调取了huoDong里面的数据
          wx.cloud.callFunction({
            name: 'huoDongEx',
            data: {
              type: 1
            },
            success(res) {
              console.log("读取成功", res.result.data)
              //将调取的数据存入函数里
              that.SavaExcel(res.result.data)
            },
          })
        } else if (res.cancel) {
          //取消绑定的操作
        }
      }
    })

  },
  //一键导出已驳回excel表格
  rejectDownload() {
    let that = this
    wx.showModal({
      title: '您是否需要导出已驳回的活动',
      content: '',
      success(res) {
        if (res.confirm) {
          console.log('点击了一键导出excel')
          //引用了huoDongEX的云函数，调取了huoDong里面的数据
          wx.cloud.callFunction({
            name: 'huoDongEx',
            data: {
              type: 2
            },
            success(res) {
              console.log("读取成功", res.result.data)
              //将调取的数据存入函数里
              that.SavaExcel(res.result.data)
            },
          })
        } else if (res.cancel) {
          //取消绑定的操作
        }
      }
    })
  },
  //一键导出已结束excel表格
  endDownload() {
    let that = this
    wx.showModal({
      title: '您是否需要导出已结束的活动',
      content: '',
      success(res) {
        if (res.confirm) {
          console.log('点击了一键导出excel')
          //引用了huoDongEX的云函数，调取了huoDong里面的数据
          wx.cloud.callFunction({
            name: 'huoDongEx',
            data: {
              type: 3
            },
            success(res) {
              console.log("读取成功", res.result.data)
              //将调取的数据存入函数里
              that.SavaExcel(res.result.data)
            },
          })
        } else if (res.cancel) {
          //取消绑定的操作
        }
      }
    })
  },
  //把数据保存到excel里，并把excel保存到云存储
  SavaExcel(userdata) {
    let that = this
    //调取getExcel云函数（核心）
    wx.cloud.callFunction({
      name: "getHuoDongEx",
      data: {
        userdata: userdata,
      },
      success(res) {
        console.log("保存成功", res)
        //调取获取地址的函数
        that.getFileUrl(res.result.fileID)
      },
      fail(res) {
        console.log("保存失败", res)
      }
    })
  },
  //获取云存储文件下载地址，这个地址有效期一天
  getFileUrl(fileID) {
    let t = new Date().getTime().toString().slice(0, -3);
    let that = this;
    wx.cloud.getTempFileURL({
      fileList: [fileID],
      success: res => {
        // 这里的文件下载链接延迟很高，不能实时更新excel里面的数据，故采用文件下载链接拼接时间字符串的形式来达到可下载实时文件的目的
        console.log("文件下载链接", res.fileList[0].tempFileURL)
        // 这里就是拼接，方法来自  https://blog.csdn.net/sjn0503/article/details/74936613
        const finalUrl = `${res.fileList[0].tempFileURL}?${t}`
        console.log("实时文件下载链接", finalUrl)
        that.setData({
          fileUrl: finalUrl
        })
        //获取到文件下载链接后，使用showModal和setClipboardData来达到给用户复制地址的目的
        wx.showModal({
          title: '一键导出excel成功',
          content: finalUrl,
          showCancel: true,
          confirmText: '复制地址',
          success(res) {
            if (res.confirm) {
              wx.setClipboardData({
                data: that.data.fileUrl,
                success(res) {
                  wx.getClipboardData({
                    success(res) {
                      console.log(res.data) // data

                    }
                  })
                }
              })
            }
          }

        })

      },
    })
  },


})