let ws = require('ws'); //引入websocket模块
let uuid = require('uuid'); //引入创建唯一id模块
let wss = new ws.Server({
  port: 1234
}); //创建websocketServer实例监听1234端口
let clients = []; //创建客户端列表，用于保存客户端及相关连接信息
let clientIndex = 0;
//监听连接
wss.on('connection', function (ws) {
  let client_uuid = uuid.v4();
  let nickname = `user${clientIndex++}`;
  clients.push({
    "id": client_uuid,
    "ws": ws,
    "nickname": nickname
  });
  console.log(`client ${client_uuid} connected`);
  /*监听消息*/
  ws.on('message', function (message) {
    if (message.indexOf('/nick') === 0) {
      let nickname_array = message.split(' ');
      if (nickname_array.length >= 2) {
        let old_nickname = nickname;
        nickname = nickname_array[1];
        let nickname_message = `Client ${old_nickname} change to ${nickname}`;
        broadcastSend("nick_update", nickname_message, nickname);
      }
    } else {
      broadcastSend("message", message, nickname);
    }
  });
  /*监听断开连接*/
  ws.on('close', function () {
    closeSocket();
  })
  /**
   * 关闭服务，从客户端监听列表删除
   */
  function closeSocket() {
    for (let i = 0; i < clients.length; i++) {
      if (clients[i].id == client_uuid) {
        let disconnect_message = `${nickname} has disconnected`;
        broadcastSend("notification", disconnect_message, nickname);
        clients.splice(i, 1);
      }
    }
  }
})
console.log('ws server run at port 1234')
/**
 * 广播所有客户端消息
 * @param  {String} type     广播方式(admin为系统消息，user为用户消息)
 * @param  {String} message  消息
 * @param  {String} nickname 用户昵称，广播方式为admin时可以不存在
 */
function broadcastSend(type, message, nickname) {
  clients.forEach(function (v, i) {
    if (v.ws.readyState === ws.OPEN) {
      v.ws.send(JSON.stringify({
        "type": type,
        "nickname": nickname,
        "message": message
      }));
    }
  })
}