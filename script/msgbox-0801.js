 self.SCRIPT_VERSION["msgbox"] = "v0812";
 // 弹窗代码
 (function() {
     "use strict";
     let isMsgShow = false; // =true 屏蔽 bodytouch 事件;
     let msgWindow = (() => {
         const TYPE_MSG = 1;
         const TYPE_INPUT = 2;
         let closeTimer = null;


         // 创建一个屏蔽层
         let MsgBoxobj = document.createElement("div");

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



         function msg(text, type = `msgbox`, left, top, width, height, enterTXT, cancelTXT, callEnter, callCancel, butNum, lineNum) {

             isMsgShow = true; // 屏蔽 bodytouch 事件;
             if (closeTimer) {
                 clearTimeout(closeTimer);
                 closeTimer = null;
             }
             /*
             MsgBoxobj.ontouchend = MsgBoxobj.click = function() {
                 setTimeout(function() {
                     if (!msgTextarea.readOnly) {
                         msgTextarea.focus();
                         if (event) event.preventDefault();
                     }
                 }, 500);
             };
             */

             left = left || (dw - cWidth * 0.8) / 2;
             top = top || dh / 11;
             width = width || cWidth * 0.8;
             butNum = butNum == null ? type == "input" ? 2 : 1 : butNum;

             let s = MsgBoxobj.style;
             s.position = "fixed";
             s.zIndex = 9999;
             s.width = document.documentElement.clientWidth + "px";
             s.height = document.documentElement.clientHeight * 2 + "px";
             s.top = "0px";
             s.left = "0px";
             MsgBoxobj.ontouchend = MsgBoxobj.onclick = butNum == 0 ? () => { closeMsg(1) } : null;

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
             s.height = !!height ? parseInt(height) + "px" : parseInt(s.width) / 20 * (lineNum + (butNum === 0 ? 0.8 : 3)) * 1.3 + "px";
             s.backgroundColor = "#666666";
             s.border = `0px solid ${butEnter.selectBackgroundColor}`;
             s.margin = "0px";
             s.padding = "0px";
             windowDiv.ontouchend = windowDiv.onclick = butNum == 0 ? () => { closeMsg(1) } : null;

             if (true || butNum != 0) {
                 s.left = (document.documentElement.clientWidth - width) / 2 + "px";
                 s.top = (document.documentElement.clientHeight - parseInt(s.height)) / 2 + "px";
             }


             s = msgTextarea.style;
             s.left = `10px`;
             s.top = `10px`;
             s.width = `${parseInt(windowDiv.style.width) - 20}px`;
             s.fontSize = parseInt(s.width) * 0.05 + "px";
             s.height = parseInt(parseInt(s.fontSize) * 1.35 * lineNum) + "px";
             s.margin = "0px";
             s.padding = "0px";
             if (type == "msgbox") {
                 msgTextarea.readOnly = true;
                 s.textAlign = "center";
                 s.border = `0px`;
                 s.color = "#f0f0f0";
                 s.backgroundColor = "#666666";
             }
             else {
                 msgTextarea.readOnly = false;
                 s.textAlign = "left";
                 s.border = `${parseInt(s.fontSize)/20}px solid black`;
                 s.left = parseInt(s.left) - parseInt(s.fontSize) / 20 + "px";
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
                 butEnter.div.style.border = `1px solid black`;
                 butEnter.setontouchend(function() {
                     closeMsg(1);
                     if (callEnter) callEnter(String(msgTextarea.value));
                 });
             }

             if (butNum == 2 || butNum == null) {

                 butCancel.show(w * 2.32, t, w, h);
                 butCancel.div.style.border = `1px solid black`;
                 butCancel.setText(cancelTXT ? cancelTXT : "取消");
                 butCancel.setontouchend(function() {
                     closeMsg(1);
                     if (callCancel) callCancel(String(msgTextarea.value));
                 });

             }
             else if (butNum == 1) {

                 butCancel.hide();

             }
             else {
                 butCancel.hide();
                 butEnter.hide();
             }

             MsgBoxobj.setAttribute("class", butNum ? "show" : "showlabel");
             setTimeout(() => { document.body.appendChild(MsgBoxobj) }, 1);

         }

         function closeMsg(timer) {

             if (closeTimer) {
                 clearTimeout(closeTimer);
                 closeTimer = null;
             }
             timer = parseInt(timer) > 0 ? parseInt(timer) : 300;
             closeTimer = setTimeout(function() {
                 closeTimer = null;
                 const CLASS_NAME = MsgBoxobj.getAttribute("class");
                 const NEW_CLASS_NAME = CLASS_NAME == "show" ? "hide" : "hidelabel";
                 if (CLASS_NAME) MsgBoxobj.setAttribute("class", NEW_CLASS_NAME);
                 closeTimer = setTimeout(() => {
                     closeTimer = null;
                     isMsgShow = false;
                     if (MsgBoxobj.parentNode) MsgBoxobj.parentNode.removeChild(MsgBoxobj);
                     msgTextarea.value = "";
                     MsgBoxobj.setAttribute("class", "");
                     MsgBoxobj.ontouchend = MsgBoxobj.click = function() {};
                 }, ANIMATION_TIMEOUT);
             }, timer);
         }


         return {
             "msg": msg,
             "closeMsg": closeMsg,
         }
     })();

     window.msg = function msg(text, type = `msgbox`, left, top, width, height, enterTXT, cancelTXT, callEnter, callCancel, butNum, lineNum) {
         msgWindow.msg(text, type, left, top, width, height, enterTXT, cancelTXT, callEnter, callCancel, butNum, lineNum);
     }

     window.msgbox =function msgbox(title, enterTXT, enterFunction, cancelTXT, cancelFunction, butNum, timer) {
         msgWindow.msg(title, "msgbox", undefined, undefined, undefined, undefined, enterTXT, cancelTXT, enterFunction, cancelFunction, butNum == undefined ? cancelTXT ? 2 : 1 : butNum, butNum == 0 ? 1 : undefined);
         if (butNum == 0) msgWindow.closeMsg(timer || 2000);
     }

     window.closeMsg = function closeMsg(timer) {
         msgWindow.closeMsg(timer);
     }

     window.showLabel = (() => {
         let isShowLabel = true;
         return (txt, timer) => {
             if (!isShowLabel) return;
             isShowLabel = false;
             msgbox(txt, undefined, undefined, undefined, undefined, 0, timer);
             setTimeout(() => { isShowLabel = true; }, 1500);
         };
     })();
 })()