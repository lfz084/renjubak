"use strict";

var tempp = new point(0, 0, null);

const tEmpty = 0;
const tLb = 1; // 用于point.type,表示当前点上面存在一个标签
const tNum = 2; // 用于point.type,表示当前点上面存在一个数字
const tBlack = 3; // 无序号 添加的黑棋
const tWhite = 4; // 无序号 添加的黑棋


//定义棋盘上的一个点
function point(x, y, d) {

    this.x = x; // 棋盘一个点的坐标，相对于BODY
    this.y = y;
    this.d = d; // 对div标签的引用，null为空;
    this.type = 0; // 这个点是否有棋子，=tEmpty为空，棋子=tNum,bi标记=tLb
    this.text = "";
    this.color = null;

}


//清空这个点上面的棋子，数字，标记              
point.prototype.cle = function() {
    if (this.d != null) {
        this.d.innerHTML = "";
        this.d.style.background = "";
        this.d.style.borderStyle = "none";
        this.d.style.zIndex = -100;
    }
    // this.d = null;
    this.type = 0;
    this.text = "";
    this.color = null;
    //alert("p.cle")
};


point.prototype.printBorder = function(gW, gH) {
    var size;
    var temp;
    if (this.x == null || this.y == null) { return };
    temp = (gW < gH) ? gW : gH;
    size = parseInt(temp / 4 * 3.6);
    this.d.style.position = "absolute";
    this.d.style.width = size + "px";
    this.d.style.height = size + "px";
    this.d.style.left = this.x - parseInt(size / 2) + "px";
    this.d.style.top = this.y - parseInt(size / 2) + "px";
    this.d.style.borderStyle = "dashed";
    this.d.style.borderWidth = "1px";
    this.d.style.borderColor = "red";
    this.d.style.zIndex = 0;

};


//在这个点上记一个标记
point.prototype.printLb = function(s, color, gW, gH) {
    //alert("printLb")
    var size;
    var temp;
    this.type = tLb;
    this.text = s;
    this.color = color;

    this.d.innerHTML = this.text;
    temp = (gW < gH) ? gW : gH;
    size = parseInt(temp / 4 * 3);
    this.d.style.fontSize = size + "px";
    this.d.style.color = color;
    this.d.style.position = "absolute";
    this.d.style.background = "";
    this.d.style.width = size + "px";
    this.d.style.height = size + "px";
    this.d.style.lineHeight = size + "px";
    this.d.style.left = this.x - parseInt(size / 2) + "px";
    this.d.style.top = this.y - parseInt(size / 2) + "px";
    this.d.style.zIndex = 0;

};


// 在这个点上放一个棋子or数字;
point.prototype.printNb = function(n, color, gW, gH, numColor) {
    var size;
    var temp;

    this.color = numColor;
    this.type = tNum;
    this.text = String(n);
    this.d.innerHTML = this.text;
    temp = (gW < gH) ? gW : gH;
    size = (color == "black" || color == "white") ? parseInt(temp / 4 * 1.5) : parseInt(temp / 4 * 3);
    this.d.style.fontSize = size + "px";
    size = parseInt(temp / 4 * 2);
    this.d.style.color = color == "white" ? "black" : "pink";
    this.d.style.position = "absolute";
    this.d.style.background = (color == "white") ? "white" : (color == "black") ? "black" : "";
    this.d.style.width = size + "px";
    this.d.style.height = size + "px";
    this.d.style.lineHeight = size + "px";
    this.d.style.left = this.x - parseInt(size / 2) + "px";
    this.d.style.top = this.y - parseInt(size / 2) + "px";
    this.d.style.borderStyle = "";
    this.d.style.zIndex = 0;
    if (color == "black" || color == "white")
    {
        this.d.style.borderStyle = "solid";
        this.d.style.borderWidth = "1px";
        this.d.style.borderColor = color;
        if (color == "white") this.d.style.borderColor = "black";
    }
};


//改变一个棋子or数字颜色
point.prototype.setcolor = function(color) {
    this.printNb(parseInt(this.text), color);
};


//设置一个div标签
point.prototype.setd = function(d) { this.d = d; };


point.prototype.setxy = function(x, y) {
    this.x = x;
    this.y = y;
};







//定义一个棋盘
function checkerBoard(parentNode, left, top, width, height) {

    this.parentNode = parentNode;
    this.left = parseInt(left);
    this.top = parseInt(top);
    this.width = parseInt(width);
    this.height = parseInt(height);

    this.isShowNum = true; // 是否显示手顺

    this.P = new Array(225); //用来保存225个点
    this.DIV = new Array(225); //原来保存225 DIV 标签的引用
    this.MS = []; //保存落子顺序,index
    this.MS.length = 0;
    this.MSindex = -1; //  指针，指向当前棋盘最后一手在MS索引   
    this.Moves = ""; // 保存棋谱代码;
    this.resetNum = 0; //重置显示的手数，控制从第几手开始显示序号
    this.notShowLastNum = false; // = true ,取消最后一手高亮显示
    this.alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    this.printMovesTimer = 0;

    this.XL = 0; //棋盘落子范围，左右上下的4条边
    this.XR = 0;
    this.YT = 0;
    this.YB = 0;
    this.gW = 0; //棋盘格子宽度,浮点数
    this.gH = 0; //棋盘格子高度,浮点数
    this.SLTX = 15;
    this.SLTY = 15; //默认是15×15棋盘;
    this.searchIdx = []; // 记录正在计算的点
    for (let i = 0; i < 30; i++) { this.searchIdx[i] = -1; };
    this.backgroundColor = "#f0f0f0"; //888888
    this.wNumColor = "white"; //do not change (printPDF && getSVG)
    this.bNumColor = "#000000"; //333333
    this.wNumFontColor = "#000000"; //333333
    this.bNumFontColor = "#ffffff"; //333333
    this.LbBackgroundColor = "#f0f0f0"; //888888
    this.coordinateColor = "#000000"; //111111
    this.lineColor = "#000000"; //111111
    this.lastNumColor = "#ff0000"; //dd0000
    this.moveWhiteColor = "#bbbbbb"; //bbbbbb
    this.moveBlackColor = "#bbbbbb"; //666666
    this.moveWhiteFontColor = "#ffffff"; //ffffff
    this.moveBlackFontColor = "#000000"; //000000
    this.moveLastFontColor = "red"; //ff0000
    this.firstColor = "black";

    this.node = function(value) {
        this.parentNode;
        this.idx = value == undefined ? -1 : value;
        this.childNode = [];
    };
    this.oldFirstColor = tBlack;
    this.oldResetNum = 0;
    this.oldCode = "";
    this.tree = new this.node();
    this.timerUnpackTree = null;

    //页面显示的棋盘
    this.canvas = d.createElement("canvas");
    this.canvas.style.position = "absolute";
    if (width == null || height == null) {
        this.canvas.style.width = dw < dh ? dw + "px" : dh + "px";
        this.canvas.style.height = this.canvas.style.width;
    }
    else {
        this.canvas.style.width = parseInt(width) + "px";
        this.canvas.style.height = parseInt(height) + "px";
    }
    this.canvas.style.left = parseInt(left) + "px";
    this.canvas.style.top = parseInt(top) + "px";
    this.parentNode.appendChild(this.canvas);

    //后台保存的空棋盘
    this.bakCanvas = d.createElement("canvas");
    this.bakCanvas.style.position = "absolute";
    this.bakCanvas.style.width = this.canvas.style.width;
    this.bakCanvas.style.height = this.canvas.style.height;
    this.bakCanvas.style.left = this.canvas.offsetLeft + "px";
    this.bakCanvas.style.top = this.canvas.offsetTop + "px";
    //this.parentNode.appendChild(this.bakCanvas);
    //后台裁剪图片的canvas
    this.cutCanvas = d.createElement("canvas");

    //后台处理图片的img     
    this.bakImg = d.createElement("img");
    this.bakImg.style.position = "absolute";
    this.cutImg = d.createElement("img");
    this.cutImg.style.position = "absolute";


    this.cutDiv = document.createElement("div");
    this.parentNode.appendChild(this.cutDiv);
    this.cutDiv.ontouchend = function() { event.preventDefault(); };
    this.cutDiv.ontouchmove = function() { if (timerContinueSetCutDiv) event.preventDefault(); };

    for (var i = 0; i < 225; i++) {
        this.DIV[i] = document.createElement("div");
        this.DIV[i].style.borderRadius = "50%";
        this.parentNode.appendChild(this.DIV[i]);
        this.DIV[i].ontouchend = function() { event.preventDefault(); };
        this.DIV[i].ontouchmove = function() { if (timerContinueSetCutDiv) event.preventDefault(); };
        this.P[i] = new point(0, 0, this.DIV[i]);
    }

    //this.resetCutDiv();
}



checkerBoard.prototype.addTree = function(tree) {
    let code = this.getCode();
    let arr = this.getPointArray([]);

    this.oldFirstColor = this.firstColor; // 在this.cle 前面
    this.cle();
    this.firstColor = tree ? tree.firstColor : null || "white";
    for (let y = 0; y < this.SLTY; y++) {
        for (let x = 0; x < this.SLTX; x++) {
            let idx = y * this.SLTX + x;
            switch (arr[y][x]) {
                case 1:
                    this.wNb(idx, "black", null, tBlack);
                    break;
                case 2:
                    this.wNb(idx, "white", null, tWhite);
                    break;
            }
        }
    }
    this.oldResetNum = this.resetNum;
    this.resetNum = 0;
    this.oldCode = code; //要放在循环之后，不要改变顺序
    ////console.log(tree);
    this.tree = tree || new this.node();
    /*
      this.tree.childNode.push({ idx: 1, node: new node() });
      let nd = this.tree.childNode[0].node;
      nd.parentNode = this.tree;
      nd.childNode = [{ idx: 2, node: new node() }, { idx: 3, node: new node() }, { idx: 4, node: new node() }];
      nd.childNode[0].node.childNode = [{ idx: 5, node: new node() }];
      nd.childNode[1].node.childNode = [{ idx: 6, node: new node() }];
      nd.childNode[2].node.childNode = [{ idx: 7, node: new node() }];
    */
    //console.log(this.tree);
    //console.log("addTree")
    this.unpackTree();

};



// 将传入的二维数组顺时针90°
checkerBoard.prototype.CW = function(arrobj, count) {

    let x;
    let y;
    let nx;
    let ny;
    //复制二维数组
    let arrs = [];
    for (y = 0; y < this.SLTY; y++) {

        arrs[y] = [];
        for (x = 0; x < this.SLTX; x++) {
            arrs[y][x] = arrobj[y][x];
        }

    }
    //旋转
    for (y = 0; y < this.SLTY; y++) {

        for (x = 0; x < this.SLTX; x++) {
            nx = this.SLTX - 1 - x;
            arrobj[y][x] = arrs[nx][y];
        }

    }

};



// 将传入的二维数组逆时针90°
checkerBoard.prototype.CCW = function(arrobj, count) {

    let x;
    let y;
    let nx;
    let ny;
    //复制二维数组
    let arrs = [];
    for (y = 0; y < this.SLTY; y++) {

        arrs[y] = [];
        for (x = 0; x < this.SLTX; x++) {
            arrs[y][x] = arrobj[y][x];
        }

    }
    //旋转
    for (y = 0; y < this.SLTY; y++) {

        for (x = 0; x < this.SLTX; x++) {
            ny = this.SLTY - 1 - y;
            arrobj[y][x] = arrs[x][ny];
        }

    }

};



