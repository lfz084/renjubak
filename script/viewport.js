function view() {
  this.scale = window.screen.width/1000;
  this.viewport = document.createElement("meta");
  this.viewport.setAttribute("name", "viewport");
  document.head.appendChild(this.viewport);
  this.viewport.setAttribute("content", `width=1000, initial-scale=${this.scale}, minimum-scale=${this.scale}, maximum-scale =${this.scale}, user-scalable=no` );
  alert(this.scale);
  
}

view.prototype.resize = function() {
  this.viewport.setAttribute("content", "initial-scale=" + 0.1);  
  this.viewport.setAttribute("content", `width=1000, initial-scale=${this.scale}, minimum-scale=${this.scale}, maximum-scale =${this.scale}, user-scalable=no`);
  alert(this.viewport.getAttribute("content")) ;
};

view.prototype.userScalable = function(scalable) {
  this.viewport.setAttribute("content", "initial-scale=" + 0.1);
  this.viewport.setAttribute("content", `width=1000, initial-scale=${this.scale}, minimum-scale=${this.scale}, maximum-scale =${5}, user-scalable=yes`);
  alert(this.viewport.getAttribute("content"));
};