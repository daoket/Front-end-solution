;(function(win, obj) {
  var ua = navigator.userAgent.toLocaleLowerCase(),
      IOS = /iphone/.test(ua);

  var lxUtil = (function() {
    return {
      /**
       * @desc 查询url中字符串的值
       * @arg {string} str 查询字符串
       * @arg {boolean} igonore 是否忽略大小写，true 忽略；false不忽略；默认不忽略
       */
      queryUrl: function(str, ignore) {
        var t = "",
          n;
        var reg = ignore ? 'gi' : 'g';
        decodeURIComponent(window.location.search).toString().replace(
          new RegExp(
            "[?&]" +
            str + "=[^&]+", reg),
          function(r) {
            n = r.split("=")[1];
            n && (t = n);
          });
        return t;
      },
      /**
       * @desc toast弹窗提示
       * @arg {string} content 提示内容
       * @arg {string} orientation  'top'靠上显示；'bottom' 靠下显示
       * @arg {number} time toast显示时间，单位s，默认2s
       */
      showToast: function (content, orientation, time) {
        var position = orientation === 'top' ? 'top: 1.4rem;' : 'bottom: 1.4rem;',
            style = '#lxToast { position: fixed; ' + position + ' z-index: 999; width: 100%; text-align: center;}' +
              '#lxToast .tip { padding: 0.15rem 0.5rem; font-size: 0.4rem; opacity: 0.8; color: #333; background: #fff; border-radius: 0.10667rem; }';
              
        if (!!content && content.length) {
          $("head").append('<style>' + style + '</style>');
          $("body").append('<div id="lxToast"><span class="tip"></span><br /></div>');
          $('#lxToast .tip').text(content);
          setTimeout(function() {
            $("#lxToast").remove();
          }, !time ? 2000 : time * 1000);
        }
      },
    }
  }());
  win[obj] = lxUtil;
}(window, 'lxUtil'));