// 顺时针 翻转棋盘90°
checkerBoard.prototype.boardCW = function(isShowNum) {

    if (this.oldCode) this.unpackCode(isShowNum, this.oldCode, this.oldResetNum, this.oldFirstColor);
    let tMS = [];
    let tMS1 = [];
    let wMS = [];
    let bMS = [];
    let tMSindex = this.MSindex;
    let idx;
    let x;
    let y;
    let nx;
    let ny;

    for (let idx = 0; idx < this.SLTX * this.SLTY; idx++) {

        if (this.P[idx].type == tWhite) {
            wMS.push(idx);
        }
        else if (this.P[idx].type == tBlack) {
            bMS.push(idx);
        }
    }

    for (let j = 0; j < 3; j++) {
        tMS = [];
        tMS1 = j == 0 ? wMS : j == 1 ? bMS : this.MS;
        for (let i = 0; i < tMS1.length; i++) {

            idx = tMS1[i];

            y = parseInt(idx / this.SLTX);
            nx = this.SLTY - 1 - y; // 新的 x坐标是原来 y坐标的翻转;
            ny = idx % this.SLTX; // 旋转后新的 y坐标是原来的 x坐标

            idx = ny * this.SLTX + nx;
            tMS[i] = idx;

        }
        if (j == 0) {
            wMS = tMS.slice();
        }
        else if (j == 1) {
            bMS = tMS.slice();
        }
    }
    let resetNum = this.resetNum;
    let firstColor = this.firstColor;
    this.cle(); // 清空棋盘
    this.resetNum = resetNum;
    this.firstColor = firstColor;
    this.MS = tMS;

    //  打印棋盘
    for (let i = 0; i <= tMSindex; i++) {
        this.toNext(isShowNum);
    }
    for (let i = 0; i < wMS.length; i++) {
        this.wNb(wMS[i], this.wNumColor);
    }
    for (let i = 0; i < bMS.length; i++) {
        this.wNb(bMS[i], this.bNumColor);
    }


};



// 逆时针 翻转棋盘90°
checkerBoard.prototype.boardCCW = function(isShowNum) {

    if (this.oldCode) this.unpackCode(isShowNum, this.oldCode, this.oldResetNum, this.oldFirstColor);
    let tMS = [];
    let tMS1 = [];
    let wMS = [];
    let bMS = [];
    let tMSindex = this.MSindex;
    let idx;
    let x;
    let y;
    let nx;
    let ny;

    for (let idx = 0; idx < this.SLTX * this.SLTY; idx++) {

        if (this.P[idx].type == tWhite) {
            wMS.push(idx);
        }
        else if (this.P[idx].type == tBlack) {
            bMS.push(idx);
        }
    }

    for (let j = 0; j < 3; j++) {
        tMS = [];
        tMS1 = j == 0 ? wMS : j == 1 ? bMS : this.MS;
        for (let i = 0; i < tMS1.length; i++) {

            idx = tMS1[i]; // 取得旧的index
            // 新的 x坐标是原来 y坐标;   
            nx = parseInt(idx / this.SLTX);
            // 旋转后新的 y坐标是原来的 x坐标翻转
            x = idx % this.SLTX;
            ny = this.SLTX - 1 - x;
            // 求得新的index，暂时保存
            idx = ny * this.SLTX + nx;
            tMS[i] = idx;

        }
        if (j == 0) {
            wMS = tMS.slice();
        }
        else if (j == 1) {
            bMS = tMS.slice();
        }
    }

    let resetNum = this.resetNum;
    let firstColor = this.firstColor;
    this.cle(); // 清空棋盘
    this.resetNum = resetNum;
    this.firstColor = firstColor;
    this.MS = tMS;

    //  打印棋盘
    for (let i = 0; i <= tMSindex; i++) {
        this.toNext(isShowNum);
    }
    for (let i = 0; i < wMS.length; i++) {
        this.wNb(wMS[i], this.wNumColor);
    }
    for (let i = 0; i < bMS.length; i++) {
        this.wNb(bMS[i], this.bNumColor);
    }


};



// 上下 翻转棋盘
checkerBoard.prototype.boardFlipX = function(isShowNum) {

    if (this.oldCode) this.unpackCode(isShowNum, this.oldCode, this.oldResetNum, this.oldFirstColor);
    let tMS = [];
    let tMS1 = [];
    let wMS = [];
    let bMS = [];
    let tMSindex = this.MSindex;
    let idx;
    let x;
    let y;
    let nx;
    let ny;

    for (let idx = 0; idx < this.SLTX * this.SLTY; idx++) {

        if (this.P[idx].type == tWhite) {
            wMS.push(idx);
        }
        else if (this.P[idx].type == tBlack) {
            bMS.push(idx);
        }
    }

    for (let j = 0; j < 3; j++) {
        tMS = [];
        tMS1 = j == 0 ? wMS : j == 1 ? bMS : this.MS;
        for (let i = 0; i < tMS1.length; i++) {

            idx = tMS1[i]; // 取得旧的index

            nx = idx % this.SLTX; // 新的 x坐标是原来 x坐标不变;
            y = parseInt(idx / this.SLTX);
            ny = this.SLTY - 1 - y; // 旋转后新的 y坐标是原来的 y坐标翻转;

            idx = ny * this.SLTX + nx;
            tMS[i] = idx;

        }
        if (j == 0) {
            wMS = tMS.slice();
        }
        else if (j == 1) {
            bMS = tMS.slice();
        }
    }

    let resetNum = this.resetNum;
    let firstColor = this.firstColor;
    this.cle(); // 清空棋盘
    this.resetNum = resetNum;
    this.firstColor = firstColor;
    this.MS = tMS;

    //  打印棋盘
    for (let i = 0; i <= tMSindex; i++) {
        this.toNext(isShowNum);
    }
    for (let i = 0; i < wMS.length; i++) {
        this.wNb(wMS[i], this.wNumColor);
    }
    for (let i = 0; i < bMS.length; i++) {
        this.wNb(bMS[i], this.bNumColor);
    }

};



// 左右 翻转棋盘90°
checkerBoard.prototype.boardFlipY = function(isShowNum) {

    if (this.oldCode) this.unpackCode(isShowNum, this.oldCode, this.oldResetNum, this.oldFirstColor);
    let tMS = [];
    let tMS1 = [];
    let wMS = [];
    let bMS = [];
    let tMSindex = this.MSindex;
    let idx;
    let x;
    let y;
    let nx;
    let ny;

    for (let idx = 0; idx < this.SLTX * this.SLTY; idx++) {

        if (this.P[idx].type == tWhite) {
            wMS.push(idx);
        }
        else if (this.P[idx].type == tBlack) {
            bMS.push(idx);
        }
    }

    for (let j = 0; j < 3; j++) {
        tMS = [];
        tMS1 = j == 0 ? wMS : j == 1 ? bMS : this.MS;
        for (let i = 0; i < tMS1.length; i++) {

            idx = tMS1[i]; // 取得旧的index              

            x = idx % this.SLTX;
            nx = this.SLTX - 1 - x; // 新的 x坐标是原来 x坐标的翻转;
            ny = parseInt(idx / this.SLTX); // 新的 y坐标是原来的 y坐标不变;

            idx = ny * this.SLTX + nx;
            tMS[i] = idx;

        }
        if (j == 0) {
            wMS = tMS.slice();
        }
        else if (j == 1) {
            bMS = tMS.slice();
        }
    }

    let resetNum = this.resetNum;
    let firstColor = this.firstColor;
    this.cle(); // 清空棋盘
    this.resetNum = resetNum;
    this.firstColor = firstColor;
    this.MS = tMS;

    //  打印棋盘
    for (let i = 0; i <= tMSindex; i++) {
        this.toNext(isShowNum);
    }
    for (let i = 0; i < wMS.length; i++) {
        this.wNb(wMS[i], this.wNumColor);
    }
    for (let i = 0; i < bMS.length; i++) {
        this.wNb(bMS[i], this.bNumColor);
    }


};



// 清空棋盘上每一个点的显示，和记录
checkerBoard.prototype.cle = function() {

    this.MSindex = -1;
    this.MS.length = 0;
    for (let i = 0; i < 225; i++) {
        this.clePoint(i);
    }
    this.firstColor = "black";
    this.oldCode = "";
    this.tree = new this.node();

};



// 取消虚线显示棋子位置
checkerBoard.prototype.cleAllPointBorder = function() {

    for (let i = 0; i < 225; i++) {
        this.DIV[i].style.borderStyle = "none";
    }

};



// 删除一个标记
checkerBoard.prototype.cleLb = function(idx) {

    if (typeof(idx) == "string" && idx == "all") {
        for (let i = 0; i < this.SLTX * this.SLTY; i++) {
            if (this.P[i].type == tLb) this.clePoint(i);
        }
    }
    else {
        if (this.P[idx].type == tLb) {
            this.clePoint(idx);
        }
    }
};



// 删除一颗棋子,不删除MS的记录
checkerBoard.prototype.cleNb = function(idx, showNum) {

    if (this.P[idx].type == tNum) {
        let i = this.MSindex;
        if (i < 0) return;
        this.clePoint(this.MS[i]);
        this.MSindex--;
        this.showLastNum(showNum);
        //console.log("cleNb")
        this.unpackTree();
    }
    else if (this.P[idx].type == tBlack || this.P[idx].type == tWhite) {
        if (this.oldCode) return;
        this.clePoint(idx);
    }
};



// 清空棋盘对象记录的棋谱
checkerBoard.prototype.cleMoves = function() {

    this.Moves = "";
};



//棋盘上清空一个棋子,标记的显示
checkerBoard.prototype.clePoint = function(idx) {

    this.P[idx].cle(); // 清除点的数据
    // 棋盘上打印空点
    let p = tempp;
    p.setxy(this.P[idx].x, this.P[idx].y);
    let ctx = this.canvas.getContext("2d");
    ctx.drawImage(this.bakCanvas, p.x - (this.gW / 2), p.y - (this.gH / 2), this.gW, this.gH, p.x - (this.gW / 2), p.y - (this.gH / 2), this.gW, this.gH);
    ctx = null;
    if (appData.renjuSave) appData.renjuSave(this);
};



//把后台空棋盘的一个点的图像剪下来备用;
checkerBoard.prototype.cutBkPoint = function(idx) {

    let p = tempp;
    p.setxy(this.P[idx].x, this.P[idx].y);
    let c = this.cutCanvas;
    c.width = this.gW;
    c.height = this.gH;
    let ctx = c.getContext("2d");

    ctx.drawImage(this.bakCanvas, p.x - (this.gW / 2), p.y - (this.gH / 2), this.gW, this.gH, 0, 0, this.gW, this.gH);
    ctx = null;
    return true;

};



// 二维数组上下反转
checkerBoard.prototype.flipX = function(arrobj) {

    let x;
    let y;
    let nx;
    let ny;

    let arrs = [];
    for (y = 0; y < this.SLTY; y++) {

        arrs[y] = [];
        for (x = 0; x < this.SLTX; x++) {
            arrs[y][x] = arrobj[y][x];
        }

    }

    for (y = 0; y < this.SLTY; y++) {

        for (x = 0; x < this.SLTX; x++) {
            ny = this.SLTY - 1 - y;
            arrobj[y][x] = arrs[ny][x];
        }

    }

};



