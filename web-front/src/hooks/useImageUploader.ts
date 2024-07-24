import { ref, onMounted, type Ref } from 'vue';
import { ElNotification } from 'element-plus'

/**
 * useImageUploader 函数用于处理图片上传逻辑
 * @param element：一个 ref 对象，用于获取 DOM 元素
 * @return：一个包含 fileList、cancelImage 和 delImage 的对象，分别对应已上传的图片列表、取消上传图片的方法和删除已上传图片的方法
 */
export function useImageUploader(element: Ref<any>) {
  let fileList = ref<string[]>([]);
  const uploadImage = () => {
    element.value.click()
  }
  onMounted(() => {
    // 监听图片变化
    element.value.addEventListener('change', (event: any) => {
      const files = event.target.files;
      if (files.length > 0) {
        const file = files[0];
        if (isImageFile(file)) {
          convertToBase64(file);
        } else {
          ElNotification({ title: '提示', message: '请选择图片文件！', type: 'warning', })
        }
      }
    });
  });

  /**
   * 将文件转换为Base64编码
   * @param file: 要转换的文件
   */
  const convertToBase64 = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64String = event.target!.result;
      fileList.value.push(base64String as string)
      // 清空file文件选择
      element.value.value = ''
    };
    reader.readAsDataURL(file);
  }

  /**
   * 判断是否是图片文件
   * @param file：要检查的文件
   * @return：如果文件类型以 image/ 开头，则返回 true，否则返回 false
   */
  const isImageFile = (file: File) => {
    return file.type.startsWith('image/');
  }

  /**
   * 取消图片上传
   * 重置 fileList 为一个空数组，清除所有上传图片的记录
   */
  const cancelImage = () => {
    fileList.value = []
  }

  /**
   * 删除图片
   * @param i：要删除的图片在 fileList 数组中的索引
   */
  const delImage = (i: number) => {
    fileList.value.splice(i, 1);
  }

  return {
    uploadImage,
    fileList,
    cancelImage,
    delImage
  };
}
