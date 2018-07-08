var qs = require('querystring');
const request = require('request');
const path = require('path');
const fs = require('fs');

// let imgUrl = 'http://h.hiphotos.baidu.com/image/h%3D300/sign=45e1c8e71ddfa9ece22e501752d1f754/342ac65c103853434cc02dda9f13b07eca80883a.jpg'
// detectImg(imgUrl).then(res => {
//   console.log(res)
// })

/**
 * @desc 获取token
 */
function getToken() {
  return new Promise(resolve => {
    const param = qs.stringify({
      'grant_type': 'client_credentials',
      'client_id': 'mjqoX6wc3Gj1ckYPhITDFxjT',
      'client_secret': 'pO2G2NwQE99AVrmRbw5AjRKgRYGH3YyE'
    });
    let url = 'https://aip.baidubce.com/oauth/2.0/token?' + param

    request(url, (err, req, res) => {
      let access_token = JSON.parse(res).access_token
      resolve(access_token)
    })
  }).catch(err => {
    console.log(err)
  })
}
/**
 * @desc 将图片url转化base64
 */
function urlToBase64(imgUrl) {
  return new Promise(resolve => {
    let filePath = path.join(__dirname, 'aa.png')
    request(imgUrl)
      .pipe(fs.createWriteStream(filePath))
      .on('close', () => {
        let buf = fs.createReadStream(filePath) // stream对象
        buf.on('data', chunk => {
          resolve(chunk.toString('base64'))
        })
      })
  }).catch(err => {
    console.log(err)
  })
}
/**
 * @desc 解析图片
 * @arg {string} imgUrl 需要识别图片的url
 */
async function detectImg(imgUrl) {
  let access_token = await getToken()
  let base64Img = await urlToBase64(imgUrl)
  let detectUrl = 'https://aip.baidubce.com/rest/2.0/image-classify/v2/advanced_general'
  let option = {
    url: detectUrl + "?access_token=" + access_token,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    form: {
      "image": base64Img,
      "with_face": 1
    }
  }
  return new Promise(resolve => {
    request(option, (err, req, res) => {
      resolve(res)
    })
  }).catch(err => {
    console.log(err)
  })
}

module.exports = detectImg
