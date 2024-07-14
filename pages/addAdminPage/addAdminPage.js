const db = wx.cloud.database()
Page({
    data: {
        wxId: '',
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
        if (this.data.wxId == '') {
            wx.showToast({
                title: '请填写邀请码',
                icon: "none"
            });
            return;
        }

        if (this.data.radio == 1) {
            db.collection("userList")
                .where({
                    wxId: wxId
                })
                .get()
                .then(res => {
                    console.log(res);
                    if (res.data.length !== 0) {
                        return Promise.resolve(); // 若 res.data 不为空，直接返回一个 resolved 的 Promise
                    } else {
                        return db.collection("userList")
                            .add({
                                data: {
                                    wxId: wxId,
                                    isRegiseter: false
                                }
                            });
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
        }


        if (this.data.radio == 2) {
            db.collection("user1List")
                .where({
                    wxId: wxId
                })
                .get()
                .then(res => {
                    console.log(res);
                    if (res.data.length !== 0) {
                        return Promise.resolve(); // 若 res.data 不为空，直接返回一个 resolved 的 Promise
                    } else {
                        return db.collection("user1List")
                            .add({
                                data: {
                                    wxId: wxId,
                                    isRegiseter: false
                                }
                            });
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
        }
    },
    //获取输入的账号
    getWxId(e) {
        this.setData({
            wxId: e.detail.value
        })
    },
})