// 二维数组左右翻转
checkerBoard.prototype.flipY = function(arrobj) {

    let x;
    let y;
    let nx;
    let ny;
    // 复制二维数组
    let arrs = [];
    for (y = 0; y < this.SLTY; y++) {

        arrs[y] = [];
        for (x = 0; x < this.SLTX; x++) {
            arrs[y][x] = arrobj[y][x];
        }

    }
    // 翻转
    for (y = 0; y < this.SLTY; y++) {

        for (x = 0; x < this.SLTX; x++) {
            nx = this.SLTX - 1 - x;
            arrobj[y][x] = arrs[y][nx];
        }

    }
};



//判断用户点击了棋盘上面的哪一个点，在返回这个点的index
checkerBoard.prototype.getPIndex = function(x, y) {

    let i;
    let j;

    if (this.isOut(x, y, this.canvas)) return -1;

    let p = tempp;
    p.setxy(x, y); // page 坐标 转 canvas 坐标
    this.xyPageToObj(p, this.canvas);
    x = p.x + parseInt(this.gW / 2);
    y = p.y + parseInt(this.gH / 2);
    i = parseInt((x - this.XL) / this.gW);
    if (i == this.SLTX) i--;
    j = parseInt((y - this.YT) / this.gH);
    if (j == this.SLTY) j--;
    return parseInt(this.SLTX * j + i);

};



checkerBoard.prototype.getCode = function() {
    let code = this.getMoves();
    code += "\n{" + this.getMoves(tBlack) + "}";
    code += "{" + this.getMoves(tWhite) + "}";
    return code;
};



// 当前棋盘显示的棋子， 转成棋谱 返回
checkerBoard.prototype.getMoves = function(type) {

    var ml = "";
    if (type == tWhite || type == tBlack) {
        for (let idx = 0; idx < this.SLTX * this.SLTY; idx++) {
            if (this.P[idx].type == type) {
                ml += this.indexToName(idx);
            }
        }
    }
    else {
        for (let i = 0; i <= this.MSindex; i++) {
            ml = ml + this.indexToName(this.MS[i]);
        }
    }

    return ml.toUpperCase();
};



// 传一个一维 空数组进来转成二维数组，把当前棋盘MS记录写入数组
checkerBoard.prototype.getPointArray = function(arrobj) {

    arrobj.length = this.SLTY;
    for (let i = 0; i < arrobj.length; i++) {
        arrobj[i] = [];
    }

    let x;
    let y;
    for (let idx = 0; idx < this.SLTX * this.SLTY; idx++) {
        x = idx % this.SLTX;
        y = parseInt(idx / this.SLTX);

        if (this.P[idx].type == tNum) {
            arrobj[y][x] = this.P[idx].color == this.bNumColor ? 1 : 2;
        }
        else if (this.P[idx].type == tWhite) {
            arrobj[y][x] = 2;
        }
        else if (this.P[idx].type == tBlack) {
            arrobj[y][x] = 1;
        }
        else {
            arrobj[y][x] = 0;
        }
    }
    return arrobj;
};



// 自动识别图片中的棋子
checkerBoard.prototype.autoPut = function() {

    let arr = getArr([], 0, this.SLTX, this.SLTY);
    let max = 0;
    let min = 255;
    let test = false;
    let cNum;
    let rgb;
    let idx;
    let wBoard = true; // 默认白色棋盘
    let ctx = cBoard.canvas.getContext("2d");
    let imgData = ctx.getImageData(0, 0, parseInt(this.width), parseInt(this.height)).data;

    for (let i = this.SLTY - 1; i >= 0; i--) {
        for (let j = this.SLTX - 1; j >= 0; j--) {
            idx = i * this.SLTX + j;
            rgb = getPointColor(idx, this);
            //alert(rgb.r+"\n"+rgb.g+"\n"+rgb.b);
            cNum = (rgb.r + rgb.g + rgb.b) / 3;
            // 黑，白以外-1000，表示空子。
            //console.log(`cNum=${cNum}, ${j} - ${i} `);
            //console.log(`r=${rgb.r},g=${rgb.g}, b=${rgb.b}`);
            if (Math.abs(rgb.r - rgb.g) < 60 && Math.abs(rgb.r - rgb.b) < 60 && Math.abs(rgb.g - rgb.b) < 60) {
                arr[i][j] = cNum;
                max = cNum > max ? cNum : max; // 设置最白，最黑
                min = cNum < min ? cNum : min;
            }
            else {
                arr[i][j] = -1000;
                wBoard = false;
            }
        }
    }

    //alert("end");
    //console.log("max="+max);
    //console.log("min="+min);
    //console.log("wBoard="+wBoard);


    imgData = null;
    ctx = null;
    // 棋盘上只有一种颜色时重新设置 max，min
    if (Math.abs(max - min) < 30) {
        if ((max + min) / 2 < 128) {
            max = 255;
        }
        else {
            min = 0;
        }
    }
    for (let i = this.SLTY - 1; i >= 0; i--) {
        for (let j = this.SLTX - 1; j >= 0; j--) {
            idx = i * this.SLTX + j;
            if (Math.abs(arr[i][j] - max) < (wBoard || max > 250 ? 20 : 50)) {
                //arr[i][j] = 2;
                this.P[idx].printNb("★", "white", this.gW, this.gH, this.wNumColor);
            }
            else if (Math.abs(arr[i][j] - min) < (wBoard || min < 5 ? 30 : 60)) {
                //arr[i][j] = 1;
                this.P[idx].printNb("★", "black", this.gW, this.gH, this.bNumColor);
            }
            else if (test) {
                this.P[idx].printNb("▲", "black", this.gW, this.gH, this.bNumColor);
            }
        }
    }



    //取得一个点的平均颜色
    function getPointColor(idx, cBoard) {

        //alert("getPointc");
        let width = parseInt(cBoard.width);
        let w = parseInt(cBoard.gW / 2);
        let h = parseInt(cBoard.gH / 2);
        let l = parseInt(cBoard.P[idx].x + (cBoard.gW - w) / 2 - cBoard.gW / 2);
        let t = parseInt(cBoard.P[idx].y + (cBoard.gH - h) / 2 - cBoard.gH / 2);
        let r = 0;
        let g = 0;
        let b = 0;
        let arr = []; //  记录彩色
        let narr = []; // 记录黑白色

        for (let i = 0; i < w; i++) {
            arr[i] = [];
            for (let j = 0; j < h; j++) {
                //let black = (i>w/4*1.5 && i<w/4*2.5 || j>h/4*1.5 && j<h/4*2.5) && c[0]<50 && c[1]<50 && c[2]<50 ? -38 : 0;
                arr[i][j] = [];
                arr[i][j][0] = imgData[(width * (t + j) + l + i) * 4];
                arr[i][j][1] = imgData[(width * (t + j) + l + i) * 4 + 1];
                arr[i][j][2] = imgData[(width * (t + j) + l + i) * 4 + 2];
                arr[i][j][3] = imgData[(width * (t + j) + l + i) * 4 + 3];
                r += arr[i][j][0];
                g += arr[i][j][1];
                b += arr[i][j][2];
            }
        }

        //alert("Set arr end");
        if (isLine((r + g + b) / h / w / 3, cBoard)) {
            //console.log("line");
            return ({ r: 255, g: 125, b: 255 }); //网格, 无棋子
        }
        else if (isLine((r + g + b) / h / w / 3 + 18, cBoard)) {
            //console.log("line");
            return ({ r: 255, g: 125, b: 255 }); //网格, 无棋子
        }
        else if (isLine((r + g + b) / h / w / 3 - 18, cBoard)) {
            //console.log("line");
            return ({ r: 255, g: 125, b: 255 }); //网格, 无棋子
        }
        else {
            //console.log("not Line");
            return ({ r: r / w / h, g: g / w / h, b: b / w / h }); //不是网格
        }



        function isLine(cnum, cboard) {
            let tx;
            let ty; //网格的x，y 线
            let x = idx % cboard.SLTX;
            let y = parseInt(idx / cboard.SLTX);
            let count = 0; // 记录黑点
            let c;
            for (let i = 0; i < w; i++) {
                narr[i] = [];
                for (let j = 0; j < h; j++) {
                    c = arr[i][j];
                    if (c[0] < cnum && c[1] < cnum && c[2] < cnum) {
                        narr[i][j] = 1;
                        count++;
                    }
                    else {
                        narr[i][j] = 0;
                    }
                }
            }
            if (count > w * h / 8 * 3) return false;

            /*
                // 测试
            let str = idx+"\n";
            for (let j=0; j<h; j++)  {
                for (let i=0; i<w; i++)  {
                    str+=narr[i][j];
                }
                str+="\n"
            }
            //alert(str)
            */

            // 针对白底棋盘，搜索棋盘网格线
            if (y == null) {
                x = idx % cboard.SLTX;
                y = parseInt(idx / cboard.SLTX);
            }

            if (x == 0) {
                if (idx == 0) {
                    if (right() && buttom()) return true;
                }
                else if (idx == cboard.SLTX * (cboard.SLTY - 1)) {
                    if (right() && top()) return true;
                }
                else {
                    if (right() && buttom() && top()) return true;
                }
            }
            else if (x == cboard.SLTX - 1) {
                if (idx == cboard.SLTX - 1) {
                    if (left() && buttom()) return true;
                }
                else if (idx == cboard.SLTX * cboard.SLTY - 1) {
                    if (left() && top()) return true;
                }
                else {
                    if (left() && top() && buttom()) return true;
                }
            }
            else if (y == 0) {
                if (left() && right() && buttom()) return true;
            }
            else if (y == cboard.SLTY - 1) {
                if (left() && right() && top()) return true;
            }
            else {
                if (left() && right() && top() && buttom()) return true;
            }

            function left() {
                let i;
                let j;
                for (i = 0; i < h; i++) {
                    let c = narr[0][i];
                    if (c == 1) {
                        if (ty != null) {
                            if (Math.abs(i - ty) > h * 0.3 || Math.abs(i - ty) == 0) { return false; }
                        }
                        else {
                            ty = i;
                        }
                        for (j = 1; j < w / 5; j++) {
                            c = narr[j][i];
                            if (c == 0 && narr[j + 2][i] == 0 && !(narr[j + 3][i] == 1 && narr[j + 4][i] == 1 && narr[j + 5][i] == 1)) break;
                        }
                        if (j >= w / 5) return true;
                        return false;
                    }
                }
                //alert("__left")
            }

            function right() {
                let i;
                let j;
                for (i = h - 1; i >= 0; i--) {
                    let c = narr[w - 1][i];
                    if (c == 1) {
                        if (ty != null) {
                            if (Math.abs(i - ty) > h * 0.3 || Math.abs(i - ty) == 0) { return false; }
                        }
                        else {
                            ty = i;
                        }
                        for (j = w - 2; j > w * 4 / 5; j--) {
                            c = narr[j][i];
                            if (c == 0 && narr[j - 2][i] == 0 && !(narr[j - 3][i] == 1 && narr[j - 4][i] == 1 && narr[j - 5][i] == 1)) break;
                        }
                        if (j <= w * 4 / 5) return true;
                        return false;
                    }
                }
                //alert("__right")
            }

            function top() {
                let i;
                let j;
                for (i = 0; i < w; i++) {
                    let c = narr[i][0];
                    if (c == 1) {
                        if (tx != null) {
                            if (Math.abs(i - tx) > w * 0.3 || Math.abs(i - tx) == 0) { return false; }
                        }
                        else {
                            tx = i;
                        }
                        for (j = 1; j < h / 5; j++) {
                            c = narr[i][j];
                            if (c == 0 && narr[i][j + 2] == 0 && !(narr[i][j + 3] == 1 && narr[i][j + 4] == 1 && narr[i][j + 5] == 1)) break;
                        }
                        if (j >= h / 5) return true;
                        return false;
                    }
                }
                //alert("__top")
            }

            function buttom() {
                let i;
                let j;
                for (i = w - 1; i >= 0; i--) {
                    let c = narr[i][h - 1];
                    if (c == 1) {
                        if (tx != null) {
                            if (Math.abs(i - tx) > w * 0.3 || Math.abs(i - tx) == 0) { return false; }
                        }
                        else {
                            tx = i;
                        }
                        for (j = h - 2; j > h * 4 / 5; j--) {
                            c = narr[i][j];
                            if (c == 0 && narr[i][j - 2] == 0 && !(narr[i][j - 3] == 1 && narr[i][j - 4] == 1 && narr[i][j - 5] == 1)) break;
                        }
                        if (j <= h * 4 / 5) return true;
                        return false;
                    }
                }
                //alert("__buttom")
            }
        }

    }

};



