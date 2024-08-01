<template>
    <div class="web-chat">
        <div class="open-chat">
            <div class="input">
                <input v-model="roomId" placeholder="请输入房间编号" type="text" />
            </div>
            <button @click="go(roomId)">加入聊天</button>
            <button @click="go('')">新建聊天</button>
            <div v-if="roomLinkId" @click="go(roomLinkId)" class="room-link">最近房间：{{ roomLinkId }}</div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useRandomString } from '@/hooks/useRandomString';
import { ref } from 'vue';
import { useRouter } from 'vue-router'
const router = useRouter()
const roomLinkId = ref(localStorage.getItem('roomLinkId') || '')
// 加入或者新建房间
let roomId = ref('')
function go(id: string) {
  let roomId = id || useRandomString(8)
  roomLinkId.value = roomId
  localStorage.setItem('roomLinkId',roomId)
  router.push(`chat?roomId=${roomId}`)
}
</script>
<style scoped>
.web-chat {
  width: 100%;
  max-height: 100vh;
  overflow: hidden;
}

.open-chat {
  margin: 25vh auto;
  width: 80%;
  max-width: 380px;
  height: 240px;
  border-radius: 20px;
  background: rgba(243, 244, 251, 0.3);
  box-shadow: -3px -3px 9px rgba(255, 255, 255, .4), 3px 4px 9px rgba(0, 0, 0, .2);
  padding-top: 24px;
  text-align: center;
}

.open-chat .room-link {
  text-decoration: underline;
  font-size: 14px;
  color: #6CB9B4;
  margin: 10px 0;
}

.open-chat button {

  border-radius: 6px;
  cursor: pointer;
  outline: none;
  border: none;
  display: inline-block;
  width: 120px;
  height: 36px;
  margin: 16px 10px;
  background-color: #ffffffa0;
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
  background-color: #ffffffa0;
  box-shadow: -3px -3px 9px rgba(255, 255, 255, .4), 3px 4px 9px rgba(0, 0, 0, .2);
}

.open-chat button:hover {
  box-shadow: inset -3px -3px 9px rgba(255, 255, 255, .9), inset 3px 4px 9px rgba(0, 0, 0, .5);
}
</style>
