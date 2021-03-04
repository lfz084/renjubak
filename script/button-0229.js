  "use strict";
  // 定制按钮，button，file，Radio，select。
  function button(parentNode, type, left, top, width, height) {

      this.parentNode = parentNode; //保存父节点;
      this.div = document.createElement("div"); //定位
      this.button = document.createElement("button"); //显示
      if (type == "select") {
          this.input = document.createElement("select"); //接受用户事件  
      }
      else {
          this.input = document.createElement("input"); //接受用户事件  
          this.input.setAttribute("type", type);
      }

      this.option = [];
      this.type = type;
      this.position = "absolute";
      this.width = width == null ? "200px" : parseInt(width) + "px";
      this.height = height == null ? "150px" : parseInt(height) + "px";
      this.left = left == null ? "0px" : parseInt(left) + "px";
      this.top = top == null ? "0px" : parseInt(top) + "px";
      this.color = "#333333"; //字体默认颜色
      this.selectColor = "black"; //按钮按下时字体颜色
      this.notChangeColor = false; // 不自动调整按钮字体颜色
      this.backgroundColor = "#f0f0f0"; //按钮颜色999999
      this.selectBackgroundColor = "#d0d0d0";  //666666
      /*if (this.type=="button") {
        let col = this.backgroundColor;
        this.backgroundColor = this.selectBackgroundColor;
        this.selectBackgroundColor = col;
      }*/
      this.margin = 0;
      this.outline = "none"; //去掉外框
      //this.fontFamily = "mHeiTi";
      this.fontSize = parseInt(this.height) / 2.2 + "px";
      this.textAlign = "center";
      this.checked = false;
      this.borderRadius = (parseInt(this.width) > parseInt(this.height) ? parseInt(this.height) : parseInt(this.width)) / 2 + "px";
      this.text = ""; //未选中显示的文本
      this.text2 = ""; //选中时显示的文本

      this.isEventMove = false; // 记录 touchstart 到 touchend 中间 是否触发 touchmove;
      this.touchStart = [];

      let but = this;

      this.input.ontouchstart = function() {
          but.defaultontouchstart();
      };

      this.input.onmousedown = function() {
          if (event.button==0) but.defaultontouchstart();
      };

      this.input.ontouchcancel = function() {
          console.log(`cancel t=${this.text}`);
          but.isEventMove = true; 
          but.defaultontouchend();
      };

      this.input.ontouchleave = function() {
          console.log(`leave t=${this.text}`);
          but.isEventMove = true; 
          but.defaultontouchend();
      };

      this.input.ontouchend = function() {
          but.defaultontouchend();
      };
      /*
      this.input.onmouseup = function() {
          but.defaultontouchend();
      };
      */
      this.input.onmouseout = function() {
          but.isEventMove = true; 
          but.defaultontouchend();
      };

      this.input.onchange = function() {
          but.defaultonchange();
      };

      this.input.ontouchmove = function() {
          but.defaultontouchmove();
      };

  }


  // 对 select 添加 option
  button.prototype.addOption = function(value, text) {

      console.log(`add t=${this.text}`);
      if (this.type != "select") return;
      let op = document.createElement("option");
      op.setAttribute("value", value);
      op.innerHTML = text;
      this.input.appendChild(op);

  };



  button.prototype.defaultontouchstart = function() {

      console.log(`str t=${this.text}`);
      this.isEventMove = false;
      this.button.style.opacity = 1;
      this.button.style.fontSize = parseInt(this.fontSize) * 0.9 + "px";
      if (this.backgroundColor != "black") {
          this.button.style.color = "black";
      }
      else {
          this.button.style.color = "#ccc";
      }
      this.button.style.backgroundColor = this.selectBackgroundColor;
      return true;
  };


  button.prototype.defaultontouchmove = function() {

      console.log(`mov t=${this.text}`);
      this.isEventMove = true; // 取消单击事件
      return true;
  };




  // 默认事件，
  button.prototype.defaultontouchend = function() {

      console.log(`end t=${this.text}`);
      // select 要弹出菜单不能屏蔽
      if (this.type != "select") event.preventDefault();
      //   "✔  ○●",radio,checked,前面加上特殊字符。
      let s;
      let timer;
      let cancel = false; // 判断是否取消单击

      if (this.isEventMove) cancel = true; // 不触发单击事件

      // radio, checkbox 默认事件
      if ((this.type == "radio" || this.type == "checkbox") && (!cancel)) this.checked = !this.checked;
      //console.log(`checked = ${this.checked} ,this.isEventMove = ${this.isEventMove}`);
      if (this.checked) {
          // 选中的时，按钮外观
          s = this.type == "radio" ? "☞" : this.type == "checkbox" ? "✔" : "";
          s += this.text2 == "" ? this.text : this.text2;
          if (this.type == "select") {
              for (let i = 5 - s.length; i > 0; i--) {
                  s = "&nbsp" + s + "&nbsp;";
              }
              s = "&nbsp;" + s + "▼";
          }
          this.button.innerHTML = s;
          this.button.style.fontSize = this.fontSize;
          this.button.style.color = this.notChangeColor ? this.color : this.selectColor;
          this.button.style.backgroundColor = this.selectBackgroundColor;
      }
      else {
          // 未选中时的外观
          if (this.type != "select" || this.type == "checkbox") {
              timer = 0;
          }
          else {
              timer = 500;
          }
          s = this.type == "radio" ? "" : this.type == "checkbox" ? "" : "";
          s += this.text;
          if (this.type == "select") {
              for (let i = 5 - s.length; i > 0; i--) {
                  s = "&nbsp" + s + "&nbsp;";
              }
              s = "&nbsp;" + s + "▼";
          }
          this.button.innerHTML = s;

          let but = this;
          if (timer) {
              setTimeout(function() {
                  but.button.style.fontSize = but.fontSize;
                  but.button.style.color = but.color;
                  but.button.style.backgroundColor = but.backgroundColor;
              }, timer);
          }
          else
          {
              but.button.style.fontSize = but.fontSize;
              but.button.style.color = but.color;
              but.button.style.backgroundColor = but.backgroundColor;
          }


      }

      if (this.type == "file" && !cancel) this.input.click();
      if(this.type == "select" && !cancel) {
          console.log(`click t=${this.text}`);
          this.input.size = "1";
      }
      return cancel ? false : true;
  };




  button.prototype.defaultonchange = function() {

      console.log(`chg t=${this.text}`);
      if (this.type != "select") return;
      let txt = this.input.options[this.input.selectedIndex].text;
      this.setText(txt);
      return true;
  };




  //移出节点
  button.prototype.hide = function() {
      console.log(`hid t=${this.text}`);
      let f = this.div;
      /*
      var childs = f.childNodes; 
      for(let i = childs.length - 1; i >= 0; i--)
       { 
        f.removeChild(childs[i]); 
       }
       */
      if (f.parentNode) f.parentNode.removeChild(f);


  };


  //  移动和设置大小
  button.prototype.move = function(left, top, width, height) {

      this.left = left == null ? this.left : parseInt(left) + "px";
      this.top = top == null ? this.top : parseInt(top) + "px";
      this.width = width == null ? this.width : parseInt(width) + "px";
      this.height = height == null ? this.height : parseInt(height) + "px";
      this.show();
  };


  //按钮背景色
  button.prototype.setBackgroundColor = function(color) {
      console.log(`sbc t=${this.text}`);
      this.backgroundColor = color;
      this.button.style.backgroundColor = color;

  };



  //  设置按钮形状
  button.prototype.setBorderRadius = function(rs) {
      console.log(`sbr t=${this.text}`);
      this.borderRadius = rs;
      this.show();
  };



  button.prototype.setColor = function(color) {
      console.log(`sclr t=${this.text}`);
      this.color = color;
      this.selectColor = color;
      this.button.style.color = color;
  };



  //设置选定状态    
  button.prototype.setChecked = function(checked) {
      //console.log(`sckd t=${this.text}`);
      if (this.checked == (checked == true)) return;
      this.checked = checked ? true : false;
      this.setText(this.text, this.text2);
  };


  //字体
  button.prototype.setFontSize = function(fontSize) {
      this.fontSize = parseInt(fontSize) + "px";
      if (this.checked) {
          this.button.style.fontSize = parseInt(parseInt(this.fontSize) * 0.9) + "px";
      }
      else {
          this.button.style.fontSize = this.fontSize;
      }
  };



  button.prototype.setNotChangeColor = function(nc) {
      this.notChangeColor = nc;
  };



  // 給事件绑定函数
  button.prototype.setonchange = function(callbak) {
      let but = this;
      this.input.onchange = function() {
          but.defaultonchange();
          callbak(but);
      };
  };



  // 給事件绑定函数
  button.prototype.setontouchstart = function(callbak) {
      let but = this;
      this.input.ontouchstart = function() {
          if (!but.defaultontouchstart(but)) return;
          callbak(but);
      };
  };





  // 給事件绑定函数
  button.prototype.setontouchend = function(callbak) {
      let but = this;
      this.input.ontouchend = function() {
          if (!but.defaultontouchend(but)) return;
          callbak(but);
      };
      this.input.onclick = this.input.ontouchend;
  };


  // 设置文本
  button.prototype.setText = function(txt, txt2) {
      console.log(`stxt t=${this.text}`);
      let s;
      this.text = txt == null ? "" : txt;
      this.text2 = txt2 == null ? "" : txt2;
      this.button.style.fontFamily = "mHeiTi";
      if (this.checked) {
          s = this.type == "radio" ? "☞" : this.type == "checkbox" ? "✔" : "";
          s += this.text2 == "" ? this.text : this.text2;
          this.button.innerHTML = s;
          this.button.style.fontSize = this.fontSize;
          this.button.style.color = this.notChangeColor ? this.color : this.selectColor;
          this.button.style.backgroundColor = this.selectBackgroundColor;
      }
      else {
          let timer;
          if (this.type == "radio" || this.type == "checkbox") {
              timer = 0;
          }
          else {
              timer = 100;
          }
          s = this.type == "radio" ? "" : this.type == "checkbox" ? "" : "";
          s += this.text;
          this.button.innerHTML = s;

          let but = this;
          if (timer) {
              setTimeout(function() {
                  but.button.style.fontSize = but.fontSize;
                  but.button.style.color = but.color;
                  but.button.style.backgroundColor = but.backgroundColor;
              }, timer);
          }
          else
          {
              but.button.style.fontSize = but.fontSize;
              but.button.style.color = but.color;
              but.button.style.backgroundColor = but.backgroundColor;
          }
      }
      if (this.type == "select") {
          for (let i = 5 - s.length; i > 0; i--) {
              s = "&nbsp" + s + "&nbsp;";
          }
          s = "&nbsp;" + s + "▼";
      }
      this.button.innerHTML = s;
  };



  //显示，刷新
  button.prototype.show = function(left, top, width, height) {

      this.parentNode.appendChild(this.div);
      this.div.appendChild(this.button);
      this.div.appendChild(this.input);

      this.div.style.position = this.position;
      if (width) this.width = parseInt(width) + "px";
      this.div.style.width = this.width;
      if (height) this.height = parseInt(height) + "px";
      this.div.style.height = this.height;
      if (top) this.top = parseInt(top) + "px";
      this.div.style.top = this.top;
      if (left) this.left = parseInt(left) + "px";
      this.div.style.left = this.left;
      this.div.style.borderRadius = this.borderRadius == null ? parseInt(this.width) + "px" : this.borderRadius;

      this.div.style.borderStyle = "solid";
      this.div.style.borderWidth = parseInt(this.width) < parseInt(this.height) ? parseInt(this.width) / 30 + "px" : parseInt(this.height) / 30 + "px";
      this.div.style.borderColor = this.selectBackgroundColor;
      //this.div.style.backgroundColor = "red"

      this.fontSize = parseInt(this.div.style.height) / 2.2 + "px";

      this.button.style.position = "relative";
      this.button.style.padding = "0px 0px 0px 0px";
      this.button.style.zIndex = this.div.style.zIndex;
      this.button.style.width = this.width;
      this.button.style.height = this.height;
      this.button.style.top = "0px";
      this.button.style.left = "0px";
      this.button.style.borderWidth = "0px";
      this.button.style.margin = 0;
      this.button.style.borderRadius = this.div.style.borderRadius
      this.button.style.outline = "none";
      this.button.style.textAlign = "center";
      this.button.style.lineHeight = parseInt(this.height) + "px";
      this.button.style.backgroundColor = this.backgroundColor;
      this.button.style.fontSize = this.fontSize;
      this.button.style.color = this.color;
      this.button.style.opacity = 0.9;

      this.input.style.position = "relative";
      this.input.style.zIndex = this.button.style.zIndex + 1;
      this.input.style.width = this.width;
      this.input.style.height = this.height;
      this.input.style.top = -parseInt(this.height) + "px";
      this.input.style.left = "0px";
      this.input.style.borderRadius = this.div.style.borderRadius
      this.input.style.opacity = 0;

      this.setText(this.text, this.text2); // 正确显示按钮文本
      if (this.type == "select") this.defaultonchange();
  };