// 把棋盘图片转成SVG,返回SVG代码
checkerBoard.prototype.getSVG = function() {

    let showNum = this.isShowNum;
    let size = 2000 / this.canvas.width;
    let svgText = ` <svg role="img" xmlns="http://www.w3.org/2000/svg" style ="width:100％;height:100％;background-color:#ffffff" version="1.1" viewBox="0 0  ${this.canvas.width*size}  ${this.canvas.height*size}" >`;
    // 划竖线
    let x1;
    let x2;
    let y1;
    let y2;
    let lineWidth;
    let canvas = this.canvas;
    //console.log("checkerBoard.getSVG");
    for (let i = 0; i < this.SLTX; i++) {
        lineWidth = (i == 0 || i == (this.SLTX - 1)) ? parseInt(canvas.width) * 4 / 1000 * size : parseInt(canvas.width) / 1000 * 2 * size;
        x1 = this.P[i].x * size;
        y1 = this.P[i].y * size;
        x2 = this.P[i + (this.SLTY - 1) * this.SLTX].x * size;
        y2 = this.P[i + (this.SLTY - 1) * this.SLTX].y * size;
        svgText += ` <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="black" stroke-width="${lineWidth}" />`;
    }
    // 划横线
    for (let j = 0; j < this.SLTY; j++) {
        lineWidth = (j == 0 || j == (this.SLTY - 1)) ? parseInt(canvas.width) * 4 / 1000 * size : parseInt(canvas.width) / 1000 * 2 * size;
        x1 = this.P[j * this.SLTX].x * size;
        y1 = this.P[j * this.SLTX].y * size;
        x2 = this.P[j * this.SLTX + this.SLTX - 1].x * size;
        y2 = this.P[j * this.SLTX + this.SLTX - 1].y * size;
        svgText += ` <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="black" stroke-width="${lineWidth}" />`;
    }
    //画星位
    if (this.SLTX == 15 && this.SLTY == 15) {
        let r = parseInt(canvas.width) / 1000 * 6 * size;
        for (let i = 48; i < 225; i += 120) {
            for (let j = 0; j < 9; j += 8) {
                x1 = this.P[i + j].x * size;
                y1 = this.P[i + j].y * size;
                svgText += `<circle cx="${x1}" cy="${y1}" r="${r}" stroke="black" stroke-width="0" fill="black"/> `;
            }
        }
        x1 = this.P[112].x * size;
        y1 = this.P[112].y * size;
        svgText += `<circle cx="${x1}" cy="${y1}" r="${r}" stroke="black" stroke-width="0" fill="black"/> `;
    }

    //打印棋盘坐标
    let m;
    for (let i = 0; i < this.SLTX; i++) {
        for (let j = 0; j <= this.SLTX * (this.SLTY - 1); j += this.SLTX * (this.SLTY - 1)) {

            m = j == 0 ? -this.gH : this.gH;
            x1 = this.P[i + j].x * size;
            y1 = (this.P[i + j].y + m) * size;
            svgText += ` <text x="${x1}" y="${y1}" font-weight="bold" font-family="黑体"  font-size="${this.gW*0.5*size}" text-anchor="middle" dominant-baseline="central">${this.alpha.charAt(i)}</text>`;

        }
    }
    for (let i = 0; i < this.SLTY; i++) {
        for (let j = 0; j <= this.SLTX - 1; j += this.SLTX - 1) {

            m = j == 0 ? -this.gW : this.gW;
            x1 = (this.P[i * this.SLTX + j].x + m) * size;
            y1 = this.P[i * this.SLTX + j].y * size;
            svgText += ` <text x="${x1}" y="${y1}" font-weight="bold" font-family="黑体" font-size="${this.gW*0.5*size}" text-anchor="middle" dominant-baseline="central">${String(this.SLTY-i)}</text>`;

        }
    }

    // 打印棋子，和标记
    for (let i = 0; i < this.SLTY * this.SLTX; i++) {
        let w = this.gW < this.gH ? this.gW / 2 * 0.85 : this.gH / 2 * 0.85;
        if (this.P[i].type == tNum || this.P[i].type == tWhite || this.P[i].type == tBlack) {
            lineWidth = w / 25;
            svgText += ` <circle cx="${this.P[i].x*size}" cy="${this.P[i].y*size}" r="${w*size}" stroke="black" stroke-width="${lineWidth*size}" fill="${this.P[i].color}"/> `;
            /*
             if (this.P[i].type==tNum) {
                 let color = this.P[i].color=="white" ? "black" : "white";
                 svgText += ` <text x="${this.P[i].x*size}" y="${this.P[i].y*size}" stroke="${color}" fill="${color}" font-weight="bold" font-family="黑体" font-size="${this.gW*0.5*size}" text-anchor="middle" dominant-baseline="central">${this.P[i].text}</text>`;
             }
            */
        }
        else if (this.P[i].type == tLb) {
            svgText += ` <circle cx="${this.P[i].x*size}" cy="${this.P[i].y*size}" r="${this.P[i].text.length>1 ? w*size : w/2*size}" stroke="White" stroke-width="${3*size}" fill="White"/> `;
            //svgText += ` <text x="${this.P[i].x*size}" y="${this.P[i].y*size}" stroke="${this.P[i].color}" fill="${this.P[i].color}" font-weight="bolder" font-family="黑体" font-size="${this.gW*0.5*size}" text-anchor="middle" dominant-baseline="central">${this.P[i].text}</text>`;
        }

        let txt = this.P[i].text;
        let color = this.P[i].color;
        if (this.P[i].type == tNum) { //控制从第几手显示❶
            txt = parseInt(this.P[i].text) - this.resetNum;
            txt = parseInt(txt) < 1 ? "" : txt;
            txt = showNum ? txt : "";
            color = this.P[i].color == this.wNumColor ? "black" : "white";
            if (this.MSindex >= 0 && this.MS[this.MSindex] == i) {
                color = this.notShowLastNum ? color : "#ff6666";
                txt = !showNum && !this.notShowLastNum ? "◤" : txt;

            }
        }

        let fontsize = parseInt(w * 1.08);
        x1 = this.P[i].x;
        y1 = this.P[i].y;
        if (txt.length == 1) { // 两位数数数字不需要放大字体
            let code = txt.charCodeAt();
            // 再把一位数字排除
            if (code < "0".charCodeAt() || code > "9".charCodeAt()) {
                if (txt == "▲" || txt == "■" || txt == "☆" || txt == "◎" || txt == "✖") {
                    fontsize = parseInt(w * 1.1);
                }
                else if (txt == "◤") {
                    x1 -= w * 0.15;
                    y1 -= w * 0.15;
                }
                else { // 把数字和特殊标记排除，其它一位字符统一放大字体
                    fontsize = parseInt(w * 1.5);
                }
            }
        }
        svgText += ` <text x="${x1*size}" y="${y1*size}" stroke="${color}" fill="${color}" font-weight="bolder" font-family="黑体" font-size="${fontsize*size}" text-anchor="middle" dominant-baseline="central">${txt}</text>`;
    }

    svgText += "</svg>";
    return svgText;
};



// 顺序棋盘上棋子，隐藏手数
checkerBoard.prototype.hideNum = function() {

    let color;
    for (let i = 0; i <= this.MSindex; i++)
    {
        color = (i % 2) ? this.wNumColor : this.bNumColor;
        this.printPoint(this.MS[i], "", color, tNum);
    }

};



checkerBoard.prototype.hideCutDiv = function() {

    this.cutDiv.style.borderStyle = "none";
    this.cutDiv.style.zIndex = -100;
};



// P 数组的index ，转字母数字坐标
checkerBoard.prototype.indexToName = function(idx) {

    let x = (idx % this.SLTX);
    let y = parseInt(idx / this.SLTY);
    return (this.alpha.charAt(x) + (15 - y)).toLowerCase();
};



//  判断坐标是否出界，出界返回 true
checkerBoard.prototype.isOut = function(x, y, htmlObj, width) {
    width = width ? width : 0;
    let xL = 0 - width;
    let xR = xL + parseInt(htmlObj.style.width) + 2 * width;
    let yT = 0 - width;
    let yB = yT + parseInt(htmlObj.style.height) + 2 * width;
    let p = tempp;
    p.setxy(x, y);
    this.xyPageToObj(p, htmlObj);
    x = p.x;
    y = p.y;

    if (x < xL || x > xR || y < yT || y > yB)
    {
        return true;
    }
    return false;
};



// 字母数字坐标，返回 P数组的index
checkerBoard.prototype.nameToIndex = function(name) {

    let x = name.toLowerCase().charCodeAt() - "a".charCodeAt();
    name = name.substr(1);
    let y = this.SLTY - name; //转换成第一行为0，依次为1,2,3...
    return x + y * this.SLTX;

};



