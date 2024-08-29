// useClipboardFile.ts
import { onMounted, onUnmounted, ref, type Ref } from "vue";


export function useClipboardFile(element: Ref, fileList: Ref) {


    const handlePaste = (event: ClipboardEvent) => {
        const items = event.clipboardData!.items;
        for (let item of items) {
            console.log(item)
            if (item.kind === "file" && (item.type.startsWith("image/")|| item.type.startsWith("video/"))) {
                // 图片的话阻止默认
                event.preventDefault();
                const blob = item.getAsFile();
                const reader = new FileReader();
                reader.onload = function (e) {
                    fileList.value.push(e.target?.result);
                };
                reader.readAsDataURL(blob!);
            }
        }
    };

    const pasteFile = (event: ClipboardEvent) => {
        console.log(event)
        handlePaste(event);
    };

    onMounted(() => {
        element.value.addEventListener("paste", pasteFile);
    });

    onUnmounted(() => {
        if (element.value) {
            element.value.removeEventListener("paste", pasteFile);
        }
    });
}
