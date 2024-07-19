import { ref } from 'vue';

/**
 * 生成一个指定长度的随机字符串，并返回一个响应式的引用对象 Ref<string>
 *
 * @param length - 随机字符串的长度，默认为 8 位
 * @returns 一个响应式的引用对象，其值是随机生成的字符串
 */
export function useRandomString(length: number = 8) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';

    const generate = () => {
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        randomString = result;
    };

    generate();

    return randomString;
}