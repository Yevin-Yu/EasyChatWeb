import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { useRandomString } from '@/hooks/useRandomString';

export const useUserStore = defineStore('counter', () => {
  const userName: Ref<string> = ref('用户' + useRandomString(8))
  return { userName }
})
