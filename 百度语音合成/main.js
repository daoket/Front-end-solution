/**
 * 百度语音识别
 * Created by wtniu on 2018-07-08
 * 参考：https://ai.baidu.com/docs/#/ASR-Online-Node-SDK/top
 */
const fs = require('fs');
const path = require('path');
const voice = fs.readFileSync(path.join(__dirname, './16k.pcm'));
const AipSpeechClient = require("baidu-aip-sdk").speech;

// 设置APPID/AK/SK
const APP_ID = "11453423";
const API_KEY = "lGMnb8SpzgjoFvbFpFI2O3ss";
const SECRET_KEY = "BbkG7ggKV03spm2NOaa6HlONQD7jGl6T";
const client = new AipSpeechClient(APP_ID, API_KEY, SECRET_KEY);

let voiceBuffer = new Buffer(voice);

// 识别本地文件
client.recognize(voiceBuffer, 'pcm', 16000).then(function (result) {
  console.log('识别结果:' + JSON.stringify(result));
}, function (err) {
  console.log(err);
});

// 识别本地文件，附带参数  dev_pid: 默认1537普通话   1536: 普通话带简单英文
client.recognize(voiceBuffer, 'pcm', 16000, { dev_pid: '1536', cuid: Math.random()}).then(function (result) {
  console.log('识别结果: ' + JSON.stringify(result));
}, function (err) {
  console.log(err);
});
