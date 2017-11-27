/**
 * Created by Administrator on 2017/8/28 0023.
 */
var CFG = (function() {
     var cfg = {
        BAIDU: '9f0a8b4628b8cd7d286c26b6ec3bc794',
        getsignature : '//yd.voicecloud.cn/lxactserver/h5/getsignature', 
        getWXUserInfoUrl: '//yd.voicecloud.cn/lxactserver/h5/getuserinfo',
        downloadUrl: '//s1.voicecloud.cn/resources/lxdl/index.html?n=',
        
        getRemainAwards: '//yd.voicecloud.cn/autumn/activity/getlotterynum',
        getChoujiangUrl: '//yd.voicecloud.cn/autumn/activity/sweepstake',
        getSaveAddressUrl: '//yd.voicecloud.cn/lxactserver/activity/recordwinnerinfo',
        getAddChanceUrl: '//yd.voicecloud.cn/autumn/activity/addchance',
        
        amid: 'AM005334', // 咪咕汇活动id
        
        // 分享文案
        shareTitle: '周杰伦、TFboys等咪咕汇门票等你抓！',
        shareDesc: '【咪咕灵犀】12月16日 第11届音乐盛典咪咕汇门票免费抓，周杰伦、蔡依林、TFboys、邓紫棋等重磅演出！',
        
        shareUrl: location.origin + location.pathname.replace(/[\w]*.html/, 'share.html'),
        shareIconUrl: location.origin + location.pathname.replace(/[\w]*.html/, 'images/share-icon.jpg'),
    };
    return cfg;
})();
