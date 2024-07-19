<template>
    <div class="chat">
        <Header :roomId="roomId" :userName="userName">
            <span class="room-number">[hdw732jd][已链接]</span>
        </Header>
        <ChatList></ChatList>
        <ChatInput></ChatInput>
    </div>
</template>
<script setup lang="ts">
import { useRandomString } from '@/hooks/useRandomString';
import { useUserStore } from '@/stores/useUserStore';
import Header from '@/components/header.vue'
import ChatList from '@/components/chatList.vue'
import ChatInput from '@/components/chatInput.vue'
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia';
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
// WebSocket
let wsStatus = ref(false)
let socket: WebSocket;
onMounted(() => {
    webSocketInit()
})
// 初始化WebSocket
function webSocketInit() {
    // 创建 WebSocket 连接
    socket = new WebSocket('ws://localhost:8080');
    // 监听连接成功事件
    socket.addEventListener('open', function (event) {
        console.log('open');
        wsStatus.value = true
    });
    // 监听消息事件
    socket.addEventListener('message', async function (event) {
        getMessage(event)
    });
    // 监听断开事件
    socket.addEventListener('close', async function (event) {
        console.log('close');
        wsStatus.value = false
        // 重新连接
        webSocketInit()
    });
}
// 发送消息
function sendMessage(message) {
    console.log(message)
    const data = {

    }
    // socket.send('hello ,nihaoya ,iyuwb');
}
function getMessage(event: WebSocketEventMap['message']) {
    if (event.data instanceof Blob) {
        event.data.text().then(function (text) {
            console.log(text)
        });
    } else {
        console.log(event.data)
    }
}
defineExpose({ sendMessage })
</script>
<style scoped>
.chat {
    height: 100%;
    width: 100%;
    background: #6CB9B4;
}

.room-number {
    font-size: 14px;
    color: #eee;
}
</style>