// 平移棋盘
checkerBoard.prototype.moveCheckerBoard = function(move) {

    let i;
    let j;
    let idx;
    switch (move) {
        case "left":
            for (i = 0; i < this.SLTX * this.SLTY; i += this.SLTX) {
                if (this.P[i].type != tEmpty) break;
            }
            if (i < this.SLTX * this.SLTY) return;
            // 转换MS数组
            for (i = 0; i < this.MS.length; i++) {
                this.MS.length = this.MSindex + 1;
                this.MS[i] = this.MS[i] - 1;
            }
            // 复制棋盘每个落子点
            for (i = 1; i < this.SLTX; i++) {
                for (j = 0; j < this.SLTY; j++) {
                    idx = i + j * this.SLTX;
                    copyP(this, idx - 1, idx);
                }
            }
            break;
        case "right":
            for (i = this.SLTX - 1; i < this.SLTX * this.SLTY; i += this.SLTX) {
                if (this.P[i].type != tEmpty) break;
            }
            if (i < this.SLTX * this.SLTY) return;
            for (i = 0; i < this.MS.length; i++) {
                this.MS.length = this.MSindex + 1;
                this.MS[i] = this.MS[i] + 1;
            }
            for (i = this.SLTX - 2; i >= 0; i--) {
                for (j = 0; j < this.SLTY; j++) {
                    idx = i + j * this.SLTX;
                    copyP(this, idx + 1, idx);
                }
            }
            break;
        case "top":
            for (i = 0; i < this.SLTX; i++) {
                if (this.P[i].type != tEmpty) break;
            }
            if (i < this.SLTX) return;
            for (i = 0; i < this.MS.length; i++) {
                this.MS.length = this.MSindex + 1;
                this.MS[i] = this.MS[i] - this.SLTX;
            }
            for (i = 1; i < this.SLTY; i++) {
                for (j = 0; j < this.SLTX; j++) {
                    idx = i * this.SLTY + j;
                    copyP(this, idx - this.SLTX, idx);
                }
            }
            break;
        case "bottom":
            for (i = this.SLTX * (this.SLTY - 1); i < this.SLTX * this.SLTY; i++) {
                if (this.P[i].type != tEmpty) break;
            }
            if (i < this.SLTX * this.SLTY) return;
            for (i = 0; i < this.MS.length; i++) {
                this.MS.length = this.MSindex + 1;
                this.MS[i] = this.MS[i] + this.SLTX;
            }
            for (i = this.SLTY - 2; i >= 0; i--) {
                for (j = 0; j < this.SLTX; j++) {
                    idx = i * this.SLTY + j;
                    copyP(this, idx + this.SLTX, idx);
                }
            }
            break;
    }

    this.MSToMoves();

    // 复制一个点，同时打印出来
    function copyP(board, idx, idx1) {
        board.P[idx].text = board.P[idx1].text;
        board.P[idx].type = board.P[idx1].type;
        board.P[idx].color = board.P[idx1].color;
        if (board.P[idx].type != tEmpty) {
            let txt = board.P[idx].text;
            if (board.P[idx].type == tNum) { //控制从第几手显示❶
                txt = parseInt(board.P[idx].text) - board.resetNum;
                txt = parseInt(txt) < 1 ? "" : txt;
                txt = board.isShowNum ? txt : "";
            }
            board.printPoint(idx, txt, board.P[idx].color, board.P[idx].type, board.isShowNum);
            board.clePoint(idx1);
        }
    }
};



// MS 数组记录 转成棋谱代码
checkerBoard.prototype.MSToMoves = function() {

    this.Moves = "";
    for (let i = 0; i <= this.MSindex; i++) {
        this.Moves += this.indexToName(this.MS[i]);
    }

};



checkerBoard.prototype.printArray = function(arr, txt, color) {

    let idx = 0;
    for (let y = 0; y < this.SLTY; y++) {
        for (let x = 0; x < this.SLTX; x++) {

            if (arr[y][x] > 0) {
                this.wLb(y * this.SLTX + x, txt, color);
            }
        }
    }
};



//  用虚线表示棋子的位置
checkerBoard.prototype.printBorder = function() {

    for (let i = 0; i < this.SLTX * this.SLTY; i++)
    {
        if (this.P[i] != null) this.P[i].printBorder(this.gW, this.gH);
    }

};



// 打印棋盘坐标
checkerBoard.prototype.printCoordinate = function(t, r, d, l) {

    t = t == null ? true : Boolean(t);
    r = r == null ? true : Boolean(r);
    d = d == null ? true : Boolean(d);
    l = l == null ? true : Boolean(l);
    let alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let p = tempp;
    let m;
    let ctx = this.bakCanvas.getContext("2d");
    ctx.fillStyle = this.coordinateColor;
    ctx.font = parseInt(this.gW * 0.5) + "px 黑体";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    for (let i = 0; i < this.SLTX; i++) {
        for (let j = 0; j <= this.SLTX * (this.SLTY - 1); j += this.SLTX * (this.SLTY - 1)) {

            m = j == 0 ? -this.gH : this.gH;
            p.setxy(this.P[i + j].x, this.P[i + j].y + m);

            ctx.fillText(alpha.charAt(i), p.x, p.y);


        }
    }
    for (let i = 0; i < this.SLTY; i++) {
        for (let j = 0; j <= this.SLTX - 1; j += this.SLTX - 1) {

            m = j == 0 ? -this.gW : this.gW;
            p.setxy(this.P[i * this.SLTX + j].x + m, this.P[i * this.SLTX + j].y);

            ctx.fillText(String(this.SLTY - i), p.x, p.y);


        }
    }
    ctx = null;
};



// 画空棋盘
checkerBoard.prototype.printCheckerBoard = function() {

    this.SLTX = 15;
    this.SLTY = this.SLTX;
    let canvas = this.bakCanvas; // 准备在后台画棋盘
    let siz = (this.SLTX - 1) * 9 / 14 + 2;
    this.XL = parseInt(parseInt(this.width) / siz);
    this.XR = parseInt(parseInt(this.width) / siz * (siz - 1));
    this.YT = parseInt(parseInt(this.height) / siz);
    this.YB = parseInt(parseInt(this.height) / siz * (siz - 1));

    this.resetP(this.XL, this.XR, this.YT, this.YB);
    // 画图之前，设置画布大小
    canvas.width = parseInt(this.width);
    canvas.height = parseInt(this.height);
    let ctx = canvas.getContext("2d");
    ctx.fillStyle = this.backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = this.lineColor;
    let p = tempp;
    // 划竖线
    for (let i = 0; i < this.SLTX; i++) {
        ctx.lineWidth = (i == 0 || i == (this.SLTX - 1)) ? parseInt(canvas.width) * 4 / 1000 : parseInt(canvas.width) / 1000 * 2;
        p.setxy(this.P[i].x, this.P[i].y);
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        p.setxy(this.P[i + (this.SLTY - 1) * this.SLTX].x, this.P[i + (this.SLTY - 1) * this.SLTX].y);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
    }
    // 划横线
    for (let j = 0; j < this.SLTY; j++) {
        ctx.lineWidth = (j == 0 || j == (this.SLTY - 1)) ? parseInt(canvas.width) * 4 / 1000 : parseInt(canvas.width) / 1000 * 2;
        p.setxy(this.P[j * this.SLTX].x, this.P[j * this.SLTX].y);
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        p.setxy(this.P[j * this.SLTX + this.SLTX - 1].x, this.P[j * this.SLTX + this.SLTX - 1].y);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
    }
    ctx.stroke();
    //画星位
    if (this.SLTX == 15 && this.SLTY == 15) {

        for (let i = 48; i < 225; i += 120) {
            for (let j = 0; j < 9; j += 8) {
                p.setxy(this.P[i + j].x, this.P[i + j].y);
                ctx.beginPath();
                ctx.fillStyle = this.lineColor;
                ctx.arc(p.x, p.y, parseInt(canvas.width) / 1000 * 6, 0, 2 * Math.PI);
                ctx.fill();
                //ctx.stroke();
            }
        }
        p.setxy(this.P[112].x, this.P[112].y);
        ctx.beginPath();
        ctx.fillStyle = this.lineColor;
        ctx.arc(p.x, p.y, parseInt(canvas.width) / 1000 * 6, 0, 2 * Math.PI);
        ctx.fill();
        //ctx.stroke();

    }

    this.printCoordinate(); // 打印棋盘坐标

    //把后台的图片显示出来
    let canvas2 = this.canvas;
    ctx = null;
    ctx = canvas2.getContext("2d");
    canvas2.width = canvas.width;
    canvas2.height = canvas.height;
    canvas2.style.width = canvas.width + "px";
    canvas2.style.height = canvas.height + "px";
    //图片转移后，重新设置每个点的坐标
    ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height);
    /*this.XL += canvas2.offsetLeft - canvas.offsetLeft ;
    this.XR += canvas2.offsetLeft - canvas.offsetLeft ;
    this.YT += canvas2.offsetTop - canvas.offsetTop ;
    this.YB += canvas2.offsetTop - canvas.offsetTop ;
    this.resetP();*/

    //this.printBorder();
};



// 在棋盘上面打印一个VCF手顺   
checkerBoard.prototype.printMoves = function(moves, firstColor) {

    let nowTimer = new Date().getTime();
    let idx = 0;
    if (nowTimer - this.printMovesTimer < 1000) return;
    this.printMovesTimer = nowTimer;
    for (let y = 0; y < this.SLTY; y++) {
        for (let x = 0; x < this.SLTX; x++) {
            idx = y * this.SLTX + x;
            if (this.P[idx].type == tLb) {
                this.clePoint(idx);
            }
        }
    }
    for (let i = 0; i < moves.length; i++) {
        let color;
        let fontColor;
        if (i == moves.length - 1) {
            fontColor = this.moveLastFontColor;
            if (firstColor == 1) {
                color = i % 2 ? this.moveWhiteColor : this.moveBlackColor;
            }
            else {
                color = i % 2 ? this.moveBlackColor : this.moveWhiteColor;
            }
        }
        else if (firstColor == 1) {
            color = i % 2 ? this.moveWhiteColor : this.moveBlackColor;
            fontColor = i % 2 ? this.moveWhiteFontColor : this.moveBlackFontColor;
        }
        else {
            color = i % 2 ? this.moveBlackColor : this.moveWhiteColor;
            fontColor = i % 2 ? this.moveBlackFontColor : this.moveWhiteFontColor;
        }

        this.wLb(moves[i], i + 1, fontColor, color);
    }
};



