# STU-Youth-League-Committee-WeChat-Mini-Program

> [TOC]

## 更新日志

### **待更新版本**`v2.6`

- 版本内容：
  1. 团团活动管理小程序用户账号管理模块上线，特定用户可以点击左下角图标进入用户账号管理模块进行操作
  2. 数据库部分新建表字段更新优化
  3. 设计表单的相关页面逻辑和UI优化
  4. 审批端新增自动拒绝逾期申请的功能
  5. 审批端新增撤销驳回预约的功能（包括预约端和审核端）
  6. 审批端预约排序功能修复
  7. 首页新增开源项目链接
- 主版本以及版本补丁发布时间：

- 主版本`v2.6`的小更新情况：

- 主版本`v2.6`的 BUG 修复情况：

---

### **当前版本**`v2.5`

- 版本内容：
  1. 审批端新增撤销驳回预约的功能（包括预约端和审核端）
  2. 修改了部分页面的缩进 4->2
- 主版本以及版本补丁发布时间：
  | 版本号 | 上线发布时间 |
  |----|----|
  | `v2.5.0` | **2023.5.27** |
  |`v2.5.1` | **2023.5.29** |
  | `v2.5.2` | **2023.5.29** |
  | `v2.5.3` | **2023.6.1** |
  | `v2.5.4` | **2023.9.18** |
  | `v2.5.5` | **2023.11.3**|
- 主版本`v2.5`的小更新情况：

  | 更新内容                                                                                       | 版本号    |
  | ---------------------------------------------------------------------------------------------- | --------- |
  | `预约老师`页面的`预约人`栏目中的`预约人手机号`输入框提示词从`预约人手机号`改为`预约人联系方式` | `v2.5.1`  |
  | `首页`的查看日志和操作手册将`日志`和`操作手册`分离开了                                         | `v2.5.2`  |
  | 不受限预约提交表单新增两个属性`TimeOfSubmission`和`Rank`                                       | `v2.5.3` |
  | 优化了`审批预约`页面的盒子样式                                                                 | `v2.5.3` |
  | 首页右上角新增加`版本标识`                                                                     | `v2.5.4` |
  | 加载动画修改为射箭                                                                             | `v2.5.4` |
  | 在首页的右下角添加了邀请用户模块（只有特定的用户才能进入） | `v2.5.4` |
  | 预约老师功能模块新增字段**预约形式** | `v2.5.5`|
  | 预约老师功能模块部分代码重构 | `v2.5.5`|
  | 添加用户页面入口逻辑优化 | `v2.5.5`|
  | 首页左下角用户账号管理模块基本完成 | `v2.5.5` |
   新增线上文档以及新版的双语README文件 |  `v2.5.5` |

- 主版本`v2.5`的 BUG 修复情况：
  | 修复内容 | 版本号 |
  |---|---|
  | 解决了`不受限制预约`没有办法导出到`今日通过`excle 表格的 BUG | `v2.5.3` |
  | 解决了`审批预约`页面仅看当天的有记录条数但页面空白的 BUG | `v2.5.3` |
  | 解决了`审批端` 导航栏图标显示异常的BUG | `v2.5.4` |
  | 解决了`用户端` `审批端` 身份认证失败、暂无活动记录图片显示异常BUG | `v2.5.4` |
---

### 先前版本总汇

#### **先前版本**`v2.4`

