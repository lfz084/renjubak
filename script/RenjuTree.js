(function(global, factory) {
    (global = global || self, factory(global));
}(this, (function(exports) {
    'use strict';
    //console.log(exports);

    class RenjuNode {
        constructor(idx = `-1`, parentNode, childNode = []) {
            this.parentNode = parentNode;
            this.childNode = childNode;
            this.defaultChildNode = [];
            this.idx = idx;
            this.txt = "";
            this.txtColor = "black";
            this.innerHTML = "";
        }
    }
    
    class RenjuTree{
        constructor() {
            this.childNode = [];
            this.firstColor = "black";
            this.idx = -1;
            this.txt = "";
            this.txtColor = "black";
            this.innerHTML = "";
            this.keyMap = new Map();
            this.autoColor = "black";
            this.moveNodes = [];
            this.moveNodesIndex = -1;
        }
    }

})))