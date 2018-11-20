/**
 * face++ 人脸识别
 * Created by wtniu on 2018-11-20
 * 参考：https://console.faceplusplus.com.cn/documents/4888373
 */
const request = require('request');
let data = {
  api_key: "9Hwtjj7FsqngVOGbFJkBqYPFaqspQs33",
  api_secret: "P3R9dcfDjKYTCJlzLl7S7zSsf8ZfqIvo"
};

let faceDetect = "https://api-cn.faceplusplus.com/facepp/v3/detect";
data.image_url = 'https://daoket.gitee.io/ai/images/pic.png'
let option1 = {
  url: faceDetect, // detect  compare
  method: "POST",
  headers: {},
  form: data
};
request(option1, (err, req, res) => {
  console.log(res)
})
