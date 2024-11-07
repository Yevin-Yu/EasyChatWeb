const WebSocket = require('ws');

const rooms = new Map(); // 保存房间信息
const wss = new WebSocket.Server({ port: 8802 });

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        const data = JSON.parse(message);
        if (data.type === 'join') {
            // 处理加入房间请求
            const roomUpdated = joinRoom(ws, data.roomId);
            if (roomUpdated) {
                updateRoomSizeForClients(data.roomId);
            }
        } else if (data.type === 'message') {
            // 发送消息
            broadcastMessage(data.roomId, data, ws);
        } else if (data.type === 'image') {
            // 发送图片
            broadcastMessage(data.roomId, data, ws);
        } else if (data.type === 'video') {
            // 发送视频
            broadcastMessage(data.roomId, data, ws);
        }
    });
    // 处理连接关闭事件
    ws.on('close', function close() {
        // 当连接关闭时，从所有房间移除该连接
        for (const [roomId, room] of rooms.entries()) {
            if (room.delete(ws)) {
                updateRoomSizeForClients(roomId);
            }
        }
    });
    ws.send(JSON.stringify({ type: 'hello', data: 'link ws success' }));
});

console.log('WebSocket server is running on ws://localhost:8802');
/**
 * 描述：将 WebSocket 客户端连接加入特定房间。首次加入房间时，创建一个房间集合，否则将客户端加入已有的房间集合。
 * 参数：
 * - ws：WebSocket 客户端连接。
 * - roomId：房间 ID。
 * */
function joinRoom(ws, roomId) {
    let room = rooms.get(roomId);
    if (!room) {
        room = new Set();
        rooms.set(roomId, room);
    }
    room.add(ws);
    return true;
}
/**
 * 描述：广播消息到指定房间的所有 WebSocket 连接
 * 参数：
 * - roomId：房间 ID
 * - data：要广播的消息数据
 * - ws：WebSocket 客户端连接
 * */
function broadcastMessage(roomId, data, senderWs) {
    const room = rooms.get(roomId);
    if (room) {
        room.forEach(function each(ws) {
            if (ws !== senderWs) { // 排除消息发送者
                ws.send(JSON.stringify(data));
            }
        });
    }
}
/**
 * 更新指定房间的客户端大小信息。
 * 这个函数会获取指定房间的集合，如果房间存在，它将计算房间的大小（集合中的客户端数量），并构建一个包含房间大小信息的消息对象。
 * 接着，函数会遍历房间中的每个 WebSocket 连接，将消息对象转换为 JSON 格式的字符串，并通过 WebSocket 连接的 `send` 方法发送给客户端。
 * 
 * @param {string} roomId - 要更新大小信息的房间 ID
 * @return {void} 这个函数没有返回值
 * */
function updateRoomSizeForClients(roomId) {
    const room = rooms.get(roomId);
    if (room) {
        const roomSize = room.size;
        const sizeUpdateMessage = { type: 'room', data: roomSize };
        room.forEach(function each(ws) {
            ws.send(JSON.stringify(sizeUpdateMessage));
        });
    }
}