  "use strict";
  const AnimationTimeout = 300;
  // 定制按钮，button，file，Radio，select。
  function button(parentNode, type, left, top, width, height) {

      this.parentNode = parentNode; //保存父节点;
      this.div = document.createElement("div"); //定位
      this.button = document.createElement("button"); //显示
      this.div.appendChild(this.button);
      this.label = null;
      if (type == "select") {
          this.input = document.createElement("select"); //接受用户事件  
          this.label = document.createElement("div");
          this.label.innerHTML = "▼";
          this.div.appendChild(this.label);
      }
      else {
          this.input = document.createElement("input"); //接受用户事件  
          this.input.setAttribute("type", type);
      }
      this.div.appendChild(this.input);
      this.menuWindow = null;
      this.menu = null;

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
      this.selectBackgroundColor = "#d0d0d0"; //666666
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

      this.targetScrollTop = 0;
      this.tempScrollTop = 0;
      this.animationFrameScroll = null;

      let but = this;
      this.input.ontouchstart = function() {
          if (event) event.cancelBubble = true;
          but.defaultontouchstart();
      };

      this.input.onmousedown = function() {
          if (event) event.cancelBubble = true;
          if (but.type == "select" || but.type == "file") {
              if (event) event.preventDefault();
          }
          else {
              if (event) event.preventDefault();
              //console.log(but.type);
          }
          if (event.button == 0) but.defaultontouchstart();
      };

      this.input.ontouchcancel = function() {
          //console.log(`cancel t=${this.text}`);
          if (event) event.cancelBubble = true;
          but.isEventMove = true;
          but.defaultontouchend();
      };
      /*
            this.input.ontouchleave = function() {
                //console.log(`leave t=${this.text}`);
                but.isEventMove = true;
                but.defaultontouchend();
            };
            */

      this.input.ontouchend = function() {
          if (event) event.cancelBubble = true;
          but.defaultontouchend();
      };


      this.input.onmouseup = function() {
          if (event) event.cancelBubble = true;
          if (event) event.preventDefault();
          but.isEventMove = false;
          if (but.type == "file") {
              but.isEventMove = true; //cancel defaultontouchend to click();
              but.defaultontouchend(); // defaultontouchend() to onchange();
          } // if "input file" cancel this click; 
          else {
              but.input.ontouchend();
          }

          console.log(`but ,onmouseup`);

          console.log(`but ,onmouseup---`);
      };
      this.input.onclick = function() {
          //event.preventDefault()
          console.log("click");
      }
      /*
      this.input.onmouseout = function() {
          but.isEventMove = true;
          but.defaultontouchend();
      };
*/
      this.input.onchange = function() {
          if (event) event.cancelBubble = true;
          but.defaultonchange();
      };

      this.input.ontouchmove = function() {
          if (event) event.cancelBubble = true;
          but.defaultontouchmove();
      };

  }


  // 对 select 添加 option
  button.prototype.addOption = function(value, text) {

      //console.log(`add t=${this.text}`);
      if (this.type != "select") return;
      let op = document.createElement("option");
      op.setAttribute("value", value);
      op.innerHTML = text;
      this.input.appendChild(op);

  };



  button.prototype.createMenu = function(left, top, width, height, fontSize, closeAnimation) {
      if (this.type != "select" || this.menuWindow) return;
      let but = this;
      /*
      this.input.onmousedown = function() {
          but.input.onmousedown();
      };
      this.input.onmouseup = function() {
          but.isEventMove = false;
          but.input.onmouseup();
      };
      */
      let muWindow = document.createElement("div");
      let menu = document.createElement("div");
      muWindow.appendChild(menu);
      muWindow.onclick = menu.onclick = function() {
          if (event) {
              event.cancelBubble = true;
              event.preventDefault()
          };
          muWindow.setAttribute("class", `${0?"hideContextMenu":"hide"}`);
          isMsgShow = false;
          but.hideMenu(closeAnimation ? 350 : AnimationTimeout);
      };

      this.menuWindow = muWindow;
      this.menu = menu;
      menu.setAttribute("class", "menu");
      let dh = document.documentElement.clientHeight;
      let dw = document.documentElement.clientWidth;
      let optionsHeight = (fontSize * 2.5 + 3) * this.input.length;
      height = (fontSize * 2.5 + 3) * (this.input.length + 2);
      height = height > dh * 0.8 ? dh * 0.8 : height;
      height = dw > dh ? height : height > dh * (0.5 - 0.05) ? dh * (0.5 - 0.05) : height;
      top = (dh - height - dh * 0.05);
      top = top > dh / 2 ? dh / 2 : top;
      this.menu.menuLeft = left;
      this.menu.menuTop = top;
      this.menu.menuHeight = height;
      this.menu.menuWidth = width;
      this.menu.fontSize = fontSize;
      //console.log(`left=${left}, top=${top}, width=${width}, height=${height}, fontSize${fontSize}`);


      //alert(this.input.length)
      if (this.input.length && ((this.menu.menuHeight - (fontSize + 3) * 1) < optionsHeight)) {
          let li = document.createElement("li");
          li.innerHTML = "︾";
          li.style.fontWeight = "normal";
          li.style.fontFamily = "mHeiTi";
          li.style.fontSize = parseInt(fontSize) + "px";
          li.style.lineHeight = fontSize * 2.5 + "px";
          li.style.paddingLeft = fontSize * 7 + "px";
          li.style.margin = "0";
          menu.appendChild(li);
          let input = this.input;
          li.onclick = function() {
              if (event) event.cancelBubble = true;
              but.menuScroll(parseInt(li.style.lineHeight) * 5);
          };
      }


      for (let i = 0; i < this.input.length; i++) {
          let hr = document.createElement("hr");
          menu.appendChild(hr);
          hr.style.height = "1px";
          hr.style.marginLeft = "-1px";
          hr.style.padding = "0";
          let li = document.createElement("li");
          li.innerHTML = this.input[i].innerHTML;
          li.style.fontWeight = "normal";
          li.style.fontFamily = "mHeiTi";
          li.style.fontSize = parseInt(fontSize) + "px";
          li.style.lineHeight = fontSize * 2.5 + "px";
          li.style.paddingLeft = li.style.fontSize;
          li.style.margin = "0";
          menu.appendChild(li);
          //alert(li.innerHTML)
          let input = this.input;
          li.onclick = function() {
              if (event) event.cancelBubble = true;
              input.value = i;
              input.selectedIndex = i;
              //alert(`onclick  ,i=${i}, idx=${input.selectedIndex}`);
              if (muWindow.parentNode) {
                  muWindow.setAttribute("class", `${0?"hideContextMenu":"hide"}`);
                  isMsgShow = false;
                  if (closeAnimation) input.onchange();
                  but.hideMenu(closeAnimation ? AnimationTimeout : AnimationTimeout, !closeAnimation ? input.onchange : null);
              }
          };
      }
      let hr = document.createElement("hr");
      menu.appendChild(hr);
      hr.style.height = "1px";
      hr.style.marginLeft = "-1px";
      hr.style.padding = "0";
      if (this.input.length && ((this.menu.menuHeight - (fontSize + 3) * 1) < optionsHeight)) {
          let li = document.createElement("li");
          li.innerHTML = "︽";
          li.style.fontWeight = "normal";
          li.style.fontFamily = "mHeiTi";
          li.style.fontSize = parseInt(fontSize) + "px";
          li.style.lineHeight = fontSize * 2.5 + "px";
          li.style.paddingLeft = fontSize * 7 + "px";
          li.style.margin = "0";
          menu.appendChild(li);
          let input = this.input;
          li.onclick = function() {
              if (event) event.cancelBubble = true;
              but.menuScroll(-parseInt(li.style.lineHeight) * 5);
          };
      }
      else {
          this.menu.menuHeight = optionsHeight + 3;
      }

  };



  button.prototype.menuScroll = function(top) {
      //console.log("menuScroll")
      let optionsHeight = (parseInt(this.menu.fontSize) * 2.5 + 3) * (this.input.length + 2);
      let maxScrollTop = optionsHeight - parseInt(this.menumenuHeight);
      let targetScrollTop = this.menu.scrollTop + top;
      let but = this;
      if (this.animationFrameScroll) cancelAnima();
      this.targetScrollTop = targetScrollTop;
      //console.log(`menu.scrollTop=${this.menu.scrollTop}, top=${top}`)
      this.tempScrollTop = this.menu.scrollTop;
      scrollTo();

      function scrollTo() {
          let scl = Math.abs(parseInt((but.targetScrollTop - but.tempScrollTop) / 50)) + Math.abs(top) / 50;
          //console.log(`scl=${scl}`)
          if ((top < 0) && (but.tempScrollTop > but.targetScrollTop)) {
              but.tempScrollTop -= scl;
          }
          else if ((top > 0) && (but.tempScrollTop < but.targetScrollTop)) {
              but.tempScrollTop += scl;
          }
          else { //  to cancelAnimationFrame
              but.tempScrollTop = top < 0 ? but.targetScrollTop - 1 : but.targetScrollTop + 1;
          }
          but.menu.scrollTop = but.tempScrollTop;
          //console.log(`animationFrameScroll  ${but.tempScrollTop},  targetScrollTop=${ but.targetScrollTop}`)
          but.animationFrameScroll = requestAnimationFrame(scrollTo);
          if (top < 0 ? but.tempScrollTop <= but.targetScrollTop : but.tempScrollTop >= but.targetScrollTop) {
              cancelAnima();
          }
      }

      function cancelAnima() {
          //console.log("exit animationFrameScroll")
          cancelAnimationFrame(but.animationFrameScroll);
          but.animationFrameScroll = null;
          but.menu.scrollTop = but.menu.scrollTop < 0 ? 0 : but.menu.scrollTop > maxScrollTop ? maxScrollTop : but.menu.scrollTop;
      }
  };



  button.prototype.defaultontouchstart = function() {

      //console.log(`str t=${this.text}`);
      if (this.tyle == "select" && event) event.preventDefault();
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

      //console.log(`mov t=${this.text}`);
      this.isEventMove = true; // 取消单击事件
      return true;
  };




  // 默认事件，
  button.prototype.defaultontouchend = function() {

      console.log(`typeof event=${typeof event}`);
      // select 要弹出菜单不能屏蔽
      //if (this.type != "select") {};
      if (event) event.preventDefault();
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
              /*
              for (let i = 4 - s.length; i > 0; i--) {
                  s = "&nbsp" + s + "&nbsp;";
              }
              s = "&nbsp;" + s + "▼";
              */
              s =  s + "&nbsp;" + "&nbsp" + "&nbsp;";
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
              timer = 0;
          }
          s = this.type == "radio" ? "" : this.type == "checkbox" ? "" : "";
          s += this.text;
          
          if (this.type == "select") {
              /*
              for (let i = 4 - s.length; i > 0; i--) {
                  s = "&nbsp" + s + "&nbsp;";
              }
              s = "&nbsp;" + s + "▼";
              */
              s =  s + "&nbsp;" + "&nbsp" + "&nbsp;";
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

      if (this.type == "file" && !cancel) {
          this.input.click();
          return false;
      }
      else if (this.type == "select" && !cancel) {
          //console.log(`click t=${this.text}`);
          let top = window.scrollY + this.menu.fontSize * 2.5 * 2;
          let y = event && event.pageY ? event.pageY - top : event && event.changedTouches[0] ? event.changedTouches[0].pageY - top : undefined;
          this.showMenu(null, y);
          //this.click event continue set select label text;
          //return false;
      }
      else {
          //event.preventDefault();
      }
      return cancel ? false : true;
  };




  button.prototype.defaultonchange = function() {

      //console.log(`chg t=${this.text}`);
      //console.log(`defaultonchange  ,i=${this.input.selectedIndex==-1 ? this.input[1].text : this.input.options[this.input.selectedIndex].text} `);
      if (this.type != "select" || this.input.selectedIndex < 0) return;
      let txt = this.input.options[this.input.selectedIndex].text;
      this.setText(txt);
      return true;
  };




  //移出节点
  button.prototype.hide = function() {
      //console.log(`hid t=${this.text}`);
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



  let timerHideMenu = null;
  button.prototype.hideMenu = function(ms, callbak) {
      let muWindow = this.menuWindow;
      let input = this.input;
      callbak = callbak || function() {};
      if (timerHideMenu) {
          clearTimeout(timerHideMenu);
          timerHideMenu = null;
      }
      ms = parseInt(ms);
      if (ms > 0) {
          timerHideMenu = setTimeout(function() {
              clearTimeout(timerHideMenu);
              timerHideMenu = null;
              muWindow.parentNode.removeChild(muWindow);
              callbak();
          }, ms);
      }
      else {
          muWindow.parentNode.removeChild(muWindow);
          callbak();
      }

  }



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
      //console.log(`sbc t=${this.text}`);
      this.backgroundColor = color;
      this.button.style.backgroundColor = color;

  };



  //  设置按钮形状
  button.prototype.setBorderRadius = function(rs) {
      //console.log(`sbr t=${this.text}`);
      this.borderRadius = rs;
      this.show();
  };



  button.prototype.setColor = function(color) {
      //console.log(`sclr t=${this.text}`);
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
      //console.log(this.checked);
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
          console.log(`but ,ontouchend = ${event}`);
          if (this.isEventMove) return; //cancel Mouseclick();
          if (!but.defaultontouchend(but)) return;
          callbak(but);
      };
      // movesUp == click();
      //this.input.onclick = this.input.ontouchend;

  };


  // 设置文本
  button.prototype.setText = function(txt, txt2) {
      //console.log(`stxt t=${this.text}`);
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
              timer = 0;
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
          /*
          for (let i = 4 - s.length; i > 0; i--) {
              s = "&nbsp" + s + "&nbsp;";
          }
          s = "&nbsp;" + s + "▼";
          */
          s =  s + "&nbsp;" + "&nbsp" + "&nbsp;";
      }
      
      this.button.innerHTML = s;
  };



  //显示，刷新
  button.prototype.show = function(left, top, width, height) {

      if (!this.div.parentNode) this.parentNode.appendChild(this.div);
      //this.div.appendChild(this.button);
      //this.div.appendChild(this.input);

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

      this.button.style.position = "absolute";
      this.button.style.padding = "0px 0px 0px 0px";
      this.button.style.zIndex = this.div.style.zIndex;
      this.button.style.width = this.width;
      this.button.style.height = this.height;
      this.button.style.top = "0px";
      this.button.style.left = "0px";
      this.button.style.borderWidth = "0px";
      this.button.style.margin = "0px";
      this.button.style.borderRadius = this.div.style.borderRadius
      this.button.style.outline = "none";
      this.button.style.textAlign = "center";
      this.button.style.lineHeight = parseInt(this.height) + "px";
      this.button.style.backgroundColor = this.backgroundColor;
      this.button.style.fontSize = this.fontSize;
      this.button.style.color = this.color;
      this.button.style.opacity = 0.9;
      if (this.type == "select") {
          this.label.style.position = "absolute";
          this.label.style.padding = "0px 0px 0px 0px";
          this.label.style.fontSize = this.fontSize;
          this.label.style.left = `${parseInt(this.width)-parseInt(this.fontSize)*1.5}px`;
          this.label.style.top = "0px";
          this.label.style.margin = "0px";
          this.label.style.textAlign = this.button.style.textAlign;
          this.label.style.height = this.button.style.height;
          this.label.style.lineHeight = this.button.style.lineHeight;
          this.label.style.opacity = 0.9;

      }

      this.input.style.position = "absolute";
      this.input.style.zIndex = this.button.style.zIndex + 1;
      this.input.style.width = this.width;
      this.input.style.height = this.height;
      this.input.style.top = "0px";
      this.input.style.left = "0px";
      this.input.style.borderRadius = this.div.style.borderRadius
      this.input.style.opacity = 0;

      this.setText(this.text, this.text2); // 正确显示按钮文本
      if (this.type == "select") this.defaultonchange();
  };



  button.prototype.showMenu = function(x, y) {
      if (this.type != "select" || !this.menuWindow || this.menuWindow.parentNode) return;
      //this.input.value = -1;
      //this.input.selectedIndex = -1;
      let muWindow = this.menuWindow;
      let s = muWindow.style;

      s.position = "fixed";
      s.zIndex = 9999;
      s.width = document.documentElement.clientWidth + "px";
      s.height = document.documentElement.clientHeight * 2 + "px";
      s.top = "0px";
      s.left = "0px";
      //s.backgroundColor = "red";
      //console.log(`x=${x}, y=${y}`)
      x = !x ? x : x < this.menu.fontSize * 2.5 ? this.menu.fontSize * 2.5 : (x + this.menu.menuWidth) > (document.documentElement.clientWidth - this.menu.fontSize * 2.5) ? document.documentElement.clientWidth - this.menu.menuWidth - this.menu.fontSize * 2.5 : x;
      y = !y ? y : y < this.menu.fontSize * 2.5 ? this.menu.fontSize * 2.5 : (y + this.menu.menuHeight) > (document.documentElement.clientHeight - this.menu.fontSize * 2.5) ? document.documentElement.clientHeight - this.menu.menuHeight - this.menu.fontSize * 2.5 : y;

      //console.log(`x=${x}, y=${y}`)
      s = this.menu.style;
      s.position = "absolute";
      s.left = `${x || this.menu.menuLeft}px`;
      s.top = `${y || this.menu.menuTop}px`;
      s.width = this.menu.menuWidth + "px";
      s.height = this.menu.menuHeight + "px";
      s.borderRadius = parseInt(this.menu.fontSize) * 1.5 + "px";
      s.border = `${parseInt(this.menu.fontSize)/3}px solid ${this.selectBackgroundColor}`;
      s.overflow = "scroll";
      s.background = this.backgroundColor;
      s.autofocus = "true";
      muWindow.setAttribute("class", "show");
      //alert(`left=${this.menu.menuLeft}, top=${this.menu.menuTop}, width=${this.menu.menuWidth}, height=${this.menu.menuHeight}`);
      isMsgShow = true;
      setTimeout(() => { document.body.appendChild(muWindow); }, 1);
  };