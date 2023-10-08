const db = wx.cloud.database()
Page({
    data: {
        password: '',
        account: '',
        name: '',
        type: null,
        wxId: '',
        isCheck: false,
        isVip: false,
    },
    onLoad(options) {
        const type = options.type
        console.log(options.type)
        this.setData({
            type: type
        })
        wx.cloud.callFunction({
                name: 'getData'
            })
            .then(res => {
                console.log("用户openid", res.result.openid)
            })
            .catch(err => {
                console.log("请求云函数失败", err)
            })
    },
    //点击注册
    enterApproval() {
        let that = this
        if (!this.data.account) {
            wx.showToast({
                title: "请输入账号",
                icon: "none",
            });
            return false;
        }
        if (!this.data.password) {
            wx.showToast({
                title: "请输入密码",
                icon: "none",
            });
            return false;
        }
        if (!this.data.name) {
            wx.showToast({
                title: "请输入姓名",
                icon: "none",
            });
            return false;
        }
        if (this.data.isCheck && this.data.type == 0) {
            db.collection("studentUser")
                .add({
                    data: {
                        account: this.data.account,
                        password: this.data.password,
                        name: this.data.name,
                    }
                })
                .then(res => {
                    console.log('注册成功')
                    console.log("账号是", this.data.account)
                    console.log("密码是", this.data.password)
                    console.log("姓名是", this.data.name)
                    wx.showToast({
                        title: '已注册成功',
                    })

                })
                .catch(res => {
                    wx.showToast({
                        title: '注册失败',
                        icon: "none"
                    })
                })
            if (this.data.isVip) {
                db.collection("vipUser")
                    .add({
                        data: {
                            account: that.data.account,
                            password: that.data.password,
                            name: that.data.name,
                        }
                    })
                    .then(res => {
                        console.log("success", res)
                    })
                    .catch(res => {
                        console.log("err", res)
                    })
            }
        }
        if (this.data.isCheck && this.data.type == 1) {
            db.collection("user")
                .add({
                    data: {
                        account: this.data.account,
                        password: this.data.password,
                        name: this.data.name,
                    }
                })
                .then(res => {
                    console.log('注册成功')
                    console.log("账号是", this.data.account)
                    console.log("密码是", this.data.password)
                    console.log("姓名是", this.data.name)
                    wx.showToast({
                        title: '已注册成功',
                    })

                })
                .catch(res => {
                    wx.showToast({
                        title: '注册失败',
                        icon: "none"
                    })
                })
        }
        if (this.data.isCheck && this.data.type == 2) {
            db.collection("user1")
                .add({
                    data: {
                        account: this.data.account,
                        password: this.data.password,
                        name: this.data.name,
                    }
                })
                .then(res => {
                    console.log('注册成功')
                    console.log("账号是", this.data.account)
                    console.log("密码是", this.data.password)
                    console.log("姓名是", this.data.name)
                    wx.showToast({
                        title: '已注册成功',
                    })

                })
                .catch(res => {
                    wx.showToast({
                        title: '注册失败',
                        icon: "none"
                    })
                })
        }
    },
    //验证是否为不受限预约用户
    async checkVip() {
        let that = this
        await db.collection("vipUserList")
            .where({
                wxId: this.data.wxId
            })
            .get({})
            .then(res => {
                console.log("请求数据库成功", res.data)
                //若数据库请求到的数据长度不为0则证明数据库中有该openid对应的账号，实现自动登录
                if (res.data.length != 0) {
                    that.setData({
                        isCheck: true,
                        isVip: true
                    })
                } else {
                    that.setData({
                        isCheck: true,
                        isVip: false
                    })
                }
            })
            .catch(res => {
                console.log("请求数据库失败")
            })
    },
    //获取输入的账号
    getAccount(e) {
        this.setData({
            account: e.detail
        })
    },
    //获取输入的密码
    getPassword(e) {
        this.setData({
            password: e.detail
        })
    },
    //获取输入的名字
    getName(e) {
        this.setData({
            name: e.detail
        })
    },
    //获取邀请码
    getWxID(e) {
        this.setData({
            wxId: e.detail
        })
    },
    //验证邀请码
    async checkWxId() {
        let that = this

        await this.checkVip()

        if (this.data.type == 0 && !this.data.isVip) {
            db.collection("studentUserList")
                .where({
                    wxId: this.data.wxId,
                })
                .get()
                .then(res => {
                    if (res.data.length == 0) {
                        wx.showToast({
                            title: '邀请码错误',
                            icon: "error"
                        })
                    } else {
                        wx.showToast({
                            title: '验证成功',
                        })
                        that.setData({
                            isCheck: true
                        })
                    }
                })
        }
        if (this.data.type == 1) {
            db.collection("userList")
                .where({
                    wxId: this.data.wxId,
                })
                .get()
                .then(res => {
                    if (res.data.length == 0) {
                        wx.showToast({
                            title: '邀请码错误',
                            icon: "error"
                        })
                    } else {
                        wx.showToast({
                            title: '验证成功',
                        })
                        that.setData({
                            isCheck: true
                        })
                    }
                })
        }
        if (this.data.type == 2) {
            db.collection("user1List")
                .where({
                    wxId: this.data.wxId,
                })
                .get()
                .then(res => {
                    if (res.data.length == 0) {
                        wx.showToast({
                            title: '邀请码错误',
                            icon: "error"
                        })
                    } else {
                        wx.showToast({
                            title: '验证成功',
                        })
                        that.setData({
                            isCheck: true
                        })
                    }
                })
        }
        if (this.data.isVip == true) {
            wx.showToast({
                title: '验证成功',
            })
        }
    }
})