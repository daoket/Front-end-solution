/**
 * @desc  灵犀分享流程
 */
var appShare = (function() {
  /**
   * @desc 初始化分享设置
   * @arg {string} imgUrl 微信分享小图标
   * @arg {string} fn 回调，也就是分享完后可以做些什么事，比如把蒙层隐藏。
   */
  function _initShare(fn) {
    var channel = lxUtil.queryUrl('channel'),
      shareTitle = CFG.shareTitle,
      shareDesc = CFG.shareDesc,
      imgUrl = CFG.shareIconUrl,
      wxUrl = CFG.shareUrl + "?channel=" + channel + "&_t=" + Date.now(), 
      otherUrl = CFG.shareUrl + "?channel=" + channel + "&_t=" + Date.now();
      
    $("#appShare").find(".freind").off('click').on('click', function() {
      lx.shareWX({
        title: shareTitle,
        desc: shareDesc,
        link: wxUrl,
        imgUrl: imgUrl,
        type: "2",
        isShowSheet: 0
      });
      if (!!fn && typeof fn == "function") {
        setTimeout(function() {
          fn();
        }, 1000);
      }
      $('#appShare').hide();
    });
    $("#appShare").find(".timeline").off('click').on('click', function() {
      lx.shareWX({
        title: shareTitle,
        desc: shareDesc,
        link: wxUrl,
        imgUrl: imgUrl,
        type: "1",
        isShowSheet: 0
      });
      if (!!fn && typeof fn == "function") {
        setTimeout(function() {
          fn();
        }, 500);
      }
      $('#appShare').hide();
    });
    $("#appShare").find(".weibo").off('click').on('click', function() {
      lx.shareWB({
        title: shareDesc,
        desc: shareTitle,
        link: otherUrl
      });
      if (!!fn && typeof fn == "function") {
        setTimeout(function() {
          fn();
        }, 500);
      }
      $('#appShare').hide();
    });
  }
  return {
    /**
     * @desc  灵犀app分享函数入口
     * @param {Function} cpaFn   当app版本为CPA版本时的回调函数
     * @param {Function} initFn  当app版本为正常版本时的回调函数
     */
    init: function(initFn) {
      
      _initShare(initFn);
      
      lx.getBaseInfo({
        isNeedLbs: false,
        success: function(base) {
          var version = base.clientver;
          if(version == '4.0.2506' || version == '4.0.2580' || version == '5.0.3010' || version == '5.0.3015') {
            $('#appShare').find('img').click(function() {
              lxUtil.showToast('检测到您不是最新版本哦~请卸载重新安装~', 'top');
              return false;
            });
          } else {
            _initShare(initFn);
          }
        }
      })
    }
  }
}());

