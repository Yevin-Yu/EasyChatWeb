<template>
    <div class="header">
        Web轻聊
        <slot></slot>
        <svg @click="share" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
            <path fill="currentColor"
                d="m679.872 348.8-301.76 188.608a127.808 127.808 0 0 1 5.12 52.16l279.936 104.96a128 128 0 1 1-22.464 59.904l-279.872-104.96a128 128 0 1 1-16.64-166.272l301.696-188.608a128 128 0 1 1 33.92 54.272z">
            </path>
        </svg>
        <svg @click="isShow = true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
            <path fill="currentColor"
                d="M628.736 528.896A416 416 0 0 1 928 928H96a415.872 415.872 0 0 1 299.264-399.104L512 704zM720 304a208 208 0 1 1-416 0 208 208 0 0 1 416 0">
            </path>
        </svg>
    </div>
    <teleport to="body">
        <div v-if="isShow" class="open-chat">
            <div class="input">
                <input v-model="userId" placeholder="用户名" type="text">
                <input v-model="roomId" placeholder="房间编号" type="text">
            </div>
            <div class="btn">
                <button @click="isShow = false">取消</button>
                <button>确定</button>
            </div>
        </div>
    </teleport>
</template>
<script setup lang="ts">
import { ElNotification } from 'element-plus'
import { ref } from 'vue';
let userId = ref('')
let roomId = ref('')
let isShow = ref(false)
// 复制链接
function share() {
    console.log('share')
    navigator.clipboard.writeText('这是要复制的文本')
        .then(() => {
            console.log('文本已复制到剪贴板');
            ElNotification({
                title: '提示',
                message: '文本已复制到剪贴板',
                type: 'success',
            })
        })
        .catch(err => {
            console.error('复制到剪贴板失败: ', err);
        });
}
// 编辑用户名和房间号
function showEdit() {
    console.log('edit')
}
</script>
<style scoped>
.header {
    padding: 0 12px;
    font-size: 18px;
    height: 58px;
    line-height: 58px;
    text-align: left;
    color: #fff;
    background-color: #579690;
    position: relative;
}

.header svg {
    width: 20px;
    position: absolute;
    right: 12px;
    top: 20px;
    cursor: pointer;
}

.header svg:last-child {
    right: 40px;
}

.open-chat {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 320px;
    height: 220px;
    background-color: pink;
    border-radius: 20px;
    background: rgba(243, 244, 251, 1);
    box-shadow: -3px -3px 9px rgba(255, 255, 255, .4), 3px 4px 9px rgba(0, 0, 0, .2);
    padding-top: 24px;
}

.open-chat .btn {
    text-align: center;
}

.open-chat button {
    border-radius: 6px;
    cursor: pointer;
    outline: none;
    border: none;
    width: 80px;
    height: 32px;
    margin: 16px;
    background-color: #fff;
    box-shadow: -3px -3px 9px rgba(255, 255, 255, .4), 3px 4px 9px rgba(0, 0, 0, .2);
}

.open-chat .input input {
    display: block;
    margin: 20px auto;
    font-size: 16px;
    height: 36px;
    outline: none;
    border: none;
    width: 200px;
    border-radius: 6px;
    padding: 0 20px;
    box-shadow: -3px -3px 9px rgba(255, 255, 255, .4), 3px 4px 9px rgba(0, 0, 0, .2);
}

.open-chat button:hover {
    box-shadow: inset -3px -3px 9px rgba(255, 255, 255, .9), inset 3px 4px 9px rgba(0, 0, 0, .5);
}
</style>