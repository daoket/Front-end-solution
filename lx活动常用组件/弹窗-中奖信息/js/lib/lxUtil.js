;(function(win, obj) {
  var ua = navigator.userAgent.toLocaleLowerCase(),
      LINGXI = /lingxi/.test(ua),
      IOS = /iphone/.test(ua);
  
  var base = {
    "token": "f1af50f1cdd077a66e",
    "pver": "3.0",
    "aid": "108ViaFly",
    "osid": "Android",
    "clientver": '0.0.6000'
  };
  
  if (LINGXI) {
    lx.getBaseInfo({
      isNeedLbs: false,
      success: function(ret) {
        win[obj] = _initLxUtil(ret);
      }
    });
  } else {
    win[obj] = _initLxUtil(base);
  }
  
  function _initLxUtil (base) {
    
    var lxUtil =  {
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
        /**
         * @desc 获取用户base值的方法
         * @arg {function} fn 通过回调返回客户端的base值
         */
        getBase: function(fn) {
          lx.getBaseInfo({
            isNeedLbs: false,
            success: function(ret) {
              base = ret;
              typeof fn === 'function' && fn(ret);
            }
          });
        },
        /**
         * @desc 判断用户是否已登录
         * @arg {function} fn 通过回调告知是否登录,true已登录；false未登录
         */
        isLogin: function(fn) {
          if (base.token) {
            fn(true);
          } else {
            fn(false);
          }
        },
        /**
         * @desc 去登录
         */
        login: function() {
          var versions = base.clientver.split('.');
          if (versions.length >= 3) {
            var ver = parseInt(versions[2]);
            if (IOS) {
              if (ver > 1823) {
                lx.turnToNativePage({
                  page: 'LoginHomePage'
                });
                return;
              }
            } else {
              if (ver > 3005) {
                lx.turnToNativePage({
                  page: 'LoginHomePage'
                });
                return;
              }
            }
          }
          win[obj].showToast("请先登录！");
        },
        /**
         * @desc 去绑定
         */
        bind: function() {
          var versions = base.clientver.split('.');
          if (versions.length >= 3) {
            var ver = parseInt(versions[2]);
            if (IOS) {
              if (ver > 1823) {
                lx.turnToNativePage({
                  page: 'LoginHomePage'
                });
                return;
              }
            } else {
              if (ver > 3005) {
                lx.turnToNativePage({
                  page: 'LoginHomePage'
                });
                return;
              }
            }
          }
          win[obj].showToast("请先绑定手机号！");
        },
        /**
         * @desc 查询登录用户的剩余抽奖次数
         * @arg {funtion} fn 成功回调，参数格式
         * @arg {function} err 接口失败回调
         */
        getGameTimes: function(base, fn, err) {
          var param = "?token=" + base.token + "&amid=" + 'AM005232';
          ajax(param);
          function ajax(data) {
            $.ajax({
//            url: CFG.getGameTimes + data,
              url: '//61.191.24.229:5021/autumn/activity/getlotterynum' + data,
              type: 'POST',
              contentType: 'text/plain',
              dataType: 'JSON',
              error: function(data) {
                win[obj].showToast('网络出现异常，请检查后继续');
              },
              success: function(data) {
                var _data = data;
                if (typeof data == "string") {
                  _data = JSON.parse(data);
                }
                typeof fn == "function" && fn(_data);
              }
            });
          }
        },
      }
    
    return lxUtil;
  }
}(window, 'lxUtil'));

