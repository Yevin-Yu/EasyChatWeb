# EasyChatWeb 🌐💬

（个人练习测试使用项目）

<div align="center">
    <img alt="logo" height="362" width="664" src="https://yuwb.cn/images/web-chat.png"/>
</div>


EasyChatWeb 是一个基于网页的轻量聊天应用，使用 **Vue3**、**Node.js** 和 **WebSocket** 技术构建，旨在提供简单易用的聊天体验。无论是发送消息、分享图片还是视频，EasyChatWeb 都能让您的交流更加顺畅！✨

## 功能 🚀

- **创建聊天房间**：用户可以轻松创建新的聊天房间。
- **加入聊天房间**：快速加入现有的聊天房间，与朋友畅聊。
- **发送消息**：实时发送和接收文本消息，保持沟通无阻。
- **发送表情**：支持发送各种表情符号，让聊天更生动！😊
- **发送图片**：
  - 直接选择文件上传。
  - 拖拽图片上传，简单快捷。
  - 复制图片直接发送，轻松分享。
- **发送视频**：
  - 直接选择文件上传，分享精彩瞬间。
  - 拖拽视频上传，快速发送。
  - 复制视频直接发送，分享乐趣无极限。
- **新消息提醒**：及时通知用户有新消息，确保不错过任何重要信息！🔔

## 技术点 🛠️

### 前端

- **技术栈**：Vue3 + WebSocket + ElementUI + PWA
- **关键实现**：
  - 使用 Vue3 的 Hook 特性，提升组件的可复用性。
  - 实现拖拽上传文件功能 (`onDrop`)，让上传变得简单。
  - 实现复制上传文件功能 (`onPaste`)，提升用户体验。
  - 使用浏览器通知 API 实现消息提醒 (`Notification`)，确保用户及时获取新消息。
  - 开启 PWA 支持，提升用户体验，随时随地畅聊。

### 后台

- **技术栈**：Node.js + WebSocket（使用 `ws` 包）转发和接收消息。
  
  ```ts
  const WebSocket = require('ws');
  ```

## 安装 🛠️

要开始使用 EasyChatWeb，请按照以下步骤操作：

1. **克隆仓库**：
   ```bash
   git clone https://github.com/Yevin-Yu/EasyChatWeb.git
   cd EasyChatWeb
   ```

2. **安装依赖**：

   对于后端：
   ```bash
   cd Backend
   // 安装依赖
   npm install
   // 启动服务
   node app.js
   ```

   对于前端：
   ```bash
   cd Frontend
   // 安装依赖
   npm install
   // 启动项目
   npm run dev
   ```
   查找修改 `ws` 链接：
   ```js
   // 修改为自己的 ws 链接
   socket = new WebSocket('ws://ws.yuwb.cn/');
   ```

3. **访问应用程序**：
   打开浏览器，访问 `http://localhost:5173` 开始聊天！🎉

## 贡献 🤝

欢迎贡献！如果您有改进建议或新功能，请随时提出问题或提交拉取请求。您的参与将使这个项目变得更好！

## 许可证 📄

本项目采用 MIT 许可证。有关详细信息，请参见 [LICENSE](LICENSE) 文件。

## 鸣谢 🙏

感谢所有贡献者和开源社区的支持与启发。

