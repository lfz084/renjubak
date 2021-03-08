 // 弹窗代码
 "use strict";
 const typeMSG = 1;
 const typeINPUT = 2;
 let closeTimer = null;
 let isMsgShow = false; // =true 屏蔽 bodytouch 事件;

 // 创建一个屏蔽层
 let MsgBoxobj = document.createElement("div");
 //MsgBoxobj.ontouchend = function() { if (!msgTextarea.readOnly) msgTextarea.focus(); } //event.preventDefault(); };

 // msg 窗口
 let windowDiv = document.createElement("div");
 MsgBoxobj.appendChild(windowDiv);
 windowDiv.style.position = "relative";

 // 文本框
 let msgTextarea = document.createElement("textarea");
 windowDiv.appendChild(msgTextarea);
 msgTextarea.style.position = "relative";
 msgTextarea.style.fontFamily = "mHeiTi";
 /*
 msgTextarea.oninput = function(event){
   //alert(event.keyCode);
 };
 */
 //确认按钮
 let butEnter = new button(windowDiv, "button", 50, 50, 50, 50);
 butEnter.show();

 //取消按钮
 let butCancel = new button(windowDiv, "button", 50, 50, 50, 50);
 butCancel.show();

 function msg(text, type, left, top, width, height, enterTXT, cancelTXT, callEnter, callCancel, butNum, lineNum) {

     isMsgShow = true; // 屏蔽 bodytouch 事件;
     if (closeTimer) {
         clearTimeout(closeTimer);
         closeTimer = null;
     }
     MsgBoxobj.ontouchend = MsgBoxobj.click = function() {};
     setTimeout(function() {
         MsgBoxobj.ontouchend = MsgBoxobj.click = function() {
             if (!msgTextarea.readOnly) {
                 msgTextarea.focus();
                 if (event) event.preventDefault();
             }
         };
     }, 500);
     let p = { x: parseInt(cBoard.width) / 10, y: 0 };
     cBoard.xyObjToPage(p, cBoard.canvas);
     //console.log(`p.x=${p.x},p.y=${p.y}, left=${left},top=${top},width=${width}`);

     type = !!type == false ? "msgbox" : type;
     left = !!left == false ? p.x : left;
     top = !!top == false ? dh / 11 : top;
     width = !!width == false ? parseInt(cBoard.width) * 0.8 : width;
     //console.log(`left=${left},top=${top},width=${width}`);

     butNum = butNum == null ? type == "input" ? 2 : 1 : butNum;

     let s = MsgBoxobj.style;
     
     s.position = "fixed";
     s.zIndex = 9999;
     s.width = document.documentElement.clientWidth + "px";
     s.height = document.documentElement.clientHeight * 2 + "px";
     s.top = "0px";
     s.left = "0px";

     if (lineNum == "auto") {
         lineNum = parseInt(height * 0.8 / parseInt(s.width) / 0.05 / 1.25);
     }
     else if (!lineNum) {
         lineNum = parseInt(String(text).length / 20) + 1;
         lineNum = lineNum > 10 ? 10 : lineNum;
     }

     s = windowDiv.style;
     s.left = parseInt(left) + "px";
     s.top = parseInt(top) + "px";
     s.width = parseInt(width) + "px";
     s.height = !!height ? parseInt(height) + "px" : parseInt(s.width) / 20 * (lineNum + 3) * 1.3 + "px";
     s.backgroundColor = "#666666";

     if (butNum != 0) {
         s.left = (document.documentElement.clientWidth - width) / 2 + "px";
         s.top = (document.documentElement.clientHeight - parseInt(s.height)) / 2 + "px";
     }


     s = msgTextarea.style;
     s.left = "10px";
     s.top = "10px";
     s.width = parseInt(windowDiv.style.width) - 20 + "px";
     s.fontSize = parseInt(s.width) * 0.05 + "px";
     s.height = parseInt(parseInt(s.fontSize) * 1.3 * lineNum) + "px";
     s.borderColor = "#666666";
     if (type == "msgbox") {
         msgTextarea.readOnly = true;
         s.autofocus = "false";
         s.textAlign = "center";
         s.color = "#eeeeee";
         s.backgroundColor = "#666666";
     }
     else {
         msgTextarea.readOnly = false;
         /*
         if (!text) {
             setTimeout(function(){
             let evt = document.createEvent("MouseEvents");
             evt.initMouseEvent("click", false, false, window, 0, 0, 0, 300, 300, false, false, false, false, 0, null);
             msgTextarea.dispatchEvent(evt);
             },1000);
             
             setTimeout(function() { s.autofocus = "true"; }, 100);
             setTimeout(function() { msgTextarea.focus(); }, 500);
             
         }
         */
         s.textAlign = "left";
         s.color = "black";
         s.backgroundColor = "white";
     }
     msgTextarea.value = text || "";

     let w = parseInt(s.fontSize) * 5;
     let h = w / 3.1;
     let t = parseInt(s.height) + parseInt(s.top) + (parseInt(windowDiv.style.height) - parseInt(s.height) - h) / 2;

     if (butNum != 0) {
         butEnter.setText(enterTXT ? enterTXT : "确定");
         butEnter.show(butNum == 1 ? w * 1.5 : w * 0.66, t, w, h);
         butEnter.setontouchend(function() {
             MsgBoxobj.ontouchend = MsgBoxobj.click = function() {};
             MsgBoxobj.setAttribute("class", "hide");
             closeTimer = setTimeout(() => {
                 closeTimer = null;
                 MsgBoxobj.parentNode.removeChild(MsgBoxobj);
                 isMsgShow = false;

             }, 300);

             if (callEnter) callEnter(String(msgTextarea.value));
             msgTextarea.value = "";
             if (navigator.userAgent.indexOf("iPhone") + 1) viewport.resize();
         });
     }
     
     if (butNum == 2 || butNum == null) {

         butCancel.show(w * 2.32, t, w, h);
         butCancel.setText(cancelTXT ? cancelTXT : "取消");
         butCancel.setontouchend(function() {
             MsgBoxobj.ontouchend = MsgBoxobj.click = function() {};
             MsgBoxobj.setAttribute("class", "hide");
             closeTimer = setTimeout(() => {
                 closeTimer = null;
                 MsgBoxobj.parentNode.removeChild(MsgBoxobj);
                 isMsgShow = false;
             }, 300);

             if (callCancel) callCancel(String(msgTextarea.value));
             if (navigator.userAgent.indexOf("iPhone") + 1) viewport.resize();
         });

     }
     else if (butNum == 1) {

         butCancel.hide();

     }
     else {
         butCancel.hide();
         butEnter.hide();
     }
     
     MsgBoxobj.setAttribute("class", "show");
     setTimeout(()=>{document.body.appendChild(MsgBoxobj)},1);

 }



 function closeMsg(timer) {

     if (closeTimer) {
         clearTimeout(closeTimer);
         closeTimer = null;
     }
     timer = parseInt(timer) > 0 ? parseInt(timer) : 300;
     closeTimer = setTimeout(function() {
         closeTimer = null;
         MsgBoxobj.setAttribute("class", "hide");
         closeTimer = setTimeout(() => {
             closeTimer = null;
             isMsgShow = false;
             if (MsgBoxobj.parentNode == null) MsgBoxobj.parentNode.removeChild(MsgBoxobj);
             msgTextarea.value = "";
         }, AnimationTimeout);
     }, timer);

 }