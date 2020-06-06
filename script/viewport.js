function view() {
  this.scale = window.screen.width / 1000;
  this.viewport = document.createElement("meta");
  this.viewport.setAttribute("name", "viewport");
  document.head.appendChild(this.viewport);
  this.viewport.setAttribute("content", `width=1000, initial-scale=${this.scale}, minimum-scale=${this.scale}, maximum-scale =${this.scale}, user-scalable=no`);
  //alert(this.scale);

}

view.prototype.resize = function() {
  /*
  if (this.viewport) document.head.removeChild(this.viewport);
  this.viewport = document.createElement("meta");
  this.viewport.setAttribute("name", "viewport");
  document.head.appendChild(this.viewport);
  */
  let self = this;
  self.viewport.setAttribute("content", "initial-scale=0.1");
  setTimeout(function() {
    self.viewport.setAttribute("content", `width=1000, initial-scale=${self.scale}, minimum-scale=${self.scale}, maximum-scale =${self.scale}, user-scalable=no`);
    //alert(self.viewport.getAttribute("content"));
  }, 200);
};

view.prototype.userScalable = function(scalable) {
  /*
  if (this.viewport) document.head.removeChild(this.viewport);
  this.viewport = document.createElement("meta");
  this.viewport.setAttribute("name", "viewport");
  document.head.appendChild(this.viewport);
  */
  let self = this;
  self.viewport.setAttribute("content", "initial-scale=0.1");
  setTimeout(function() {
    self.viewport.setAttribute("content", `width=1000, initial-scale=${self.scale}, minimum-scale=${self.scale}, maximum-scale =${2}, user-scalable=yes`);
    //alert(self.viewport.getAttribute("content"));
  }, 200);
};