function view(width) {
    
    let dw = document.documentElement.clientWidth;
    let dh = document.documentElement.clientHeight;
    let sw = window.screen.width;
    let sh = window.screen.height;
    let max = sw>sh ? sw : sh;
    let min = sw<sh ? sw : sh;
    let localhost = (String(window.location).indexOf("http://localhost") == 0);
    this.width = width || 1000;
    this.scale = (dw>dh ? max : min) / this.width;
    this.viewport = document.createElement("meta");
    this.viewport.setAttribute("name", "viewport");
    document.head.appendChild(this.viewport);
    this.viewport.setAttribute("content", `width=${width}, initial-scale=${this.scale}, minimum-scale=${this.scale}, maximum-scale =${localhost ? this.scale * 5 : this.scale}, user-scalable=${localhost ? "yes" : "no"}`);

}

view.prototype.resize = function(width) {
    
    let localhost = (String(window.location).indexOf("http://localhost") == 0);
    let self = this;
    width = width || self.width;
    self.viewport.setAttribute("content", `initial-scale=${self.scale+0.01} `);
    self.viewport.setAttribute("content", `width=${width}, initial-scale=${self.scale}, minimum-scale=${self.scale}, maximum-scale =${localhost ? self.scale * 5 : self.scale}, user-scalable=${localhost ? "yes" : "no"}`);
    self.scrollTop();
};

view.prototype.userScalable = function(scalable) {
    
    let self = this;
    self.viewport.setAttribute("content", `initial-scale=${self.scale+0.01} `);
    self.viewport.setAttribute("content", `width=${self.width}, initial-scale=${self.scale}, minimum-scale=${self.scale}, maximum-scale =${self.scale * 5}, user-scalable=yes`);
    self.scrollTop();
};

view.prototype.scrollTop = function(){
    let link = document.createElement("a");
    link.href = "#top";
    link.target = "_self";
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
}