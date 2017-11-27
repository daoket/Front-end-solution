/**
 * Created by Administrator on 2017/9/22
 */
;(function () {
  var lxData = new LXData(CFG.BAIDU),
      channel = lxData.queryUrl('channel'),
      ua = navigator.userAgent.toLocaleLowerCase(),
      WEIXIN = /micromessenger/.test(ua),
      LINGXI = /lingxi/.test(ua),
      IOS = /iphone/.test(ua);
      
  lxData.trackPV('channel');
  
  $('.share-btn').on('click', function () {
    lxData.trackEvent('点击“分享”');
    share();
    initAppShare();
  });
	
  // 隐藏弹窗
	$("#appShare").find(".mask").click(function() {
	  $("#appShare").hide();
	});
	$("#wxShare").click(function() {
	  $("#wxShare").hide();
	});
	
	$('.share-max .mask, .know').click(function () {
	   $('.share-max').hide(); 
	});
	
	/**
	 * @desc 灵犀分享流程
	 */
	function share () {
		if (!LINGXI) {
      //微信分享流程
      $("#wxShare").show();
    } else {
		  if (IOS) {
		    $("#appShare").find(".weibo").remove();
		    $("#appShare").find("img").addClass("item2");
		  } else {
		    $("#appShare").find("img").addClass("item3");
		  }
		  $("#appShare").show();
    }
		
	}
	
	/**
   * @desc 初始化app分享信息
   * @arg {string} imgUrl 图片url
   */
  function initAppShare(base) {
    if (LINGXI) {
      appShare.init(function () {
        $("#appShare").hide();
        lxData.trackEvent('点击分享按钮');
        lxUtil.showToast('分享成功');
      });
    }
  }
  
  // 隐藏弹窗
  $(".mask").on('click', function() {
    $('.share-success').hide();
    $('.headset').hide();
  });
})();
