 // 弹窗代码
 "use strict";
 const typeMSG = 1;
 const typeINPUT = 2;
 var isMsgShow = false; // =true 屏蔽 bodytouch 事件;

 // 创建一个屏蔽层
 var MsgBoxobj = document.createElement("div");
 MsgBoxobj.ontouchend = function() { event.preventDefault() };

 // msg 窗口
 var windowDiv = document.createElement("div");
 MsgBoxobj.appendChild(windowDiv);
 windowDiv.style.position = "relative";

 // 文本框
 var msgTextarea = document.createElement("textarea");
 windowDiv.appendChild(msgTextarea);
 msgTextarea.style.position = "relative";
 //msgTextarea.oninput = function(event){alert(event.keyCode)}

 //确认按钮
 var butEnter = new button(windowDiv, "button", 50, 50, 50, 50);
 butEnter.show();

 //取消按钮
 var butCancel = new button(windowDiv, "button", 50, 50, 50, 50);
 butCancel.show();

 function msg(text, type, left, top, width, height, enterTXT, cancelTXT, callEnter, callCancel, butNum, lineNum) {

   let p = { x: parseInt(cBoard.width) / 10, y: 0 };
   cBoard.xyObjToPage(p, cBoard.canvas);
   type = type == null ? "msgbox" : type;
   left = left == null ? p.x : left;
   top = top == null ? dh / 11 : top;
   width = width || cBoard.width * 0.8;
   //height = 
   butNum = butNum == null ? type == "input" ? 2 : 1 : butNum;

   isMsgShow = true; // 屏蔽 bodytouch 事件;
   var s = MsgBoxobj.style;
   document.body.appendChild(MsgBoxobj);
   s.position = "fixed";
   s.zIndex = 9999;
   s.width = d.documentElement.clientWidth;
   s.height = d.documentElement.clientHeight * 2;
   s.top = 0;
   s.left = 0;

   if (lineNum == "auto") {
     lineNum = parseInt(height * 0.8 / parseInt(s.width) / 0.05 / 1.25);
   }
   else if (!lineNum) {
     lineNum = parseInt(String(text).length / 20) + 1;
     lineNum = lineNum > 10 ? 10 : lineNum;
   }

   s = windowDiv.style;
   s.left = left;
   s.top = top;
   s.width = width;
   s.height = height || parseInt(s.width) / 20 * (lineNum + 3) * 1.3;
   s.backgroundColor = "#666666";


   s = msgTextarea.style;
   msgTextarea.value = text || "";
   s.left = "10px";
   s.top = "10px";
   s.width = parseInt(windowDiv.style.width) - 20;
   s.fontSize = parseInt(s.width) * 0.05 + "px";
   s.height = parseInt(s.fontSize) * 1.3 * lineNum;
   s.borderColor = "#666666";
   if (type == "msgbox") {
     msgTextarea.readOnly = true;
     s.autofocus = false;
     s.textAlign = "center";
     s.backgroundColor = "#777777";
   }
   else {
     msgTextarea.readOnly = false;
     s.autofocus = true;
     msgTextarea.focus()
     s.textAlign = "left";
     s.backgroundColor = "white";
   }

   let w = parseInt(s.fontSize) * 5;
   let h = w / 3.1;
   let t = parseInt(s.height) + parseInt(s.top) + (parseInt(windowDiv.style.height) - parseInt(s.height) - h) / 2;

   butEnter.setText(enterTXT ? enterTXT : "确定");
   butEnter.show(butNum == 1 ? w * 1.5 : w * 0.66, t, w, h);
   butEnter.setontouchend(function() {
     MsgBoxobj.parentNode.removeChild(MsgBoxobj);
     isMsgShow = false;
     if (callEnter) callEnter(msgTextarea.value);
     msgTextarea.value = "";
   });


   if (butNum == 2 || butNum == null) {

     butCancel.show(w * 2.32, t, w, h);
     butCancel.setText(cancelTXT ? cancelTXT : "取消");
     butCancel.setontouchend(function() {
       MsgBoxobj.parentNode.removeChild(MsgBoxobj);
       isMsgShow = false;
       if (callCancel) callCancel(msgTextarea.value);
     });

   }
   else if (butNum == 1) {

     butCancel.hide();

   }
   else {
     butCancel.hide();
     butEnter.hide();
   }

 }



 function closeMsg() {

   if (MsgBoxobj.parentNode == null) return;
   MsgBoxobj.parentNode.removeChild(MsgBoxobj);
   isMsgShow = false;
   msgTextarea.value = "";

 }