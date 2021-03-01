function view(width) {
    let localhost = (String(window.location).indexOf("http://localhost") == 0);
    this.width = width || 1000;
    this.scale = window.screen.width / this.width;
    this.viewport = document.createElement("meta");
    this.viewport.setAttribute("name", "viewport");
    document.head.appendChild(this.viewport);
    this.viewport.setAttribute("content", `width=${width}, initial-scale=${this.scale}, minimum-scale=${this.scale}, maximum-scale =${localhost ? this.scale * 5 : this.scale}, user-scalable=${localhost ? "yes" : "no"}`);
    //alert(this.scale);

}

view.prototype.resize = function(width) {
    /*
    if (this.viewport) document.head.removeChild(this.viewport);
    this.viewport = document.createElement("meta");
    this.viewport.setAttribute("name", "viewport");
    document.head.appendChild(this.viewport);
    */
    let localhost = (String(window.location).indexOf("http://localhost") == 0);
    let self = this;
    width = width || self.width;
    self.viewport.setAttribute("content", `initial-scale=${self.scale+0.01} `);
    //setTimeout(function() {
    self.viewport.setAttribute("content", `width=${width}, initial-scale=${self.scale}, minimum-scale=${self.scale}, maximum-scale =${localhost ? self.scale * 5 : self.scale}, user-scalable=${localhost ? "yes" : "no"}`);
    //alert(self.viewport.getAttribute("content"));
    //}, 10);
};

view.prototype.userScalable = function(scalable) {
    /*
    if (this.viewport) document.head.removeChild(this.viewport);
    this.viewport = document.createElement("meta");
    this.viewport.setAttribute("name", "viewport");
    document.head.appendChild(this.viewport);
    */
    let self = this;
    self.viewport.setAttribute("content", `initial-scale=${self.scale+0.01} `);
    //setTimeout(function() {
    self.viewport.setAttribute("content", `width=${self.width}, initial-scale=${self.scale}, minimum-scale=${self.scale}, maximum-scale =${self.scale * 5}, user-scalable=yes`);
    //alert(self.viewport.getAttribute("content"));
    //}, 10);
};