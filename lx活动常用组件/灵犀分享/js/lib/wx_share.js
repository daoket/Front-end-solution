/**
 * Created by Administrator on 2017/3/30 0030.
 */
/**
 * @desc 获取微信签名信息
 */
(function () {
  var lxData = new LXData(CFG.BAIDU);
	var channel = lxData.queryUrl('channel');
	if (!isWeiXin()) {
	    return;
	}
	$.post(CFG.getsignature, {
	    url: window.location.href.split('#')[0]
	}, function(data) {
	    if (data.errorcode != "000000") {
	        lxUtil.showToast("获取微信签名信息失败");
	        return;
	    } else {
        var result = data.result;
        wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: 'wx318d7b4b623a5066', // 必填，公众号的唯一标识
            timestamp: result.timestamp, // 必填，生成签名的时间戳
            nonceStr: result.noncestr, // 必填，生成签名的随机串
            signature: result.signature, // 必填，签名，见附录1
            jsApiList: ['onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareWeibo',
                'onMenuShareQZone',
                'startRecord',
                'stopRecord',
                'translateVoice'
            ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
        wx.ready(function() {
          initWXShare();
        });
	    }
	});
	
	/**
	 * @desc 初始化微信分享接口
	 * @arg {string} name 微信昵称
	 */
	function initWXShare() {
      var	page = sessionStorage.getItem('page'),
      		shareTitle = CFG.shareTitle,
      		shareDesc = CFG.shareDesc;
       
	    wx.onMenuShareTimeline({
	        title: shareTitle, // 分享标题
	        link: CFG.shareUrl + '?channel=' + channel, // 分享链接
	        imgUrl: CFG.shareIconUrl, // 分享图标
	        success: function() {
	            // 用户确认分享后执行的回调函数
	            lxData.trackEvent('点击分享按钮');
	            $('.mask-top').hide();
	            $('.wx-share').hide();
	        },
	        cancel: function() {
	            // 用户取消分享后执行的回调函数
	        }
	    });
	
	    wx.onMenuShareAppMessage({
	        title: shareTitle, // 分享标题
	        desc: shareDesc, // 分享描述
	        link: CFG.shareUrl + '?channel=' + channel, // 分享链接
	        imgUrl: CFG.shareIconUrl, // 分享图标
	        success: function() {
	            // 用户确认分享后执行的回调函数
	            lxData.trackEvent('点击分享按钮');
	            $('.mask-top').hide();
	            $('.wx-share').hide();
	        },
	        cancel: function() {
	            // 用户取消分享后执行的回调函数
	        }
	    });
	
	    wx.onMenuShareQQ({
	        title: shareTitle, // 分享标题
	        desc: shareDesc, // 分享描述
	        link: CFG.shareUrl + '?channel=' + channel, // 分享链接
	        imgUrl: CFG.shareIconUrl, // 分享图标
	        success: function() {
	            // 用户确认分享后执行的回调函数
	            lxData.trackEvent('点击分享按钮');
	            $('.mask-top').hide();
	            $('.wx-share').hide();
	        },
	        cancel: function() {
	            // 用户取消分享后执行的回调函数
	        }
	    });
	
	    wx.onMenuShareWeibo({
	        title: shareTitle, // 分享标题
	        desc: shareDesc, // 分享描述
	        link: CFG.shareUrl + '?channel=' + channel, // 分享链接
	        imgUrl: CFG.shareIconUrl, // 分享图标
	        success: function() {
	            // 用户确认分享后执行的回调函数
	            lxData.trackEvent('点击分享按钮');
	            $('.mask-top').hide();
	            $('.wx-share').hide();
	        },
	        cancel: function() {
	            // 用户取消分享后执行的回调函数
	        }
	    });
	
	    wx.onMenuShareQZone({
	        title: shareTitle, // 分享标题
	        desc: shareDesc, // 分享描述
	        link: CFG.shareUrl + '?channel=' + channel, // 分享链接
	        imgUrl: CFG.shareIconUrl, // 分享图标
	        success: function() {
	            // 用户确认分享后执行的回调函数
	            lxData.trackEvent('点击分享按钮');
	            $('.mask-top').hide();
	            $('.wx-share').hide();
	        },
	        cancel: function() {
	            // 用户取消分享后执行的回调函数
	        }
	    });
	
	}
	
	/**
	 * 判断当前浏览器环境
	 * @returns {*}
	 */
	function isWeiXin() {
	    var ua = window.navigator.userAgent.toLowerCase();
	    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
	        return true;
	    } else {
	        return false;
	    }
	}
	
	window.initWXShare = initWXShare; 
	
})();
