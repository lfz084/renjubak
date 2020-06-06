function view() {
  this.viewport = document.createElement("meta");
  this.viewport.setAttribute("name", "viewport");
  this.viewport.setAttribute("content", "width=device-width, initial-scale=1.0, user-scalable=no");
  document.head.appendChild(this.viewport);
  let dw=document.documentElement.clientWidth;//device-width
  this. scale = dw/1000;
  this.viewport.setAttribute("content", "width=1000, initial-scale=" +this.scale+", user-scalable=no");
  alert(this.scale);
  
}

view.prototype.resize = function() {
  this.viewport.setAttribute("content", "initial-scale=" + 0.1);
  this.viewport.setAttribute("content", "width=1000, initial-scale=" +this.scale+",  user-scalable=no");
  alert(this.viewport.getAttribute("content")) ;
};

view.prototype.userScalable = function(scalable) {
  this.viewport.setAttribute("content", "initial-scale=" + 0.1);
  this.viewport.setAttribute("content", "width=1000, initial-scale=" +this.scale+",  user-scalable=yes");
  alert(this.viewport.getAttribute("content"));
};