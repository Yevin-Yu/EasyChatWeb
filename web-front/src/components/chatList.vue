<template>
    <div class="chat-list">
        <div :class="item.userName === userName ? 'right' : 'left'" v-for="item in chatList" :key="item.id">
            <div class="item-card">
                <span class="user-name">{{ item.userName }}</span>
                <!-- <span class="chat-time">17:43</span> -->
                <div class="text">
                    {{ item.data }}
                </div>
            </div>
        </div>
        <div ref="targetElement"></div>
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
</script>
<style scoped>
.chat-list {
    height: calc(100vh - 138px);
    overflow-y: scroll;
    background: #6CB9B4;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.chat-list::-webkit-scrollbar {
    width: 5px;
    height: 5px;
}

.chat-list::-webkit-scrollbar-thumb {
    background-color: #579690;
}

.user-name,
.chat-time {
    font-size: 12px;
    padding: 12px 12px 12px 12px;
    color: #eee;
}

.left,
.right {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px;
    border-radius: 10px;
    max-width: 70%;
}

.chat-list .left {
    align-self: flex-start;
}

.chat-list .text {
    margin: 6px 12px;
    padding: 6px 12px;
    border-radius: 6px;
    line-height: 32px;
    color: #666;
    background-color: #fff;
    text-align: left;
}

.chat-list .right {
    align-self: flex-end;
    flex-direction: row-reverse;
}

.right .item-card {
    text-align: right;
}
</style>