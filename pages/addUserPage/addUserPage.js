const db = wx.cloud.database()
Page({
    data: {
        wxId: '',
        name: null,
        radio: '1'
    },
    onLoad(options) {

    },
    onChange(event) {
        this.setData({
            radio: event.detail,
        });
    },
    // 添加用户
    addUser() {
        let wxId = this.data.wxId;
        let name = this.data.name;
        if (this.data.wxId == '') {
            wx.showToast({
                title: '请填写邀请码',
                icon: "none"
            });
            return;
        }

        db.collection("studentUserList")
            .where({
                wxId: wxId
            })
            .get()
            .then(res => {
                console.log(res);
                if (res.data.length !== 0) {
                    return Promise.resolve(); // 若 res.data 不为空，直接返回一个 resolved 的 Promise
                } else {
                    return db.collection("studentUserList")
                        .add({
                            data: {
                                wxId: wxId,
                                registered: false,
                                name: name,
                            }
                        });
                }
            })
            .then(() => {
                if (this.data.radio == 1) {
                    return db.collection("vipUserList")
                        .add({
                            data: {
                                wxId: wxId,
                                isRegiseter: false,
                                name: name,
                            }
                        });
                } else {
                    return Promise.resolve();
                }
            })
            .then(() => {
                wx.showToast({
                    title: '成功'
                });
            })
            .catch(err => {
                wx.showToast({
                    title: '失败',
                    icon: "none"
                });
            });
    },

    //获取输入的账号
    getWxId(e) {
        this.setData({
            wxId: e.detail
        })
    },

    //获取输入的姓名
    getName(e) {
        this.setData({
            name: e.detail
        })
    },
})