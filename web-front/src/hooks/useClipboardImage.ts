// useClipboardImage.ts
import { onMounted, onUnmounted, ref, type Ref } from "vue";


export function useClipboardImage(element: Ref, fileList: Ref) {


    const handlePaste = (event: ClipboardEvent) => {
        const items = event.clipboardData!.items;
        for (let item of items) {
            if (item.kind === "file" && item.type.startsWith("image/")) {
                // 图片的话阻止默认
                event.preventDefault();
                const blob = item.getAsFile();
                const reader = new FileReader();
                reader.onload = function (e) {
                    console.log(e.target?.result)
                    fileList.value.push(e.target?.result);
                };
                reader.readAsDataURL(blob!);
            }
        }
    };

    const pasteImage = (event: ClipboardEvent) => {
        handlePaste(event);
    };

    onMounted(() => {
        element.value.addEventListener("paste", pasteImage);
    });

    onUnmounted(() => {
        element.value.removeEventListener("paste", pasteImage);
    });
}
