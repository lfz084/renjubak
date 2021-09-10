(function(global, factory) {
    (global = global || self, factory(global));
}(this, (function(exports) {
    'use strict';
    //console.log(exports);

    class RenjuNode {
        constructor(idx = `-1`, parentNode, childNode = []) {
            if (typeof idx == "object") {
                this.parentNode = object.parentNode;
                this.childNode = object.childNode || [];
                this.defaultChildNode = object.defaultChildNode || [];
                this.idx = object.idx || -1;
                this.txt = object.txt || "";
                this.txtColor = object.txtColor || "black";
                this.innerHTML = object.innerHTML || "";
            }
            else {
                this.parentNode = parentNode;
                this.childNode = childNode;
                this.defaultChildNode = [];
                this.idx = idx;
                this.txt = "";
                this.txtColor = "black";
                this.innerHTML = "";
            }
        }
    }

    RenjuNode.prototype.setParentNode = function(parentNode) {
        this.parentNode = parentNode;
    }

    RenjuNode.prototype.pushChildNode = function(childNode) {
        this.childNode.push(childNode);
        childNode.setParentNode(this);
    }

    RenjuNode.prototype.popChildNode = function(parentNode) {

    }



    class RenjuTree {
        constructor(firstColor = "black", keyMap = new Map()) {
            if (typeof firstColor == "object") {
                let object = firstColor;
                this.childNode = object.childNode || [];
                this.firstColor = object.firstColor || "black";
                this.idx = object.idx || -1;
                this.txt = object.txt || "";
                this.txtColor = object.txtColor || "black";
                this.innerHTML = object.innerHTML || "";
                this.keyMap = object.keyMap || new Map();
                this.autoColor = object.autoColor;
                this.moveNodes = [];
                this.moveNodesIndex = -1;
            }
            else {
                this.childNode = [];
                this.firstColor = firstColor;
                this.idx = -1;
                this.txt = "";
                this.txtColor = "black";
                this.innerHTML = "";
                this.keyMap = keyMap;
                this.autoColor;
                this.moveNodes = [];
                this.moveNodesIndex = -1;
            }
        }
    }
    
    RenjuTree.prototype.pushChildNode = function(childNode) {
        this.childNode.push(childNode);
        childNode.setParentNode(this);
    }
    
    
    exports.RenjuNode = RenjuNode;
    exports.RenjuTree = RenjuTree;
})))