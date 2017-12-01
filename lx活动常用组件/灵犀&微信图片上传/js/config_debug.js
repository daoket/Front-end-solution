/**
 * Created by Administrator on 2017/8/28 0023.
 */
var CFG = (function() {
     var cfg = {
        BAIDU: '773c2fb525481d4d0c8e981c6168c11e',
        getsignature : '//yd.voicecloud.cn/lxactserver/h5/getsignature', //获取微信接口签名信息
        getWXUserInfoUrl: '//yd.voicecloud.cn/lxactserver/h5/getuserinfo', //获取微信用户信息
        downloadUrl: '//s1.voicecloud.cn/resources/lxdl/index.html?n=',
        
        getFileUrl: '//yd.voicecloud.cn/lxactserver/h5/getfileurl', // 图片上传接口
        
        // 分享文案
        shareTitle: '周杰伦、TFboys等咪咕汇门票等你抓！',
        shareDesc: '【咪咕灵犀】12月16日 第11届音乐盛典咪咕汇门票免费抓，周杰伦、蔡依林、TFboys、邓紫棋等重磅演出！',
        
        shareUrl: location.origin + location.pathname.replace(/[\w]*.html/, 'share.html'),
        shareIconUrl: location.origin + location.pathname.replace(/[\w]*.html/, 'images/share-icon.jpg'),
    };
    return cfg;
})();
