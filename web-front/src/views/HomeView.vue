<template>
  <div class="web-chat">
    <div class="open-chat">
      <button @click="go">新建聊天</button>
      <div class="input">
        <input v-model="number" placeholder="请输入房间编号" type="text">
      </div>
      <button @click="add">加入聊天</button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router'
const router = useRouter()

let number = ref('')
function go() {
  console.log('go')
  router.push({ name: 'chat' })
}
function add() {
  console.log('go', number.value)
}
</script>
<style scoped>
.web-chat{
    width: 100%;
    max-height: 100vh;
    overflow: hidden;
}
.open-chat {
  margin: 25vh auto;
  width: 380px;
  height: 240px;
  background-color: pink;
  border-radius: 20px;
  background: rgba(243, 244, 251, 1);
  box-shadow: -3px -3px 9px rgba(255, 255, 255, .4), 3px 4px 9px rgba(0, 0, 0, .2);
  padding-top: 24px;
}

.open-chat button {
  border-radius: 6px;
  cursor: pointer;
  outline: none;
  border: none;
  display: block;
  width: 120px;
  height: 52px;
  margin: 16px auto;
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
  width: 220px;
  border-radius: 6px;
  padding: 0 20px;
  box-shadow: -3px -3px 9px rgba(255, 255, 255, .4), 3px 4px 9px rgba(0, 0, 0, .2);
}

.open-chat button:hover {
  box-shadow: inset -3px -3px 9px rgba(255, 255, 255, .9), inset 3px 4px 9px rgba(0, 0, 0, .5);
}
</style>