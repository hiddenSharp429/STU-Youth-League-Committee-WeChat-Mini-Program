<!--
 * @Author: hiddenSharp429 z404878860@163.com
 * @Date: 2024-07-14 22:25:33
 * @LastEditors: hiddenSharp429 z404878860@163.com
 * @LastEditTime: 2024-07-14 22:28:45
 * @FilePath: /YLC/docs/README.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
# 汕头大学校团委微信小程序
  

## 简介

欢迎来到“汕头大学校团委微信小程序”的GitHub仓库。本微信小程序使用微信原生语法和腾讯云开发框架开发，旨在简化汕头大学校团委的教师预约申请和活动申请的审批流程。

## 功能

- **教师预约申请**：与教师预约讨论具体内容、时间和协商形式。
- **活动申请**：管理和审批各种活动申请。
- **用户友好界面**：设计直观且易于使用的界面以提高工作效率。

## 项目结构

```commandline
STU-YLC-Wechat-Miniprogram
├─cloud (小程序使用的云函数)
├─components (小功能组件)
├─docs (所有文档，包括变更日志)
├─pages (小程序中的各种页面)
├─icon (项目中使用的一些必要图片)
├─app.js 
├─app.wxss 
├─app.json 
└─README.md\README_CN.md
```

## 前置条件

- 微信开发者工具
- 腾讯云账户
- Node.js

## 安装

1. **克隆仓库**：
    ```bash
    git clone https://github.com/hiddenSharp429/STU-Youth-League-Committee-WeChat-Mini-Program
    ```

2. **安装依赖**：
    进入项目目录并安装所需依赖：
    ```bash
    cd WeChatMiniProgram
    npm install
    ```

3. **配置腾讯云**：
    - 设置你的腾讯云账户并初始化云环境。
    - 在项目中更新云环境配置。

## 使用

1. **用微信开发者工具打开**：
    - 打开微信开发者工具。
    - 导入 `WeChatMiniProgram` 项目。

2. **部署云函数**：
    - 通过微信开发者工具将云函数部署到腾讯云环境。

3. **运行小程序**：
    - 在微信开发者工具中点击“编译”按钮运行小程序。

4. **与小程序互动**：
    - 使用小程序提交和审批教师预约申请和活动申请。

## 截图

### 首页
<img src="https://pic.imgdb.cn/item/6693d9ccd9c307b7e90c4901.png" alt="Home Page" height="350"/>

### 教师预约申请页面
<img src="https://pic.imgdb.cn/item/6693d869d9c307b7e90a00f1.png" alt="Home Page" height="350"/>

### 活动申请页面
<img src="https://pic.imgdb.cn/item/6693d869d9c307b7e90a0115.png" alt="Home Page" height="350"/>

### 活动申请审批页面
<img src="https://pic.imgdb.cn/item/6693d869d9c307b7e90a00d9.png" alt="Home Page" height="350"/>

### 事件详情页面
<img src="https://pic.imgdb.cn/item/6693d869d9c307b7e90a00a4.png" alt="Home Page" height="350"/>

### 账户管理页面
<img src="https://pic.imgdb.cn/item/6693d869d9c307b7e90a0064.png" alt="Home Page" height="350"/>

## 贡献

欢迎大家为这个开源项目作出贡献，欢迎提交PR请求和留下你的问题。这个项目单纯为爱发电，所以不会有任何金钱相关的利益。如果这个项目对你有帮助，可以给我一个小星星吗？

## 鸣谢

- 感谢所有为这个项目做出贡献的开发者和贡献者。
- 特别感谢汕头大学和校团委的支持。

如有任何问题或需要帮助，请提交issue或通过[我的网易邮箱](mailto:z404878860@163.com)联系我们。