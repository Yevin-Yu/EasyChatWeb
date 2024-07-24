import { onBeforeMount, onUnmounted, ref } from 'vue';

/**
 * 一个基于Vue 3 Composition API的Hook，用于处理浏览器的通知。
 * 
 * @param options - Notification构造函数接受的参数对象。
 * @returns 一个函数，用于请求权限并发送通知。
 */
export function useNotifications(title:string,options: NotificationOptions) {
  // 是否有通知权限
  const hasPermission = ref(false);
  const notification = ref<Notification | null>(null);

  // 请求用户允许发送通知
  const requestPermission = async () => {
    if (!("Notification" in window)) {
      console.error("This browser does not support desktop notification");
      return;
    }

    if (Notification.permission === "granted") {
      hasPermission.value = true;
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        hasPermission.value = true;
      }
    } catch (error) {
      console.error("Error requesting permission:", error);
    }
  };

  // 创建并显示通知
  const showNotification = () => {
    if (hasPermission.value && Notification.permission === "granted") {
      notification.value = new Notification(title, options);
    }
  };

  // 在组件挂载前检查权限
  onBeforeMount(() => {
    requestPermission();
  });

  // 组件卸载时清理通知
  onUnmounted(() => {
    if (notification.value) {
      notification.value.close();
    }
  });

  return {
    showNotification,
    hasPermission,
  };
}