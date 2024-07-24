<template>
    <div class="chat-input">
        <!-- 表情-图片 -->
        <div class="fun-menu">
            <svg @click="isShowEmoji = !isShowEmoji" t="1721723277179" class="icon" viewBox="0 0 1024 1024"
                version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="16474" width="24" height="24">
                <path d="M872.802928 755.99406 872.864326 755.99406 872.864326 755.624646Z" fill="#272536" p-id="16475">
                </path>
                <path
                    d="M807.273469 216.727043c-162.808016-162.836669-427.736874-162.836669-590.544891 0-162.836669 162.806993-162.836669 427.736874 0 590.543867 162.808016 162.837692 427.737898 162.837692 590.544891 0C970.110137 644.462894 970.110137 379.534036 807.273469 216.727043M764.893242 764.92036c-139.444912 139.443889-366.370225 139.414213-505.798764 0-139.459239-139.473565-139.459239-366.354875 0-505.827417 139.428539-139.429563 366.354875-139.460262 505.798764 0C904.336108 398.521482 904.336108 625.476471 764.893242 764.92036"
                    fill="#6CB9B4" p-id="16476"></path>
                <path
                    d="M381.724423 468.02137c24.783453 0 44.953841-20.169365 44.953841-44.967144 0-24.828478-20.170388-45.027519-44.953841-45.027519-24.842805 0-45.013193 20.199041-45.013193 45.027519C336.71123 447.852004 356.881618 468.02137 381.724423 468.02137"
                    fill="#6CB9B4" p-id="16477"></path>
                <path
                    d="M640.680243 468.095048c24.812105 0 45.010123-20.213367 45.010123-45.01217 0-24.827455-20.198018-44.99682-45.010123-44.99682-24.785499 0-44.953841 20.169365-44.953841 44.99682C595.726401 447.88168 615.894743 468.095048 640.680243 468.095048"
                    fill="#6CB9B4" p-id="16478"></path>
                <path
                    d="M642.245901 619.058294l-2.453888 0.798179c-40.310078 18.248619-83.548858 27.5341-128.411625 27.5341-46.343491 0-90.173742-9.375531-130.305765-27.799136l-2.425236-0.741897c-1.508353-0.413416-3.548826-1.003863-6.092765-1.003863-14.757099 0-26.734898 11.977799-26.734898 26.675546 0 6.978948 3.282766 13.988596 8.695033 19.253506l-0.325411 1.62501 6.831592 3.076058c47.911196 21.679765 100.021018 33.095769 150.681838 33.095769 51.608402 0 102.180194-11.120268 150.978597-33.361829 8.575306-4.703115 13.928221-13.721513 13.928221-23.511483C676.611593 627.458615 661.027663 613.290941 642.245901 619.058294"
                    fill="#6CB9B4" p-id="16479"></path>
            </svg>
            <svg @click="uploadImage" t="1721723294546" class="icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="17578" width="24" height="24">
                <path
                    d="M821.6 120.93333333H195.4c-74.1 0-134.2 60.1-134.2 134.2v492c0 74.1 60.1 134.2 134.2 134.2h626.2c74.1 0 134.2-60.1 134.2-134.2v-492c0-74.1-60.1-134.2-134.2-134.2zM251.3 255.13333333c30.9 0 55.9 25 55.9 55.9s-25 55.9-55.9 55.9-55.9-25-55.9-55.9 25-55.9 55.9-55.9z m614.6 559.1H153.3c-37.3 0-58.2-43.1-35.1-72.4L302.1 508.33333333c17.9-22.7 52.4-22.7 70.3 0l76.5 97.2 148.6-260c17.2-30.1 60.5-30.1 77.7 0L904.8 747.33333333c17 29.8-4.5 66.9-38.9 66.9z"
                    fill="#6CB9B4" p-id="17579"></path>
            </svg>
        </div>
        <Transition mode="out-in">
            <!-- 表情列表 -->
            <div v-show="isShowEmoji" class="emoji-list">
                <span class="emoji-item" v-for="item in EmojiList" @click="sendMessage($parent, item)" :key="item">{{
                    item }}</span>
            </div>
        </Transition>
        <!-- 图片预览   -->
        <div v-if="fileList.length" class="image-list">
            <div class="img-item" v-for="item, index in fileList" :key="'image' + index">
                <img @click="toggleFullScreen(item)" height="200px" :src="item" alt="图片">
                <svg @click="delImage(index)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                    <path fill="currentColor"
                        d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z">
                    </path>
                </svg>
            </div>
        </div>
        <div class="input-content">
            <input v-show="!fileList.length" @keyup.enter="sendMessage($parent, '')" type="text" v-model="inputText"
                ref="chatInput"></input>
            <button @click="cancelImage" v-if="fileList.length" class="cancel">取 消</button>
            <button @click="sendMessage($parent, '')">发 送</button>
        </div>
        <input type="file" accept="image/*" ref="fileInput" style="display:none;">
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
// Emoji表情
import { useEmojiStore } from '@/stores/useEmojiStore';
const { EmojiList } = useEmojiStore()
// 控制展示
let isShowEmoji = ref(false)
let inputText = ref('')
// 发送消息
function sendMessage($parent: any, emoji: string) {
    if (fileList.value.length) {
        // 发送图片
        fileList.value.forEach(item => {
            $parent.sendMessage(item, 'image')
        })
        fileList.value = []
    } else if (emoji) {
        // 发送表情
        inputText.value += emoji
    } else if ($parent.sendMessage && inputText.value) {
        // 发送文本
        $parent.sendMessage(inputText.value, 'message')
        inputText.value = ''
        isShowEmoji.value = false
    }
}
// 上传图片
let fileInput = ref()
import { useImageUploader } from '@/hooks/useImageUploader';
const { uploadImage, fileList, cancelImage, delImage, dragFile } = useImageUploader(fileInput);
defineExpose({ dragFile })
// 全屏图片
import { useFullScreenImage } from '@/hooks/useFullScreenImage';
const { toggleFullScreen } = useFullScreenImage();