// 在PDF文档画棋盘
checkerBoard.prototype.printPDF = function(doc, fontName) {

    fontName = fontName || "arial";
    let showNum = this.isShowNum;
    let left = 594 * 0.0252525;
    let top = (840 - (594 - left * 2)) / 2;
    let size = (594 - left * 2) / this.canvas.width;

    // 划竖线
    let x1;
    let x2;
    let y1;
    let y2;
    let lineWidth;
    let canvas = this.canvas;
    for (let i = 0; i < this.SLTX; i++) {
        lineWidth = (i == 0 || i == (this.SLTX - 1)) ? parseInt(canvas.width) * 4 / 1000 * size : parseInt(canvas.width) / 1000 * 2 * size;
        x1 = left + this.P[i].x * size;
        y1 = top + this.P[i].y * size;
        x2 = left + this.P[i + (this.SLTY - 1) * this.SLTX].x * size;
        y2 = top + this.P[i + (this.SLTY - 1) * this.SLTX].y * size;

        doc.setLineWidth(lineWidth);
        doc.setDrawColor(0, 0, 0);
        doc.line(x1, y1, x2, y2);
        //svgText += ` <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="black" stroke-width="${lineWidth}" />` ;
    }
    // 划横线
    for (let j = 0; j < this.SLTY; j++) {
        lineWidth = (j == 0 || j == (this.SLTY - 1)) ? parseInt(canvas.width) * 4 / 1000 * size : parseInt(canvas.width) / 1000 * 2 * size;
        x1 = left + this.P[j * this.SLTX].x * size;
        y1 = top + this.P[j * this.SLTX].y * size;
        x2 = left + this.P[j * this.SLTX + this.SLTX - 1].x * size;
        y2 = top + this.P[j * this.SLTX + this.SLTX - 1].y * size;

        doc.setLineWidth(lineWidth);
        doc.setDrawColor(0, 0, 0);
        doc.line(x1, y1, x2, y2);
        //svgText += ` <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="black" stroke-width="${lineWidth}" />` ;
    }
    //画星位
    if (this.SLTX == 15 && this.SLTY == 15) {
        let r = parseInt(canvas.width) / 1000 * 6 * size;
        for (let i = 48; i < 225; i += 120) {
            for (let j = 0; j < 9; j += 8) {
                x1 = left + this.P[i + j].x * size;
                y1 = top + this.P[i + j].y * size;
                doc.setFillColor(0, 0, 0);
                doc.circle(x1, y1, r, "F");
                //svgText += `<circle cx="${x1}" cy="${y1}" r="${r}" stroke="black" stroke-width="0" fill="black"/> `;
            }
        }
        x1 = left + this.P[112].x * size;
        y1 = top + this.P[112].y * size;
        doc.setFillColor(0, 0, 0);
        doc.circle(x1, y1, r, "F");
        //	svgText += `<circle cx="${x1}" cy="${y1}" r="${r}" stroke="black" stroke-width="0" fill="black"/> `;
    }

    //打印棋盘坐标
    let m;
    for (let i = 0; i < this.SLTX; i++) {
        for (let j = 0; j <= this.SLTX * (this.SLTY - 1); j += this.SLTX * (this.SLTY - 1)) {

            m = j == 0 ? -this.gH : this.gH;
            x1 = left + this.P[i + j].x * size;
            y1 = top + (this.P[i + j].y + m) * size;
            y1 += (this.gW * 0.5 * 0.35) * size;
            doc.setFont(fontName);
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(parseInt(this.gW * 0.5 * size));
            doc.setFontType("bold");
            doc.text(this.alpha.charAt(i), x1, y1, "center");

        }
    }
    for (let i = 0; i < this.SLTY; i++) {
        for (let j = 0; j <= this.SLTX - 1; j += this.SLTX - 1) {

            m = j == 0 ? -this.gW : this.gW;
            x1 = left + (this.P[i * this.SLTX + j].x + m) * size;
            y1 = top + this.P[i * this.SLTX + j].y * size;
            y1 += (this.gW * 0.5 * 0.35) * size;
            doc.setFont(fontName);
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(parseInt(this.gW * 0.5 * size));
            doc.setFontType("bold");
            doc.text(String(this.SLTY - i), x1, y1, "center");

        }
    }

    // 打印棋子，和标记
    for (let i = 0; i < this.SLTY * this.SLTX; i++) {
        let w = this.gW < this.gH ? this.gW / 2 * 0.85 : this.gH / 2 * 0.85;
        if (this.P[i].type == tNum || this.P[i].type == tWhite || this.P[i].type == tBlack) {
            lineWidth = w / 25;
            doc.setLineWidth(lineWidth * size);
            doc.setDrawColor(0, 0, 0);
            if (this.P[i].color == this.wNumColor) {
                doc.setFillColor(255, 255, 255);
            }
            else {
                doc.setFillColor(0, 0, 0);
            }
            x1 = left + this.P[i].x * size;
            y1 = top + this.P[i].y * size;
            doc.circle(x1, y1, w * size, "DF");
            //svgText += ` <circle cx="${this.P[i].x*size}" cy="${this.P[i].y*size}" r="${w*size}" stroke="black" stroke-width="${lineWidth*size}" fill="${this.P[i].color}"/> `;
        }
        else if (this.P[i].type == tLb) {
            doc.setLineWidth(3 * size);
            doc.setDrawColor(255, 255, 255);
            doc.setFillColor(255, 255, 255);
            x1 = left + this.P[i].x * size;
            y1 = top + this.P[i].y * size;
            doc.circle(x1, y1, this.P[i].text.length > 1 ? w * size : w / 2 * size, "FD");
            //svgText += ` <circle cx="${this.P[i].x*size}" cy="${this.P[i].y*size}" r="${this.P[i].text.length>1 ? w*size : w/2*size}" stroke="White" stroke-width="${3*size}" fill="White"/> `;
        }

        let txt = this.P[i].text;
        let color = this.P[i].color;
        if (this.P[i].type == tNum) { //控制从第几手显示❶
            txt = parseInt(this.P[i].text) - this.resetNum;
            txt = parseInt(txt) < 1 ? "" : txt;
            txt = showNum ? txt : "";
            color = this.P[i].color == this.wNumColor ? "black" : "white";
            if (this.MSindex >= 0 && this.MS[this.MSindex] == i) {
                color = this.notShowLastNum ? color : "#ff6666";
                txt = !showNum && !this.notShowLastNum ? "◤" : txt;

            }
        }

        let fontsize = w * 1.08;
        x1 = this.P[i].x;
        y1 = this.P[i].y;
        if (txt.length == 1) { // 两位数数数字不需要放大字体
            let code = txt.charCodeAt();
            // 再把一位数字排除
            if (code < "0".charCodeAt() || code > "9".charCodeAt()) {
                if (txt == "▲" || txt == "■" || txt == "☆" || txt == "◎" || txt == "✖") {
                    fontsize = w * 1.1;
                }
                else if (txt == "◤") {
                    x1 -= w * 0.15;
                    y1 -= w * 0.15;
                }
                else { // 把数字和特殊标记排除，其它一位字符统一放大字体
                    fontsize = w * 1.5;
                }
            }
        }

        switch (String(color)) {
            case "white":
                doc.setTextColor(255, 255, 255);
                break;
            case "black":
                doc.setTextColor(0, 0, 0);
                break;
            case "red":
                doc.setTextColor(255, 0, 0);
                break;
            case "green":
                doc.setTextColor(0, 180, 0);
                break;
            case "#ff6666":
                doc.setTextColor(255, 0, 0);
                break;
            case "#9e9999":
                doc.setTextColor(157, 153, 153);
                break;
            case "#3333ff":
                doc.setTextColor(0, 0, 255);
                break;
            case "blue":
                doc.setTextColor(0, 0, 255);
                break;

        }
        if (txt == "❌") { // 不支持的字符
            txt = "×";
            doc.setTextColor(150, 0, 0);
        }
        doc.setFont(fontName);
        doc.setFontSize(parseInt(fontsize * size));
        doc.setFontType("bold");
        x1 = left + x1 * size;
        y1 = top + y1 * size;
        y1 += (fontsize / 2 - fontsize * 0.15) * size; // 垂直居中
        doc.text(String(txt), x1, y1, "center");
        //svgText += ` <text x="${x1*size}" y="${y1*size}" stroke="${color}" fill="${color}" font-weight="bolder" font-family="黑体" font-size="${fontsize*size}" text-anchor="middle" dominant-baseline="central">${txt}</text>`;
    }

};



