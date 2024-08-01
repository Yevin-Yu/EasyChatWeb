<template>
    <div class="chat" @dragover.prevent @drop="onDrop">
        <Header :roomId="roomId" :userName="userName">
            <span class="room-number">[{{ roomId }}][{{ wsStatus ? '已连接' : '未连接' }}][{{ roomSize }}人在线]</span>
        </Header>
        <ChatList ref="chatListRef" :chatList="chatList" :roomId="roomId" :userName="userName"></ChatList>
        <ChatInput ref="chatInput"></ChatInput>
    </div>
</template>
<script setup lang="ts">
import { useRandomString } from '@/hooks/useRandomString';
import { useUserStore } from '@/stores/useUserStore';
import Header from '@/components/header.vue'
import ChatList from '@/components/chatList.vue'
import ChatInput from '@/components/chatInput.vue'
import { onMounted, onBeforeUnmount, ref } from 'vue';
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia';
import dayjs from 'dayjs'
// 组件信息
let chatList = ref<any[]>([])
const router = useRouter()
const route = useRoute()
// 获取房间号
let roomId = ref(route.query.roomId)
if (!roomId.value) {
    roomId.value = useRandomString(8)
    router.push(`chat?roomId=${roomId.value}`)
}
// 获取用户信息
const userStore = useUserStore()
let { userName } = storeToRefs(userStore)
// 聊天记录
let chatListRef = ref<any>()
// 房间人数
let roomSize = ref(0)
// WebSocket
let wsStatus = ref(false)
let socket: WebSocket;
onMounted(() => {
    // 初始化WebSocket
    webSocketInit()
})
let isClose = ref(false)
onBeforeUnmount(() => {
    if (socket.readyState === WebSocket.OPEN) {
      isClose.value = true
      socket.close();
    }
})
// 初始化WebSocket
function webSocketInit() {
    // 创建 WebSocket 连接
    socket = new WebSocket('wss://ws.yuwb.cn/');
    // socket = new WebSocket('ws://localhost:8080');
    // 监听连接成功事件
    socket.addEventListener('open', function (event) {
        isClose.value = false
        wsStatus.value = true
        // 加入聊天室
        const data = {
            id: useRandomString(16),
            userName: userName.value,
            roomId: roomId.value,
            time: dayjs().format('HH:mm'),
            type: 'join',
            data: '',
        }
        socket.send(JSON.stringify(data));
    });
    // 监听消息事件
    socket.addEventListener('message', async function (event) {
        getMessage(event)
    });
    // 监听断开事件
    socket.addEventListener('close', async function (event) {
        wsStatus.value = false
        // 重新连接
        if(!isClose.value)webSocketInit()
    });
}
// 发送消息
function sendMessage(message: string, type: string) {
    const data = {
        id: useRandomString(16),
        userName: userName.value,
        roomId: roomId.value,
        time: dayjs().format('HH:mm'),
        type: type,
        data: message,
    }
    socket.send(JSON.stringify(data));
    // 添加到列表记录
    chatList.value.push(data)
    // 自动滚动消息
    chatListRef.value.scrollIntoView()
}
function getMessage(event: WebSocketEventMap['message']) {
    if (event.data instanceof Blob) {
        event.data.text().then(function (text) {
            const data = JSON.parse(text)
            if (data.type === 'message') {
                chatList.value.push(data)
                chatListRef.value.scrollIntoView()
                showNotification()
            } else if (data.type === 'room') {
                roomSize.value = data.data
            } else if (data.type === 'image') {
                chatList.value.push(data)
                chatListRef.value.scrollIntoView()
                showNotification()
            }
        });
    } else {
        const data = JSON.parse(event.data)
        if (data.type === 'message') {
            chatList.value.push(data)
            chatListRef.value.scrollIntoView()
            showNotification()
        } else if (data.type === 'room') {
            roomSize.value = data.data
        } else if (data.type === 'image') {
            chatList.value.push(data)
            chatListRef.value.scrollIntoView()
            showNotification()
        }
    }
}
// 修改用户名 同步聊天信息
function editUserName(data: string) {
    if (chatList.value && chatList.value.length > 0) {
        chatList.value.forEach(item => {
            if (item.userName === userName.value) item.userName = data
        })
    }
    userName.value = data
}
defineExpose({ sendMessage, editUserName })
// 消息提示
import { useNotifications } from '@/hooks/useNotifications';
const options: NotificationOptions = { body: '收到新消息', icon: 'logo.png', };
const { showNotification } = useNotifications('Web Chat', options);


// 拖拽上传图片
const chatInput = ref()
const onDrop = (e: DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer?.files;
    if (files && files.length > 0) {
        chatInput.value.dragFile(files[0])
    }
};
</script>
<style scoped>
.chat {
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.2)
}

.room-number {
    font-size: 14px;
    color: #eee;
}
</style>
