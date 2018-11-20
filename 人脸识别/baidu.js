/**
 * 百度人脸识别
 * Created by wtniu on 2018-11-20
 * 参考：https://ai.baidu.com/docs#/Face-Detect-V3/top
 */
var AipFaceClient = require("baidu-aip-sdk").face;
var HttpClient = require("baidu-aip-sdk").HttpClient;

// 设置APPID/AK/SK
const APP_ID = "14870299";
const API_KEY = "kkroWY4TjKok1iHzarKNzKim";
const SECRET_KEY = "p3qwKryc1bncrEkYYw5f2hOT6vynzeOB";

// 新建一个对象，建议只保存一个对象调用服务接口
var client = new AipFaceClient(APP_ID, API_KEY, SECRET_KEY);

// 设置超时
HttpClient.setRequestOptions({
  timeout: 5000
});

var image = 'https://daoket.gitee.io/ai/images/pic.png';
var imageType = "URL"; // BASE64  URL  FACE_TOKEN

// 调用人脸检测
client.detect(image, imageType).then(function (result) {
  console.log(JSON.stringify(result));
}).catch(function (err) {
  // 如果发生网络错误
  console.log(err);
});

// 如果有可选参数
var options = {};
options["face_field"] = "age";
options["max_face_num"] = "2";
options["face_type"] = "LIVE";

// 带参数调用人脸检测
client.detect(image, imageType, options).then(function (result) {
  console.log(JSON.stringify(result));
}).catch(function (err) {
  // 如果发生网络错误
  console.log(err);
});