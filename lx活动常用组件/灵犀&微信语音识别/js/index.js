var ua = navigator.userAgent.toLocaleLowerCase(),
  LINGXI = /lingxi/.test(ua),
  WEIXIN = /micromessenger/.test(ua);
  
// ***********获取录音权限时，快速点击触发touchend事件，长按时触发touchcancel事件*************
/**
 * @desc 处理语音识别的文本文本
 */
function dealVoiceText(text) {
  if (text === '') {
  	alert("你还没有说话，(〃'▽'〃)")
  }
  $('.voice-txt').text(text); 
}

var isIosVoiceEnd = true; // 防止IOS识别状态下提示
/**
 * @desc 开始语音识别
 */
function startVoice(e) {
  // lxData.trackEvent('按住“麦克风”按钮');
  $('.home-mic').hide();
  $('.home-mic-run').show();
  
  isIosVoiceEnd = false;
  $('.voice-txt').attr('data-ios', 'isVoiceEnd'); //判断IOS是否识别完成
  
  // 开始听写
  if (LINGXI) {
    lx.startListenTransfer({
      engine: 'CN', //CN、EN,不传默认CN
      isSaveAudio: true //是否保存录音文件
    });
    
  //lx.startRecord(); // 开始录音
  } else if (WEIXIN) {
    wx.startRecord();
    e.preventDefault(); // 防止微信中长按出现菜单
  }
}
/**
 * @desc 语音识别被中断 
 */
function breakVocie() {
  $('.home-mic').show();
  $('.home-mic-run').hide();
}
/**
 * @desc 获取语音识别结果
 */
function endVoice() {
  $('.home-mic').show();
  $('.home-mic-run').hide();
  
  // 识别完成回调
  LINGXI && lxEndVoice();
  WEIXIN && wxEndVoice();
  
  /**
   * @desc 结束灵犀语音识别
   */
  function lxEndVoice() {
    lx.stopListenTransfer();// 停止听写
    
    isIosVoiceEnd = true;
    // 兼容灵犀IOS停止听写能力bug
    setTimeout(function () {
      if ($('.voice-txt').attr('data-ios') === 'isVoiceEnd' && isIosVoiceEnd) {
        dealVoiceText('');
      }
    }, 6000);
    
    lx.stopRecord(); // 停止录音
  }
  /**
   * @desc 结束微信语音识别
   */
  function wxEndVoice() {
    wx.stopRecord({
      success: function(res) {
        wx.translateVoice({
          localId: res.localId, // 需要识别的音频的本地Id，由录音相关接口获得
          isShowProgressTips: 1, // 默认为1，显示进度提示
          success: function(res) {
            res.translateResult === undefined ? dealVoiceText('') : dealVoiceText(text);
          },
          fail: function (res) {
            console.log('微信识别失败, res:' + res);
          }
        });
      }
    });
  }
}
/**
 * @desc 将音频上传服务器
 * @audioId {string} audioId 音频资源的id
 */
function uploadAudio(audioId) {
  lx.uploadVoice({
    localId: audioId,
    //上传成功
    success: function(ret) {
      var serverId = ret.serverId; // 将这个ID通过接口传给服务器就可以了
      audioId = ''
      console.log(serverId)
    },
    //上传失败
    fail: function(ret) {
      var code = ret.code; //错误编码
    }
  });
}
/**
 * @desc 录音回调并上传录音
 */
function lxRecordCallback() {
  // 灵犀上传录音
  lx.onRecordStatus({
    success: function(ret) {
      audioId = ret.audioId; //本地录音文件Id 
      alert(audioId)
      uploadAudio(audioId)
    },
    fail: function(ret) {
      var code = ret.code; //错误编码
    }
  });
}
/**
 * @desc 灵犀语音识别的回调
 */
function lxVoiceCallback() {
  lx.onListenTransfer({
    complete: function(ret) {
      if (ret.errorCode === 100006) {
        alert('请打开麦克风权限');
        return;
      }
      var text = ret.rawText, // 转写文本内容
        audioId = ret.audioId; // 本地录音文件Id
      
      lx.playVoice({
        resId: audioId, //根据type来区分取值, 1.网络文件取值音频文件Url, 2.本地文件Id
        type: '2' // 1.网络文件, 2.本地文件
      });
      
      lx.cancelListenTransfer()
      
      // IOS无法获取audioId
      uploadAudio(audioId)
        
      $('.voice-txt').removeAttr('data-ios');
      dealVoiceText(text);   
    },
    //听写异常
    fail: function(ret) {
      var code = ret.code; //错误编码
    }
  });
}

// 麦克风逻辑
$(".play-btn")
  .on('touchstart', startVoice)
  .on('touchcancel', breakVocie)
  .on('touchend', endVoice);
  
LINGXI && lxVoiceCallback();
//LINGXI && lxRecordCallback();