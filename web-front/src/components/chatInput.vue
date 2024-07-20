<template>
    <div class="chat-input">
        <textarea type="text" v-model="inputText" />
        <button @click="sendMessage($parent)">发 送</button>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
let inputText = ref('')
// 发送消息
function sendMessage($parent: any) {
    if ($parent.sendMessage && inputText.value) {
        $parent.sendMessage(inputText.value)
        inputText.value = ''
    }
}

</script>
<style scoped>
.chat-input {
    box-sizing: border-box;
    border-radius: 20px 20px 0 0;
    padding: 12px;
    height: 200px;
    background: #fff;
}

.chat-input textarea {
    width: 100%;
    height: 100%;
    line-height: 48px;
    font-size: 16px;
    resize: none;
    border: none;
    outline: none;
    border-radius: 12px;
    padding: 0 12px;
    box-sizing: border-box;
    background: #fefefe;
    box-shadow: inset -3px -3px 9px rgba(255, 255, 255, .5), inset 3px 4px 9px rgba(0, 0, 0, .2);
}

.chat-input button {
    position: absolute;
    bottom: 20px;
    right: 20px;
    background-color: #6CB9B4;
    height: 32px;
    width: 80px;
    color: #fff;
    outline: none;
    border: none;
    border-radius: 6px;
    font-size: 14px;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .2);
}

.chat-input button:active {
    background-color: #579690;
}
</style>