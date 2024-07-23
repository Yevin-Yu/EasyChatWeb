import { ref, watchEffect, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { useRandomString } from '@/hooks/useRandomString';

export const useUserStore = defineStore('counter', () => {
  const userName: Ref<string> = ref(localStorage.getItem('userName')|| '用户' + useRandomString(8))
  watchEffect(()=>{
    if(userName.value){
      localStorage.setItem('userName', userName.value)
    }
  })
  return { userName }
})
