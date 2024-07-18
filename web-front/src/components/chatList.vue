<template>
    <div class="chat-list">
        <div class="left">
            <div class="item-card">
                <span class="user-name">用户：8952</span>
                <span class="chat-time">时间：17:43</span>
                <div class="text">
                    你好呀，哈喽你好呀，你好呀你好呀，哈喽你好呀，你好呀你好呀，哈喽你好呀，你好呀你好呀，哈喽你好呀，你好呀
                </div>
            </div>
        </div>
        <div class="right">
            <div class="item-card">
                <span class="user-name">用户：8952</span>
                <span class="chat-time">时间：17:43</span>
                <div class="text">
                    你好呀，哈喽
                </div>
            </div>
        </div>
        <div class="right">
            <div class="item-card">
                <span class="user-name">用户：8952</span>
                <span class="chat-time">时间：17:43</span>
                <div class="text">
                    你好呀，哈喽你好呀，你好呀你好呀，哈喽你好呀，你好呀你好呀，哈喽你好呀，你好呀你好呀，哈喽你好呀，你好呀
                </div>
            </div>
        </div>
        <div class="right" v-for="item in 5" :key="item">
            <div class="item-card">
                <span class="chat-time">时间：17:43</span>
                <span class="user-name">用户：8952</span>

                <div class="text">
                    你好呀，哈喽你好呀，你好呀
                </div>
            </div>
        </div>
        <div ref="targetElement"></div>
    </div>
</template>
<script setup lang="ts">
import { onMounted,ref } from 'vue';

const targetElement = ref();
onMounted(() => {
    targetElement.value.scrollIntoView({ behavior: 'instant', block: 'end' });
})
</script>
<style scoped>
.chat-list {
    height: calc(100% - 258px);
    overflow-y: scroll;
    background: #6CB9B4;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* margin: auto; */
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
}

.chat-list .right {
    align-self: flex-end;
    flex-direction: row-reverse;
}

.right .item-card {
    text-align: right;
}
</style>