// 粘贴图片
const chatInput = ref()
import { useClipboardImage } from '@/hooks/useClipboardImage';
useClipboardImage(chatInput, fileList);
</script>
<style scoped>
.chat-input {
    width: 100%;
    left: 0;
    bottom: 0;
    position: absolute;
    box-sizing: border-box;
    border-radius: 20px 20px 0 0;
    padding: 12px;
    background: #fff;
}

.chat-input input {
    width: 100%;
    height: 100%;
    height: 56px;
    line-height: 56px;
    font-size: 16px;
    resize: none;
    border: none;
    outline: none;
    border-radius: 12px;
    padding: 0 12px;
    box-sizing: border-box;
    background: #fefefe;
    box-shadow: inset -3px -3px 9px rgba(255, 255, 255, .5), inset 3px 4px 9px rgba(0, 0, 0, .2);
}

.chat-input button {
    position: absolute;
    bottom: 24px;
    right: 20px;
    background-color: #6CB9B4;
    height: 32px;
    width: 60px;
    color: #fff;
    outline: none;
    border: none;
    border-radius: 6px;
    font-size: 14px;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .2);
}

.chat-input button:active,
.chat-input button:hover {
    background-color: #579690;
}

.chat-input button.cancel {
    background-color: #6cb9b480;
    right: 100px;
}

.chat-input button.cancel:active,
.chat-input button.cancel:hover {
    background-color: #6CB9B4;
}

.fun-menu .icon {
    padding: 4px 6px;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent
}

.emoji-list {
    padding-bottom: 12px;
}

.emoji-item {
    cursor: pointer;
    font-size: 24px;
    padding: 0px 6px 12px;
    -webkit-tap-highlight-color: transparent
}

.image-list {
    padding-bottom: 12px;
}

.image-list .img-item {
    display: inline-block;
    width: 80px;
    height: 80px;
    margin-right: 12px;
    border-radius: 6px;
    overflow: hidden;
    position: relative;
}

.image-list .img-item img {
    object-fit: contain;
    width: 100%;
    height: 100%;
    background-color: #ccc;
}

.image-list .img-item svg {
    position: absolute;
    top: 4px;
    right: 4px;
    width: 16px;
    color: #666;
    cursor: pointer;
}
</style>