- 版本内容：
  1. 预约老师页面新增礼仪队`组织归属选项
- 主版本以及版本补丁发布时间：
  | 版本号 | 上线发布时间 |
  |----|----|
  | `v2.4.0` | **2023.5.12** |
- 主版本`v2.4`的小更新情况：
- 主版本`v2.4`的 BUG 修复情况：

---

#### **先前版本**`v2.3`

- 版本内容：
  1. 新增自制组件 loading
  2. 不受限预约模块正式启用
  3. 调整了进入详情页面的逻辑
- 主版本以及版本补丁发布时间：
  | 版本号 | 上线发布时间 |
  |----|----|
  | `v2.3.0` | **2023.5.6** |

- 主版本`v2.3`的小更新情况：
- 主版本`v2.3`的 BUG 修复情况：

---

#### **先前版本** `v2.2`

- 版本内容：
  1. 实现了页面功能：目前分页页面有`我的`、`活动历史`、`预约历史`、审批预约页面（审批活动页面还未开放）
- 主版本以及版本补丁发布时间：
  | 版本号 | 上线发布时间 |
  |----|----|
  | `v2.2.0` | **2023.4.1** |
  | `v2.2.1` | **2023.4.7** |
  | `v2.2.2` | **2023.4.21** |
  | `v2.2.3` | **2023.4.28** |

- 主版本`v2.2`的小更新情况：
  | 更新内容 | 版本号 |
  | ---------------------------------------------------------------------------------------------- | --------- |
  | 审批预约页面将按预约时间的降序来排序 | `v2.2.1` |
  | 审批预约端导出 excel 表格模块新增导出当天预约的功能 | `v2.2.2`|
  | 审批预约端查看已通过预约页面新增仅查看当天已通过的预约的功能 |`v2.2.2`|
  | 审批活动页面全部已实现分页功能 | `v2.2.2` |
  | 优化了用户端切换导航栏时多次下拉刷新的问题 | `v2.2.3` |
  | `预约老师`页面查询可选择的时间会显示 loading 动画 | `v2.2.3` |

- 主版本`v2.2`的 BUG 修复情况：
  | 修复内容 | 版本号 |
  |---|---|
  | 修复了详情页面的显示 bug | `v2.2.1` |
  | 修复了项目内容阐述输入框获取长文字被截断的问题 | `v2.2.1` |
  | 修复`预约老师`页面出现同一个用户多次预约一个老师的 BUG | `v2.2.3` |
  | 解决了获取用户请求 UI 错乱问题 | `v2.2.3`|

---

#### **先前版本** `v2.1`

- 版本内容：
  1. 审批活动端更新了在待审批和已通过页面一键导出 excel 表格功能，注意每一页最多有 100 条活动数据，导出的 excel 表格也是最多 100 条
  2. 用户端的预约老师功能将会在 18 点之后关闭预约明天的会议。如：今天晚上 19 点的时候我想预约明天下午 3 点的会，这时候预约系统的时间段将无法选中 ![img](https://docimg6.docs.qq.com/image/AgAABuh2sxt1TIIuP2xGbpvOI8rGLEBc.png?imageMogr2/thumbnail/1600x%3E/ignore-error/1)
- 主版本以及版本补丁发布时间：
  | 版本号 | 上线发布时间 |
  |----|----|
  | `v2.1.0` | **2022.12.6**|
  | `v2.1.1` | **2022.12.7**|
  | `v2.1.2` | **2022.12.9**|
  | `v2.1.3` | **2022.12.12**|
  | `v2.1.4` | **2022.12.15**|
  | `v2.1.5` | **2023.2.5**|
  | `v2.1.6` | **2023.2.13**|
  | `v2.1.7` | **2023.2.18**|
  | `v2.1.8` | **2023.2.22**|
  | `v2.1.9` | **2023.3.17**|
  | `v2.1.10` | **2023.3.20**|

- 主版本`v2.1`的小更新情况：
  | 更新内容 | 版本号 |
  | ---------------------------------------------------------------------------------------------- | --------- |
  |在小程序的进入页面新增了`查看手册功能`，点击右下角的手册即可获取腾讯在线文档的链接，登录浏览器复制粘贴链接即可查看操作手册 | `v2.1.1`|
  |在`预约老师`栏目中将`校青年志愿者`改为了`校青协` ，并且加入了`社联`和`研会`的选项。在`活动申请`栏目中也增加了`社联`组织选项 |`2.1.1` |
  |在用户端的左下方新增`找回密码`功能。在下方输入账号即可获取密码 |`v2.1.1` |
  |在`预约老师`页面提交预约后将会跳出弹窗显示`提交成功`并且刷新页面数据 |`v2.1.1` |
  |历史预约页面保留的记录从三天变为两天 |`v2.1.2`|
  |审批预约端的`待审批页面`可点击右上角排序按钮给申请的预约按预约时间排序（不是按提交预约申请的时间，而是按预约老师的时间段来排） | `v2.1.2`|
  | 完善了审批预约端的`已通过页面`一键导出的 excel 表格的排序。（按照预约老师的时间段排序）|`v2.1.2` |
  | 所有人的预约历史记录（从 2022.12.8 起）保存在在线 excel 表格中，在审批预约端的`已通过`页面点击`图书`图标，复制地址到浏览器上可查看| `v2.1.2`|
  |`预约老师`界面归属组织栏目新增`主持队`选项 |`v2.1.3` |
  |不受限预约系统基本实现可以选择多个时间段 | `v2.1.3`|
  |所有登录页面的输入密码框可选择隐藏和显示密码 |`v2.1.4`|
  | 不受限预约界面修改了预约事项输入框的高度|`v2.1.4` |
  | 不受限预约界面修改了预约时间的高度|`v2.1.4` |
  | 不受限预约页面新增了右上角的刷新按钮，点击即可清空页面|`v2.1.4` |
  | 不受限预约的预约时间输入框调整了高度| `v2.1.4`|
  |活动申请页面预约老师界面需要获得采取用户信息的许可后才能进行相关的填写 |`v2.1.4` |
  |优化了用户端`申请活动`和`预约老师`的 UI 界面 | `v2.1.5`|
  | `活动申请`页面新增了填写进度条功能并且进度条可拖动|`v2.1.5` |
  | `活动申请`和`预约老师`页面顶部新增滚动提示栏| `v2.1.5`|
  |删除了`活动申请`页面的填写进度栏 | `v2.1.6`|
  | 删除了显示和隐藏密码的功能并设置默认为不显示| `v2.1.6`|
  | 删除了各个登录页面，登录页面将以小窗口显示| `v2.1.6`|
  |优化了登录页面的 UI | `v2.1.6`|
  | 完善了找回密码页面| `v2.1.6`|
  | 优化了整体小程序性能| `v2.1.6`|
  | 优化了审批端（活动端和预约端）的导航栏 UI| `v2.1.7`|
  | 新增导航栏显示页面活动记录条数的功能 | `v2.1.7` |
  | 当无活动记录或预约记录时显示为空状态 | `v2.1.7` |
  | 不受限登录也采用如用户端登录形式（弹窗）| `v2.1.7`|
  | 用户端每个页面添加`返回按钮`，点击可退回至首页 | `v2.1.7` |
  | 加深活动盒子以及预约盒子颜色（用于区别背景板）| `v2.1.7` |
  | 审批预约和审批活动端切换页面时会有`loading`显示 | `v2.1.7`|
  | 所有图片添加相应的标签 | `v2.1.7` |
  | 优化整合了详情页面 | `v2.1.8` |
  | 各个端口均可以实现自动登录功能（若是人工添加的账号不能实现自动登录 | `v2.1.8` |
  | 调整了活动总结页面的 UI、优化了相关逻辑 | `v2.1.8`
  | 优化了用户端`预约老师`页面相关逻辑 | `v2.1.8`
  | 审批端已实现导出任意活动状态的 EXCEL 表格功能 | `v2.1.9`
  | 将`社联`修改为`社团中心` | `v2.1.9`
  | 新增加消息订阅功能（目前仅开放用户端）（2023.3.22）| `v2.1.9`
  | 消息订阅功能（开放审批端口）| `v2.1.10`|

  > _注：不受限预约申请时需要按照从上往下的预约顺序，且在选择预约多个时间段时切勿点击同一个时间段两次，如果不慎点击，请点右上角的刷新按钮重新填_

- 主版本`v2.1.0`的 BUG 修复情况：
  | 修复内容 | 版本号 |
  |---|---|
  | 解决`预约老师`页面出现同一个老师同一时间段冲突的问题 | `v2.1.1`|
  | 修复了日期显示的 bug | `v2.1.2`|
  | 修复了 2.1.1 版本提交预约后刷新页面数据不成功的 bug| `v2.1.2`|
  | 修复了 2.1.1 版本可选择预约今天会议的 bug| `v2.1.2`|
  | 解决了页面 UI 会因为手机型号而产生超模的问题| `v2.1.7`|
  | 修复了部分图标未显示的 bug|`v2.1.8`|
  | 修复审批中重复出现一条信息的 bug|`v2.1.9`|
  | 修复了预约老师 bug|`v2.1.10`|



---

## Todo List

- [ ] 用户管理模块——v2.6.0
- [ ] 云开发数据库表优化——v2.6.0
