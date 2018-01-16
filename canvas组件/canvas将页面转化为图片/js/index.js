//**********canvas绘制图片*******
      function AikfCanvas(ele, txt, imgObj, width, height) {
        //**ele:canvas元素**txt:后台返回文字、诗句(obj)***imgObj:图像和二维码图像
        //**width/height:设备宽高**saveImgDOM:用于显示生成图片的IMG元素
        this.ele = ele;
        this.txt = txt;
        this.imgObj = imgObj;
        this.width = width * 2;
        this.height = height * 2;
        this.top = height * 0.69; //第一句Y坐标
      };
      AikfCanvas.prototype.init = function() {
        this.ele.setAttribute('width', this.width);
        this.ele.setAttribute('height', this.height);
      };
      AikfCanvas.prototype.drawImg = function(call) {
        var mycanvas = this.ele.getContext('2d');
        var _this = this;
        var imgheight = this.height * 0.3516;
        var titleTop = imgheight + 80;
        mycanvas.clearRect(0, 0, 1000, 1000);
        //背景色
        mycanvas.fillStyle = "#ffffff";
        mycanvas.fillRect(0, 0, this.width, this.height);
        mycanvas.drawImage(this.imgObj.showImage, 0, 0, this.width, imgheight);
        mycanvas.font = "small-caps bold 44px Microsoft YaHei";
        mycanvas.fillStyle = "#000000";
        mycanvas.fillText(_this.txt.title, 60, titleTop);
        mycanvas.font = "small-caps lighter 28px Microsoft YaHei";
        mycanvas.fillStyle = "#000000";
        var authorsTop = titleTop + 50;
        mycanvas.fillText(_this.txt.authors, 60, authorsTop);
        for(var i = 0; i < _this.txt.article.length; i++) {
          mycanvas.font = "small-caps lighter 36px Microsoft YaHei";
          authorsTop += 70;
          mycanvas.fillText(_this.txt.article[i], 60, authorsTop);
        };
        var lineY = this.height - 154; //线条Y坐标
        var lineEndX = this.width - 20; //终点X坐标
        mycanvas.beginPath();
        mycanvas.lineWidth = '2';
        mycanvas.strokeStyle = '#d9d9d9';
        mycanvas.moveTo(20, lineY);
        mycanvas.lineTo(lineEndX, lineY);
        mycanvas.stroke();
        var erweiX = this.width - 160;
        mycanvas.drawImage(this.imgObj.erweiImg, erweiX, lineY + 10, 106, 106); //绘制二维码
        mycanvas.font = "small-caps bold 28px Microsoft YaHei";
        mycanvas.fillStyle = "#999999";
        mycanvas.fillText("爱客服-小诗妹", 60, lineY + 50);
        var bottomTxt = "作诗,作词,作对联,随时随地的文艺范儿!";
        bottomTxt = bottomTxt.toString();
        mycanvas.font = "small-caps lighter 24px Microsoft YaHei";
        mycanvas.fillStyle = "#999999";
        mycanvas.fillText(bottomTxt, 60, lineY + 80);
        this.saveImgInfo(call);
      };
      AikfCanvas.prototype.saveImgInfo = function(call) {
        var imginfo = this.ele.toDataURL('image/jpeg');
        call(imginfo);
      };
      AikfCanvas.prototype.duilian = function(call) {
        //对联页面
        var mycanvas = this.ele.getContext('2d');
        var bootomY = this.height * 0.8789;
        mycanvas.clearRect(0, 0, 1000, 1000);
        mycanvas.fillStyle = "#ffffff";
        mycanvas.fillRect(0, 0, this.width, this.height);
        mycanvas.globalAlpha = 0.6;
        mycanvas.beginPath();
        mycanvas.drawImage(this.imgObj.bgImg, 0, 0, this.width, this.height);
        mycanvas.drawImage(this.imgObj.articleImg, 126, 126, 496, 792);
        mycanvas.drawImage(this.imgObj.bottomImg, 0, bootomY, this.width, 146);
        mycanvas.closePath();
        mycanvas.save();
        var txtY = 240,
          leftX = 167,
          rightX = 515;
        mycanvas.globalAlpha = 1;
        mycanvas.font = "small-caps bold 64px Microsoft YaHei";
        mycanvas.fillStyle = "#000000";
        var _this = this;
        for(var i = 0; i < _this.txt.shanglian.length; i++) {
          //上联
          mycanvas.fillText(_this.txt.shanglian[i], rightX, txtY);
          mycanvas.fillText(_this.txt.xialian[i], leftX, txtY);
          txtY += 80;
        };
        this.saveImgInfo(call);
      };
      AikfCanvas.prototype.clearCanvas = function() {
        var mycanvas = this.ele.getContext('2d');
        mycanvas.clearRect(0, 0, 1000, 1000);
        this.top = this.height * 0.69;
      };
      
      //***************下一步本地存储带数据****************
      function NextLocation(inputVal,type,listname,name,toURL){
          //inputVal用户输入或选择的,type类型是存/储类型,toURL要跳转到的页面,listname目录页作诗/对联
          //name词牌名
          this.inputVal = inputVal;
          this.type = type;
          this.name = name;
          this.listname = listname;
          this.toURL = toURL;
      }
      NextLocation.prototype.isNull = function () {
          if(this.inputVal && this.inputVal.length <= 7){
              return false;
          }else{
              return true;
          }
      };
      NextLocation.prototype.myLocal = function () {
          if(this.type == 'set'){
              //存值
              var obj = {
                  inputVal:this.inputVal,
                  name:this.name,
                  listname:this.listname
              };
              localStorage.setItem('info',JSON.stringify(obj));
              window.location.href = this.toURL;
          }else if(this.type == 'get'){
              //取值
              var getInfo = JSON.parse(localStorage.getItem('info'));
              return getInfo;
          }else{
              return null;
          };
      };
      NextLocation.prototype.localClear = function () {
          //清空存储信息
          localStorage.clear();
      };