// 在棋盘上打印一个点
checkerBoard.prototype.printPoint = function(idx, text, color, type, showNum, backgroundColor) {


    let p = tempp;
    let w = this.gW < this.gH ? this.gW / 2 * 0.85 : this.gH / 2 * 0.85;
    let ctx = this.canvas.getContext("2d");
    p.setxy(this.P[idx].x, this.P[idx].y);
    // 打印棋子
    if (type == tNum || type == tWhite || type == tBlack) {
        ctx.lineWidth = w / 25;
        ctx.beginPath();
        ctx.arc(p.x, p.y, w, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill(); // 填充
        ctx.stroke(); // 描边
        ctx.fillStyle = color == this.wNumColor ? this.wNumFontColor : color == this.bNumColor ? this.bNumFontColor : color;
        ctx.font = "bolder " + parseInt(w * 1.08) + "px  黑体";
    }
    else { //  打印标签
        ctx.beginPath();
        ctx.fillStyle = backgroundColor || this.LbBackgroundColor;
        if (backgroundColor) {
            ctx.arc(p.x, p.y, w, 0, 2 * Math.PI);
            //ctx.fill();
            ctx.stroke();
        }
        //ctx.beginPath();
        ctx.arc(p.x, p.y, text.length > 1 ? w * 0.8 : w / 2, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillStyle = color;
        ctx.font = "bolder " + parseInt(w * 1.1) + "px  黑体";
    }


    ctx.font = "bolder " + parseInt(w * 1.08) + "px  黑体";
    if (text.length == 1) { // 两位数数数字不需要放大字体
        let code = text.charCodeAt();
        // 再把一位数字排除
        if (code < "0".charCodeAt() || code > "9".charCodeAt()) {
            if (text == "▲" || text == "■" || text == "☆" || text == "◎" || text == "✖") {
                ctx.font = "bolder " + parseInt(w * 1.1) + "px  黑体";
            }
            else { // 把数字和特殊标记排除，其它一位字符统一放大字体
                ctx.font = "bolder " + parseInt(w * 1.5) + "px  黑体";
            }
        }
    }

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, p.x, p.y);
    ctx = null;

    if (type == tNum) {
        this.showLastNum(showNum);
    }
    if (appData.renjuSave) appData.renjuSave(this);
    return true;
};



// 在棋盘上打印当前正在计算的点
checkerBoard.prototype.printSearchPoint = function(num, idx, text, color) {

    num = num ? parseInt(num) : 0;
    //清除旧标记
    if (this.searchIdx[num] > -1 && this.searchIdx[num] != idx) {
        this.cleLb(this.searchIdx[num]);
        this.searchIdx[num] = -1;
    }
    //写入新标记
    if (idx > -1) {
        this.searchIdx[num] = idx;
        this.wLb(idx, text, color);
    }
};



// 涂鸦模式，边框初始化
checkerBoard.prototype.resetCutDiv = function() {

    let canvas = this.canvas;
    let w = parseInt(canvas.width);
    let h = parseInt(canvas.height);
    let XL = w / 3;
    let XR = w / 3 * 2;
    let YT = h / 3;
    let YB = h / 3 * 2;
    let div = this.cutDiv;
    let s = this.cutDiv.style;
    s.position = "absolute";
    s.borderStyle = "dashed";
    s.borderWidth = "3px";
    s.borderColor = "red";
    s.zIndex = 0;
    s.width = XR - XL + "px";
    s.height = YB - YT + "px";
    s.left = XL + "px";
    s.top = YT + "px";

    /*
    if (XR == 0  || YB == 0)  {
        s.width = "300px";
        s.height = "300px";
        s.left = canvas.offsetLeft;
        s.top = canvas.offsetTop;
    }
    */

    this.XL = div.offsetLeft;
    this.XR = XL + parseInt(s.width);
    this.YT = div.offsetTop;
    this.YB = YT + parseInt(s.height);
    this.resetP(this.XL, this.XR, this.YT, this.YB);
    this.printBorder();
};



// 后台设置棋盘所有点的坐标。不会改变棋盘的显示
checkerBoard.prototype.resetP = function(xL, xR, yT, yB) {
    let i;
    let j;
    let l;
    let x;
    let y;
    if (xL == null || xR == null || yT == null || yB == null) {
        xL = this.XL;
        xR = this.XR;
        yT = this.YT;
        yB = this.YB;
    }
    let SLTY = this.SLTY;
    let SLTX = this.SLTX;
    //cleP();
    this.gW = (xR - xL) / (SLTX - 1);
    this.gH = (yB - yT) / (SLTY - 1);

    for (j = 0; j < SLTY; j++)
    {
        y = j == (SLTY - 1) ? yB : parseInt(this.gH * j) + yT;
        for (i = 0; i < SLTX; i++)
        {
            x = i == (SLTX - 1) ? xR : parseInt(this.gW * i) + xL;
            l = j * SLTX + i;
            this.P[l].setxy(x, y);
        }
    }

};



checkerBoard.prototype.saveAsImage = function(type) {

    let canvas = this.canvas;
    let downloadMime = "image/octet-stream"; // 强制下载

    let d = new Date();
    let filename = d.getFullYear() + "_" + (d.getMonth() + 1) + "_" + d.getDate() + " " + d.getHours() + "-" + d.getMinutes() + "-" + d.getSeconds();
    //保存
    canvas.toBlob(function(blob) {

        let save_link = document.createElement("a");
        save_link.href = URL.createObjectURL(blob);
        save_link.download = filename;
        let event = document.createEvent("MouseEvents");
        event.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        save_link.dispatchEvent(event);
        URL.revokeObjectURL(save_link.href);
    }, "image/" + type, 0.1);


};



// 棋盘保存PDF文件
checkerBoard.prototype.saveAsPDF = function(fontName) {

    if (typeof(jsPDF) != "function") {
        msg("❌❌❌ 缺少 jsPDF 插件");
        return;
    }
    msg("创建PDF文档......", null, null, null, null, null, null, null, null, null, 0);
    let board = this;
    setTimeout(function() {

        //新建文档
        let doc = new jsPDF("p", "pt", "a4"); // 594.3pt*840.51pt
        msgTextarea.value = "添加中文字体......";

        setTimeout(function() {
            //doc.addFont("msyh-bold.ttf", "msyh", "normal");
            //doc.addFont("msyh-bold.ttf", "msyh", "bold");
            msgTextarea.value = "写入PDF数据......";

            setTimeout(function() {
                board.printPDF(doc, fontName); // 写入文档
                let d = new Date();
                let name = d.getFullYear() + "_" + (d.getMonth() + 1) + "_" + d.getDate() + " " + d.getHours() + "-" + d.getMinutes() + "-" + d.getSeconds();
                closeMsg();
                doc.save(name + ".pdf"); //保存文档
            }, 50);
        }, 50);
    }, 50);

};



checkerBoard.prototype.saveAsSVG = function(type) {

    let save_link = document.createElement("a");
    let d = new Date();
    let name = d.getFullYear() + "_" + (d.getMonth() + 1) + "_" + d.getDate() + " " + d.getHours() + "-" + d.getMinutes() + "-" + d.getSeconds();
    let mimetype = type == "html" ? "text/html" : "image/svg+xml";
    let blob = new Blob([this.getSVG()], { type: mimetype });
    save_link.href = URL.createObjectURL(blob);
    save_link.download = name;
    //console.log("checkerBoard.saveAsSVG Download" );
    let event = document.createEvent("MouseEvents");
    event.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    save_link.dispatchEvent(event);
    URL.revokeObjectURL(save_link.href);

};



//涂鸦模式 手动调整选择棋盘边框
checkerBoard.prototype.setCutDiv = function(x, y, passResetP) { //调整棋盘的边框范围，用 mdiv 实时显示效果
    let xL;
    let xM;
    let xR;
    let yT;
    let yM;
    let yB;
    let cutDiv = this.cutDiv;
    let s = cutDiv.style;
    let tempx;
    let tempy;

    x = parseInt(x);
    y = parseInt(y);

    xL = cutDiv.offsetLeft;
    xR = xL + parseInt(s.width);
    xM = xL + parseInt((xR - xL) / 2);
    yT = cutDiv.offsetTop;
    yB = yT + parseInt(s.height);
    yM = yT + parseInt((yB - yT) / 2);

    let l;
    let t;
    let w;
    let h;

    if (x < xM)
    {
        if (y < yM)
        {
            l = x;
            t = y;
            w = xR - x;
            h = yB - y;
        }
        else
        {
            l = x;
            t = yT;
            w = xR - x;
            h = y - yT;
        }
    }
    else
    {

        if (y < yM)
        {
            l = xL;
            t = y;
            w = x - xL;
            h = yB - y;
        }
        else
        {
            l = xL;
            t = yT;
            w = x - xL;
            h = y - yT;
        }

    }

    let canvas = this.canvas;
    s.position = "absolute";
    s.left = canvas.offsetLeft < l ? l + "px" : canvas.offsetLeft + "px";
    s.top = canvas.offsetTop < t ? t + "px" : canvas.offsetTop + "px";
    s.width = w > parseInt(canvas.style.width) - l ? parseInt(canvas.style.width) - l + "px" : w + "px";
    s.height = h > parseInt(canvas.style.height) - t ? parseInt(canvas.style.height) - t + "px" : h + "px";

    this.XL = l;
    this.XR = this.XL + w;
    this.YT = t;
    this.YB = this.YT + h;

    if (passResetP) return;
    this.resetP(this.XL, this.XR, this.YT, this.YB);

};



// 设置最后一手是否高亮显示
checkerBoard.prototype.setNotShowLastNum = function(idx) {

    if (this.MSindex >= 0 && this.MS[this.MSindex] == idx) {
        this.notShowLastNum = !this.notShowLastNum;
        return true;
    }
    else {
        return false;
    }

};



//设置棋谱
checkerBoard.prototype.setMoves = function(codeStr) {

    // 对传入的棋谱代码排错;
    let m = codeStr ? codeStr.toUpperCase() : "";
    codeStr = "";
    let d;
    let a;
    let n;
    while (m.length) {
        a = "";
        n = "";
        while (m.length) {

            a = m.substr(0, 1);
            m = m.substr(1);
            d = a.charCodeAt() - "A".charCodeAt();

            if (d >= 0 && d <= 14) break; // 找到英文字母为止;
        }
        if (d < 0 && d > 14) break; //没有找到英文字母，退出

        while (m.length) {

            n = m.substr(0, 1);
            m = m.substr(1);
            d = n.charCodeAt() - "0".charCodeAt();
            if (d >= 0 && d <= 9) break; // 找到一个数字为止;

        }
        if (d < 0 && d > 9) break; //没有找到数字，退出


        //每个棋子落点横坐标用A-O表示，纵坐标用1-15来表
        //判断棋子纵坐标是否是2位，是则继续截取，补足3位。
        d = m.charCodeAt() - "0".charCodeAt();
        if (d >= 0 && d <= 9) {
            n += m.substr(0, 1);
            m = m.substr(1);
        }
        // 排除不存在的坐标，同时去掉重复的坐标
        if (parseInt(n) <= 15 && parseInt(n) > 0) {

            let index = codeStr.indexOf(a + n);
            if (index < 0) {
                // 没有重复
                codeStr = codeStr + a + n;
            }
            else if (parseInt(n) <= 9) { // 如果Y坐标是一位数字，再确认是否重复
                let r = codeStr.substr(index + 2, 1).charCodeAt() - "0".charCodeAt();
                // 没有重复
                if (r >= 0 && r <= 9) codeStr = codeStr + a + n;
            }
        }

    }
    if (codeStr != "") {
        this.Moves = codeStr;
        return codeStr;
    }
    else {
        return false;
    }

};



// 设置从第几手开始显示序号， 默认==0 时第一手开始显示，==1 时第二手显示❶
checkerBoard.prototype.setResetNum = function(num) {

    this.resetNum = parseInt(num);
    this.showNum();
};



// 选取棋盘边框模式，设置一个移动的坐标点
checkerBoard.prototype.setxy = function(p, speed) { //返回一个xy坐标，用来 调整棋盘边框位置，支持微调

    let s = this.cutDiv.style;
    let n = this.cutDiv;
    let xL = n.offsetLeft;
    let xR = xL + parseInt(s.width);
    let xM = xL + parseInt((xR - xL) / 2);
    let yT = n.offsetTop;
    let yB = yT + parseInt(s.height);
    let yM = yT + parseInt((yB - yT) / 2);
    let tempx;
    let tempy;
    let w = parseInt(s.width) < parseInt(s.height) ? parseInt(s.width) : parseInt(s.height);
    w /= (5 - 0.99);
    this.xyPageToObj(p, this.canvas);
    let x = parseInt(p.x);
    let y = parseInt(p.y);

    if (x < xM)
    {
        if (y < yM)
        {
            tempx = xL;
            tempy = yT;
        }
        else
        {
            tempx = xL;
            tempy = yB;
        }
    }
    else
    {

        if (y < yM)
        {
            tempx = xR;
            tempy = yT;
        }
        else
        {
            tempx = xR;
            tempy = yB;
        }

    }
    // 微调//////
    //alert("微调");
    if (speed != 1) {
        if (Math.abs(x - tempx) < w && Math.abs(y - tempy) < w)
        {
            var temps = Math.pow((x - tempx) / w, 2);
            x = parseInt((x - tempx) * speed * temps);
            x = x ? x : (x - tempx) < 0 ? -1 : 1;
            x += tempx;
            temps = Math.pow((y - tempy) / w, 2);
            y = parseInt((y - tempy) * speed * temps);
            y = y ? y : (y - tempy) < 0 ? -1 : 1;
            y += tempy;
            p.x = x;
            p.y = y;
            return;
        }
    }
    else {
        if (Math.abs(x - tempx) < parseInt(w / 3) && Math.abs(y - tempy) < parseInt(w / 3))
        {
            x = parseInt((x - tempx) / 10 * speed);
            x += tempx;
            y = parseInt((y - tempy) / 10 * speed);
            y += tempy;
            p.x = x;
            p.y = y;
            return;
        }

        if (Math.abs(x - tempx) < parseInt(w / 3 * 2) && Math.abs(y - tempy) < parseInt(w / 3 * 2))
        {
            x = parseInt((x - tempx) / 8 * speed);
            x += tempx;
            y = parseInt((y - tempy) / 8 * speed);
            y += tempy;
            p.x = x;
            p.y = y;
            return;
        }

        if (Math.abs(x - tempx) < w && Math.abs(y - tempy) < w)
        {
            x = parseInt((x - tempx) / 6 * speed);
            x += tempx;
            y = parseInt((y - tempy) / 6 * speed);
            y += tempy;
            p.x = x;
            p.y = y;
            return;
        }
    }

};



// 根据用户设置 决定是否高亮显示 最后一手棋
checkerBoard.prototype.showLastNum = function(showNum) {

    let p = tempp;
    let idx;
    if (this.MSindex >= 0) { // 存在倒数第1手，特殊标记
        idx = this.MS[this.MSindex];
    }
    else { // 不存在倒数第1手，退出
        return;
    }
    // 取得棋子颜色
    let color = this.P[idx].color;
    let w = this.gW < this.gH ? this.gW / 2 * 0.85 : this.gH / 2 * 0.85;
    let ctx = this.canvas.getContext("2d");
    p.setxy(this.P[idx].x, this.P[idx].y);
    // 画棋子
    ctx.beginPath();
    ctx.lineWidth = "2px";
    ctx.fillStyle = "black";
    ctx.arc(p.x, p.y, w, 0, 2 * Math.PI);
    ctx.fillStyle = color
    ctx.fill();
    ctx.stroke();

    // 设置字体
    ctx.font = "bolder " + parseInt(w * 1.08) + "px  黑体";
    // 由棋子颜色决定字体颜色
    ctx.fillStyle = this.notShowLastNum ? color == this.wNumColor ? this.wNumFontColor : this.bNumFontColor : this.lastNumColor;
    if (showNum) { // 显示数字
        // 判断最后一手是否高亮显示
        let txt = parseInt(this.P[idx].text) - this.resetNum;
        txt = parseInt(txt) < 1 ? "" : txt;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(txt, p.x, p.y);

    }
    else { // 隐藏数字
        // 判断最后一手是否高亮显示
        if (!this.notShowLastNum) {
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("◤", p.x - w * 0.15, p.y - w * 0.15);
        }
    }


    if (this.MSindex > 0) { // 存在倒数第二手，恢复正常标记
        idx = this.MS[this.MSindex - 1];
    }
    else { // 不存在倒数第二手，退出
        return;
    }
    //画倒数第二棋子
    color = this.P[idx].color;
    p.setxy(this.P[idx].x, this.P[idx].y);
    ctx.beginPath();
    ctx.lineWidth = "2px";
    ctx.fillStyle = "black";
    ctx.arc(p.x, p.y, w, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.stroke();

    let txt = parseInt(this.P[idx].text) - this.resetNum;
    txt = parseInt(txt) < 1 ? "" : txt;
    if (showNum) {
        ctx.font = "bolder " + parseInt(w * 1.08) + "px  黑体";
        ctx.fillStyle = color == this.wNumColor ? this.wNumFontColor : color == this.bNumColor ? this.bNumFontColor : color;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(txt, p.x, p.y);
    }

    ctx = null;
    return true;

};



// 刷新棋盘上棋子显示手数
checkerBoard.prototype.showNum = function() {

    let color;
    let txt;
    for (let i = 0; i <= this.MSindex; i++)
    {
        color = (i % 2) ? this.wNumColor : this.bNumColor;
        //从设定的手数开始显示序号
        txt = parseInt(this.P[this.MS[i]].text) - this.resetNum;
        txt = parseInt(txt) < 1 ? "" : txt;
        this.printPoint(this.MS[i], txt, color, tNum, true);
    }

};



//跳到最后一手
checkerBoard.prototype.toEnd = function(isShowNum) {

    while (this.MSindex < this.MS.length - 1) {
        this.toNext(isShowNum);
    }
};



// 跳到下一手
checkerBoard.prototype.toNext = function(isShowNum) {

    if (this.MS.length - 1 > this.MSindex) {
        this.wNb(this.MS[this.MSindex + 1], "auto", isShowNum);
    }
    else {
        //console.log("toNext")
        //if (this.oldCode == "") this.addTree();
    }
};



// 返回上一手
checkerBoard.prototype.toPrevious = function(isShowNum) {

    if (this.MSindex >= 0) {
        this.cleNb(this.MS[this.MSindex], isShowNum);
    }
    else if (this.oldCode) {
        this.unpackCode(isShowNum, this.oldCode, this.oldResetNum, this.oldFirstColor);
    }

};



// 跳到第 0 手。
checkerBoard.prototype.toStart = function(isShowNum) {

    while (this.MSindex > 0) {
        this.toPrevious(isShowNum);
    }
};



checkerBoard.prototype.unpackCode = function(showNum, codeStr, resetNum, firstColor) {
    let st = 0;
    let end = codeStr.indexOf("{");
    end = end == -1 ? codeStr.length : end;
    let moves;
    let blackMoves;
    let whiteMoves;
    moves = this.setMoves(codeStr.slice(st, end));
    st = end + 1;
    end = codeStr.indexOf("}{", st);
    end = end == -1 ? codeStr.length : end;
    blackMoves = this.setMoves(codeStr.slice(st, end));
    st = end + 2;
    end = codeStr.length;
    whiteMoves = this.setMoves(codeStr.slice(st, end));
    if (moves || blackMoves || whiteMoves) {
        this.cle();
        this.resetNum = resetNum == undefined ? 0 : resetNum;
        this.firstColor = firstColor == undefined ? "black" : firstColor;
        if (moves) this.unpackMoves(showNum, "auto", moves);
        if (blackMoves) this.unpackMoves(showNum, "black", blackMoves);
        if (whiteMoves) this.unpackMoves(showNum, "white", whiteMoves);
    }
};



//解析（已经通过this.getMoves 格式化）棋谱,摆棋盘
checkerBoard.prototype.unpackMoves = function(showNum, color, moves) {
    color = color || "auto";
    if (color == "auto") {
        this.MS.length = 0; //清空数组
        this.MSindex = -1;
    }
    let m = moves || this.Moves;
    while (m.length) {
        let a = m.substr(0, 2); //取前两个字符
        m = m.substr(2); //去掉前两个字符
        //每个棋子落点横坐标用A-O表示，纵坐标用1-15来表
        //判断棋子纵坐标是否是2位，是则继续截取，补足3位。
        let d = m.charCodeAt() - "0".charCodeAt();
        if (d >= 0 && d <= 9) {
            a += m.substr(0, 1);
            m = m.substr(1);
        }
        // 棋谱坐标转成 index 后添加棋子
        this.wNb(this.nameToIndex(a), color, showNum)

    }
};



checkerBoard.prototype.unpackTree = function() {

    if (this.oldCode == "") return;
    if (this.oldCode) {
        if (this.timerUnpackTree) {
            clearTimeout(this.timerUnpackTree);
            this.timerUnpackTree = null;
        }
        let MS = this.MS;
        let MSindex = this.MSindex;
        let cBoard = this;
        this.timerUnpackTree = setTimeout(function() {
            cBoard.cleLb("all");
            let arr = cBoard.getPointArray(getArr([]));
            let newarr = getArr([]);
            findFoulPoint(arr, newarr);
            cBoard.printArray(newarr, "❌", "red");
            let nd = cBoard.tree;
            let txt = MSindex % 2 ? "W" : "L";
            let i = 0; //unpackTree
            for (i = 0; i <= MSindex; i++) {
                let j = 0; //find idx
                for (j = nd.childNode.length - 1; j >= 0; j--) {
                    if (nd.childNode[j].idx == MS[i]) {
                        nd = nd.childNode[j];
                        break;
                    }
                }
                if (j == -1) {
                    if (nd.defaultChildNode) {
                        nd = nd.defaultChildNode;
                    }
                    else {
                        break; // not find idx
                    }
                }
            }
            if (i > MSindex) { // print points
                for (let i = nd.childNode.length - 1; i >= 0; i--) {
                    cBoard.wLb(nd.childNode[i].idx, txt, "black");
                }
            }
        }, 100);
    }
}



// 解析二维数组后，摆棋
checkerBoard.prototype.unpackArray = function(arrobj, isShowNum) {

    let bNarr = [];
    let wNarr = [];
    this.MS.length = 0; //清空数组
    this.MSindex = -1;
    this.resetNum = 0;
    for (let y = 0; y < this.SLTY; y++) {
        for (let x = 0; x < this.SLTX; x++) {
            let idx = x + this.SLTX * y;
            switch (String(arrobj[y][x])) {
                case "0":
                    this.clePoint(idx);
                    break;
                case "1":
                    bNarr.push(idx);
                    break;
                case "2":
                    wNarr.push(idx);
                    break;
            }
        }
    }
    if (bNarr.length - wNarr.length == 1 || bNarr.length - wNarr.length == 0) {
        for (let i = 0; i < wNarr.length; i++) {
            bNarr.splice((i + 1) * 2 - 1, 0, wNarr[i]);
        }
        this.resetNum = bNarr.length;
        for (let i = 0; i < bNarr.length; i++) {
            this.wNb(bNarr[i], "auto", isShowNum, tNum);
        }
    }
    else {
        for (let i = 0; i < bNarr.length; i++) {
            this.wNb(bNarr[i], "black", isShowNum, tBlack);
        }
        for (let i = 0; i < wNarr.length; i++) {
            this.wNb(wNarr[i], "white", isShowNum, tWhite);
        }
    }
};



//  在棋盘的一个点上面，打印一个标记
checkerBoard.prototype.wLb = function(idx, text, color, backgroundColor) {
    if (idx < 0) return;
    if (this.P[idx].type != tEmpty) this.clePoint(idx);
    this.P[idx].color = color;
    this.P[idx].type = tLb;
    this.P[idx].text = text;
    this.printPoint(idx, this.P[idx].text, this.P[idx].color, null, null, backgroundColor);
};



// 在棋盘的一个点上面，摆一颗棋子
checkerBoard.prototype.wNb = function(idx, color, showNum, type, isFoulPoint) {

    let i = this.MSindex + 1;
    if (this.oldCode) {
        if (color != "auto") return;
        let c = color != "auto" ? color : this.firstColor == "black" ? ((i % 2) ? "white" : "black") : ((i % 2) ? "black" : "white");
        if (isFoulPoint && c == "black") return;
    }
    if (color == "auto" || type == tNum) { // 顺序添加棋子

        this.MSindex++;
        // 如果当前添加的点和历史记录不一样，就把后面没用的记录删除
        if (this.MS.length >= i && this.MS[i] != idx) {
            this.MS.length = i;
        }

        this.MS[i] = idx; //顺序添加的棋子 记录下来

    }
    color = color == "black" ? this.bNumColor : color == "white" ? this.wNumColor : color;
    this.P[idx].color = color != "auto" ? color : this.firstColor == "black" ? ((i % 2) ? this.wNumColor : this.bNumColor) : ((i % 2) ? this.bNumColor : this.wNumColor);
    this.P[idx].type = type == null ? color == "auto" ? tNum : color == this.wNumColor ? tWhite : tBlack : type;
    this.P[idx].text = this.P[idx].type == tNum ? String(i + 1) : "";
    let txt = this.P[idx].text;
    if (this.P[idx].type == tNum) { //控制从第几手显示❶
        txt = parseInt(this.P[idx].text) - this.resetNum;
        txt = parseInt(txt) < 1 ? "" : txt;
        txt = showNum ? txt : "";
    }
    this.printPoint(idx, txt, this.P[idx].color, this.P[idx].type, showNum);
    //console.log("wNb")
    this.unpackTree();
};



// 把 page 坐标 转成 canvas 坐标
checkerBoard.prototype.xyPageToObj = function(p, canvas) {

    let l = canvas.offsetLeft;
    let t = canvas.offsetTop;
    let parentNode = canvas.parentNode;
    while (parentNode != document.body && parentNode != null) {

        l += parentNode.offsetLeft;
        t += parentNode.offsetTop;
        parentNode = parentNode.parentNode;
    }
    p.x = p.x - l;
    p.y = p.y - t;
};



// 把 canvas 坐标 转成 page 坐标
checkerBoard.prototype.xyObjToPage = function(p, canvas) {

    let l = canvas.offsetLeft;
    let t = canvas.offsetTop;
    let parentNode = canvas.parentNode;
    while (parentNode != document.body && parentNode != null) {

        l += parentNode.offsetLeft;
        t += parentNode.offsetTop;
        parentNode = parentNode.parentNode;
    }
    p.x = p.x + l;
    p.y = p.y + t;
};