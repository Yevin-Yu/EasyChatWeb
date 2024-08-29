<template>
    <div class="chat-list">
        <div :class="item.userName === userName ? 'right' : 'left'" v-for="item in chatList" :key="item.id">
            <div class="item-card">
                <span class="user-time" v-if="item.userName === userName">
                    <span class="chat-time">{{ item.time }}</span>
                    <span class="user-name">{{ item.userName }}</span>
                </span>
                <span v-else class="user-time">
                    <span class="user-name">{{ item.userName }}</span>
                    <span class="chat-time">{{ item.time }}</span>
                </span>
                <div v-if="item.type === 'message'" class="text">
                    {{ item.data }}
                </div>
                <div v-else-if="item.type === 'image'" class="image">
                    <img @click="toggleFullScreen(item.data)" :src="item.data" alt="图片" />
                </div>
                <div v-else-if="item.type === 'video'" class="video">
                    <svg @click="showVideoFullScreen(item.data)"  xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                        <g fill="none" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M16.211 11.106L9.737 7.868A1.2 1.2 0 0 0 8 8.942v6.116a1.2 1.2 0 0 0 1.737 1.074l6.474-3.238a1 1 0 0 0 0-1.788" />
                            <circle cx="12" cy="12" r="9" />
                        </g>
                    </svg>
                    <video @click="showVideoFullScreen(item.data)" :src="item.data" />
                </div>
            </div>
        </div>
        <div ref="targetElement"></div>
    </div>
    <div v-if="isVideoFullScreen" @click="isVideoFullScreen = false" class="full-screen">
        <video v-if="videoFullScreenUrl" :src="videoFullScreenUrl" controls></video>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref, nextTick } from 'vue';
defineProps(['chatList', 'userName', 'roomId'])


const targetElement = ref();
onMounted(() => {
    scrollIntoView()
})
async function scrollIntoView() {
    await nextTick();
    targetElement.value.scrollIntoView({ behavior: 'instant', block: 'end' });
}
defineExpose({ scrollIntoView })

// 全屏图片
import { useFullScreenImage } from '@/hooks/useFullScreenImage';
const { toggleFullScreen } = useFullScreenImage();

// 视频全频
let isVideoFullScreen = ref(false);
let videoFullScreenUrl = ref('');
function showVideoFullScreen(item) {
    videoFullScreenUrl.value = item;
    isVideoFullScreen.value = true;
}
</script>
<style scoped>
.full-screen {
    width: 100%;
    height: 100%;
    left: 0;
    bottom: 0;
    position: absolute;
    background: rgba(0, 0, 0, .5);
    z-index: 9999;
}

.full-screen video {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: block;
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 80%;
    margin: auto;
}

.chat-list {
    height: calc(100% - 200px);
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.chat-list::-webkit-scrollbar {
    width: 5px;
    height: 5px;
}

.chat-list::-webkit-scrollbar-thumb {
    background-color: #57969080;
}

.user-name,
.chat-time {
    font-size: 12px;
    padding: 6px;
    color: #fff;
}

.left,
.right {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    border-radius: 10px;
    max-width: 70%;
}

.chat-list .left {
    align-self: flex-start;
}

.chat-list .text {
    margin: 6px;
    padding: 6px 12px;
    border-radius: 6px;
    line-height: 32px;
    color: #666;
    background-color: #fff;
    text-align: left;
    width: fit-content;
    display: inline-block;
}

.chat-list .right {
    align-self: flex-end;
    flex-direction: row-reverse;
}

.right .item-card {
    text-align: right;
}

.right .user-time,
.left .user-time {
    display: block;
}

.chat-list .image {
    min-width: 40%;
    overflow: hidden;
    margin: 6px;
    border-radius: 6px;
    text-align: left;
    display: inline-block;
}

.chat-list .image img {
    display: block;
    object-fit: contain;
    width: 100%;
    height: 100%;
    background-color: #ccc;
}

.chat-list .video {
    position: relative;
    width: 40%;
    height: auto;
    overflow: hidden;
    margin: 6px;
    border-radius: 6px;
    text-align: left;
    display: inline-block;
    cursor: pointer;
}
.chat-list .video svg{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60px;
    height: 60px;
    color: #6CB9B4;
    cursor: pointer;
}
.chat-list .video video {
    display: block;
    object-fit: contain;
    width: 100%;
    height: 100%;
    background-color: #ccc;
}
</style>
