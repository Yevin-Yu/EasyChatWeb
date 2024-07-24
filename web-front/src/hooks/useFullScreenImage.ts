import { ref, onUnmounted } from 'vue';

/**
 * 创建一个全屏显示图片的组合式函数
 * @param imageUrl 图片的URL，用于显示或隐藏图片
 */
export function useFullScreenImage() {
  const imgElement = ref<HTMLImageElement | null>(null);
  const isFullScreen = ref(false);

  const toggleFullScreen = (imageUrl: string) => {
    if (isFullScreen.value) {
      // 如果当前图片URL与传入的URL相同，则隐藏图片
      if (imgElement.value && document.body.contains(imgElement.value)) {
        document.body.removeChild(imgElement.value);
        imgElement.value = null;
      }
      isFullScreen.value = false
    } else {
      // 如果URL不同，则创建新图片并显示
      if (imgElement.value) {
        document.body.removeChild(imgElement.value);
      }
      imgElement.value = document.createElement('img');
      imgElement.value.src = imageUrl;
      imgElement.value.style.position = 'absolute';
      imgElement.value.style.top = '0';
      imgElement.value.style.left = '0';
      imgElement.value.style.width = '100%';
      imgElement.value.style.height = '100%';
      imgElement.value.style.zIndex = '1000';
      imgElement.value.style.backgroundColor = 'rgb(0, 0, 0, 0.6)';
      imgElement.value.style.cursor = 'pointer';
      imgElement.value.style.objectFit = 'contain';
      // 添加图片元素到body
      document.body.appendChild(imgElement.value);
      // 添加点击事件处理程序，使用闭包中的currentImageUrl
      imgElement.value.addEventListener('click', () => toggleFullScreen(''));
      isFullScreen.value = true
    }
  };

  // 清理函数，移除事件监听器
  onUnmounted(() => {
    if (imgElement.value) {
      imgElement.value.removeEventListener('click', () => toggleFullScreen(''));
      document.body.removeChild(imgElement.value);
    }
  });

  return {
    toggleFullScreen,
  };
}