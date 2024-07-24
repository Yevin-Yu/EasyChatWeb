# web-chat
一个Web端的轻聊页面，基于Vue3 + Node.js + WebSocket[个人练习测试使用]


## 功能

-  创建聊天房间
-  加入聊天房间
-  发送消息
-  发送表情
-  发送图片
    -   直接选择文件
    -   拖拽图片上传
    -   复制图片发送
-   新消息提醒



## 技术点

### 前端
Vue3 + WebSocket + ElementUI + PWA 

涉及关键点

-   Vue3 Hook
-   拖拽上传图片`onDrop`
-   复制上传图片`onPaste`
-   消息提醒`Notification`
-   开启PWA 

### 后台

Node.js  + WebSocket( 使用ws包 ) 转发接受消息

```ts
const WebSocket = require('ws');
```



