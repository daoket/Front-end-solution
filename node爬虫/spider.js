// cnpm i cheerio
var https = require('https')
var http = require('http')
var cheerio = require('cheerio')
var fs = require('fs')

var url = 'https://s.quanmin.tv/';

spider(url, function (data) {
    if (data) {
      var $ = cheerio.load(data);
      var arr = [];
      var json = {};
      $('.s_p-home_video_images img').each(function (k, v) {
          arr.push($(v).prop('src').trim())
      })
      for (var i = 0; i < arr.length; i++) {
            json[i] = arr[i]
      }
      fs.writeFile('data.json', JSON.stringify(json))
    } else {
      console.log('error')
    }
})

// 爬虫逻辑
function spider(url, callback) {
    https.get(url, function (res) {
        var html = '';
        res.on('data', function (chunk) {
            html += chunk
        })
        res.on('end', function () {
            callback(html)
        })
    }).on('error', function () {
        callback(null)
    })
}
