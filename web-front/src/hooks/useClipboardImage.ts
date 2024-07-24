// useClipboardImage.ts
import { onMounted, onUnmounted, ref } from "vue";

interface UseClipboardImageResult {
    pasteImage: (event: ClipboardEvent) => void;
    pastedImageUrl: string | null;
}

export function useClipboardImage(targetElement: string): UseClipboardImageResult {
    const pastedImageUrl = ref(null);

    const handlePaste = (event: ClipboardEvent) => {
        event.preventDefault();
        const items = (event.clipboardData || window.clipboardData).items;

        for (let item of items) {
            if (item.kind === "file" && item.type.startsWith("image/")) {
                const blob = item.getAsFile();

                const reader = new FileReader();
                reader.onload = function (e) {
                    pastedImageUrl.value = e.target?.result as string;
                };
                reader.readAsDataURL(blob);
            }
        }
    };

    const pasteImage = (event: ClipboardEvent) => {
        handlePaste(event);
    };

    onMounted(() => {
        const element = document.querySelector(targetElement);
        if (element) {
            element.addEventListener("paste", pasteImage);
        }
    });

    onUnmounted(() => {
        const element = document.querySelector(targetElement);
        if (element) {
            element.removeEventListener("paste", pasteImage);
        }
    });

    return {
        pasteImage,
        pastedImageUrl,
    };
}
