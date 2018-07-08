/**
 * 百度语音合成
 * Created by wtniu on 2018-07-08
 * 参考：https: //ai.baidu.com/docs/#/TTS-Online-Node-SDK/top
 */
const fs = require('fs');
const AipSpeechClient = require("baidu-aip-sdk").speech;

// 设置APPID/AK/SK
const APP_ID = "11453423";
const API_KEY = "lGMnb8SpzgjoFvbFpFI2O3ss";
const SECRET_KEY = "BbkG7ggKV03spm2NOaa6HlONQD7jGl6T";
const client = new AipSpeechClient(APP_ID, API_KEY, SECRET_KEY);

// 识别远程语音文件
let audioUrl = 'http://bos.nj.bpc.baidu.com/v1/audio/8k.amr'
client.recognizeByUrl(audioUrl, 'http://yq01-ecom-holmes22-20150818112825.yq01.baidu.com:8492/aip/dump', 'amr', 8000).then(result => {
  console.log('远程音频识别结果:' + JSON.stringify(result));
}, err => {
  console.log(err);
});

/**
* 语音合成， 保存到本地文件
* spd 语速，取值0-9，默认为5中语速
* per 发音人选择: 0为女声，1为男声，3为情感合成-度逍遥，4为情感合成-度丫丫，默认为普通女
*/
let text = '百度语音合成测试'
client.text2audio(text, {spd: 5, per: 0}).then(result => {
  if (result.data) {
    console.log('语音合成成功，文件保存到tts.mp3，打开听听吧');
    fs.writeFileSync('tts.mp3', result.data);
  } else {
    console.log('语音合成失败: ' + JSON.stringify(result));
  }
}, err => {
  console.log(err);
});
